const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    console.log('Aplicação iniciada');
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });
    //mainWindow.loadURL('https://sapiens.agu.gov.br/')
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});


let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
    if (sobreWindow == null){
       sobreWindow = new BrowserWindow({
            width: 600,
            height: 400,
            alwaysOnTop: true,
            frame: false
        }); 

        sobreWindow.on('closed', () =>{
            sobreWindow = null;
        })
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
})

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
})