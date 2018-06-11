import React from "react";

const questions = [
    {
        question: "What is Eth2phone about?",
        answer: "Eth2Phone service allows you to send Ether to anyone simply identifying them by the phone number. The only requirement for this transaction is for you to have the Web3 compatible Ethereum wallet with sufficient balance and the phone number of the person you are willing to send Ether to. You will have to share a special message with the receiver with the link containing all the instructions, following which she or he will download the wallet (or use existing one) and receive assets to it. For more info on sending and receiving Ether please check the questions below."
    },
    {
        question: "How to send Ether?",
        answer: (
		<div>
		So far the system works as follows:<br/>
		1. Find our website in the browser and load it<br/>
		2. You will see the header with basic info - your wallet address and balance. In the center of the screen you will have 2 inputs, type in:<br/>
		- Phone number of the receiver (the person who you are sending), i.e. +1 (800) 982-9337<br/>
		- Amount that you are willing to send in Ether, i.e. 10.123 ETH<br/><br/>		
		<div style={{fontStyle: 'italic'}}>*Please make sure that your wallet network is set to Ethereum Mainnet. If you have never changed that option before, it is more likely to be set to Mainnet</div><br/>		
		3. After filling the inputs, accept the terms (“I understand I am using beta software, at my own risk. Learn more”) by pressing the checkbox below the inputs. Press “Send” button to proceed.<br/>
		4. Now you should see the transaction status screen.<br/><br/>
		
		Statuses indicate the following:<br/>
		- Created: The transaction has been initiated and passed to blockchain<br/>
		- Processing: Your transaction is waiting to be mined and confirmed.<br/>
		- Completed: Transaction has been successfully mined. Assets are awaiting to be requested and received.<br/><br/>		
		If you close the page at this stage, you can get back to it at “Transfers” screen pressing “i” button next to your transfer<br/>

		5. On the transaction details screen you will be able to copy the link. Press “copy” button to copy message with the link to the buffer. Link could also be reviewed later in “Transfers”. Share this message with receiver the most convenient way.<br/>
		6. Checking receiving status. Load start page again (step 1) and press “Transfers” button below “Send”. The transaction list will roll out. The list element contains the following from left to right:<br/>
		- Amount of transaction<br/>
		- Phone number of receiver<br/>
		- Status or action<br/>
		- Info button<br/><br/>

		The “status or action” shows the current status of transaction or action (if available):<br/>
		- Seeing “Cancel” button actually shows that assets were sent successfully, but haven’t been requested yet. You can press “Cancel” to cancel the transaction and get your assets back at this stage.<br/>
		- Receiving. The transaction is in the process of receiving.<br/>
		- Received. The assets were successfully received.<br/>
		- Error. There was an error. Please try again or contact support.<br/>
		- Depositing. Shows that transaction is being deposited to our system to become available for receiver.<br/><br/>
		
		The “Info button” leads you the transaction details screen where you can copy transaction link that has to be shared with receiver if you lost it, and shows other extra details.
	    </div>
	)
    },
    {
        question: "How to receive Ether?",
        answer: (
	    <div>
	      1. Open the link that you’ve received - from desktop web browser or your wallet app Web3 browser.<br/>

	      You will be suggested to download the Trust Wallet as it is our recommended way. By pressing the button “Open trust wallet” you will be directed to the AppStore or Google Play to download the wallet. After downloading or if you already had Trust Wallet installed before you will be directed to the proper part of the app to use Eth2Phone. <br/>
	      
	      2. You will see the header with basic info - your wallet address (it is the address, where you will receive Ether) and balance. In the center of the screen you will have 2 the following info:<br/>
	      - Amount that you are about to receive in Ether, i.e. 10.123 ETH  <br/>
	      - Input with your phone number <br/>
	      
	      By pressing the link - you will be forwarded to pre-filled inputs with both your phone number and code only if you were sent 0.1 ETH or less. <br/>

	      If you were sent more than 1 ETH, link will only include phone number and you will have to enter code by copying it. This is made for security reasons while working in beta. You should copy the whole message that you got from receiver and paste into the “code” field, the code will be automatically extracted into it. <br/>
	      
Press “Confirm” to proceed<br/>
	      
	      <div style={{fontStyle: 'italic'}}>*Please make sure that your wallet network is set to Ethereum Mainnet. If you have never changed that option before, it is more likely to be set to Mainnet</div><br/>
	      
	      3. By this moment you should have an SMS code sent to the phone that you’ve entered. You will now have to fill in that code. The code could be re-sent in 60 seconds. <br/>
	      
	      When you filled in the code, press “Confirm” button to receive assets. You will be forwarded to the transaction status screen. <br/>
	      
	      4. At the transaction status screen you can check the status of your transaction. Usually it takes 1-2 minutes for the transaction to be received. You can close this screen and get back to it but pressing “Transfers” button at the start page and “i” next to desired transaction.<br/>

	      There are following statuses of transactions:<br/>	     	      
	      -  Created: The transaction has been initiated and passed to blockchain<br/>
	      - Receiving: Your transaction is waiting to be mined and confirmed. <br/>
	      - Received: Transaction has been successful. Assets received.<br/>
	      - Cancelled: Transaction was cancelled by sender"<br/>
	    </div>)
    },
    {
        question: "Do you have a commission?",
        answer: "We currently run in beta and charge no fees for transaction. We plan to develop service, bringing the decentralized solution with possibility for everyone to run a verification centre for various needs and charge for the service. But for now it’s totally free and you only cover the mining costs essential for any transaction in Ethereum network."
    },
    {
        question: "What wallets do you support?",
        answer: "We currently support a number of wallet apps that have an integrated Web3 browser, or web wallets, among them i.e. are Trust Wallet, Cipher and Toshi for mobile and Metamask for desktop web. We also provide what we call  “deep integration” with wallet services for free now and so have a list of recommended wallets to use with our service to have the best user experience, among them are Trust Wallet."
    },
    {
        question: "Can I send ERC20 tokens via Eth2Phone?",
        answer: "Not yet, but it’s in our roadmap."
    },
    {
        question: "Can I send non-fungible tokens like Cryptokitties via Eth2Phone?",
        answer: "That sounds as a great idea and we will be working at it very soon. :-)"
    },
    {
        question: "How to update transaction with higher GAS?",
        answer: (
<div>
  (for the sender if his transaction was failed)<br/><br/>
  If your transaction has failed one of the most common reasons is that you haven’t set enough GAS for it. The right way to correct it is to send Ether using our system again, but this time you should set the higher gas price in the transaction settings when sending.<br/><br/>
  According to the wallet that you are using — please pay attention to the GWEI section and set it up to 20 to be sure that your transaction will be mined and thus successful.
</div>
)
    }, {
        question: "Can we integrate eth2phone to our wallet/service?",
        answer: "As written above, we provide what we call “deep integration” with wallet services. We look forward to making as many users use the service as possible and will be happy to cooperate with your wallet if you have an intention to integrate Eth2Phone in. We also have many ideas on how the solution can be useful to you as wallet project owner, enhance user retention and bring potential of future profits. Please contact us at info@eth2.io if that refers to you."
    }, {
        question: "Is Eth2Phone fully trustless?",
        answer: "We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but Ether transfers are trustless."
    }, {
        question: "How Ether transfers are trustless?",
        answer: (
<div>
Before transferring Ether, Sender generates Transit Ethereum address and corresponding private key. <br/><br/>


Then Sender deposit Ether to Escrow Smart Contract and assigns the Transit Address. Escrow Smart Contract is designed in such way that on withdrawal Recipient’s address should be signed by the Transit Private Key.<br/><br/>


Sender encrypts Transit Private Key with random secret code, transmits the code to the Receiver and Transit Keystore (private key encrypted with the code)  to Verification Server.<br/><br/>


After Receiver confirms his phone number via SMS-auth, the Verification Server provides Transit Keystore to Receiver. Now Receiver is able to decrypt it and get the Transit Private Key.<br/><br/>


Then Receiver signs address of his choice with the Transit Private Key and sends signed address to the Verification Server, which calls Escrow Smart Contract to initiate the withdrawal. Not at any point in time Verification Server has the Verification Private Key, thus not able to withdraw the Ether to illegal address.<br/><br/>

</div>
)
    }, {
        question: "What if someone steals the share link?",
        answer: "Attacker should get Transit Keystore from Verification Server in order to withdraw Ether. Without confirming phone number she will not get Transit Keystore from Verification Server."
    }, {
        question: "What if our server is compromised?",
        answer: "The Verification Server has no control over Ether locked in Escrow Smart Contract. Even if verification server is compromised, in worst case scenario, receiver will not be able to receive transfer. At the same time, sender can cancel transfer with a call to Escrow Smart Contract and get the Ether back."
    }, {
        question: "Will my phone be stored on blockchain and linked to my Ethereum address?",
        answer: "No, verification is done off-chain."
    }, {
        question: "Will be my phone number stored on your servers?",
        answer: "We never store phone numbers in plaintext. We store phone number hashed with transferID and salt (cryptography), which is hash of phone number and secure code. You can verify it by yourself in our code on Github. Even someone will get access to our servers, the attacker won’t be able to link Ethereum addresses to phone numbers."
    }
]



export default questions;
