const fs = require("fs")
const https = require("https")
const QRCode = require('qrcode')

fs.access("qrCodes", err => {
  if (err) {
    fs.mkdir("qrCodes", err => {
      if (err) throw err
    })
  }
})

https.get({
  "hostname": "localhost",
  "path": "/content/master/content/items",
  "rejectUnauthorized": true
}, res => {

  res.setEncoding("utf8")

  let rawData = ""

  res.on("data", chunk => {
    rawData += chunk
  })

  res.on("end", () => {
    const items = JSON.parse(rawData)
    Object.keys(items).forEach(key => {
      console.log(key)
      QRCode.toFile(`qrCodes/${key}.png`, `https://10.1.34.110:3000/${key}`,{
        "width": 250
      }, err => {
        if (err) throw  err
        console.log("done")
      })
    })
  })
})
