const VerifiedProxy = artifacts.require("./VerifiedProxy.sol"); 
const Promise = require('bluebird');
const sha3 = require('solidity-sha3').default;
const sha3withsize = require('solidity-sha3').sha3withsize;
const util = require("ethereumjs-util");
const Web3Utils = require('web3-utils');

// helpers
function sign(privateKey, msgHash) {
    return util.ecsign(new Buffer(util.stripHexPrefix(msgHash), 'hex'), new Buffer(privateKey, 'hex'));
}

function parseTransfer(result) {
    return {
	id: result[0].toString(),
	from: result[1].toString('hex'),
	amount: result[2].toNumber()
    };
}
Promise.promisifyAll(web3.eth, {suffix: "Promise"});

// constants
const PREFIX = "\x19Ethereum Signed Message:\n32";
const GAS_PRICE = 20;
const receiverAddress = "0x1b019c6f52c39e07e6c396ee1d0f957d3832d92a";
const oneEth = web3.toWei(1,  "ether");
const FIXED_COMMISSION = parseInt(web3.toWei(0.01,  "ether"));
const CANCELLED_TRANSFER_ADDRESS = "0xD2657dBf4900A59e6125a83aA46388730a9f7754";

// verification constatns
const VERIFICATION_TRANSIT_ADDRESS = "0xD2657dBf4900A59e6125a83aA46388730a9f7753";
const VERIFICATION_TRANSIT_PRIVATE_KEY = "c1d65fc0afe6afe5318d400d93de5057c16f3e1b2715d5072f64cf4b1d4ab493";
var signature, v, r, s;
var verificationHash = Web3Utils.soliditySha3(PREFIX, {type: 'address', value: receiverAddress});
signature = sign(VERIFICATION_TRANSIT_PRIVATE_KEY, verificationHash);
v = signature.v;
r = '0x' + signature.r.toString("hex");
s = '0x' + signature.s.toString("hex");	    





