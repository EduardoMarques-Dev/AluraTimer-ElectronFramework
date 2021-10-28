const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require ('./template')

let tray = null;
let sobreWindow = null;

app.on('ready', () => {
    //Inicializa Janela Principal
    console.log('Aplicação iniciada');
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });
    //Define URL da Janela Principal (Pode ser um "https://" também)
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    //Configuração do Menu Tray
    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let template = templateGenerator.geraTrayTemplate();
    let contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Timer do Alura');
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('abrir-janela-sobre', () => {
    //Inicializa Janela Sobre
    if (sobreWindow == null){
       sobreWindow = new BrowserWindow({
            width: 300,
            height: 200,
            alwaysOnTop: true,
            frame: false
        }); 
    // Define sobre como nulo ao ser fechado
        sobreWindow.on('closed', () =>{
            sobreWindow = null;
        })
    }
    //Define URL da Janela Sobre
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, nomeCurso, tempoEstudado)=>{
    data.salvaDados(nomeCurso, tempoEstudado)
});