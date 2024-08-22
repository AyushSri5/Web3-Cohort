import { useState } from 'react'
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
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  const wallet = new Wallet(privateKey);


async function sendTransaction(){
  const transaction = {
    to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
    value: Utils.parseEther("0.001"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
    type: 2,
    chainId: 1, // Corresponds to ETH_MAINNET
  };
const rawTransaction = await wallet.signTransaction(transaction);
const result=await alchemy.transact.sendTransaction(rawTransaction);
console.log(result);

}

  sendTransaction();

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
