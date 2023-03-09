import React, { useState } from 'react'
import  Button2  from '../../styles/components/buttton/button.component'
import { allowedWallets, SessionWallet, SignedTxn } from 'algorand-session-wallet-deka';
import { setSW, sw } from '../lib/sessionWallet';
import { Buffer } from 'buffer';
import Link from 'next/link';
import algosdk, {
  makePaymentTxnWithSuggestedParamsFromObject,
  SignedTransaction,
  SuggestedParams,
  encodeObj
} from "algosdk";
import nacl from "tweetnacl";




const connect = async () => {
    console.log('login!')
    const w = new SessionWallet(
        'TestNet',
        undefined,
        // 'wallet-connect'
        // 'pera-connect'
        'my-algo-connect'
      )
      console.log('todavia no ejecuto')
      setSW(w);
      console.log('todavia no ejecuto2')
    if (sw == null){
      console.log('no esta logueado')

    }
    else
    if (await sw.connect()){
        console.log('true')
     const accts = sw.accountList()
     console.log(accts)
    }

 


}
const disconnect = async () => {
    console.log('disconnect')
    if(sw) {
        try {
            // sw.disconnect();
            sw?.disconnect();
        } catch (error) {
            console.log(error)
        }
        

    }

}
const signin = async () => {
  console.log('signin')

  const algodToken = '';

  const algodServer = "https://node.testnet.algoexplorerapi.io";
  const algoIndexer = "https://algoindexer.testnet.algoexplorerapi.io/"
  // const algodServer = "https://node.algoexplorerapi.io";
  // const algoIndexer = "https://algoindexer.algoexplorerapi.io/"
  const algodPort = '';
  // const algodPortindexer = '8980'
  let algodClient = new algosdk.Algodv2(algodToken, algodServer,algodPort);
  let indexer = new algosdk.Indexer(algodToken, algoIndexer,algodPort);
  const enc = new TextEncoder()

  const address:string = sw.accountList()[0]
  console.log('adress a ver:')
  console.log(address)

  const noteRaw = 'pepito'
  const note = enc.encode(noteRaw)

  // const algodClient = algoClient()
  const suggestedParams = await algodClient.getTransactionParams().do()


     const tx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        amount: Number(0),
        suggestedParams,
        note,
      })
      console.log('tx:' + tx)
      const signedTxns:SignedTxn[]|undefined = await sw?.signTxn([tx], false);
      // const txSigned = sw?.signTxn(tx)
      console.log(signedTxns)
      // const signedTxn = signedTxns[0];
      const { txId } = await algodClient.sendRawTransaction(signedTxns[0].blob).do();
      console.log(txId)
      // await waitForConfirmation(algodClient, txId, 3);


}

const getChallenge = async () => {

  console.log('getChallenge');

  const algodToken = '';
  const algodServer = "https://node.testnet.algoexplorerapi.io";
  const algoIndexer = "https://algoindexer.testnet.algoexplorerapi.io/"

  const algodPort = '';

  let algodClient = new algosdk.Algodv2(algodToken, algodServer,algodPort);

  const address:string = sw.accountList()[0]
  console.log('adress a ver:')
  console.log(address)
  
try {

  const response = await fetch('http://localhost/api/users/challenge/'+address);
  const tx = await response.json()
  console.log(tx)
  console.log(tx.tx)

  const rawTxnChallenge = Buffer.from(Object.values(tx.tx));
  const unsignedTxn = algosdk.decodeUnsignedTransaction(rawTxnChallenge);
  console.log(unsignedTxn)
  const signedTxns:SignedTxn[]|undefined = await sw?.signTxn([unsignedTxn], false);
  const signedTxn = signedTxns[0];
  console.log('decoded signed blob')
  console.log(algosdk.decodeSignedTransaction(signedTxn.blob))
  console.log('decoded signed tx')

  
//   console.log('signedTxn')
//   console.log(signedTxn)
//     const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({  
//       username: 'matamicen1234@gmail.com',
//       password: "pepe",
//       wallet: true,
//       tx: signedTxn })
// };

// front version matias
//   console.log('signedTxn')
//   console.log(signedTxn)
//   console.log('ejecuto TX')
//   // const { txId } = await algodClient.sendRawTransaction(signedTxns[0].blob).do();
//   // console.log(txId)

  const encoded1 = btoa(signedTxn.blob.reduce((str, byte) => str + String.fromCharCode(byte), "")) // anda 
//   console.log('encoded1:')
//   console.log(encoded1)
//   console.log('decode blob:')
//   console.log(algosdk.decodeSignedTransaction(signedTxn.blob))
//   // const encoded2 = Buffer.from(signedTxn).toString("base64")

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  
      username: 'matamicen1234@gmail.com',
      password: "pepe",
      wallet: true,
      tx: signedTxn })
};
// fin front version matias
  const result = await fetch('http://localhost/auth/login', requestOptions);
   const res = await result.json()
   console.log(res)

   } catch (error) {
  console.log(error)
}


}

