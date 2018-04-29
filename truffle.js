const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "fall gasp culture lonely awkward switch nurse fee road blur weekend phrase";
const INFURA_TOKEN = 'OZH2R47KNnEajk7xhkZv';



module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*" // Match any network id
    },
     virtual: {
	 host: "localhost",
	 port: 8546,
	 network_id: "*" // Match any network id
     },
      ropsten: {
	  provider: function() {
	      const provider_ = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${INFURA_TOKEN}`);
	      return provider_
	  },
	  network_id: 3,
	  gas: 4600000
      }         
  }
};
