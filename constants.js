const ethers = require('ethers');

const constants = {
  "NETWORK": "ropsten",
  "INFURA_API_KEY": "9b3464a6bc004081a8cb01643cc2f141",
  "MARKETPLACE_CONTRACT": "0x8bc0c0eea304c6265737617de10835f6dd429dc5",
  "TOKEN_CONTRACT": "0xa5ea5fe091bf93db3f65289af5bca30f61c0b22d",
  "NFT_STORAGE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY4YTg2OEQwRDY3YTljNmQ5ZThiQjNjNDAzMTY1MTM5MWY0QjgzOTUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTIzNTI2MzMzNSwibmFtZSI6InRlc3QifQ.A4mc6ag52urhlu_cPxPSucTtvMr1srq91l33aZhF8NM",
  "ADMIN_PRIVATE_KEY": "e95fdd6205e9b14e89757acb2f50373568ce1c021c46a371079b767297f1a898",
}

const provider = new ethers.providers.InfuraProvider(constants.NETWORK, constants.INFURA_API_KEY);
constants["RPC_PROVIDER"] = provider;

module.exports = constants;