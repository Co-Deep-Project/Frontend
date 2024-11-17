import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 4000;
const API_KEY = '70d8db9c548f4ea0b9f7ea947fe662ab';
const MEMBER_NAME = '곽상언';

app.use(cors());

async function fetchBillsProposedByMember(memberName, apiKey) {
  const url = 'https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn';
  const params = new URLSearchParams({
    Key: apiKey,
    Type: 'json',
    pIndex: 1,
    pSize: 100,
    PROPOSER: memberName,
    AGE: '22',
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    console.log("API Response:", JSON.stringify(data, null, 2));

    let bills = [];
    const resultCode = data?.nzmimeepazxkubdpn?.[0]?.head?.[1]?.RESULT?.CODE;

    if (resultCode === 'INFO-000') {
      bills = data.nzmimeepazxkubdpn[1].row.map(item => ({
        bill_id: item.BILL_NO,
        bill_name: item.BILL_NAME,
        propose_date: item.PROPOSE_DT,
        committee: item.COMMITTEE,
        proposer: item.PROPOSER,
      }));
    } else {
      console.error("API Response Error: Unexpected structure or missing data.");
    }
    
    console.log(`Total number of bills records : ${bills.length}`);

    return bills;
  } catch (error) {
    console.error('API fetch error:', error);
    return [];
  }
}

app.get('/api/bills', async (req, res) => {
  const bills = await fetchBillsProposedByMember(MEMBER_NAME, API_KEY);
  res.json(bills);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
