const cmsData = require("../client/src/cmsData.json")
const QRCode = require('qrcode')

Object.keys(cmsData.items).forEach(key => {
  console.log(key)
  QRCode.toFile(`qrCodes/${key}.png`, `https://10.1.34.110:3000/${key}`,{
    "width": 250
  }, err => {
    if (err) throw  err
    console.log("done")
  })
})
