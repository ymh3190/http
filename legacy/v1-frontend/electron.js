const { app, BrowserWindow } = require("electron");

app
  .on("ready", () => {
    const screen = {
      // 컴파일 파이 15인치
      cpis150wr: {
        width: 1024,
        height: 768,
      },
      //
      wmppc102: {
        width: 1280,
        height: 800,
      },
    };
    const win = new BrowserWindow({
      width: screen.wmppc102.width,
      height: screen.wmppc102.height,
      fullscreen: true,
      frame: false,
      // kiosk: true,
      // resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    const port = 3000;
    win.setMenu(null);
    win.loadURL(`http://localhost:${port}`);
  })
  .on("window-all-closed", () => {
    app.quit();
  });
