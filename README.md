# Eth2Phone
Sending Ether to a phone number with user verification via SMS.

## Project Overview
Sending ether to mobile phone number. Receiver doesn’t even need to have a wallet, but simply needs to open the web app, follow simple steps and receive ether using one of the possible ways.

## Demo
Play with the demo at https://eth2phone.github.io/ . The demo app supports Ropsten and Mainnet networks right now.

## Video: 
* [Sending demo](https://screencast-o-matic.com/watch/cbQoD1IbCD)
* [Receiving demo](https://screencast-o-matic.com/watch/cbQoDXIbCp)

## Transfer details
### Send
![Send](/public/send.png)
1. Sender generates transit private-public key pair.
2. Sender deposits ether to escrow smart contract and assigns transit public key to the deposit. On withdrawal escrow smart-contract verifies that receiver's address is signed by the transit private key.
3. Sender encrypts transit private key with random secret code and sends encrypted transit private key to verification server.
4. Sender passes the secret code to receiver by the way he chooses (voice, sms, e-mail, etc.)

### Receive
![Receive](/public/receive.png)
1. Receiver types in his phone number and the secret code. Hashed phone verification request is sent to server. (So not at any point in time verification server has the transit private key.)
2. Server sends the verification code via SMS to the phone entered.
3. Receiver gets the code from SMS and types it in. If the code is correct, server returns encrypted transit private key to receiver.
4. Receiver decrypts the transit private key with the secret code provided by sender and gets the transit private key. Receiver signs address of his choice with the transit private key. Receiver sends signed address to verification server.
5. Verification server tries to withdraw ether from escrow smart-contract to signed address. If signature is correct, the transaction is executed and receiver gets the ether.

## Running on Ropsten or Mainnet
Works best with Trust Wallet on mobile. You can also use a browser with Metamask on desktop.
Load https://eth2phone.github.io/ and use the app.


## Code structure
`./src` - all Javascript/React code is located in this folder.

`./src/services/eth2phone/index` - all interaction of the web app with the escrow smart-contract and verification server is defined in this file.

`./contracts/e2pEscrow` - the escrow smart contract, which locks ether from sender and withdraws ether on request from the owner to address signed by transit private key. Verification Server deploys the contract and controls smart contract's owner account.

`./test` - tests for the VerificationProxy Smart Contract


This repo contains front-end code + smart-contracts. Verification server's code is located in the separate repository - https://github.com/Dobrokhvalov/eth2phone-server

## License
MIT Liscense 
