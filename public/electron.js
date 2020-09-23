const electron = require("electron");
var appData = require("./fileHandler");
// initialize app
const {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  Tray,
  Menu,
  nativeImage,
} = electron;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  
  mainWindow.on("closed", () => (mainWindow = null));
}
// load window when app is ready
app.on("ready", createWindow);
// set up for mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.setAppUserModelId(process.execPath);

ipcMain.on("save-config", (event, newConfig) => {
  console.log(newConfig)
  appData.apiKey = newConfig.apiKey;
  appData.save();
});

ipcMain.on("notify", () => {
  //handle notifications here
})

ipcMain.on("ready-for-data", () => {
  let data = appData;
  data.save = undefined;
  
  mainWindow.webContents.send("user-data", data);
})

ipcMain.on("external", (event, url) => {
  console.log(url)
  shell.openExternal(url);
})