// imple for ropsten network.
require('dotenv').config();

const Web3 = require('web3'); 
const client = require('node-rest-client-promise').Client();
const INFURA_KEY = process.env.INFURA_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/'  +  INFURA_KEY);
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const etherescan_url = `http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`


async function getContractAbi() {
    const etherescan_response = await client.getPromise(etherescan_url)
    const CONTRACT_ABI = await JSON.parse(etherescan_response.data.result);
    return CONTRACT_ABI;
}

async function eventQuery(){
    const CONTRACT_ABI = await getContractAbi();
    const contract = await new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    // specify Event name
    contract.events.Set()
        .on('data', (event) => {
            console.log(event);
            // some imple after triggered event.
        })
        .on('error', console.error);
}

eventQuery();