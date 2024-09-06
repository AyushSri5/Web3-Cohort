import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as solanaWeb3 from '@solana/web3.js'


export function RequestAirdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();

    

    // console.log(LAMPORTS_PER_SOL);
    
    async function getTokens(){
        console.log(wallet.publicKey);
        
        const tokens = await connection.getTokenAccountBalance(wallet.publicKey);
        console.log(tokens);
    }
    getTokens();
    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    
        
    }
    return <div>
         <input id="amount" type="text" placeholder="Amount" />
         <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
}