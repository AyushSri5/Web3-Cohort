import React, { useState } from 'react';
import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
// import { getParsedTokenAccountsByOwner } from '@solana/spl-token';

const Tokens = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const wallet = useWallet();

  const getTokensOwnedByUser = async (walletAddress) => {
    setLoading(true);
    setError('');
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey('H82kzdnqBU5ysXkGUcP9u7k3rKJUgXBCejDkPmy2G7zf'),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  console.log(tokenAccounts.value);
  
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    console.log(tokenAccount);
    
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  })
      // setTokens(userTokens);
    } catch (err) {
      setError('Error fetching tokens. Please check the wallet address.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTokens = () => {
    if (walletAddress) {
      getTokensOwnedByUser(walletAddress);
    }
  };

  return (
    <div>
      <h2>Solana Token Fetcher</h2>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button onClick={handleFetchTokens} disabled={loading || !walletAddress}>
        {loading ? 'Fetching Tokens...' : 'Get Tokens'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Tokens owned by user:</h3>
        {tokens.length > 0 ? (
          <ul>
            {tokens.map((token, index) => (
              <li key={index}>
                <strong>Mint:</strong> {token.mint} <strong>Amount:</strong> {token.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tokens found or enter a valid address.</p>
        )}
      </div>
    </div>
  );
};

export default Tokens;
