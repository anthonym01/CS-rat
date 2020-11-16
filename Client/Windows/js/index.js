const { ipcRenderer, remote } = require('electron');

const main = remote.require('./main');//acess export functions in main
const { dialog, Menu, MenuItem, clipboard } = remote;//Access to electron dependencies
const fs = require('fs');//file system

const text_box_menu = new Menu.buildFromTemplate([//Text box menu (for convinience)
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'selectAll' },
    { role: 'seperator' },
    { role: 'undo' },
    { role: 'redo' },
]);

const menu_body = new Menu.buildFromTemplate([//Main body menu
    { label: 'Restart', click() { maininitalizer() } },
    //{ role: 'reload' },
    { type: 'separator' },
    //{ label: 'Contact developer', click() { shell.openExternal(my_website) } },
    { role: 'toggledevtools' }
]);

window.addEventListener('contextmenu', (e) => {//Body menu attached to window
    e.preventDefault();
    menu_body.popup({ window: remote.getCurrentWindow() })//popup menu
}, false);

window.addEventListener('load', function () {//window loads
    console.log('Running from:', process.resourcesPath)

    //Menu.setApplicationMenu(menu_body)
    maininitalizer()
})

function maininitalizer() {//Used to start re-startable app functions
    console.log('main initalizer')
}
