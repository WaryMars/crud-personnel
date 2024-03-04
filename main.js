const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let newWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Photomaton",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //mainWindow.webContents.openDevTools();
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createNewWindow() {
  newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
    }
  });

  newWindow.loadFile('webcam.html');

  newWindow.on('closed', () => {
    newWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('open-new-window', () => {
  createNewWindow();
});
