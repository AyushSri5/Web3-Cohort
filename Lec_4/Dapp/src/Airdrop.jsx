import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as solanaWeb3 from '@solana/web3.js'


export function RequestAirdrop(){
    const wallet = useWallet();

    

    // console.log(LAMPORTS_PER_SOL);
    
    async function getTokens(){
        if (wallet.publicKey) {
            console.log("Public Key (Base58):", wallet.publicKey.toBase58());
            let slot = await connection.getSlot();
            console.log(slot);

            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                wallet.publicKey, 
                {
                    programId: new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
                }
            );

            tokenAccounts.value.forEach((accountInfo) => {
                const accountData = accountInfo.account.data.parsed;
                const tokenBalance = accountData.info.tokenAmount.uiAmount;
                const mintAddress = accountData.info.mint;
                console.log(`Token mint: ${mintAddress}, Balance: ${tokenBalance}`);
            });
        } else {
            console.log("Wallet is not connected");
        }
    }
    getTokens();
    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        // alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    
        
    }
    return <div className="airdrop">
         <input className='input-box' id="amount" type="text" placeholder="Amount" />
         <button  onClick={requestAirdrop}>Request Airdrop</button>
    </div>
}