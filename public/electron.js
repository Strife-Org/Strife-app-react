const electron = require("electron");
var appData = require("./fileHandler");
// initialize app
const { app, BrowserWindow, ipcMain, shell } = electron;
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

  const { setup: setupPushReceiver } = require("electron-push-receiver");

  // Call it before 'did-finish-load' with mainWindow a reference to your window
  setupPushReceiver(mainWindow.webContents);

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
  appData.apiKey = newConfig.apiKey;
  appData.save();
});

ipcMain.on("notify", () => {
  //handle notifications here
});

ipcMain.on("ready-for-data", () => {
  mainWindow.webContents.send("user-data", JSON.parse(JSON.stringify(appData)));
});

ipcMain.on("external", (event, url) => {
  shell.openExternal(url);
});
