import React, { useState } from 'react'
import  Button2  from '../../styles/components/buttton/button.component'

import { allowedWallets, SessionWallet, SignedTxn } from 'algorand-session-wallet-deka';
import { setSW, sw } from '../lib/sessionWallet';
import algosdk, { encodeObj } from 'algosdk';
import { Buffer } from 'buffer';




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

  const response = await fetch('http://localhost/api/users/challenge/YEUJW5EPVUDGXYG67LWCL376GMHYKORJECSB2JAW5WY4ESL3CEHPRSEWX4');
  const tx = await response.json()
  console.log(tx)
  console.log(tx.tx)

  const rawTxnChallenge = Buffer.from(Object.values(tx.tx));
  const unsignedTxn = algosdk.decodeUnsignedTransaction(rawTxnChallenge);
  console.log(unsignedTxn)
  const signedTxns:SignedTxn[]|undefined = await sw?.signTxn([unsignedTxn], false);
  const signedTxn = signedTxns[0];
  console.log('signedTxn')
  console.log(signedTxn)

  const encoded1 = btoa(signedTxn.blob.reduce((str, byte) => str + String.fromCharCode(byte), "")) // anda 
  console.log('encoded1:')
  console.log(encoded1)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  
      username: 'matamicen1234@gmail.com',
      password: "pepe",
      wallet: true,
      tx: encoded1 })
};
  const result = await fetch('http://localhost/auth/login', requestOptions);
   const res = await result.json()
   console.log(res)

   } catch (error) {
  console.log(error)
}


}

export const Wallet = () => {
  return (
    <><div>wallet</div>
    <div>
          <Button2 label={'Connect'} variant="primary" title={'boton che'} onClick={connect}></Button2>
          <Button2 label={'SignOut'} variant="primary" title={'boton che'} onClick={disconnect}></Button2>

          <Button2 label={'SignIn'} variant="primary" title={'boton che'} onClick={getChallenge}></Button2>
      </div></>
  )
}
function waitForConfirmation(algodClient: algosdk.Algodv2, txId: any, arg2: number) {
  throw new Error('Function not implemented.');
}

