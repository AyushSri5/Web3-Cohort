import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";

const mnemonic = generateMnemonic(256);
console.log(mnemonic);

console.log("Generated Mnemonic:", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
