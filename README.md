# Eth2Phone
Sending Ether to a phone number with user verification via SMS.

## Project Overview
Sending ether to mobile phone number. Receiver doesn’t even need to have a wallet, but simply needs to open the web app, follow simple steps and receive ether using one of the possible ways.

## Demo
Play with the demo at https://eth2phone.github.io/ . The demo app supports Ropsten network right now.

## Video: 
* [Sending demo](https://screencast-o-matic.com/watch/cbQoD1IbCD)
* [Receiving demo](https://screencast-o-matic.com/watch/cbQoDXIbCp)

## Transfer details
### Send
![Send](/public/send.png)
1. Sender generates verification private-public key pair.
2. Sender deposits ether to smart contract and assigns verification public key to the deposit. On withdrawal smart-contract verifies that receiver's address is signed by the verification private key.
3. Sender encrypts verification private key with random secret code and sends encrypted keystore data to verification server.
4. Sender passes the secret code to receiver by the way he chooses (voice, sms, e-mail, etc.)

### Receive
![Receive](/public/receive.png)
1. Receiver types in his phone number and the secret code. Hashed phone verification request is sent to server. (So not at any point in time verification server has the verification private key.)
2. Server sends the verification code via SMS to the phone entered.
3. Receiver gets the code from SMS and types it in. If the code is correct, server returns encrypted keystore data to receiver.
4. Receiver decrypts the keystore data with the secret code provided by sender and gets the verification private key. Receiver signs address of his choice with the verfication private key. Receiver sends signed address to verification server.
5. Verification server tries to withdraw ether through smart-contract to signed address. If signature is correct, the transaction is executed and receiver gets the ether.

## Running on Ropsten
You can use a browser with Metamask on desktop. You can also use mobile wallet with dapp browser such as Trust Wallet or Cipher Browser.  
Load https://eth2phone.github.io/ and use the app.


## Code structure
`./src` - all Javascript/React code is located in this folder.

`./src/apis/eth2phone-api` - all interaction of the web app with the VerificationProxy smart-contract and verification server is defined in this file.  

`./contracts/VerifiedProxy` - the VerificationProxy Smart Contract, which locks ether from sender and withdraws ether on request from the owner to address signed by verification private key. Verification Server deploys the contract and controls smart contract's owner account.

`./test` - tests for the VerificationProxy Smart Contract


This repo contains front-end code + smart-contracts. Verification server's code is located in the separate repository - https://github.com/Dobrokhvalov/eth2phone-server

## License
MIT Liscense 
