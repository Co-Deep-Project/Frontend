const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
app.use(cors());
const port = 3000;
const API_KEY = '...';
const BILL_LIST_URL = 'https://open.assembly.go.kr/portal/openapi/nwbpacrgavhjryiph';
const VOTE_URL = 'https://open.assembly.go.kr/portal/openapi/nojepdqqaweusdfbi';

let billIdCache = [];

async function fetchBillIds() {
    if (billIdCache.length > 0) {
        console.log("Using cached BILL_IDs:", billIdCache);
        return billIdCache;
    }

    let pIndex = 1;
    const billIds = [];
    let hasMoreData = true;

    console.log("Starting to fetch BILL_IDs...");

    try {
        while (hasMoreData) {
            const response = await axios.get(BILL_LIST_URL, {
                params: {
                    Key: API_KEY,
                    Type: 'json',
                    AGE: 22,
                    pSize: 10, 
                    pIndex: pIndex
                }
            });
            const data = response.data;
            console.log(`API Response for Bill List (pIndex: ${pIndex}):`, data);

            if (data.nwbpacrgavhjryiph && data.nwbpacrgavhjryiph[1].row) {
                const rows = data.nwbpacrgavhjryiph[1].row;
                for (let row of rows) {
                    if (row.BILL_ID) {
                        billIds.push(row.BILL_ID);
                    }
                }
                pIndex++;
            } else {
                console.log("No more rows found in the response for BILL_IDs.");
                hasMoreData = false; 
            }
        }
    } catch (error) {
        console.error("Error fetching bill list:", error.message);
    }

    billIdCache = billIds;
    console.log("Retrieved BILL_IDs:", billIds);
    return billIds;
}

async function fetchVoteDataForMember(billId, memberName) {
    try {
        const response = await axios.get(VOTE_URL, {
            params: {
                Key: API_KEY,
                Type: 'json',
                BILL_ID: billId,
                AGE: 22,
                HG_NM: memberName
            }
        });
        const data = response.data;
        console.log(`API Response for Vote Data (BILL_ID: ${billId}):`, data);

        if (
            data.nojepdqqaweusdfbi &&
            data.nojepdqqaweusdfbi[1] &&
            data.nojepdqqaweusdfbi[1].row
        ) {
            return data.nojepdqqaweusdfbi[1].row;
        } else {
            console.log(`No items found for BILL_ID: ${billId}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching vote data for BILL_ID ${billId}:`, error.message);
        return [];
    }
}

async function fetchAllVoteDataForMember(memberName) {
    const billIds = await fetchBillIds();

    const allVoteData = await Promise.all(
        billIds.map((billId) => fetchVoteDataForMember(billId, memberName))
    );

    const flattenedVoteData = allVoteData.flat();

    flattenedVoteData.sort((a, b) => new Date(b.VOTE_DATE) - new Date(a.VOTE_DATE));

    console.log("Total Vote Data for Member:", flattenedVoteData);
    console.log("Total number of vote records:", flattenedVoteData.length);
    return flattenedVoteData;
}

app.get('/api/vote_data', async (req, res) => {
    const memberName = req.query.name;
    if (!memberName) {
        return res.status(400).json({ error: "Member name is required" });
    }

    const voteData = await fetchAllVoteDataForMember(memberName);
    res.json(voteData);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
