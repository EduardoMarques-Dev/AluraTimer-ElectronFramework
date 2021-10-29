const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require ('./template')

let tray = null;
let sobreWindow = null;
let mainWindow = null;

app.on('ready', () => {
    //Inicializa Janela Principal
    console.log('Aplicação iniciada');
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });
    //Define URL da Janela Principal (Pode ser um "https://" também)
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    //Configuração do Menu Tray
    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Timer do Alura');

    // // O processo de envio do principal para a view
    // // Necesita que seja especificado a janela 
    // mainWindow.send('curso-trocado');
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('recarregar-tray-meu', ()=>{
    console.log("AMO O BURRO DO SHREK")
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
});


// ipcMain.on('curso-adicionado', (event, nomeCurso)=>{
//     let novoTemplate = templateGenerator.adicionaCursoNoTray(nomeCurso, template);
//     let novoContextMenu = Menu.buildFromTemplate(novoTemplate);
//     tray.setContextMenu(novoContextMenu);
// });

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
    // Define URL da Janela Sobre
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, nomeCurso, tempoEstudado)=>{
    data.salvaDados(nomeCurso, tempoEstudado);
});