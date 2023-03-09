import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchAllUsers } from '../store/slices/users/actions'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'
import {UserSliceState, User} from '../core/models/user.types'
import { ethers } from 'ethers';


const Metamask = () => {
    // const [listshow, setListshow] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        getCurrentWalletConnected();
        addtWalletListener();
    })

    // const  {list: users}  = useSelector<RootState, UserSliceState>((state) => state.users);
    // const dispatch:AppDispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAllUsers());
    // }, [dispatch])

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewBurn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewMint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token_transfer_count",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]


    const connectWallet = async () => {
        console.log('connect wallet')
        // @ts-ignore
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
          try {
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
            console.log(accounts[0]);
            setWalletAddress(accounts[0]);
            // @ts-ignore
            // console.log(ethers.utils.formatEther(balance))
          }
          catch(err) {
           console.log(err);
          }
         }
         else{
            console.log("Please install metamask")
         }
     //    setListshow(true)
     }

     const getCurrentWalletConnected = async () => {
        console.log('connect wallet')
        // @ts-ignore
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
          try {
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: "eth_accounts"});
            if (accounts.length > 0) {
                console.log(accounts[0]);
                setWalletAddress(accounts[0]);
            }
            else
            {
                console.log("Connect to metamask using the connect button") 
            }

          }
          catch(err) {
           console.log(err);
          }
         }
         else{
            console.log("Please install metamask")
            setWalletAddress('');
         }
     //    setListshow(true)
     }

     const addtWalletListener = async () => {

        // @ts-ignore
        if (typeof window != "undefined" && typeof window.ethereum != "undefined"){
             // @ts-ignore
          window.ethereum.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
          })
         }
         else{
            console.log("Please install metamask")
         }

     }

     const executeTxn = async () => {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const senderWallet = new ethers.Wallet("731b0d8cea4f74d858bc8b0ff5e6a0639eac146ba10a5d07609a65cbfd2539ce", provider);

            // Acccounts now exposed
    const params = [{
        from: walletAddress,
        to: "0x5970Aa08a6A5607635eCCB783867021676bb2759",
        value: ethers.utils.parseUnits("0.01", 'ether').toHexString()
    }];

    const transactionHash = await provider.send('eth_sendTransaction', params)
    console.log('transactionHash is ' + transactionHash);

     }

     const call_contract = async () => {

        try {
        const contractAddress = '0xDc5842E13D5610477cD5708fd42C4e7F81D39F4c';

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // create a contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);
        // call the totalSupply function
        contract.totalSupply()
        // @ts-ignore
        .then(totalSupply => console.log('Total supply:', totalSupply.toString()))
        // @ts-ignore
        .catch(error => console.error('Error calling totalSupply:', error));

        contract.token_transfer_count()
        // @ts-ignore
        .then(totalSupply => console.log('Total transfers:', totalSupply.toString()))
        // @ts-ignore
        .catch(error => console.error('Error calling Total transfers:', error));

        const balance = await provider.getBalance(contractAddress);
        // @ts-ignore
        console.log((balance/10**18).toString() + ' eth');

        const balance2 = await provider.getBalance("0x58025975E033E91EA99408f847a503044306A652");
        // @ts-ignore
        console.log((balance2/10**18).toString() + ' eth');

        }
        catch (err) {
        console.error(err);
        
        }
        
     }


  return (
  <>
    <div>Metamask
    </div>
    <div>
        <button onClick={() => connectWallet()}>
            {walletAddress && walletAddress.length > 0 
            ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`
            : 'Connect Wallet'
            }
        </button>
        </div>
        <div>
        <button onClick={() => executeTxn()}>
          Send Paymment TX
            
        </button>
        <button onClick={() => call_contract()}>
          Query Contract
            
        </button>
        </div>
    
 
 </>
    )
}

Metamask.propTypes = {}

export default Metamask

