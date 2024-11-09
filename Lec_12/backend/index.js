require('dotenv').config();
const express = require('express');
const {userModel} = require('./models');

const { Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
const bs58 = require('bs58');
const cors = require("cors");


const connection = new Connection("https://api.devnet.solana.com")
const app = express();

app.use(express.json());
app.use(cors());
const JWT_SECRET = "123456";

app.post("/api/v1/signup", async function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    const keypair = new Keypair();

    await userModel.create({
        username,
        password,
        publicKey:keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString()
    })
    return res.json({
        publicKey: keypair.publicKey.toString()
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user
        }, JWT_SECRET)
        res.json({
            token
        })
    } else {

        res.status(403).json({
            message: "Credentials are incorrect"
        })
    }
})

app.post("/api/v1/txn/sign", async function (req, res){
    const serializedTransaction = req.body.message;

    const tx = Transaction.from(Buffer.from(serializedTransaction));

    const keypair = Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY));
    const {blockhash} = await connection.getLatestBlockhash();
    tx.blockhash = blockhash
    tx.feePayer = keypair.publicKey

    tx.sign(keypair)

    const signature = await connection.sendTransaction(tx, [keypair])
    console.log(signature)
    return res.json({
        message: signature
    })
})

app.get("/api/v1/txn/?id=id",function (req, res){

})



app.listen(3000);