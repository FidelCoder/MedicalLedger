// module.exports = {
//   // networks: {
//   //   development: {
//   //     host: "127.0.0.1",
//   //     port: 8545,
//   //     network_id: "1692610738446" // Match any network id
//   //   }
//   // },

//   networks: {
//     goerli: {
//       provider: function () {
//         return new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/c89d1ce42c1f45a7a3818f0e1f01f014");
//       },
//       network_id: '5',
//     },


//     compilers: {
//       solc: {
//         version: "0.8.0",
//         settings: {
//           optimizer: {
//             enabled: true, // Default: false
//             runs: 200      // Default: 200
//           },
//         }
//       }
//     }
//   }
//   };
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { CHIADORPC, MNEMONIC } = process.env;

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*",
    // },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, CHIADORPC),
      network_id: "10200",
      gas: 30000000,
      networkCheckTimeout: 6000000,
    },
  },
};
