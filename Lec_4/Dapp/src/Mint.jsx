import React, { useEffect, useState } from 'react';
import { Connection, Keypair, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react'; // Assuming you are using a Solana wallet adapter for React

const MintToken = () => {
  const [connection, setConnection] = useState(null);
  const { publicKey, sendTransaction } = useWallet(); // using the Solana wallet adapter to get wallet details

  useEffect(() => {
    // Create connection to Solana
    const connectionInstance = new Connection(clusterApiUrl('devnet'),'confirmed'); // You can use 'devnet' or other clusters
    setConnection(connectionInstance);
  }, []);

  const createTokenMint = async () => {
    if (!connection || !publicKey) {
      console.log("Connection or wallet not found");
      return;
    }

    try {
      const newAddress = Keypair.generate();  // Generating new address for mint
      const lamports = await getMinimumBalanceForRentExemptMint(connection);  // Getting minimum rent-exempt balance

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: newAddress.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(
          newAddress.publicKey, 
          6, // Decimals
          publicKey, // Mint authority
          publicKey, // Freeze authority
          TOKEN_PROGRAM_ID
        )
      );

      transaction.feePayer = publicKey;
      const recentBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = recentBlockhash.blockhash;
      
      // Partially signing the transaction with the newly generated mint address
      transaction.partialSign(newAddress);

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction signature:', signature);
    } catch (error) {
      console.error('Error creating mint:', error);
    }
  };

  return (
    <div>
      <h1>Create Token Mint</h1>
      <button onClick={createTokenMint} disabled={!publicKey}>
        Create Token Mint
      </button>
    </div>
  );
};

export default MintToken;