const barnji = async () => {
  const algodToken = '';
  const algodServer = "https://node.testnet.algoexplorerapi.io";
  const algoIndexer = "https://algoindexer.testnet.algoexplorerapi.io/"

  const algodPort = '';

  let algodClient = new algosdk.Algodv2(algodToken, algodServer,algodPort);
 
  // const address:string = sw.accountList()[0]
  // console.log('adress a ver:')
  // console.log(address)
  const creator = algosdk.mnemonicToSecretKey("ten simple dawn frozen wash actual also flight cloth box tilt pledge birth produce apart subject kingdom helmet pass wrist discover bargain pause absent congress");

  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = makePaymentTxnWithSuggestedParamsFromObject({
    from: creator.addr,
    to: creator.addr,
    amount: 0,
    suggestedParams: suggestedParams,
  });

  const blob = txn.signTxn(creator.sk);
  // const signedTxns:SignedTxn[]|undefined = await sw?.signTxn([txn], false);
  // const signedTxn = signedTxns[0];

  const stxn = algosdk.decodeSignedTransaction(blob);
  console.log('stxn')
  console.log(stxn)
  console.log("Valid? ", verifySignedTransaction(stxn));
}

export const Wallet = () => {
  return (
    <><div>wallet</div>
    <div>
          <Button2 label={'Connect'} variant="primary" title={'boton che'} onClick={connect}></Button2>
          <Button2 label={'SignOut'} variant="primary" title={'boton che'} onClick={disconnect}></Button2>

          <Button2 label={'SignIn'} variant="primary" title={'boton che'} onClick={getChallenge}></Button2>
          <Button2 label={'Barnji'} variant="primary" title={'boton che'} onClick={barnji}></Button2>
          <Link href="about"><a><Button2 label={'About'} variant="primary" title={'boton che'}></Button2></a></Link>
            <Link href="contactUs"><a><Button2 label={'ContactUs'} variant="primary" title={'boton che'}></Button2></a></Link>
            <Link href="metamask"><a><Button2 label={'Metamask'} variant="primary" title={'boton che'}></Button2></a></Link>
      </div></>
  )
}
function waitForConfirmation(algodClient: algosdk.Algodv2, txId: any, arg2: number) {
  throw new Error('Function not implemented.');
}

function verifySignedTransaction(stxn: SignedTransaction) {
  if (stxn.sig === undefined) return false;



  const pk_bytes = stxn.txn.from.publicKey;

  // const sig_bytes = new Uint8Array(stxn.sig);
  const sig_bytes = stxn.sig;
  console.log('get_obj_for_encoding')
  console.log(stxn.txn.get_obj_for_encoding())

  const txn_bytes = algosdk.encodeObj(stxn.txn.get_obj_for_encoding());
  const msg_bytes = new Uint8Array(txn_bytes.length + 2);
  msg_bytes.set(Buffer.from("TX"));
  msg_bytes.set(txn_bytes, 2);

  console.log('stxn');
  console.log(stxn);
  console.log('pk_bytes');
  console.log(pk_bytes);
  console.log('sig_bytes');
  console.log(sig_bytes);
  console.log('txn_bytes');
  console.log(txn_bytes);
  console.log('msg_bytes');
  console.log(msg_bytes);

  return nacl.sign.detached.verify(msg_bytes, sig_bytes, pk_bytes);
}

