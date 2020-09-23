const electron = require("electron");
const path = require("path");
const fs = require("fs");

const userDataPath = (electron.app || electron.remote.app).getPath("userData");
//C:\Users\{USER}\AppData\Roaming\app-react\
const dataPath = path.join(userDataPath, 'saved-data.json');
console.log(dataPath)

console.log(dataPath);

var data = readData(dataPath);

function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataPath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return {};
  }
}

data.save = () => {
    var savedData = data;
    fs.writeFileSync(dataPath, JSON.stringify(savedData));
}

data.save()

module.exports = data