contract('VerifiedProxy', async (accounts) => {
    var senderAddress,
	verifierAddress,
	initialBalances = {
	    sender: 0,
	    contract: 0,
	    verifier: 0,
	    reciever: 0
	},
	verifiedproxyInstance;
   
    
    const sendTransfer = async (gasPrice, verificationAddress) => {
	if (!gasPrice) {
	    gasPrice = GAS_PRICE;
	}
	if (!verificationAddress) {
	    verificationAddress = Web3Utils.randomHex(20);
	}
	
	const txData = await verifiedproxyInstance.deposit(Web3Utils.toHex(verificationAddress), {from: senderAddress, value: oneEth, gasPrice: gasPrice});
	const rawTransfer = await verifiedproxyInstance.getTransfer.call(verificationAddress, {from: senderAddress});
	return parseTransfer(rawTransfer);	
    }
    
    async function initBalances() {
	verifierAddress = accounts[0];
	senderAddress = accounts[1];	
	initialBalances.sender = await web3.eth.getBalancePromise(senderAddress);
	initialBalances.contract = await web3.eth.getBalancePromise(verifiedproxyInstance.address);
	initialBalances.verifier = await web3.eth.getBalancePromise(verifierAddress);
	initialBalances.receiver = await web3.eth.getBalancePromise(receiverAddress);
    }
    
    before("deploy and prepare", async () => {
	verifiedproxyInstance = await VerifiedProxy.deployed();
	await initBalances();
    });

    it("it should have correct initial valus (commission)", async () => {
	const commission = await verifiedproxyInstance.commissionFee();
	assert.equal(commission.toString(), commission, "it doesn't have correct commission");
    });
    
    describe("Sender sends 1 ether directly to verifier contract (fallback function) ", () => {
	beforeEach("init values", async () => {
	    await initBalances();
	});

	it("contract should not accept ether to address", async () => {
	    try { 
		await web3.eth.sendTransactionPromise({to: verifiedproxyInstance.address, from: senderAddress, value: oneEth});
	    } catch (err) {
		// pass
	    }
	    const contractBalanceAfterTx = await web3.eth.getBalancePromise(verifiedproxyInstance.address);	    
	    assert.equal(initialBalances.contract.toString(), contractBalanceAfterTx.toString(), "Ether was incorrectly received by contract");
	});
    });

    describe("#deposit", function() {
	beforeEach("making transfer", async () => {
	    await initBalances();
	});
	
    	it("contract receives ether", async () => {
	    await sendTransfer();
	    const contractBalanceAfterTx = await web3.eth.getBalancePromise(verifiedproxyInstance.address);
	    assert.equal(oneEth.toString(), contractBalanceAfterTx.toString(), "ether was not received by contract");
	});

    	it(" commission is accrued for verifier", async () => {
	    let commissionToWithdrawBefore;

	    // save commission before transfer
	    commissionToWithdrawBefore = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});

	    // make transfer
	    await sendTransfer();
	    const commissionToWithdrawAfter = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});

	    // const gasCommission = GAS_PRICE * DEPOSIT_GAS_COST;
	    const transferCommission = FIXED_COMMISSION;
	    assert.equal((commissionToWithdrawBefore.plus(transferCommission)).toString(), commissionToWithdrawAfter.toString(), "commission was not accrued");
	    
	});


	it(" msg.value should cover transfer commission", async () => {
	    const commissionToWithdrawBefore = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});	    
    	    await sendTransfer();
	    const commissionToWithdrawAfter = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
	    	    
	    assert.equal(commissionToWithdrawBefore.plus(FIXED_COMMISSION).toString(), commissionToWithdrawAfter.toString(), "commission was accrued");
	});

	
	it(" verifier can withdraw commission", async () => {	  
	    let commissionToWithdraw, _verifierBalance;
	    
	    await sendTransfer();
	    
	    commissionToWithdraw = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
	    
	    await verifiedproxyInstance.withdrawCommission({}, {from: verifierAddress});
	    _verifierBalance = await web3.eth.getBalancePromise(verifierAddress);
	    
	    // ability to withdraw check
	    const balanceAfterWithdrawnCommission = (initialBalances.verifier.plus(commissionToWithdraw)).toString();
	    assert.isBelow( _verifierBalance.toString(), balanceAfterWithdrawnCommission, "balance is updated with more wei than commission");	    
	    assert.isAbove( _verifierBalance.toString(), initialBalances.verifier.toString(), "commission was not withdrawn");
	    
	    // commission to withdraw reset check
	    commissionToWithdraw = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
	    
	    assert.equal(commissionToWithdraw.toNumber(), 0, "commission to withdraw was not reset");
	    
	    // double-spend attack check
	    await verifiedproxyInstance.withdrawCommission({}, {from: verifierAddress});
	    _verifierBalance = await web3.eth.getBalancePromise(verifierAddress);
	    assert.isBelow(_verifierBalance.toString(), balanceAfterWithdrawnCommission, "commission was withdrawn twice");
	});

	it(" commission should go to verifier even if function called by other sender", async () => {
	    let commissionToWithdraw, verifierBalanceBefore;
	    
	    await sendTransfer();
	    
	    commissionToWithdraw = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
	    verifierBalanceBefore = await web3.eth.getBalancePromise(verifierAddress);
	    // ability to withdraw check		    
	    await verifiedproxyInstance.withdrawCommission({}, {from: senderAddress});

	    const _verifierBalance = await web3.eth.getBalancePromise(verifierAddress);
	    // ability to withdraw check		    	    
	    assert.equal( verifierBalanceBefore.plus(commissionToWithdraw).toNumber(), _verifierBalance.toNumber()," ether wasn't withdrawn to verifier");		    
	    
	    // commission to withdraw reset check
	    commissionToWithdraw = await verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});	    
	    assert.equal(commissionToWithdraw.toNumber(), 0, "commission to withdraw wasn't reset");	
	});
    });

    describe("signature verification", () => {

	it("can correctly recognize address for signature", async () => {
	    const result = await verifiedproxyInstance.verifySignature.call(VERIFICATION_TRANSIT_ADDRESS,
									    receiverAddress, v, r, s,
									    {from: verifierAddress});
	    assert.equal(result, true, "it didn't correctly recognized signature");
	});
	
	it("returns different address for antother receiver", async () => {
	    const result = await verifiedproxyInstance.verifySignature.call(VERIFICATION_TRANSIT_ADDRESS,
									    senderAddress, v, r, s,
									    {from: verifierAddress});
	    assert.equal(result, false, "it didn't correctly recognized signature");
	});
    });
    
    describe("pending transfer", () => {
	
    	it("can be fetched by sender", async () => {
	    let transfer = await sendTransfer(GAS_PRICE, VERIFICATION_TRANSIT_ADDRESS);
	    
	    assert.equal(transfer.amount.toString(), "990000000000000000", "amount is correct.");
	    assert.equal(transfer.from, senderAddress, "sender is correct.");
	});
	    
	    
	it("cannot be withdrawn with correct signature but not through verifier", async () => {
	    let transferFrom;
	    try { 
	 	await verifiedproxyInstance.withdraw(VERIFICATION_TRANSIT_ADDRESS,
						     receiverAddress, v, r, s, {from: senderAddress, gas: 3000000});		
	    } catch(err) {}

	    try { 
		let transferRaw = await verifiedproxyInstance.getTransfer.call(VERIFICATION_TRANSIT_ADDRESS, {from: verifierAddress});
		let transfer = parseTransfer(transferRaw);
		transferFrom = transfer.from;		
	    } catch(err) {}
	    
	    assert.equal(transferFrom, senderAddress, "transfer doesn't exist.");
	    const balance = await web3.eth.getBalancePromise(receiverAddress);
	    assert.equal(web3.toBigNumber(balance).toString(), web3.toBigNumber(initialBalances.receiver).toString(), " ether not transfered to receiver");
	});


	it("cannot be withdrawn through verifier without correct signature", async() => {
	    let transferFrom;
	    try {
		// signature is for receiver address
	 	await verifiedproxyInstance.withdraw(VERIFICATION_TRANSIT_ADDRESS,
						     senderAddress, v, r, s, {from: senderAddress, gas: 3000000});		
	    } catch(err) {}

	    try { 
		let transferRaw = await verifiedproxyInstance.getTransfer.call(VERIFICATION_TRANSIT_ADDRESS, {from: verifierAddress});
		let transfer = parseTransfer(transferRaw);
		transferFrom = transfer.from;		
	    } catch (err) {}

	    assert.equal(transferFrom, senderAddress, "transfer doesn't exist.");
	    const balance = await web3.eth.getBalancePromise(receiverAddress);
	    assert.equal(web3.toBigNumber(balance).toString(), web3.toBigNumber(initialBalances.receiver).toString(), " ether not transfered to receiver");	  
	});
	    
    	it("can be withdrawn with correct signature and through verifier", async () => {
	    let transferFrom, transfer, transferRaw;
	    transferRaw = await verifiedproxyInstance.getTransfer.call(VERIFICATION_TRANSIT_ADDRESS, {from: verifierAddress});
	    transfer = parseTransfer(transferRaw);
	    const transferAmount = transfer.amount;
	    
	    await verifiedproxyInstance.withdraw(VERIFICATION_TRANSIT_ADDRESS, receiverAddress, v, r, s, {from: verifierAddress, gas: 3000000});
	    
	    try { 
		transferRaw = await verifiedproxyInstance.getTransfer.call(VERIFICATION_TRANSIT_ADDRESS, {from: verifierAddress});
		transfer = parseTransfer(transferRaw);
		transferFrom = transfer.from;
	    } catch (err) {}
	    assert.equal(transferFrom, '0x0000000000000000000000000000000000000000', "transfer does exist, but should not.");
	    const balance = await web3.eth.getBalancePromise(receiverAddress);
	    assert.equal(web3.toBigNumber(balance).toString(), web3.toBigNumber(transferAmount).plus(initialBalances.receiver).toString(), " ether not transfered to receiver");
	});
	
    
	it("cannot be canceled by verifier", async () => {
	    let transferFrom, transfer;
	    transfer = await sendTransfer();
	    // cancel transfer
	    try { 
		await verifiedproxyInstance.cancelTransfer(transfer.id, {from: verifierAddress, gas: 3000000});
	    } catch (err) { }

	    try { 
		let transferRaw = await verifiedproxyInstance.getTransfer.call(transfer.id, {from: verifierAddress});
		transfer = parseTransfer(transferRaw);
		transferFrom = transfer.from;
	    } catch (err) {}
	    assert.equal(transferFrom, senderAddress, "transfer doesn't exist.");
	});

	
	it("can be cancelled by sender", async () => {	    
	    let transferFrom, transfer;
	    transfer = await sendTransfer();
	    // cancel transfer
	    try { 
		await verifiedproxyInstance.cancelTransfer(transfer.id, {from: senderAddress, gas: 3000000});
	    } catch (err) { }

	    try { 
		let transferRaw = await verifiedproxyInstance.getTransfer.call(transfer.id, {from: senderAddress});
		transfer = parseTransfer(transferRaw);
		transferFrom = transfer.from;
	    } catch (err) {}
	    assert.equal(transferFrom, '0x0000000000000000000000000000000000000000', "transfer does exist, but should not.");	    
	});

	xit("cancelled transfer cannot be withdrawn", async () => {
	});
	
	xit("cancelled transfer returns ether to sender", async () => {
	});
	
	xit("cancelled transfer returns ether to sender ONLY ONCE", async () => {
	});
	
    });
});
