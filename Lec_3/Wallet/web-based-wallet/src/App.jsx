import { useState } from 'react'
import './App.css'
import {generateMnemonic, mnemonicToSeedSync} from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';

function App() {
  // Generate a 12-word mnemonic
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  for (let i = 0; i < 4; i++) {
    const path = `m/44'/501'/${i}'/0'`; // Derivation path for Solana
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
  }
  
  
  return (
    <>
      <h1>Wallet generation</h1>  
    </>
  )
}

export default App
