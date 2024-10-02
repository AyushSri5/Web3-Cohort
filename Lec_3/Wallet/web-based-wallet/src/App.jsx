import { useState } from 'react'
import './App.css'
import {generateMnemonic, mnemonicToSeedSync} from 'bip39'
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';

function App() {
  // Generate a 12-word mnemonic
  const [publicKey, setpublicKey] = useState(null);
  const [privateKey, setprivateKey] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(0);
  const handleClick = () => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  
    const path = `m/44'/501'/${currentIndex}'/0'`; // Derivation path for Solana
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setpublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setprivateKey(Keypair.fromSecretKey(secret).privateKey.toBase58());
  }
  
  return (
    <>
      <h1>Wallet generation</h1>
      <button onClick={handleClick}>Add Wallet</button>
      <div>
        <p>{publicKey}</p>
        <p>{privateKey}</p>
        </div>  
    </>
  )
}

export default App
