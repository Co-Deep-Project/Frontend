let voteData = [
  {
    id: 105,
    title: "검사(강백신) 탄핵소추안",
    voteNumber: "2201277",
    date: "2024-11-01",
    committee: "법제사법위원회",
    decision: "찬성"
  },
  {
    id: 104,
    title: "검사(김영철) 탄핵소추안",
    voteNumber: "2201276",
    date: "2024-10-28",
    committee: "법제사법위원회",
    decision: "기권"
  },
  {
    id: 103,
    title: "검사(박상용) 탄핵소추안",
    voteNumber: "2201275",
    date: "2024-10-25",
    committee: "법제사법위원회",
    decision: "반대"
  }
];

const processBlock = document.getElementById("process-block");
let expandedBlocks = {}; // 블록 확장 상태 저장 객체

function renderVotes() {
  processBlock.innerHTML = ""; // 기존 내용을 초기화
  voteData.forEach((vote) => {
    const voteBlock = document.createElement("div");
    voteBlock.className = `vote-block ${getDecisionClass(vote.decision)}`;

    const blockHeader = document.createElement("div");
    blockHeader.className = "block-header";
    blockHeader.innerHTML = `
      <div class="vote-id">${vote.id}</div>
      <div class="vote-title">${vote.title}</div>
      <button class="expand-button" onclick="toggleExpand(${vote.id})">
        ${expandedBlocks[vote.id] ? "-" : "+"}
      </button>
    `;
    voteBlock.appendChild(blockHeader);

    // 확장된 정보
    if (expandedBlocks[vote.id]) {
      const blockDetails = document.createElement("div");
      blockDetails.className = "block-details";
      blockDetails.innerHTML = `
        <p>의안번호: ${vote.voteNumber}</p>
        <p>의결일자: ${vote.date}</p>
        <p>소관위원회: ${vote.committee}</p>
      `;
      voteBlock.appendChild(blockDetails);
    }

    processBlock.appendChild(voteBlock);
  });
}

function getDecisionClass(decision) {
  return decision === "찬성"
    ? "approve"
    : decision === "반대"
    ? "against"
    : "abstain";
}

function toggleExpand(id) {
  expandedBlocks[id] = !expandedBlocks[id];
  renderVotes();
}

function loadMore() {
  const moreData = [
    {
      id: 102,
      title: "순직 해병 수사 방해 및 사건 은폐 등의 진상규명을 위한 특별검사의 임명 등에 관한 법률안",
      voteNumber: "2201274",
      date: "2024-10-20",
      committee: "국방위원회",
      decision: "찬성"
    }
  ];
  voteData = [...voteData, ...moreData];
  renderVotes();
}

// 초기 렌더링
renderVotes();
