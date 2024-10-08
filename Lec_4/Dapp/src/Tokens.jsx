import React, { useState } from 'react';
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AccountLayout, TOKEN_PROGRAM_ID,MintLayout, createMint } from '@solana/spl-token';
import MintToken from './Mint';

const Tokens = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAccounts, setTokenAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const fetchTokenAccounts = async (walletAddress) => {
    setLoading(true);
    setError('');
    try {
      
      const publicKey = new PublicKey(walletAddress);

      // Fetch token accounts owned by the user
      const accounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      // Decode and process the account data
      const tokens =await Promise.all( accounts.value.map(async(tokenAccount) => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);
        const mintAccountInfo = await connection.getParsedAccountInfo(new PublicKey(accountData.mint));
          const decimals = mintAccountInfo.value?.data?.parsed?.info?.decimals || 0;
          const balance = Number(accountData.amount) / Math.pow(10, decimals);
        return {
          mint: new PublicKey(accountData.mint).toBase58(),
          balance: balance,
        };
      }));
      console.log(tokens);
      
      setTokenAccounts(tokens);
    } catch (err) {
      setError('Failed to fetch token accounts. Please check the wallet address.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTokens = () => {
    if (walletAddress) {
      fetchTokenAccounts(walletAddress);
    }
  };




 

  return (
    <div>
      <h2>Solana Token Balance Fetcher (Devnet)</h2>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button onClick={handleFetchTokens} disabled={loading || !walletAddress}>
        {loading ? 'Fetching...' : 'Fetch Tokens'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tokenAccounts.length > 0 && (
        <div>
          <h3>Token Accounts and Balances:</h3>
          <table >
            <thead>
              <tr>
                <th>Token</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {tokenAccounts.map((token, index) => (
                <tr key={index}>
                  <td>{token.mint}</td>
                  <td>{token.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tokenAccounts.length === 0 && !loading && !error && (
        <p>No tokens found or please enter a valid wallet address.</p>
      )}
      <MintToken />
    </div>
  );
};

export default Tokens;
