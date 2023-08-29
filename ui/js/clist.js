import { ethers } from "ethers";
import abi from "./data.json";
const ETH_CONTRACT_ADDRESS = "0x218ba17c37d957afa3be5e9af287452ac05f6d3a";

$(document).ready(function () {
  $(".modal").modal();
  // $.ajax({
  //    url: '/getaddress',
  //    method: 'post'
  // }).done(function(){
  // 	console.log('done');
  // });

  // candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

  //check cookie
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  var aadhaar_list = {
    300000000000: "Akola",
    738253790005: "Bhandara",
  };

  var aadhaar = readCookie("aadhaar");

  console.log(aadhaar);
  var address = aadhaar_list[aadhaar];
  console.log(address);
  $("#loc_info").text("Location based on Aadhaar : " + address);

  function disable() {
    $("#vote1").addClass("disabled");
    $("#vote2").addClass("disabled");
    $("#vote3").addClass("disabled");
    $("#vote4").addClass("disabled");

    //logout
    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    window.location = "/app";
  }

  $("#vote1").click(async function (id) {
    console.log("votee");

    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("MetaMask is not installed");
    }

    const contractABI = abi; // Replace with your contract's ABI
    const contractAddress = ETH_CONTRACT_ADDRESS; // Replace with your contract's deployed address

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    contract.methods
      .vote(id)
      .send({ from: accounts[0] })
      .on("receipt", (receipt) => {
        console.log(receipt);
      })
      .on("error", (error) => {
        console.error(error);
      });
  });
  $("#vote2").click(function () {
    contractInstance.voteForCandidate(
      "Aniket",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Aniket");
        disable();
        $("#loc_info").text("Vote submited successfully to Aniket");
      }
    );
  });
  $("#vote3").click(function () {
    contractInstance.voteForCandidate(
      "Mandar",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Mandar");
        disable();

        $("#loc_info").text("Vote submited successfully to Mandar");
      }
    );
  });
  $("#vote4").click(function () {
    contractInstance.voteForCandidate(
      "Akshay",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Akshay");
        disable();
        $("#loc_info").text("Vote submited successfully to Akshay");
      }
    );
  });
});
