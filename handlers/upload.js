const { NFTStorage, File } = require("nft.storage");
const { NFT_STORAGE_KEY } = require("../constants");

const nftStorageClient = new NFTStorage({ token: NFT_STORAGE_KEY });

/** 
 *  Add NFT media to IPFS using nft.storage
 * @input {file: file}
 * @output {string: url, string: key}
*/
const uploadToIPFS = async (file) => {
  try {
    const fileExtension = file.mimetype.split('/')[1];
    const name = new Date().getTime().toString();
    const fileName = name + '.' + fileExtension;
    const metadata = await nftStorageClient.store({
      name,
      description: name,
      image: new File([file.buffer], fileName, { type: `image/${fileExtension}` }),
    });
    console.log('metadata: ', metadata);
    return metadata;
  } catch (error) {
    console.error('Error during uploading asset to IPFS: ', error);
    return null;
  }
}

module.exports = uploadToIPFS;