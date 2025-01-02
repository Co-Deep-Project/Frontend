from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import openai
from openai import Client
from fuzzywuzzy import fuzz

# 환경 변수 로드
load_dotenv()

# Flask 앱 생성
app = Flask(__name__)
CORS(app, supports_credentials=True)

# OpenAI API 키 설정
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY  # OpenAI 클라이언트 초기화

# 네이버 뉴스 검색 API 정보
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")

# 세션 컨텍스트 초기화
session_context = {
    "introduced": False,
    "last_topic": None,
    "conversation_history": []
}

# 키워드 추출 함수
def extract_keyword(user_query):
    # 불용어 정의
    stopwords = ["뉴스", "알려줘", "다른", "좀", "검색해줘", "말해줘"]
    words = user_query.split()
    # 불용어를 제외한 단어만 키워드로 추출
    filtered_words = [word for word in words if word not in stopwords]
    return " ".join(filtered_words)

# 네이버 뉴스 검색 함수
def search_news(query, display=50, sort='sim'):
    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    params = {"query": query, "display": display, "sort": sort}
    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        if response.status_code == 200:
            news_items = response.json().get("items", [])
            # 필터링: 제목 또는 내용에 키워드 포함 여부 확인
            filtered_news = [
                item for item in news_items
                if query in item["title"] or query in item.get("description", "")
            ]
            unique_news = []
            for item in filtered_news:
                title = item["title"].replace("<b>", "").replace("</b>", "")
                # 유사도 비교를 통해 중복 뉴스 제거
                if not any(fuzz.ratio(title, existing["headline"]) > 30 for existing in unique_news):
                    unique_news.append({
                        "headline": title,
                        "url": item["originallink"] or item["link"]
                    })
            return unique_news[:4]  # 최대 4개 반환
        else:
            return []
    except Exception as e:
        print(f"Error during news search: {e}")
        return []

client = Client(api_key=OPENAI_API_KEY)

# OpenAI 응답 생성 함수
def generate_response(prompt):
    try:
        print("Calling OpenAI API...")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error during OpenAI call: {e}")
        return "죄송합니다, 요청을 처리하는 중 문제가 발생했습니다."

# 루트 경로
@app.route('/', methods=['GET'])
def home():
    intro_message = """
        안녕하세요! 폴리트래커 챗봇입니다. 😊
        다음과 같은 기능을 제공합니다:
        1. 뉴스 검색: 특정 지역이나 주제에 대한 뉴스를 검색.
        2. 일반 질문: 다양한 주제에 대한 정보 제공.
    """
    return intro_message, 200

# 뉴스 검색 엔드포인트
@app.route('/news', methods=['POST'])
def get_news():
    data = request.json
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "검색 키워드를 입력해주세요."}), 400
    news_results = search_news(query)
    if not news_results:
        return jsonify({"message": f"'{query}'에 대한 뉴스를 찾을 수 없습니다."})
    return jsonify(news_results)

# 대화형 질문 엔드포인트
@app.route('/chat', methods=['POST'])
def chat():
    global session_context
    data = request.json
    user_query = data.get("message", "")
    if not user_query:
        return jsonify({"error": "메시지를 입력해주세요."}), 400

    # 첫 상호작용: 소개 메시지 제공
    if not session_context["introduced"]:
        session_context["introduced"] = True
        intro_message = """
            안녕하세요! 폴리트래커 챗봇입니다. 😊
            다음과 같은 기능을 제공합니다:
            1. 뉴스 검색: 특정 지역이나 주제에 대한 뉴스를 검색.
            2. 일반 질문: 다양한 주제에 대한 정보 제공.
            """
        return jsonify({"response": intro_message})

    # 뉴스 검색 요청 처리
    if "뉴스" in user_query:
        keyword = extract_keyword(user_query)
        print(f"User query: {user_query}, Extracted keyword: {keyword}")
        if not keyword:
            return jsonify({"response": "검색 키워드를 입력해 주세요!"})
        news_results = search_news(keyword)
        print(f"Search results for '{keyword}': {news_results}")
        if not news_results:
            return jsonify({"response": f"'{keyword}'에 대한 뉴스를 찾을 수 없습니다."})
        formatted_news = "\n".join([
            f"제목: {news['headline']}\n링크: {news['url']}" 
            for news in news_results
        ])
        session_context["last_topic"] = "뉴스"
        session_context["conversation_history"].append({"user_query": user_query, "bot_response": formatted_news})
        return jsonify({"response": formatted_news})

    # 일반 대화 처리
    else:
        response = generate_response(user_query)
        session_context["conversation_history"].append({"user_query": user_query, "bot_response": response})
        return jsonify({"response": response})

# 서버 실행
if __name__ == '__main__':
    app.run(debug=True, port=5001)

