import React from "react";

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import ContractABI from "./ABI/abi_contract.json";

function App() {
  const { activate, deactivate } = useWeb3React();
  const { active, account, chainId } = useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  });

  var metamask = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  };
  // check Owner
  async function ownerFunc() {
    try {
      const data = "0x8eB07Cb02DBBc9e5efEf24d2da16e9aF2BA9eAbB";
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(data, ContractABI, signer);

      var checkOwnerAddress = await contract.owner();
      console.log(checkOwnerAddress);
      console.log("Successfully Done");
    } catch (err) {
      console.log(err);
    }
  }
  // check Sum
  async function checkSumFunc() {
    try {
      const data = "0x8eB07Cb02DBBc9e5efEf24d2da16e9aF2BA9eAbB";
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(data, ContractABI, signer);

      var sendTX = await contract.CheckSum();
      await sendTX.wait();
      console.log(sendTX);
      console.log("Successfully Done");
    } catch (err) {
      console.log(err);
    }
  }
  async function sumFunc() {
    try {
      const data = "0x8eB07Cb02DBBc9e5efEf24d2da16e9aF2BA9eAbB";
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(data, ContractABI, signer);

      const value = ethers.utils.parseEther("0.01");
      const sendTX = await contract.Sum(1, 3, { value: value });
      await sendTX.wait();
      console.log(sendTX);
      console.log("Successfully Done");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <button onClick={metamask}>Metamask Wallet</button> <br />
      <br />
      <div>Connection Status: {active}</div>
      <div>Account: {account}</div>
      <div>Network ID: {chainId}</div>
      <br />
      <button onClick={deactivate}>Disconnect</button>
      <br />
      <br />
      <button onClick={sumFunc}>SUM</button>
      <br />
      <br />
      <button onClick={ownerFunc}>OWNER</button>
      <br />
      <br />
      <button onClick={checkSumFunc}>CHECK SUM </button>
    </div>
  );
}

export default App;
