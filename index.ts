const fs = require("fs")
const path = require("path")
const { areaCodeMap,governmentMap } = require("./config/index")
const createGeoJSON = (filePath) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.log("错误", error)
    } else {
      const jsonData = JSON.parse(data)
      const {features} = jsonData
      features.forEach(item => {
        const {
          name, chunname
        } = item.properties
        const areaCode = areaCodeMap[name || chunname]
        if (areaCode) {
          const government = governmentMap[name || chunname]
          item.properties.adcode = areaCode
          item.properties.government = government
          item.properties.name = name || chunname
          const file = path.join(__dirname, `./dist/${areaCode}.json`)
          const dataInfo = {
            type: "FeatureCollection",
            features: [item]
          }
          const text = JSON.stringify(dataInfo)
          fs.writeFile(file, text, err => {
            if (err) {
              console.log(error)
            } else {
              console.log(`创建文件文件成功->${file}`)
            }
          })
        }
      })
    }
  })
}
createGeoJSON("JD.json")
createGeoJSON("SQ.json")