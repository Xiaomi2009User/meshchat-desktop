const { app, BrowserWindow, shell, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// Адреса сайту MeshChat. Після деплою замініть на свою.
const SITE_URL = process.env.MESHCHAT_URL || "https://meshchat.example.com";
const SITE_ORIGIN = new URL(SITE_URL).origin;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 540,
    title: "MeshChat",
    backgroundColor: "#0E1012",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadURL(SITE_URL);

  // Усі посилання на інші сайти відкриваються у браузері
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (new URL(url).origin !== SITE_ORIGIN) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

function setupAutoUpdate() {
  autoUpdater.autoDownload = true;
  autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
      type: "info",
      message: "Доступне оновлення MeshChat. Перезапустити зараз?",
      buttons: ["Перезапустити", "Пізніше"],
      defaultId: 0
    }).then((r) => {
      if (r.response === 0) autoUpdater.quitAndInstall();
    });
  });
  autoUpdater.on("error", (err) => console.error("Помилка оновлення:", err));
  autoUpdater.checkForUpdates();
}

app.whenReady().then(() => {
  createWindow();
  if (app.isPackaged) setupAutoUpdate();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
