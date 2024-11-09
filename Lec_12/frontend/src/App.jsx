import axios from 'axios';
import './App.css'
import {Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL} from "@solana/web3.js"

const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/yBzlkWFR7LyZlmSKMjCBgTJEYK9LIktp")
const fromPubkey = new PublicKey("6FMVFmfZKcBMRrKPtWmcpFtkWaHBe7reeYWeobD9S2mg")
function App() {

  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("EWyjhTNEsBj4z7uBoA3Qrir2vCGdo4FPmhNxruSsorEv"),
      lamports: 0.001 * LAMPORTS_PER_SOL 
    })
    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash
    tx.feePayer = fromPubkey

    // convert the transaction to a bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    console.log(serializedTx);

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry : false 
    })
    
  }


  return <div>
    <input type="text" placeholder="Amount"></input>
    <input type="text" placeholder="Address"></input>
    <button onClick={sendSol}>Submit</button>
  </div>
}

export default App