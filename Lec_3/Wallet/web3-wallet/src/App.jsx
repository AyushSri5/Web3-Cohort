import { useEffect, useState } from 'react'
import './App.css'
import {generateMnemonic} from 'bip39'
import SolanaWallet from './components/SolanaWallet'
import EthWallet from './components/EthWallet'
import { Network, Alchemy, Wallet, Utils } from "alchemy-sdk";


function App() {
  const [mnemonic, setMnemonic] = useState("")
  
  const privateKey = '0xab72008c0fd279d73d983d8d4936c1cacb42bbd7114649b4dbc661980abbbfa8';
  const settings = {
    apiKey: "W5c5MuiMAzNX0kEUZpDa4_6VlWxghBfQ",
    network: Network.ETH_SEPOLIA, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  const wallet = new Wallet(privateKey);
  console.log(wallet);
  
useEffect(() => {
  const main = async () => {
    // Wallet address -- replace with your desired address
    const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  
    // Get token balances with API endpoint
    const balances = await alchemy.core.getTokenBalances(address);
  
    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });
  
    console.log(`Token balances of ${address} \n`);
  
    // Counter for SNo of final output
    let i = 1;
  
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) { 
      // Get balance of token
      let balance = token.tokenBalance;
  
      // Get metadata of token with API endpoint
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
  
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
  
      // Print name, balance, and symbol of token
      console.log("Name:", metadata.name);
      console.log("Balance", balance)
      console.log("Symbol:", metadata.symbol);
      console.log("----------------------------------");
    }
  };
  
  main();

  async function sendTransaction(){
    const transaction = {
      to: "0xA95096018d2Bb2347677d3B6b549855091E8d55e",
      value: Utils.parseEther("0.001"),
      gasLimit: "21000",
      maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
      maxFeePerGas: Utils.parseUnits("20", "gwei"),
      nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
      type: 2,
      chainId: 11155111, // Corresponds to ETH_MAINNET
    };
  const rawTransaction = await wallet.signTransaction(transaction);
  console.log("Raw transaction: " + rawTransaction);
  
  const result=await alchemy.transact.sendTransaction(rawTransaction);
  console.log(result);
  
  }
  
  
  
    sendTransaction();
},[]);


  

  return (
    <>
      <button onClick={async function() {
  const mn = await generateMnemonic();
  setMnemonic(mn)
}}>
  Create Seed Phrase
</button>
<input type="text" value={mnemonic}></input>
<SolanaWallet mnemonic={mnemonic}/>
<EthWallet mnemonic={mnemonic} />
      
    </>
  )
}

export default App
