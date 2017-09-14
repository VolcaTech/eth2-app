# Eth2Phone
Sending Ether to a phone number with user verification via SMS.

## Project Overview
We thought of how to make ether transfer onboarding easier and have come up with the idea of sending assets to a receiver by mobile phone number. He doesn’t even need to have a wallet, but simply needs to open the web app, follow simple steps and receive the assets using one of the possible ways.

## How it works
The full description of necessary steps could be found in the article here:
https://medium.com/p/50830f592e25/

## Demo
Play with the demo at https://eth2phone.github.io/ . The demo app supports Ropsten network right now.

## Architecture
https://github.com/youvegoteth/youvegoteth.github.io/raw/master/images/architecture.png
1. Sender creates public key and transfers in to the blockchain smart contract
2. Sender creates encrypted private key and sends it to verification server.
3. Sender also passes the decryption password to receiver (by the way he chooses?—?voice, sms, e-mail, etc )
4. Receiver types in his phone number and decryption password. The phone verification request is sent to server.
5. Server returns the verification code via SMS to the phone entered
6. Receiver gets the code from SMS and types it in 
7. If the code is correct, the transaction is executed and he receives his assets.

## Running on Ropsten
You should be good to go if you set Metamask to point at the correct network.
Load https://eth2phone.github.io/ and use the app!?

## License
MIT Liscense 
