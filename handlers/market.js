const ethers = require('ethers');
const { RPC_PROVIDER, MARKETPLACE_CONTRACT, ADMIN_PRIVATE_KEY, TOKEN_CONTRACT } = require('../constants');
const MarketplaceAbi = require('../abis/marketplace.json');

const marketContract = new ethers.Contract(MARKETPLACE_CONTRACT, MarketplaceAbi, RPC_PROVIDER);

module.exports = {
  listNfts: async () => {
    const availableNfts = await marketContract.getAvailableNFTsinNFTMart();
    return availableNfts;
  },

  addNFT: async (nftId) => {
    try{
        const operatorWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, RPC_PROVIDER);
      const signedMarketContract = new ethers.Contract(MARKETPLACE_CONTRACT, MarketplaceAbi, operatorWallet);
      const listingFee = await marketContract.getNFTListingFeeInMarket();
      console.log('listingFee', listingFee.toString(), nftId);
      const transaction = await signedMarketContract.nftTokenSale(TOKEN_CONTRACT, nftId, {
        value: listingFee,
      });
      console.log('transaction', transaction);
      const receipt = await transaction.wait();
      console.log('receipt', receipt);
      return {
        success: true,
        transactionHash: transaction.hash,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }
}