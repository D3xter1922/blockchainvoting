const ETH_CONTRACT_ADDRESS = "0x218ba17c37d957afa3be5e9af287452ac05f6d3a";
const Web3 = require("web3");
let web3;

const abi = require("./data.json");
async function connectMetaMask() {
  // Check if MetaMask is installed
}
window.funn = async () => {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected with account:", accounts[0]);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("MetaMask is not installed");
  }
  console.log("aksjda");

  // Replace with your contract's ABI
  const contractAddress = ETH_CONTRACT_ADDRESS; // Replace with your contract's deployed address
  console.log("dfjhjsdfsjd");
  const contract = new web3.eth.Contract(abi, contractAddress);
  try {
    const receipt = await contract.methods.getVotingStatus().send({
      from: accounts[0],
    });
    console.log(receipt);
  } catch (error) {
    console.error(error);
  }
};
