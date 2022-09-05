const { RPC_PROVIDER, TOKEN_CONTRACT, ADMIN_PRIVATE_KEY } = require('../constants');
const TokenAbi = require('../abis/token.json');
const ethers = require('ethers');

module.exports = {
  mint: async (tokenURI) => {
    try {
      const operatorWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, RPC_PROVIDER);
      const tokenContract = new ethers.Contract(TOKEN_CONTRACT, TokenAbi, operatorWallet);
      const transaction = await tokenContract.mintNFT(tokenURI);
      console.log('transaction', transaction);
      const receipt = await transaction.wait();
      const mintEvent = receipt.events.find(e => e.event == 'TokenMinted')
      const nftId = mintEvent.args['nftId'].toString();
      return {
        success: true,
        nftId,
        transactionHash: transaction.hash,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
}