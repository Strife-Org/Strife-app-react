const electron = require("electron");
var appData = require("./fileHandler");

const {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  nativeImage,
  Tray,
  Menu,
} = electron;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
let tray;
function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "drawing.png"),
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  const { setup: setupPushReceiver } = require("electron-push-receiver");

  // Call it before 'did-finish-load' with mainWindow a reference to your window
  setupPushReceiver(mainWindow.webContents);

  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  console.log();

  let trayIcon = nativeImage.createFromPath(
    path.join(__dirname, "imgs/LogoColour.png")
  );
  trayIcon = trayIcon.resize({ width: 16, height: 16 });

  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click() {
        mainWindow.show();
      },
    },
    {
      label: "Quit App",
      click() {
        mainWindow.destroy();
      },
    },
  ]);
  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  tray.setToolTip("Strife");
  tray.setContextMenu(contextMenu);
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

ipcMain.on('show-window', () => {
  mainWindow.show();
  mainWindow.focus();
})

ipcMain.on("ready-for-data", () => {
  mainWindow.webContents.send("user-data", JSON.parse(JSON.stringify(appData)));
});

ipcMain.on("external", (event, url) => {
  shell.openExternal(url);
});
