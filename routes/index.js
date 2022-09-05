const express = require('express');
const router = express.Router();
const uploadToIPFS = require('../handlers/upload');
const multer = require('multer');
const { mint } = require('../handlers/token');
const { listNfts, addNFT } = require('../handlers/market');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/mint', upload.single('media'), async (req, res) => {
  const ipfsMetadata = await uploadToIPFS(req.file);
  if (ipfsMetadata) {
    const result = await mint(ipfsMetadata.url);
    if (result.success) {
      res.json(result);
    } else {
      res.status(422).json(result);
    }
  } else {
    res.status(422).json({ error: 'No IPFS metadata found', success: false });
  }
});

router.post('/market/add', async (req, res) => {
  const nftId = req.body.nftId;
  await addNFT(nftId);
});

module.exports = router;
