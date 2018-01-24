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
  "rejectUnauthorized": false
}, res => {

  res.setEncoding("utf8")

  let rawData = ""

  res.on("data", chunk => {
    rawData += chunk
  })

  res.on("end", () => {
    const items = JSON.parse(rawData)
    Object.keys(items).forEach(key => {
      QRCode.toFile(
        `qrCodes/${key}.png`,
        `${process.env.GAME_URL}/${key}`,
        { "width": 250 },
        error => {
          if (error) throw  error
          console.log(`${process.env.GAME_URL}/${key}`)
        }
      )
    })
  })
})
