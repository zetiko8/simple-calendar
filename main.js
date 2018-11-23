const electron = require('electron')

const { app, BrowserWindow } = require('electron')

function createWindow () {
  
    win = new BrowserWindow({ width: 1200, height: 800 })

    win.loadFile('index.html')
  
    win.webContents.openDevTools()
  
    win.on('closed', () => {
      win = null
      app.quit();
    })
}


app.on('ready', createWindow)