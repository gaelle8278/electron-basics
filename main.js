const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    //To attach a preload script to your renderer process, 
    // pass in the path to your preload script to the webPreferences.preload option in the BrowserWindow constructor.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js') //The path.join API joins multiple path segments together, creating a combined path string that works across all platforms.
      }
    })
  
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// run main window
//In Electron, browser windows can only be created after the app module's ready event is fired. 
//You can wait for this event by using the app.whenReady() API. Call createWindow() after whenReady() resolves its Promise.
app.whenReady().then(() => {
    //To attach a preload script to your renderer process, 
    // pass in the path to your preload script to the webPreferences.preload option in the BrowserWindow constructor.
    createWindow()

    //Because windows cannot be created before the ready event, 
    //you should only listen for activate events after your app is initialized.
    // Do this by attaching your event listener from within your existing whenReady() callback.
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

//specific OS beahavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})