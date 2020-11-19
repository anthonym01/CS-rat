const { remote } = require('electron');//Remote electron module
const main = remote.require('./main'); //acess export functions in main
const { dialog, Menu, MenuItem, shell, systemPreferences, nativeTheme, clipboard } = remote;
const path = require('path');//path
const fs = require('fs');//fil system access

const anchorme = require("anchorme").default; // Converts links in text to clickable links
const wallpaper = require('wallpaper');//get desktop wallpaper

const my_website = 'https://anthonym01.github.io/Portfolio/?contact=me';//My website

//menu for text boxes
const text_box_menu = new Menu.buildFromTemplate([
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'selectAll' },
    { role: 'undo' },
    { role: 'redo' },
]);

//Main body menu
const menu_body = new Menu.buildFromTemplate([
    { label: 'Force refresh UI', click() { maininitalizer() } },
    { type: 'separator' },
    { role: 'reload' },
    { label: 'Contact developer', click() { shell.openExternal(my_website) } },
    { role: 'toggledevtools' },
]);

window.addEventListener('contextmenu', (event) => {//opens menu on auxilery click
    event.preventDefault()
    menu_body.popup({ window: remote.getCurrentWindow() })//popup menu
}, false)

window.addEventListener('load', function () { //window loads
    console.log('Running from:', process.resourcesPath)

    textboxmenu()

    if (localStorage.getItem("TT001_cfg")) {
        config.load()
    } else {
        config.validate()
    }

    UI.initalize()
    maininitalizer()
    manage.initalize()
    table.hilight_engine_go_vroom()
    table.quick_add()

    clocktick()
    setInterval(() => { clocktick() }, 1000)
    setTimeout(() => {
        console.log('Closing loading screen...')
        document.getElementById('Loading').style.display = 'none'
    }, 0)
});

function maininitalizer() {//starter/soft resterter
    table.data_render(); //render data
    manage.render_list()
    manage.render_tables()
    config.properties.changed = false;
    setday()
}

function textboxmenu() {
    //Apply listeners to text boxes
    document.getElementById('name_put').addEventListener('contextmenu', (event) => { popupmenu(event) }, false)
    document.getElementById('wallpaper_pathrepresenter').addEventListener('contextmenu', (event) => { popupmenu(event) }, false)
    document.getElementById('pathrepresenter').addEventListener('contextmenu', (event) => { popupmenu(event) }, false)
    document.getElementById('detail_put').addEventListener('contextmenu', (event) => { popupmenu(event) }, false)

    function popupmenu(event) {
        event.preventDefault()
        event.stopPropagation()
        text_box_menu.popup({ window: remote.getCurrentWindow() })
    }
}

/*  Config file handler    */
let config = {
    data: {
        key: "TT01",
        table_selected: 1,
        table_details: [{ purpose: "table #1", deleted: false, identifier: 1 },],// Details about different tables
        table1_db: [],// Table database
        previous_colors: [],
    },
    properties: {
        tempdata: false,
        monday: false,
        tuesday: false,
        wednsday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        changed: false,
        max: 0,
        min: 24, //Swapped because big brain, big big brain
        overwrite: null,
        called_from_plus: false,
        view: "", //defaults to table
        exit: false,
        startup: true,
        colors_changed: true, //re-render color pannel when this is true
        clocking: false, // is clock ticking
        management: false,
        quimk_start: -1,
        quimk_end: -1,
        quimk_day: null,
        theme: null,
    },
    save: async function () {//Save the config file
        console.table('Configuration is being saved', config.data)
        ToStorageAPI();//save to application storage reguardless incase the file gets removed by the user, because users are kinda dumb
        if (main.get_use_alt_location() == true && typeof (config.data) == 'object') {//save to alternate storage location
            ToFileSystem();
        }

        async function ToFileSystem() {//save config to directory defined by the user
            main.write_object_json_out(main.get_alt_location() + "/TT001_cfg config.json", JSON.stringify(config.data))//hand off writing the file to main process
        }

        async function ToStorageAPI() {//Html5 storage API
            console.log('config saved to application storage')
            localStorage.setItem("TT001_cfg", JSON.stringify(config.data))
        }


    },
    load: function () {//Load the config file
        console.warn('Configuration is being loaded')

        if (main.get_use_alt_location() == true) {//Load from alt location
            //load from alternate storage location
            if (fs.existsSync(main.get_alt_location() + "/TT001_cfg config.json")) {//Directory exists
                var fileout = fs.readFileSync(main.get_alt_location() + "/TT001_cfg config.json", { encoding: 'utf8' })//Read from file with charset utf8
                console.warn('config Loaded from: ', main.get_alt_location(), 'Data from fs read operation: ', fileout)
                fileout = JSON.parse(fileout)//parse the json
                if (fileout.key == "TT01") {//check if file has key
                    config.data = fileout;
                    console.warn('configuration applied from file')
                } else {//no key, not correct file, load from application storage
                    console.warn('The file is not a config file, internal configuration will be used')
                    config.data = JSON.parse(localStorage.getItem("TT001_cfg"))
                }
            } else {//file does not exist, was moved, deleted or is inaccesible
                config.data = JSON.parse(localStorage.getItem("TT001_cfg"))
                alert("file does not exist, was moved, deleted or is otherwise inaccesible, please select a new location to save app data ")
                config.selectlocation();
            }
        } else {//load from application storage
            config.data = JSON.parse(localStorage.getItem("TT001_cfg"))
            console.log('config Loaded from application storage')
        }

        console.table(config.data)
        this.validate()
    },
    validate: function () { //validate configuration file
        console.log('Config is being validated')
        let configisvalid = true

        if (typeof (this.data.backgroundimg) == 'undefined') {
            this.data.backgroundimg = 'default';
            configisvalid = false;
            console.log('"backgroundimg" was found to be invalid and was set to default');
        }
        if (typeof (this.data.link) == 'undefined') {
            this.data.link = true;
            configisvalid = false;
            console.log('"link" was found to be invalid and was set to default');
        }

        if (typeof (this.data.always_on_top) == 'undefined') {
            this.data.always_on_top = false;
            configisvalid = false;
            console.log('"always_on_top" was found to be invalid and was set to default');
        }

        if (typeof (this.data.table1_db) !== 'undefined') {
            if (this.data.table1_db == undefined || null) { //check db existance
                this.data.table1_db = []
                configisvalid = false
                console.log('"Table1_database" was found to be invalid and was set to default')
            } else {
                let i = 0
                let overwrite = []
                let deleted = []
                let detetioncheck = false
                //Construct the data
                while (config.data.table1_db[i] != null || undefined) {
                    console.log('checked state on :', i)
                    if (config.data.table1_db[i].deleted) {
                        deleted.push(config.data.table1_db[i])
                        console.log('State of ', i, ' false')
                        detetioncheck = true
                    } else {
                        overwrite.push(config.data.table1_db[i])
                        console.log('State of ', i, ' true')
                    }
                    i++
                }
                if (detetioncheck) {
                    console.table(deleted)
                    config.data.table1_db = overwrite
                }
            }
        } else {
            this.data.table1_db = [];
            configisvalid = false;
            console.log('"Table1_database" was found to not exist and was set to default');
        }

        if (typeof (this.data.table_details) == 'undefined') {
            this.data.table_details = [{
                purpose: "table #1",
                deleted: false,
                identifier: 1
            }];
            console.log('Table names were not defined!');
            configisvalid = false;
        } else { //Remove deleted Items from the array
            let i = 0
            let overwrite = []
            let deleted = []
            let detetioncheck = false
            //Construct the data
            while (config.data.table_details[i] != null || undefined) {
                console.log('checked state on :', i)
                if (config.data.table_details[i].deleted == true) {
                    deleted.push(config.data.table_details[i])
                    console.log('State of ', i, ' false')
                    detetioncheck = true
                } else {
                    overwrite.push(config.data.table_details[i])
                    console.log('State of ', i, ' true')
                }
                i++
            }
            if (detetioncheck) {
                console.table(deleted)
                config.data.table_details = overwrite;
            }
        }

        if (typeof (this.data.previous_colors) == 'undefined') {
            this.data.previous_colors = [];
            configisvalid = false;
            console.log('"previous_colors" was found to be invalid and was set to default');
        }

        if (typeof (this.data.colorpallet) == 'undefined') {
            this.data.colorpallet = -1;
            configisvalid = false;
            console.log('"colorpallet" was found to be invalid and was set to default');
        }

        if (typeof (this.data.theme) == 'undefined') {
            this.data.theme = "system";
            configisvalid = false;
            console.log('"theme" was found to not exist and was set to default');
        }

        if (typeof (this.data.hilight_engine) == 'undefined') {
            this.data.hilight_engine = true;
            configisvalid = false;
            console.log('"hilight_engine" was found to be invalid and was set to default');
        }

        if (typeof (this.data.empty_rows) == 'undefined') {
            this.data.empty_rows = true;
            configisvalid = false;
            console.log('"empty_rows" was found to be invalid and was set to default');
        }

        if (typeof (this.data.animation) == 'undefined') {
            this.data.animation = true;
            configisvalid = false;
            console.log('"animation" was found to be invalid and was set to default');
        }

        if (typeof (this.data.tiles) == 'undefined') {
            this.data.tiles = false;
            configisvalid = false;
            console.log('"tiles" was found to be invalid and was set to default');
        }

        if (typeof (this.data.previous_colors) == 'undefined') {
            this.data.previous_colors = [];
            console.log('previous_colors were not defined!');
            configisvalid = false;
        } else {
            config.data.previous_colors = Array.from(new Set(config.data.previous_colors)); //remove dublicates; vary comblicated (Sets dont allow duplicates, convert array to new set using "new Set()" then back to array using "Array.from()"")
            //limit to 25
            if (config.data.previous_colors.length > 25) {
                var i = 22; //because reasons
                while (config.data.previous_colors[i] != null || undefined) { //check check check
                    console.error('Removed recent color :', config.data.previous_colors.pop()) //for debugging
                    i++;
                }
            }
        }

        if (!configisvalid) {
            console.log('config was found to be invalid and will be overwritten');
            config.save(); //Save new confog because old config is no longer valid
        } else {
            console.log('config was found to be valid');
        }
    },
    delete: function () {//Wjipe stowage
        localStorage.clear("TT001_cfg")//yeet storage key
        config.usedefault();//use default location
        console.log('config deleted: ')
        console.table(config.data)
        this.validate()
    },
    backup: async function () {//backup configuration to a file
        console.warn('Configuration backup initiated')
        var always_on_top_state = main.checkontop()
        var date = new Date();
        if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if its on, turn it off
        var filepath = dialog.showSaveDialog(remote.getCurrentWindow(), {//electron file save dialogue
            defaultPath: "TT001_cfg backup " + Number(date.getMonth() + 1) + " - " + date.getDate() + " - " + date.getFullYear(),
            buttonLabel: "Save", filters: [{ name: 'JSON', extensions: ['json'] }]
        });

        await filepath.then((filepath) => {//resolve filepath promise
            console.log(filepath)
            if (filepath.canceled == true) {//the file save dialogue was canceled my the user
                console.warn('The file dialogue was canceled by the user')
            } else {
                main.write_object_json_out(filepath.filePath, JSON.stringify(config.data))//hand off writing the file to main process
            }
        }).catch((err) => {//catch error
            alert('An error occured ', err.message);
        }).finally(() => {
            if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if it was on, turn it back on
        })
    },
    restore: async function () {//restore configuration from a file
        console.warn('Configuration restoration initiated')
        var always_on_top_state = main.checkontop()
        if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if its on, turn it off
        dialog.showOpenDialog(remote.getCurrentWindow(), {
            buttonLabel: "open", filters: [
                { name: 'Custom File Type', extensions: ['json'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        }).then((filepath) => {
            console.log(filepath)
            if (filepath.canceled == true) {//diologue ccanceled
                console.log("diologue ccanceled");
            } else {
                fs.readFile(filepath.filePaths[0], 'utf-8', (err, data) => {//load data from file
                    if (err) {
                        alert("An error ocurred reading the file :" + err.message)
                    } else {
                        console.log("The file content is : " + data);
                        var fileout = JSON.parse(data)
                        if (fileout.key == "TT01") {//check if this file is a timetable backup file
                            config.data = fileout
                            config.save();
                            maininitalizer()
                        } else {
                            console.warn(filepath.filePaths[0] + ' is not a backup file')
                        }
                    }
                })
            }
        }).catch((err) => {
            alert('An error occured, ', err)
        }).finally(() => {
            if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if it was on, turn it back on
        })
    },
    selectlocation: async function () {//select location for configuration storage
        console.log('Select config location')
        var always_on_top_state = main.checkontop()
        var alt_location = main.get_alt_location()
        if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if its on, turn it off
        if (alt_location != "" && alt_location != null && typeof (alt_location) == 'string') {
            var path = dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['createDirectory', 'openDirectory'], defaultPath: alt_location })
        } else {
            var path = dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['createDirectory', 'openDirectory'] })
        }

        await path.then((path) => {
            if (path.canceled == true) {//user canceled dialogue
                console.warn('user canceled file dialogue')
            } else {
                console.warn('Alternate configuration path :', path.filePaths[0])

                main.set_use_alt_location(true)
                main.set_alt_location(path.filePaths[0])

                if (fs.existsSync(main.get_alt_location() + "/TT001_cfg config.json")) {//config file already exist there
                    config.load()
                    maininitalizer()
                } else {//no config file exist there
                    config.save();
                }
            }
        }).catch((err) => {
            config.usedefault()
            alert('An error occured ', err.message)
        }).finally(() => {
            if (always_on_top_state == true) { UI.toggle_alwaysontop() }//if it was on, turn it back on
            document.getElementById('pathrepresenter').value = main.get_alt_location(), "Timetableconfig.json"
        })
    },
    usedefault: function () {//use default storage location
        main.set_use_alt_location(false)
        //maininitalizer()
        document.getElementById('pathrepresenter').value = 'application storage'
    },
}

/*  Table generator */
let table = {
    data_render: function () {
        console.log('Table render started')

        //wjipe main cells
        document.querySelectorAll(".jkx").forEach(jkx => {
            jkx.innerHTML = ""
            jkx.style.display = ""
        })

        document.getElementById('day0').style.display = ''
        document.getElementById('day1').style.display = ''
        document.getElementById('day2').style.display = ''
        document.getElementById('day3').style.display = ''
        document.getElementById('day4').style.display = ''
        document.getElementById('day5').style.display = ''
        document.getElementById('day6').style.display = ''
        for (let i = 0; i < 24; i++) { document.getElementById('timerow_' + i).style.display = "" }

        //reset logic
        config.properties.max = 0
        config.properties.min = 24
        config.properties.monday = false
        config.properties.tuesday = false
        config.properties.wednsday = false
        config.properties.thursday = false
        config.properties.friday = false
        config.properties.saturday = false
        config.properties.sunday = false

        var i = 0;
        if (config.data.table1_db[i] == null || undefined) {
            //show first time setup screen
            notify.new('U new here?', 'To start off, click here to add some classes', function () {
                UI.navigate.MANAGE()
                manage.dialogue.open()
            }, 'click to add new class')
        } else {
            var configdatatable1_dblength = config.data.table1_db.length;
            //Get minimum time and maximum time to construct correct height
            for (i = 0; i < configdatatable1_dblength; i++) {
                if (config.data.table1_db[i].deleted != true && config.data.table1_db[i].show == config.data.table_selected) {
                    if (typeof (config.data.table1_db[i].start) && typeof (config.data.table1_db[i].end) === 'string') {
                        let percentage_start = Number(config.data.table1_db[i].start.slice(0, 2) / 1);
                        let percentage_end = Number((config.data.table1_db[i].end.slice(0, 2) / 1) + (config.data.table1_db[i].end.slice(3) / 60));// time as a number eg. "13:50" will be 13.83333333333
                        config.properties.min = Math.min(percentage_start, config.properties.min); //find minimum time in all datu
                        config.properties.max = Math.max(percentage_end, config.properties.max); //find maximum time in all datu
                    } else {
                        console.warn('Bad 24 time tring on: ', config.data.table1_db[i])
                    }
                }
            }
            console.log('Table minimum found to be: ', config.properties.min, ' Table maximum found to be: ', config.properties.max)
            //construct table
            for (i = 0; i < configdatatable1_dblength; i++) {
                console.log('Data run on index :', i);
                if (config.data.table1_db[i].deleted != true && config.data.table1_db[i].show == config.data.table_selected) {
                    build_block_db1(i);
                }
            }
            if (main.get_empty_rows() == false) { validate() } //Strip empty cells form top and bottom and remove empty days
        }
        console.log('Table render Completed');

        function build_block_db1(index) { //Builds timetable from database
            console.log('Building Block :', index);
            //Create the data block
            let tempblock = document.createElement('div');
            tempblock.setAttribute("class", "data_block");

            //populate the block with relivant data
            tempblock.innerHTML = config.data.table1_db[index].name

            //Decide where it does
            let starthraw = -1;
            if (typeof (config.data.table1_db[index].start) == 'string') {
                starthraw = Number(config.data.table1_db[index].start.slice(0, 2));
            }
            let startime = Timerize(config.data.table1_db[index].start);
            let endtime = Timerize(config.data.table1_db[index].end);

            if (config.data.table1_db[index].detail != "" && config.data.table1_db[index].detail != undefined) {
                //info doots
                let doot = document.createElement('div');
                doot.setAttribute('class', 'infodoot');

                //make table in doot to keep things even
                let sub_tab = document.createElement("table");
                let name_tab_row = document.createElement("tr");
                let name_tab_content = document.createElement("th");
                name_tab_content.classList = "nowrap"
                name_tab_content.innerHTML = config.data.table1_db[index].name;
                //name_tab_content.setAttribute("colspan", 2);
                name_tab_row.appendChild(name_tab_content);
                sub_tab.appendChild(name_tab_row);
                doot.appendChild(sub_tab);
                let time_tab_row = document.createElement("tr");
                let time_tab = document.createElement("td");
                time_tab.classList = "nowrap"
                //time processing

                time_tab.innerHTML = startime.hr + ':' + startime.min + ' <small>' + startime.meridian + '</small> - ' + endtime.hr + ':' + endtime.min + ' <small>' + endtime.meridian + '</small>';
                time_tab_row.appendChild(time_tab);
                sub_tab.appendChild(time_tab_row);
                doot.appendChild(sub_tab);
                tempblock.appendChild(doot);

                let detail_row = document.createElement("tr");
                let detail_content = document.createElement("td");
                //let input = 
                detail_content.innerHTML = linkify(config.data.table1_db[index].detail)
                detail_row.appendChild(detail_content);
                sub_tab.appendChild(detail_row);
                doot.appendChild(sub_tab);

                if (starthraw < config.properties.min + 3) { //Set the doot to flip up or down depending on the pannels position
                    doot.style.top = '0vh';
                    doot.style.bottom = 'unset';
                    //doot.style.borderRadius = '1vh 1vh 0vh 0vh;';
                }
            }


            switch (config.data.table1_db[index].day) { //Day decsion
                case 1: //Monday
                    config.properties.monday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('1_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } //less than 10 precision 1
                    else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('1_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } //more than 10 precision 2
                    else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    } //yeet a time error cause that dont exist fam
                    break;
                case 2: //Tuesday
                    config.properties.tuesday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('2_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('2_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                case 3: //Wednsday
                    config.properties.wednsday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('3_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('3_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                case 4:
                    config.properties.thursday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('4_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('4_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                case 5:
                    config.properties.friday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('5_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('5_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                case 6:
                    config.properties.saturday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('6_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('6_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                case 7:
                    config.properties.sunday = true;
                    if (starthraw < 10 && starthraw >= 0) {
                        document.getElementById('7_' + starthraw.toPrecision(1)).appendChild(tempblock)
                    } else if (starthraw >= 10 && starthraw < 24) {
                        document.getElementById('7_' + starthraw.toPrecision(2)).appendChild(tempblock)
                    } else {
                        console.error('Time logic error on index :', index, ' Time code :', starthraw)
                    }
                    break;
                default:
                    console.log('Date positioning error on index: ', index, ' Day code: ', config.data.table1_db[index].day);
            }

            //time to height calculations must be done after render
            setTimeout(() => {
                let blockheight = 100;//default
                if (typeof (config.data.table1_db[index].end) == 'string' && typeof (config.data.table1_db[index].start) == 'string') {
                    blockheight = (Number(config.data.table1_db[index].end.slice(0, 2)) + Number(endtime.min / 60) - Number(config.data.table1_db[index].start.slice(0, 2))) * 100;//1 cell is 1hr under normal conditions
                }
                console.log(config.data.table1_db[index].name, ' is assigned height of :', blockheight, '%');
                tempblock.style.backgroundColor = "hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%," + config.data.table1_db[index].color.light + "%)";

                let blocktop = document.getElementById('live_clock').offsetHeight * Number(startime.min / 60); //gets the height of a cell in pixels and the multiples by minute percentage
                tempblock.style.transform = "translate(-0.5vh," + blocktop + 'px' + ")"
                if (config.data.table1_db[index].color.light < 49) {
                    tempblock.style.color = "white"
                    tempblock.style.textShadow = " 0vh 0vh 1vh black";
                } else {
                    tempblock.style.color = "black"
                    tempblock.style.textShadow = " 0vh 0vh 1vh white";
                }
                tempblock.style.height = 'calc(' + blockheight + '% - ' + blocktop + 'px)';

            }, 100);

            //click action
            tempblock.addEventListener('click', () => {
                console.log('Triggered data cell: ', tempblock);

                if (main.get_tiles() == true) { //show full tile view
                    //place data into overlay
                    tempblock.setAttribute("class", "data_block");//close block reguardless
                    document.getElementById('title_cell').innerText = config.data.table1_db[index].name;
                    switch (config.data.table1_db[index].day) {
                        case 1: day_cell.innerText = "Monday"; break;
                        case 2: day_cell.innerText = "Tuesday"; break;
                        case 3: day_cell.innerText = "Wednesday"; break;
                        case 4: day_cell.innerText = "Thursday"; break;
                        case 5: day_cell.innerText = "Friday"; break;
                        case 6: day_cell.innerText = "Saturday"; break;
                        case 7: day_cell.innerText = "Sunday"; break;
                        default: console.log('Date error on index: ', index, ' Returned value: ', config.data.table1_db[index].day);
                    }
                    if ('detail' in config.data.table1_db[index]) {//if property 'detail' in object
                        document.getElementById('detail_cell').innerHTML = linkify(config.data.table1_db[index].detail)
                    } else {
                        document.getElementById('detail_cell').innerHTML = "No details"
                    }
                    document.getElementById('time_cell').innerHTML = startime.hr + ':' + startime.min + ' <small>' + startime.meridian + '</small> - ' + endtime.hr + ':' + endtime.min + ' <small>' + endtime.meridian + '</small>';
                    document.getElementById('fullscreen_tile').classList = "fullscreen_tile_active"
                    document.getElementById('close_btn').style.backgroundColor = "hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%," + config.data.table1_db[index].color.light + "%)";
                } else {//show the normal card flip out view
                    if (tempblock.classList == 'data_block') {
                        tempblock.setAttribute("class", "data_block_active");
                    } else {
                        tempblock.setAttribute("class", "data_block");
                    }
                }
            });

            let context_menu = new Menu()//context menu
            context_menu.append(new MenuItem({//add edit menu item with edit function
                label: 'edit', click() {
                    manage.dialogue.edit(index)
                    manage.dialogue.open()
                    UI.manage_toggle()
                }
            }))

            tempblock.addEventListener('contextmenu', function (e) {//popup context menu on alt click
                e.stopPropagation();
                e.preventDefault()
                context_menu.popup({ window: remote.getCurrentWindow() })//popup context menu in current window
                console.log('COntext meny on :', tempblock);
            })
            console.log('Block :', index, ' Check complete');
        }

        function validate() {
            //Remove empty days with the bread crums left behing durring the initial render

            console.log('Validating Table');
            let days = 7;
            if (!config.properties.monday) { //remove monday?
                document.getElementById('day1').style.display = 'none'; //Blank the title
                for (i = 0; i < 24; i++) { //Loop to blank the cells associated with that title
                    document.getElementById('1_' + i).style.display = 'none';
                    console.log('Removing Monday time index :', i);
                }
                days--;
            }
            if (!config.properties.tuesday) { //remove tuesday?
                document.getElementById('day2').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('2_' + i).style.display = 'none';
                    console.log('Removing Tuesday time index :', i);
                }
                days--;
            }
            if (!config.properties.wednsday) { //remove wednsday?
                document.getElementById('day3').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('3_' + i).style.display = 'none';
                    console.log('Removing wednsday time index :', i);
                }
                days--;
            }
            if (!config.properties.thursday) { //remove thursday?
                document.getElementById('day4').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('4_' + i).style.display = 'none';
                    console.log('Removing Thursday time index :', i);
                }
                days--;
            }
            if (!config.properties.friday) { //remove friday?
                document.getElementById('day5').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('5_' + i).style.display = 'none';
                    console.log('Removing friday time index :', i);
                }
                days--;
            }
            if (!config.properties.saturday) { //remove saturday?
                document.getElementById('day6').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('6_' + i).style.display = 'none';
                    console.log('Removing saturday time index :', i);
                }
                days--;
            }
            if (!config.properties.sunday) { //remove sunday?
                document.getElementById('day0').style.display = 'none';
                for (i = 0; i < 24; i++) {
                    document.getElementById('7_' + i).style.display = 'none';
                    console.log('Removing sunday time index :', i);
                }
                days--;
            }

            //remove empty time cells
            if (config.data.table1_db.length < 3) { //normalization makes life easier fror small table users
                config.properties.min = config.properties.min - 3;
                config.properties.max = config.properties.max + 3;
                if (config.properties.min < 0) {
                    config.properties.min = 0
                }
                if (config.properties.min > 23) {
                    config.properties.min = 23
                }
            }

            let rows = 24;
            for (i = 0; i < config.properties.min; i++) { //knock out all below minimum start time
                console.log('Called null on row: ', i);
                if (document.getElementById('timerow_' + i)) {
                    document.getElementById('timerow_' + i).style.display = "none";
                }
                rows--;
            }
            for (i = config.properties.max.toPrecision(2); i < 24; i++) { //knock out all above maximum end time
                console.log('Called null on row: ', i);
                if (document.getElementById('timerow_' + i)) {
                    document.getElementById('timerow_' + i).style.display = "none";
                }
                rows--;
            }
            console.log('Time rows found value: ', rows);

            //set font size dependent on rows value
            switch (rows) {
                case 1:
                    document.getElementById('timetable').style.fontSize = '11vh';
                    break;
                case 2:
                    document.getElementById('timetable').style.fontSize = '10vh';
                    break;
                case 3:
                    document.getElementById('timetable').style.fontSize = '9vh';
                    break;
                case 4:
                    document.getElementById('timetable').style.fontSize = '8vh';
                    break;
                case 5:
                    document.getElementById('timetable').style.fontSize = '7vh';
                    break;
                case 6:
                    document.getElementById('timetable').style.fontSize = '6vh';
                    break;
                case 7:
                    document.getElementById('timetable').style.fontSize = '6vh';
                    break;
                case 8:
                    document.getElementById('timetable').style.fontSize = '5vh';
                    break;
                case 9:
                    document.getElementById('timetable').style.fontSize = '3.4vh';
                    break;
                case 10:
                    document.getElementById('timetable').style.fontSize = '4vh';
                    break;
                case 11:
                    document.getElementById('timetable').style.fontSize = '4vh';
                    break;
                case 12:
                    document.getElementById('timetable').style.fontSize = '3vh';
                    break;
                case 13:
                    document.getElementById('timetable').style.fontSize = '3vh';
                    break;
                case 14:
                    document.getElementById('timetable').style.fontSize = '3vh';
                    break;
                case 15:
                    document.getElementById('timetable').style.fontSize = '3vh';
                    break;
                case 16:
                    document.getElementById('timetable').style.fontSize = '3vh';
                    break;
                case 17:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 18:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 19:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 20:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 21:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 22:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 23:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                case 24:
                    document.getElementById('timetable').style.fontSize = '2vh';
                    break;
                default:
                    console.log('Row error, defaulted :', rows);
            }
            if (days == 0 || rows == 0) {
                //Table is empty
                for (i = 0; i < config.data.table_details.length; i++) {
                    if (config.data.table_selected == config.data.table_details[i].identifier) {
                        notify.new(config.data.table_details[i].identifier, 'found no data for this table', 3);
                        break;
                    }
                }
            }
            console.log('Table validated');
            setTimeout(() => {
                console.log('Closing loading screen...')
                document.getElementById('Loading').style.display = 'none'
            }, 0)
            refunctionizelink()
        }
    },
    clock: {
        clock_tick_trigger: null, //setInterval(()=>{table.clock.clock_tick()},1000),
        clock_tick: function () {
            console.log('Clock ticks');
            let date = new Date();
            document.getElementById('live_clock').innerHTML = date.toLocaleTimeString();
            switch (date.getDay()) { //Date switch
                case 0:
                    document.getElementById('day0').style.backgroundColor = 'red';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 1:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = 'red';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 2:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = 'red';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 3:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = 'red';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 4:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = 'red';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 5:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = 'red';
                    document.getElementById('day6').style.backgroundColor = '';
                    break;
                case 6:
                    document.getElementById('day0').style.backgroundColor = '';
                    document.getElementById('day1').style.backgroundColor = '';
                    document.getElementById('day2').style.backgroundColor = '';
                    document.getElementById('day3').style.backgroundColor = '';
                    document.getElementById('day4').style.backgroundColor = '';
                    document.getElementById('day5').style.backgroundColor = '';
                    document.getElementById('day6').style.backgroundColor = 'red';
                    break;
            }
            switch (date.getHours()) { //Hour switch
                case 0:
                    timerow_0.className = 'glowrow';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 1:
                    timerow_0.className = '';
                    timerow_1.className = 'glowrow';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 2:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = 'glowrow';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 3:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = 'glowrow';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 4:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = 'glowrow';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 5:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = 'glowrow';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 6:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = 'glowrow';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 7:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = 'glowrow';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 8:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = 'glowrow';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 9:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = 'glowrow';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 10:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = 'glowrow';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 11:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = 'glowrow';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 12:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = 'glowrow';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 13:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = 'glowrow';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 14:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = 'glowrow';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 15:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = 'glowrow';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 16:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = 'glowrow';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 17:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = 'glowrow';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 18:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = 'glowrow';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 19:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = 'glowrow';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 20:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = 'glowrow';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 21:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = 'glowrow';
                    timerow_22.className = '';
                    timerow_23.className = '';
                    break;
                case 22:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = 'glowrow';
                    timerow_23.className = '';
                    break;
                case 23:
                    timerow_0.className = '';
                    timerow_1.className = '';
                    timerow_2.className = '';
                    timerow_3.className = '';
                    timerow_4.className = '';
                    timerow_5.className = '';
                    timerow_6.className = '';
                    timerow_7.className = '';
                    timerow_8.className = '';
                    timerow_9.className = '';
                    timerow_10.className = '';
                    timerow_11.className = '';
                    timerow_12.className = '';
                    timerow_13.className = '';
                    timerow_14.className = '';
                    timerow_15.className = '';
                    timerow_16.className = '';
                    timerow_17.className = '';
                    timerow_18.className = '';
                    timerow_19.className = '';
                    timerow_20.className = '';
                    timerow_21.className = '';
                    timerow_22.className = '';
                    timerow_23.className = 'glowrow';
                    break;
                default:
                    console.error();
            }
        }
    },
    hilight_engine_go_vroom: function () {
        if (main.get_hilight_engine() == true) {
            console.log('Hilight Query state Checking..');
            let query = document.querySelectorAll(".maincell");
            let i = 0;
            while (query[i] != null || query[i] != undefined) {
                query[i].addEventListener('mouseover', () => { table.engine_spark(event) }, { passive: true });
                i++;
                console.log('Added event listener for hilight_query: ', i);
            }
        }
    },
    engine_spark: function (event) {
        if (main.get_hilight_engine() == true) {
            console.log('Hilight Engine trigger fired on :', event);
            if (!event.target.classList.contains('data_block') && !event.target.classList.contains('data_block_active')) { //check if the cell is a data_block
                if (config.properties.theme == "light") {
                    event.target.style.color = 'black';
                    event.target.style.backgroundColor = 'hsl(' + table.rand.number(360, 0) + ',100%,70%)'; //color the target
                } else {
                    event.target.style.color = 'black';
                    event.target.style.backgroundColor = 'hsl(' + table.rand.number(360, 0) + ',100%,60%)'; //color the target
                }
                setTimeout(() => {
                    event.target.style.backgroundColor = "";
                    event.target.style.color = '';
                }, 1000); //un-color the target
            }
        }
    },
    quick_add: async function () {//quick add context menus
        //menu
        const quick_add_menu = new Menu.buildFromTemplate([
            {
                label: 'Add item here', click() {//Clicks to add new fills time in edit pannel
                    UI.manage_toggle()
                    manage.dialogue.open()
                    document.getElementById('start_time_put').value = config.properties.quimk_start
                    document.getElementById('end_time_put').value = config.properties.quimk_end
                    document.getElementById('day_put').value = config.properties.quimk_day
                    switch (config.properties.quimk_day) {
                        case "0":
                            document.getElementById('day_put_text').innerText = "Sunday";
                            break;
                        case "1":
                            document.getElementById('day_put_text').innerText = "Monday";
                            break;
                        case "2":
                            document.getElementById('day_put_text').innerText = "Tuesday";
                            break;
                        case "3":
                            document.getElementById('day_put_text').innerText = "Wednsday";
                            break;
                        case "4":
                            document.getElementById('day_put_text').innerText = "Thursday";
                            break;
                        case "5":
                            document.getElementById('day_put_text').innerText = "Friday";
                            break;
                        case "6":
                            document.getElementById('day_put_text').innerText = "Saturday";
                            break;
                    }
                }
            },
            { type: 'separator' },
            { label: 'Force refresh UI', click() { maininitalizer() } },
            { type: 'separator' },
            { label: 'Contact developer', click() { shell.openExternal(my_website) } },
            { role: 'toggledevtools' }
        ])

        function quimk_popup(e) {//Popup the menu
            e.preventDefault()
            e.stopPropagation()
            quick_add_menu.popup({ window: remote.getCurrentWindow() })
        }


        //Sunday
        document.getElementById('7_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "7"
        })

        document.getElementById('7_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "7"
        })
        document.getElementById('7_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "7"
        })


        //monday
        document.getElementById('1_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "1"
        })
        document.getElementById('1_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "1"
        })


        //tuesday
        document.getElementById('2_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "2"
        })
        document.getElementById('2_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "2"
        })


        //wednsday
        document.getElementById('3_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "3"
        })
        document.getElementById('3_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "3"
        })


        //thursday
        document.getElementById('4_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "4"
        })
        document.getElementById('4_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "4"
        })



        //friday
        document.getElementById('5_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "5"
        })
        document.getElementById('5_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "5"
        })


        //saturday
        document.getElementById('6_0').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "00:00"
            config.properties.quimk_end = "01:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_1').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "01:00"
            config.properties.quimk_end = "02:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_2').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "02:00"
            config.properties.quimk_end = "03:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_3').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "03:00"
            config.properties.quimk_end = "04:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_4').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "04:00"
            config.properties.quimk_end = "05:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_5').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "05:00"
            config.properties.quimk_end = "06:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_6').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "06:00"
            config.properties.quimk_end = "07:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_7').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "07:00"
            config.properties.quimk_end = "08:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_8').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "08:00"
            config.properties.quimk_end = "09:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_9').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "09:00"
            config.properties.quimk_end = "10:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_10').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "10:00"
            config.properties.quimk_end = "11:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_11').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "11:00"
            config.properties.quimk_end = "12:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_12').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "12:00"
            config.properties.quimk_end = "13:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_13').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "13:00"
            config.properties.quimk_end = "14:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_14').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "14:00"
            config.properties.quimk_end = "15:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_15').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "15:00"
            config.properties.quimk_end = "16:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_16').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "16:00"
            config.properties.quimk_end = "17:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_17').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "17:00"
            config.properties.quimk_end = "18:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_18').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "18:00"
            config.properties.quimk_end = "19:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_19').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "19:00"
            config.properties.quimk_end = "20:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_20').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "20:00"
            config.properties.quimk_end = "21:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_21').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "21:00"
            config.properties.quimk_end = "22:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_22').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "22:00"
            config.properties.quimk_end = "23:00"
            config.properties.quimk_day = "6"
        })
        document.getElementById('6_23').addEventListener('contextmenu', function (e) {
            quimk_popup(e)
            config.properties.quimk_start = "23:00"
            config.properties.quimk_end = "23:59"
            config.properties.quimk_day = "6"
        })

    },
    rand: {
        HEX: function () { return '#' + Math.floor(Math.random() * 16777215).toString(16) },
        RGB: function () { return { RED: this.number(255, 0), GREEN: this.number(255, 0), BLUE: this.number(255, 0) } },
        HSL: function () { return { HUE: this.number(360, 0), SATURATION: this.number(100, 0) + '%', LIGHTENESS: this.number(100, 1) + '%' } },
        number(max, min) { return Math.floor(Math.random() * (max - min + 1)) + min }
    },
}

/*  Data manager    */
let manage = {
    initalize: function () {
        console.log('Manager initializes');
        this.render_list();
        this.render_tables();

        //Set text feilds
        let i = 0;
        while (config.data.table_details[i] != null) {
            if (config.data.table_details[i].identifier == Number(config.data.table_selected) && config.data.table_details[i].deleted != true) {
                document.getElementById('tablemanage_txt').innerText = config.data.table_details[i].purpose;
                document.getElementById('pg_title').innerText = config.data.table_details[i].purpose;
                break;
            } else {
                document.getElementById('tablemanage_txt').innerText = "Homeless tiles";
                document.getElementById('pg_title').innerText = "Homeless tiles";
            }
            i++
        }


        //color sliders initalizer
        document.getElementById('color_put').addEventListener('change', slidecolor)
        document.getElementById('sat_put').addEventListener('change', slidesat)
        document.getElementById('color_put').addEventListener('mousemove', slidecolor)
        document.getElementById('sat_put').addEventListener('mousemove', slidesat)

        function slidecolor() {
            document.getElementById('light_put').style.background = "linear-gradient(90deg, #000000,hsl(" + document.getElementById('color_put').value + "," + document.getElementById('sat_put').value + "%, 50%),#ffffff)";
            document.getElementById('sat_put').style.background = "linear-gradient(90deg, rgb(128, 128, 128),hsl(" + document.getElementById('color_put').value + ", 100%, 50%)";
        }

        function slidesat() {
            document.getElementById('light_put').style.background = "linear-gradient(90deg, #000000,hsl(" + document.getElementById('color_put').value + "," + document.getElementById('sat_put').value + "%, 50%),#ffffff)";
        }
        document.getElementById('view_put').value = config.data.table_selected; //Value to view put
    },
    render_tables: function () {// Puts table button in table manager and titlebar
        console.log('Table management render started');
        clear();

        //Build table managers and table put selector

        i = 0;
        var view_put = document.getElementById('view_put');
        view_put.innerHTML = "";

        while (config.data.table_details[i] != null) {
            if (config.data.table_details[i].deleted != true) {
                buildoption(i);
                renderbar(i);
            }
            i++;
        }

        function buildoption(i) { //build options for 'view_put'
            var option = document.createElement('option');
            option.value = config.data.table_details[i].identifier;
            option.innerHTML = config.data.table_details[i].purpose;
            view_put.appendChild(option);
            if (config.data.table_details[i].identifier == config.data.table_selected) {
                document.getElementById('view_put_text').innerHTML = config.data.table_details[i].purpose;
            }
        }

        //select homeless table (table 0) option
        var option0 = document.createElement('option');
        option0.value = 0
        option0.innerHTML = 'No Table'
        view_put.appendChild(option0);


        //button to select table 0 (homeless table)
        let table0_button = document.createElement('div');
        table0_button.setAttribute("class", "table_bar");
        let titlespan0 = document.createElement('span');
        titlespan0.innerHTML = "Homeless tiles";
        titlespan0.title = "Tiles not associated with any table";
        table0_button.appendChild(titlespan0)
        document.getElementById('tablespace_render').appendChild(table0_button);
        table0_button.addEventListener('click', function () {
            event.stopPropagation()
            config.data.table_selected = 0;
            config.save();
            maininitalizer();
            //config.properties.changed = true
        })

        //Button to add new table
        let new_table_button = document.createElement('div');
        new_table_button.setAttribute("class", "table_bar");
        let titlespan = document.createElement('span');
        titlespan.innerHTML = "Create new table";
        titlespan.title = "Click to create new empty table";
        new_table_button.appendChild(titlespan)
        document.getElementById('tablespace_render').appendChild(new_table_button);
        new_table_button.addEventListener('click', function () {//New table button click
            event.stopPropagation()//stop manager from closing
            let identifier = 1;//starts at 1 becoase 0 is homeless tables
            let i = 0;
            while (config.data.table_details[i] != null) {
                if (config.data.table_details[i].deleted != true) {
                    identifier = Math.max(config.data.table_details[i].identifier, identifier)
                }
                i++
            }
            let newtable = {
                purpose: "new table #" + Number(identifier + 1),
                deleted: false,
                identifier: Number(identifier + 1)
            }
            config.data.table_details.push(newtable);
            config.save();
            console.warn('Indentifier value: ', identifier)
            maininitalizer();
            config.properties.changed = true
        })

        function renderbar(index) {//Builds table buttons in the titlebar
            console.log('Creating actionbutton and title button for :', config.data.table_details[index]);

            let table_button = document.createElement('button');
            if (config.data.table_details[index].identifier == config.data.table_selected) {
                table_button.classList = "table_button_active"
                table_button.addEventListener('click', function () {
                    if (config.properties.changed) {
                        table.data_render()
                    }
                    UI.close_tile()
                    UI.close_setting()
                    UI.close_manage()
                })
            } else {
                table_button.classList = "table_button"
                table_button.addEventListener('click', function () {
                    config.data.table_selected = config.data.table_details[index].identifier
                    document.getElementById('tablemanage_txt').innerText = config.data.table_details[index].purpose;
                    document.getElementById('pg_title').innerText = config.data.table_details[index].purpose;
                    config.save()
                    maininitalizer()
                    config.properties.changed = true
                    UI.close_tile()
                    UI.close_setting()
                    UI.close_manage()
                })
            }
            table_button.innerText = config.data.table_details[index].purpose;
            document.getElementById('titlebar_table_selector').appendChild(table_button)


            //build pseudo menu
            let table_bar = document.createElement('div');
            table_bar.setAttribute("class", "table_bar");
            let titlespan = document.createElement('span');
            titlespan.innerHTML = config.data.table_details[index].purpose;
            let tabmenu = document.createElement('div');
            tabmenu.setAttribute("class", "tabmenu");
            let editbtn = document.createElement('div');
            editbtn.style.display = "block";
            editbtn.setAttribute("class", "tabtion_btn editbtn");
            editbtn.setAttribute("title", "Edit " + config.data.table_details[index].purpose);
            let deletebtn = document.createElement('div');
            deletebtn.style.display = "block";
            deletebtn.setAttribute("class", "tabtion_btn deletebtn");
            deletebtn.setAttribute("title", "Delete " + config.data.table_details[index].purpose);
            let confirmimg = document.createElement('div');
            confirmimg.setAttribute("class", "tabtion_btn confirmimg");
            let cancelimg = document.createElement('div');
            cancelimg.setAttribute("class", "tabtion_btn cancelimg");
            let tab_put = document.createElement('input');
            tab_put.setAttribute("class", "tab_put");


            //inject into document
            tabmenu.appendChild(confirmimg)
            tabmenu.appendChild(cancelimg)
            tabmenu.appendChild(editbtn)
            tabmenu.appendChild(deletebtn)
            table_bar.appendChild(titlespan)
            table_bar.appendChild(tab_put)
            table_bar.appendChild(tabmenu)
            document.getElementById('tablespace_render').appendChild(table_bar);

            //make fucntion
            tab_put.addEventListener('click', function () { event.stopPropagation() }) //stop this event from trigering table select action
            tab_put.addEventListener('contextmenu', function (event) {
                event.preventDefault()
                event.stopPropagation()
                text_box_menu.popup({ window: remote.getCurrentWindow() })
            }, false)

            table_bar.addEventListener('click', function () { //select table fucntion
                console.warn('Table selected by identifier : ', config.data.table_details[index].identifier)
                config.data.table_selected = config.data.table_details[index].identifier;
                document.getElementById('tablemanage_txt').innerText = config.data.table_details[index].purpose;
                document.getElementById('pg_title').innerText = config.data.table_details[index].purpose;
                config.save()
                maininitalizer();
                config.properties.changed = true
            })
            table_bar.addEventListener('mouseover', function () {//show quick action menu
                tabmenu.style.transform = "translate(0, 0)";
            })
            table_bar.addEventListener('mouseout', function () {//hide quick action menu
                if (confirmimg.style.display != "block") {
                    tabmenu.style.transform = "";
                }
            })
            editbtn.addEventListener('click', function () { //edit button is pressed
                event.stopPropagation();
                console.log('Edit called on table name: ' + config.data.table_details[index].purpose)
                confirmimg.setAttribute("title", "Confirm name change")
                cancelimg.setAttribute("title", "Do not change")
                confirmimg.style.display = "block"
                cancelimg.style.display = "block"
                deletebtn.style.display = "none"
                editbtn.style.display = "none"
                tab_put.style.display = "block"
                tab_put.value = config.data.table_details[index].purpose
                setTimeout(() => {
                    tab_put.focus()
                }, 200)
                tab_put.addEventListener('keyup', function (event) {
                    event.stopPropagation()
                    event.preventDefault()
                    if (event.key === 'Enter') {
                        confirmimg.click(); //confirm input
                    } else if (event.key == 'Escape') {
                        cancelimg.click(); //cancel input
                    }
                })
            })
            deletebtn.addEventListener('click', function (e) { //edit button is pressed
                e.stopPropagation();
                console.log('Delete called on table name: ' + config.data.table_details[index].purpose)
                confirmimg.setAttribute("title", "Confirm delete " + config.data.table_details[index].purpose);
                cancelimg.setAttribute("title", "Do not delete " + config.data.table_details[index].purpose);
                confirmimg.style.display = "block"
                cancelimg.style.display = "block"
                deletebtn.style.display = "none"
                editbtn.style.display = "none"
                tab_put.style.display = "none"
            })
            confirmimg.addEventListener('click', function (e) { //cancel button is pressed
                e.stopPropagation();
                console.log('Confirm button pressed')
                //perform confirmation action
                if (tab_put.style.display == "block") {
                    console.log('save action on: ' + config.data.table_details[index])
                    config.data.table_details[index].purpose = tab_put.value;
                } else if (tab_put.style.display == "none") {
                    console.log('delete action')
                    config.data.table_details[index].deleted = true;
                }
                config.save()
                maininitalizer();
                config.properties.changed = true
            })
            cancelimg.addEventListener('click', function () { //cancel button is pressed
                event.stopPropagation();
                console.log('Cancel button pressed')
                confirmimg.style.display = "none"
                cancelimg.style.display = "none"
                deletebtn.style.display = "block"
                editbtn.style.display = "block"
                tab_put.style.display = "none"
            })
        }

        function clear() {//whipe away old things
            document.getElementById('tablespace_render').innerHTML = "";
            document.getElementById('titlebar_table_selector').innerHTML = "";
        }
    },
    render_list: function () {
        console.log('Manager Render starts');
        clear();
        let i = 0;

        //Construct the data
        /*if (config.data.table_details[0] == null) { //there are no tables, everyone is homeless render them all
            while (config.data.table1_db[i] != null || undefined) { //render selected tables data
                console.log('Data run on index :', i);
                build_bar_db1(i);
                i++;
            }
        } else {*/
        while (config.data.table1_db[i] != null || undefined) { //render selected tables data
            console.log('Data run on index :', i);
            if (config.data.table1_db[i].show == config.data.table_selected) {
                build_bar_db1(i);
            }
            i++;
        }
        i = 0;
        while (config.data.table1_db[i] != null || undefined) { //render non-selected tables data
            console.log('Data run on index :', i);
            if (config.data.table1_db[i].show != config.data.table_selected) {
                build_bar_db1(i);
            }
            i++;
        }
        //}
        console.log('Manager Render Completed');

        function build_bar_db1(index) { //Builds timetable from database
            //check if block is homeless (has no table or its tables been deleted)
            let i = 0
            let homeless = true
            while (config.data.table_details[i] != null) {
                if (config.data.table_details[i].identifier == config.data.table1_db[index].show && config.data.table_details[i].deleted != true) {//compare this instence to indentifiers of other tables
                    homeless = false
                }
                i++;
            }
            if (homeless) {//ya bois homeless, put him in the homeless table
                config.data.table1_db[index].show = 0;
            }
            //Create the data block
            console.log('Building Bar: ', index);
            let tempblock = document.createElement('div');
            tempblock.title = "Click to edit";
            tempblock.setAttribute("class", "data_bar");

            //assign a color
            if (config.data.table1_db[index].color.light == 0 || config.data.table1_db[index].color.light == 100) {
                if (config.properties.theme == 'dark') {//force border light
                    tempblock.style.borderColor = "hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%, 100%)";
                } else {//force border dark
                    tempblock.style.borderColor = "hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%, 0%)";
                }
            } else {
                tempblock.style.borderColor = "hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%," + config.data.table1_db[index].color.light + "%)";
            }
            tempblock.style.boxShadow = "0vh 0vh 0.5vh 0vh hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%," + config.data.table1_db[index].color.light + "%)";

            //build menu
            let sub_optionbar = document.createElement('div');
            sub_optionbar.setAttribute("class", "sub_optionbar");
            let editbtn = document.createElement('div');
            editbtn.setAttribute("class", "optionbutton editbtn");
            editbtn.setAttribute("title", "edit");
            let deletebtn = document.createElement('div');
            deletebtn.setAttribute("class", "optionbutton deletebtn");
            deletebtn.setAttribute("title", "delete");

            sub_optionbar.appendChild(editbtn)
            sub_optionbar.appendChild(deletebtn)
            tempblock.appendChild(sub_optionbar)

            let day;
            switch (config.data.table1_db[index].day) {
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
                    break;
                case 7:
                    day = "Sunday";
                    break;
                default:
                    console.log('Date error on index: ', index, ' Returned value: ', config.data.table1_db[index].day);
            }
            if (config.data.table1_db[index].deleted) { //Check deleted state
                //populate the block with relivant data
                tempblock.innerHTML = config.data.table1_db[index].name + '<br> Marked for delete, Click to undo';
                tempblock.setAttribute("class", "data_bar");
                if (config.data.table1_db[index].color.light == 0 || config.data.table1_db[index].color.light == 100) {
                    if (config.properties.theme == 'dark') {//force border light
                        tempblock.style.border = "0.5vh dashed hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%, 100%)";
                    } else {//force border dark
                        tempblock.style.border = "0.5vh dashed hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%, 0%)";
                    }
                } else {
                    tempblock.style.border = "0.5vh dashed hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%," + config.data.table1_db[index].color.light + "%)";
                }
                //alow editing function
                tempblock.setAttribute('id', 'bar_' + index);
                tempblock.addEventListener('click', function () {
                    config.data.table1_db[index].deleted = false;
                    config.save();
                    manage.render_list();
                    config.properties.changed = true
                }); //un-"delete"
            } else {
                //populate the block with relivant data
                //make table in tempblock to keep things even
                let sub_tab = document.createElement("table");
                let name_tab_row = document.createElement("tr");
                let name_tab_content = document.createElement("th");
                name_tab_content.innerHTML = config.data.table1_db[index].name;
                name_tab_content.setAttribute("colspan", 2);
                name_tab_row.appendChild(name_tab_content);
                sub_tab.appendChild(name_tab_row);
                tempblock.appendChild(sub_tab);
                let day_tab_row = document.createElement("tr");
                let day_tab_content = document.createElement("td");
                day_tab_content.innerHTML = day;
                day_tab_content.setAttribute("colspan", 2);
                day_tab_row.appendChild(day_tab_content);
                sub_tab.appendChild(day_tab_row);
                tempblock.appendChild(sub_tab);
                let time_tab_row = document.createElement("tr");
                let time_tab = document.createElement("td");
                time_tab.setAttribute("colspan", 2);
                let startime = Timerize(config.data.table1_db[index].start);
                let endtime = Timerize(config.data.table1_db[index].end);
                time_tab.innerHTML = startime.hr + ':' + startime.min + ' <small>' + startime.meridian + '</small> - ' + endtime.hr + ':' + endtime.min + ' <small>' + endtime.meridian + '</small>';
                time_tab_row.appendChild(time_tab);
                sub_tab.appendChild(time_tab_row);
                tempblock.appendChild(sub_tab);
                //allow editing function
                tempblock.setAttribute('id', 'bar_' + index);
                tempblock.addEventListener('click', function () {
                    event.stopPropagation()
                    manage.dialogue.edit(index)
                }); //Edit btn
                editbtn.addEventListener('click', function () {
                    event.stopPropagation()
                    manage.dialogue.edit(index)
                }); //Edit btn
                deletebtn.addEventListener('click', function () {
                    event.stopPropagation()
                    config.data.table1_db[index].deleted = true
                    config.save()
                    manage.render_list()
                    config.properties.changed = true
                })

                let context_menu = new Menu()
                context_menu.append(new MenuItem({
                    label: 'edit', click() {
                        manage.dialogue.edit(index)
                        manage.dialogue.open()
                    }
                }))
                context_menu.append(new MenuItem({
                    label: 'delete', click() {
                        config.data.table1_db[index].deleted = true
                        config.properties.changed = true;
                        config.save()
                        manage.render_list()
                    }
                }))
                context_menu.append(new MenuItem({ type: 'separator' }))
                context_menu.append(new MenuItem({//duplicates this entry
                    label: 'Duplicate', click() {
                        config.data.table1_db.push(JSON.parse(JSON.stringify(config.data.table1_db[index])))//removes the events attached
                        config.properties.changed = true;
                        config.save()
                        manage.render_list()
                    }
                }))

                tempblock.addEventListener('contextmenu', function (e) {//Popup contect meny on alt_click
                    e.stopPropagation()
                    e.preventDefault()
                    context_menu.popup({ window: remote.getCurrentWindow() })
                    console.log('COntext meny on :', tempblock);
                })
            }
            let noot = document.createElement('div');
            if (config.data.table1_db[index].show == 0) { // this dataset is homeless
                noot.innerHTML = '<del>Not in a table</del>';
                noot.style.color = 'red';
            } //noot is hidden
            else {
                let i = 0;
                while (config.data.table_details[i] != null) {
                    if (config.data.table_details[i].identifier == Number(config.data.table1_db[index].show) && config.data.table_details[i].deleted != true) {
                        noot.innerHTML = config.data.table_details[i].purpose;
                        break;
                    }
                    i++
                }
            } //not gets a number
            noot.setAttribute('class', 'data_noot');
            tempblock.appendChild(noot)
            document.getElementById('manage_dataspace').appendChild(tempblock); //put the bar into the dukument
            console.log('Bar: ', index, ' Complete');
        }

        function clear() {
            console.log('manage_dataspace clear called');
            document.getElementById('manage_dataspace').innerHTML = '';
        }
    },
    dialogue: {
        edit: function (index) { //Does not edit anything, only populates feilds in the editor with data, listener found in manage.data.build_bar_db1();
            console.log('Dialogue Edit called on index: ', index);

            config.properties.overwrite = index; //Set overwrtite so save function knows to do
            document.getElementById('day_put').value = config.data.table1_db[index].day; //set day feild
            switch (config.data.table1_db[index].day) {
                case 0: document.getElementById('day_put_text').innerText = "Sunday"; break;
                case 1: document.getElementById('day_put_text').innerText = "Monday"; break;
                case 2: document.getElementById('day_put_text').innerText = "Tuesday"; break;
                case 3: document.getElementById('day_put_text').innerText = "Wednsday"; break;
                case 4: document.getElementById('day_put_text').innerText = "Thursday"; break;
                case 5: document.getElementById('day_put_text').innerText = "Friday"; break;
                case 6: document.getElementById('day_put_text').innerText = "Saturday"; break;
            }
            document.getElementById('color_put').value = config.data.table1_db[index].color.hue; //set color feild
            document.getElementById('light_put').value = config.data.table1_db[index].color.light; //set color feild
            document.getElementById('sat_put').value = config.data.table1_db[index].color.sat; //set color feild
            document.getElementById('light_put').style.background = "linear-gradient(90deg, #000000,hsl(" + config.data.table1_db[index].color.hue + "," + config.data.table1_db[index].color.sat + "%, 50%),#ffffff)";
            document.getElementById('sat_put').style.background = "linear-gradient(90deg, rgb(128, 128, 128),hsl(" + config.data.table1_db[index].color.hue + ", 100%, 50%)";
            document.getElementById('detail_put').value = config.data.table1_db[index].detail; //set detail
            document.getElementById('name_put').value = config.data.table1_db[index].name; //Set Name feild

            document.getElementById('start_time_put').value = config.data.table1_db[index].start //Set start time feild
            document.getElementById('end_time_put').value = config.data.table1_db[index].end //Set the end time feild
            document.getElementById('view_put').value = config.data.table1_db[index].show //Set view state feild
            for (i = 0; i < config.data.table_details.length; i++) {
                if (config.data.table_details[i].deleted != true && config.data.table1_db[index].show == config.data.table_details[i].identifier) {
                    document.getElementById('view_put_text').innerText = config.data.table_details[i].purpose;
                    break;
                }
            }
            this.open() //Open after
        },
        open: function () { //The listener for the add open btn is in manage.render_list() 
            console.log('Dialogue open called');

            //other stuff
            document.getElementById('manage_dataspace').classList = "dataspace_compact"; //switch dataspace to compact view


            if (config.properties.overwrite == null) {
                document.getElementById('savepluss_btn').style.display = 'block';
                document.getElementById('delete_btn').style.display = 'none';
                document.getElementById('data_title').innerHTML = 'New Entry';
                setTimeout(() => {
                    document.getElementById('name_put').focus()
                }, 500)
            } else {
                document.getElementById('savepluss_btn').style.display = 'none';
                document.getElementById('delete_btn').style.display = 'block';
                document.getElementById('data_title').innerHTML = 'Edit ' + config.data.table1_db[config.properties.overwrite].name;
            }
            document.getElementById('name_put').style.border = "";
            document.getElementById('start_time_put').style.border = "";
            document.getElementById('end_time_put').style.border = "";
            if (main.get_animation() == true) {
                document.getElementById('dataentry_screen').style.transform = "translate(0,100%)"; //strange bug, setting this in css causes the buttons to glitch out
                document.getElementById('dataentry_screen').style.display = "block";
                setTimeout(() => {
                    document.getElementById('dataentry_screen').style.transform = "initial";
                    setTimeout(() => {
                        document.getElementById('btn_bar').style.display = "flex";
                    }, 210);
                }, 0);
            } else {
                document.getElementById('dataentry_screen').style.transform = "initial";
                document.getElementById('btn_bar').style.display = "flex";
                document.getElementById('dataentry_screen').style.display = "block";
            }
            if (config.properties.colors_changed == true) { // render recent colors
                if (config.data.previous_colors[0] != null) {
                    document.getElementById('recent_colors').innerHTML = "";
                    var index = config.data.previous_colors.length - 1;
                    while (config.data.previous_colors[index] != null) {
                        render_color(index);
                        index--;
                    }
                    config.properties.colors_changed = false;
                } else {
                    document.getElementById('recent_colors').innerHTML = "Recent Colors";
                }
            }

            function render_color(index) {
                console.log('Rendering recent color :', config.data.previous_colors[index], ', index:', index);
                var color_doot = document.createElement("div");
                color_doot.setAttribute("class", "color_doot");
                color_doot.style.backgroundColor = "hsl(" + config.data.previous_colors[index].hue + "," + config.data.previous_colors[index].sat + "%," + config.data.previous_colors[index].light + "%)";
                document.getElementById('recent_colors').appendChild(color_doot);
                color_doot.addEventListener('click', function () {
                    document.getElementById('color_put').value = config.data.previous_colors[index].hue;
                    document.getElementById('sat_put').value = config.data.previous_colors[index].sat;
                    document.getElementById('light_put').value = config.data.previous_colors[index].light;
                    //sets slider colors
                    document.getElementById('light_put').style.background = "linear-gradient(90deg, #000000,hsl(" + config.data.previous_colors[index].hue + "," + config.data.previous_colors[index].sat + "%, 50%),#ffffff)";
                    document.getElementById('sat_put').style.background = "linear-gradient(90deg, rgb(128, 128, 128),hsl(" + config.data.previous_colors[index].hue + ", 100%, 50%)";
                    console.warn('Pushed recent color: ', config.data.previous_colors[index])
                });
            }
        },
        clear: function () { //clear the input and remove the input screen
            console.log('Dialogue clear called')
            document.getElementById('detail_put').value = "";
            document.getElementById('name_put').value = "";
            document.getElementById('start_time_put').value = "";
            document.getElementById('end_time_put').value = "";
            document.getElementById('view_put').validate = 1;
        },
        close: function () { //remove the input screen
            document.getElementById('manage_dataspace').classList = "dataspace";
            console.log('Dialogue close called');
            if (main.get_animation() == true) {
                document.getElementById('dataentry_screen').style.transform = "translate(0,100%)"; //strange bug, setting this in css causes the buttons to glitch out
                setTimeout(() => {
                    document.getElementById('dataentry_screen').style.display = "none";
                }, 205);
            } else {
                document.getElementById('dataentry_screen').style.display = "none";
                document.getElementById('btn_bar').style.display = "none";
            }
        },
        save: function () {
            console.log('Dialogue save called');
            let tempentry = {
                show: true,
                day: null,
                name: null,
                detail: null,
                color: {
                    hue: null,
                    sat: null,
                    light: null
                },
                start: null,
                end: null,
            }; //Its test data
            let entryisvalid = true;

            //get day select, no validation, because default is valid
            tempentry.day = Number(document.getElementById('day_put').value);

            //get color select, no validation, because default is valid
            tempentry.color.hue = Number(document.getElementById('color_put').value);
            tempentry.color.sat = Number(document.getElementById('sat_put').value);
            tempentry.color.light = Number(document.getElementById('light_put').value);
            config.data.previous_colors.push(tempentry.color);
            config.properties.colors_changed = true;
            tempentry.detail = document.getElementById('detail_put').value;

            //Get Name feild
            tempentry.name = document.getElementById('name_put').value;
            if (tempentry.name == "" || undefined || null) {
                entryisvalid = false;
                document.getElementById('name_put').style.border = "0.3vh solid #ff0000";
                notify.new('HEY!', 'Please Enter a name');
            } else {
                document.getElementById('name_put').style.border = "";
                console.log('Name detected: ', tempentry.name);
            }

            //Process time
            let start_time_raw = document.getElementById('start_time_put').value;
            let end_time_raw = document.getElementById('end_time_put').value;
            let percentage_start = Number((start_time_raw.slice(0, 2) / 1 /*divide it by 1 becasue the v8 engine is drunk*/) + (start_time_raw.slice(3) / 60));// time as a number eg. "12:30" will be 12.5
            let percentage_end = Number((end_time_raw.slice(0, 2) / 1 /*divide it by 1 becasue the v8 engine is drunk*/) + (end_time_raw.slice(3) / 60));// time as a number eg. "13:50" will be 13.83333333333
            console.log('percent start: ', percentage_start, ' percent end', percentage_end)
            if (start_time_raw == "") {
                notify.new('HEY!', 'Start time cannot be empty');
                document.getElementById('start_time_put').style.border = "0.3vh solid #ff0000";
                entryisvalid = false;
            }
            if (end_time_raw == "") {
                notify.new('HEY!', 'End time cannot be empty');
                document.getElementById('end_time_put').style.border = "0.3vh solid #ff0000";
                entryisvalid = false;
            }
            if (percentage_start == percentage_end) {
                document.getElementById('start_time_put').style.border = "0.3vh solid #ff0000";
                document.getElementById('end_time_put').style.border = "0.3vh solid #ff0000";
                entryisvalid = false;
            } else if (percentage_start > percentage_end) {
                notify.new('Event', 'Class cannot start after it ends');
                document.getElementById('start_time_put').style.border = "0.3vh solid #ff0000";
                document.getElementById('end_time_put').style.border = "0.3vh solid #ff0000";
                entryisvalid = false;
            } else {
                tempentry.start = start_time_raw;
                tempentry.end = end_time_raw;
                document.getElementById('start_time_put').style.border = "";
                document.getElementById('end_time_put').style.border = "";
            }

            //get view state
            tempentry.show = document.getElementById('view_put').value;

            console.table(tempentry);

            if (entryisvalid) {
                if (config.properties.overwrite == null) {
                    config.data.table1_db.push(tempentry);
                    console.log('Entry saved')
                } else {
                    config.data.table1_db[config.properties.overwrite] = tempentry;
                    console.log('Overwrite on index: ', config.properties.overwrite);
                }
                config.save();
                maininitalizer()
                if (config.properties.called_from_plus) {
                    config.properties.called_from_plus = false;
                } else {
                    manage.dialogue.close();
                }
                config.properties.changed = true;
                config.properties.overwrite = null;
            }
            return entryisvalid;
        },
        saveplus: function () {
            console.log('Dialogue savepluss was called');
            config.properties.called_from_plus = true;
            let entryisvalid = manage.dialogue.save();
            if (entryisvalid) {
                notify.new('Confirmation', document.getElementById('name_put').value + ' was saved, U may now add another');
                //no clear function needed, the clearfeild action btns will fufill this task
                manage.dialogue.open();
            }
        },

    }
}

/*  UI trickery */
let UI = {
    initalize: function () {
        console.log('UI Initalize');

        //Path representer

        //esc trigger
        document.body.addEventListener('keyup', function (e) {
            console.log('keycode: ', e.key)
            if (e.key == 'Escape') {//esc key mashed
                if (document.getElementById('dataentry_screen').style.display == "block") {
                    manage.dialogue.close()
                } else if (document.getElementById('manage_view').style.display == "block") {
                    UI.manage_toggle()
                } else if (document.getElementById('setting_view').style.display == "block") {
                    UI.setting_toggle()
                } else if (document.getElementById('fullscreen_tile').classList == "fullscreen_tile_active") {
                    UI.close_tile()
                }
            }

        })
        //Handlers datamanger
        document.getElementById('view_put').addEventListener('change', function () {// on view put change
            setTimeout(() => {
                var vewalue = document.getElementById('view_put').value;
                var i = 0;
                if (vewalue == 0) {
                    document.getElementById('view_put_text').innerHTML = 'No Table'
                } else {
                    while (config.data.table_details[i] != null) {//Loop data brothgar
                        if (config.data.table_details[i].deleted != true && config.data.table_details[i].identifier == vewalue) {//check view put value against saved table details
                            document.getElementById('view_put_text').innerHTML = config.data.table_details[i].purpose
                            break; //found it
                        }
                        i++;
                    }
                }
            }, 50)
        })

        //table manager actions
        document.getElementById('tablemanger').addEventListener('click', function () {
            if (config.properties.management == false) {
                document.getElementById('tablemanger').classList = "tablemanger_active"
                config.properties.management = true
            } else {
                config.properties.management = false
                document.getElementById('tablemanger').classList = "tablemanger"
            }
        })
        document.getElementById('manage_dataspace').addEventListener('click', function () {
            if (config.properties.management == true) {
                config.properties.management = false
                document.getElementById('tablemanger').classList = "tablemanger"
            }
        })
        document.getElementById('tablespace_render').addEventListener('click', function () { event.stopPropagation() })

        //Add new button
        document.getElementById('new_class_button').addEventListener('click', function () {
            manage.dialogue.open();
            console.log('Add new class button clicked')
        }) //add new btn listener

        document.getElementById('cancel_btn').addEventListener('click', () => {
            console.log('Cancel button clicked');
            manage.dialogue.clear();
            manage.dialogue.close();
            config.properties.overwrite = null;
        });
        document.getElementById('save_btn').addEventListener('click', manage.dialogue.save); //Save button
        document.getElementById('savepluss_btn').addEventListener('click', manage.dialogue.saveplus);
        document.getElementById('delete_btn').addEventListener('click', function () {
            console.log('Delete called')
            config.data.table1_db[config.properties.overwrite].deleted = true
            config.properties.changed = true
            manage.dialogue.close()
            manage.dialogue.clear()
            manage.render_list()
            config.save()
        });
        //document.getElementById('erraser').addEventListener('click', manage.dialogue.clear);

        //Initalize day_put selector
        document.getElementById('day_put').value = "1";
        document.getElementById('day_put_text').innerText = "Monday"
        document.getElementById('day_put').addEventListener('change', function () {
            /* Switches dates on change */
            console.log('Day put changed');
            let tmp = document.getElementById('day_put').value;
            switch (tmp) {
                case "1": document.getElementById('day_put_text').innerText = "Monday"; break;
                case "2": document.getElementById('day_put_text').innerText = "Tuesday"; break;
                case "3": document.getElementById('day_put_text').innerText = "Wednsday"; break;
                case "4": document.getElementById('day_put_text').innerText = "Thursday"; break;
                case "5": document.getElementById('day_put_text').innerText = "Friday"; break;
                case "6": document.getElementById('day_put_text').innerText = "Saturday"; break;
                case "7": document.getElementById('day_put_text').innerText = "Sunday"; break;
                default: console.error('Blyat');
            }
        });

        //Set switch positions
        UI.setting.hilight.setpostition();
        UI.setting.animation.setpostition();
        UI.setting.tiles.setpostition();
        UI.setting.Row.setpostition();
        UI.setting.wallpaper.set_wallpaper();
        UI.setting.set_theme();
        UI.setting.frame.setpostition();
        UI.setting.link.setpostition();
        UI.setting.menu.setpostition();

        if (main.get_always_on_top() == true) {
            main.setontop()
            document.getElementById('always_on_top_btn').classList = "statusbtn_active"
        } else {
            main.setnotontop()
        }

        if (main.get_use_alt_location() == true) {
            if (process.platform == 'win32') {
                document.getElementById('pathrepresenter').value = main.get_alt_location() + '\\TT001_cfg config.json'
            } else {
                document.getElementById('pathrepresenter').value = main.get_alt_location() + '/TT001_cfg config.json'
            }

            document.getElementById('pathrepresenter').title = "double click to open"
            document.getElementById('pathrepresenter').addEventListener('dblclick', function () {
                if (process.platform == 'win32') {
                    shell.showItemInFolder(main.get_alt_location() + '\\TT001_cfg config.json')
                } else {
                    shell.showItemInFolder(main.get_alt_location() + '/TT001_cfg config.json')
                }

            })
            document.getElementById('pathrepresenter').readonly = true;//unlock path input
        } else {
            document.getElementById('pathrepresenter').value = "application storage"
            document.getElementById('pathrepresenter').title = "Location where the application data is being stored"
            document.getElementById('pathrepresenter').readonly = true;//unlock path input
        }

        document.getElementById('mainx_btn').addEventListener('click', function () { main.closeapp() })//X button close app

        document.getElementById('maximize_btn').addEventListener('click', UI.minimize_maximize)

        document.getElementById('minimize_btn').addEventListener('click', function () { main.minmize_main_window() })

        document.getElementById('always_on_top_btn').addEventListener('click', UI.toggle_alwaysontop)

        document.getElementById('Setting_btn').addEventListener('click', UI.setting_toggle)
        document.getElementById('Manage_button_btn').addEventListener('click', UI.manage_toggle)

        //Switch triggers
        document.getElementById('hilight_btn').addEventListener('click', UI.setting.hilight.flip)
        document.getElementById('Animations_btn').addEventListener('click', UI.setting.animation.flip)
        document.getElementById('Row_btn').addEventListener('click', UI.setting.Row.flip)
        document.getElementById('tiles_btn').addEventListener('click', UI.setting.tiles.flip)
        document.getElementById('frame_btn').addEventListener('click', UI.setting.frame.flip)
        document.getElementById('link_btn').addEventListener('click', UI.setting.link.flip)
        document.getElementById('menu_btn').addEventListener('click', UI.setting.menu.flip)
        document.getElementById('Clock_btn').addEventListener('click', UI.setting.slideclock.flip)
        document.getElementById('close_btn').addEventListener('click', UI.close_tile)

        document.getElementById('select_btn').addEventListener('click', function () { //Select the configuration location
            config.selectlocation()
            config.properties.changed = true
        })
        document.getElementById('default_btn').addEventListener('click', config.usedefault)
        document.getElementById('backup_btn').addEventListener('click', config.backup)
        document.getElementById('restore_btn').addEventListener('click', config.restore)


        document.getElementById('dark_theme_selection').addEventListener('click', function () {
            main.set_theme("dark");
            UI.setting.set_theme();
            manage.render_list();
        })
        document.getElementById('light_theme_selection').addEventListener('click', function () {
            main.set_theme("light");
            UI.setting.set_theme();
            manage.render_list();
        })
        document.getElementById('system_theme_selection').addEventListener('click', function () {
            main.set_theme("system");
            UI.setting.set_theme();
            manage.render_list();
        })

        //hue selecton buttons
        document.getElementById('hueinverse-selec').addEventListener('click', function () { UI.hue_selec(-1) })
        document.getElementById('hue0-selec').addEventListener('click', function () { UI.hue_selec(0) })
        document.getElementById('hue30-selec').addEventListener('click', function () { UI.hue_selec(30) })
        document.getElementById('hue60-selec').addEventListener('click', function () { UI.hue_selec(60) })
        document.getElementById('hue90-selec').addEventListener('click', function () { UI.hue_selec(90) })
        document.getElementById('hue120-selec').addEventListener('click', function () { UI.hue_selec(120) })
        document.getElementById('hue150-selec').addEventListener('click', function () { UI.hue_selec(150) })
        document.getElementById('hue180-selec').addEventListener('click', function () { UI.hue_selec(180) })
        document.getElementById('hue210-selec').addEventListener('click', function () { UI.hue_selec(210) })
        document.getElementById('hue240-selec').addEventListener('click', function () { UI.hue_selec(240) })
        document.getElementById('hue270-selec').addEventListener('click', function () { UI.hue_selec(270) })
        document.getElementById('hue300-selec').addEventListener('click', function () { UI.hue_selec(300) })
        document.getElementById('hue330-selec').addEventListener('click', function () { UI.hue_selec(330) })

        //wallpaper
        document.getElementById('select_wallpaper_btn').addEventListener('click', UI.setting.wallpaper.select_wallpaper)
        document.getElementById('default_wallpaper_btn').addEventListener('click', function () {
            main.set_backgroundimg("default")
            UI.setting.wallpaper.set_wallpaper()
        })

        document.getElementById('fullscreen_tile').addEventListener('contextmenu', function (e) {
            e.stopPropagation()
            e.preventDefault()
            UI.close_tile()
        })

    },
    hue_selec: function (hue) {
        main.set_colorpallet(hue)
        UI.setting.set_theme();
    },
    toggle_alwaysontop: function () {
        var state = main.togglealways_on_top()
        if (state == true) {
            //is always on top
            document.getElementById('always_on_top_btn').classList = "statusbtn_active"
            main.set_always_on_top(true);
            config.save()
        } else {
            //is not always on top
            document.getElementById('always_on_top_btn').classList = "statusbtn"
            main.set_always_on_top(false);
            config.save()
        }
        console.log('Window always on top :', state);
    },
    setting_toggle: function () {
        UI.close_tile()
        UI.close_manage()
        if (document.getElementById('setting_view').style.display == "block") {
            //close
            document.getElementById('Setting_btn').classList = "statusbtn"
            document.getElementById('setting_view').style.display = ""
            if (config.properties.changed == true) {
                maininitalizer();//Efficiency goes VROOOOM
            }
        } else {
            //open
            document.getElementById('Setting_btn').classList = "statusbtn_active"
            document.getElementById('setting_view').style.display = "block"
            document.getElementById('title_bar').style.top = "0px"
        }
    },
    manage_toggle: function () {
        UI.close_tile()
        UI.close_setting()
        if (document.getElementById('manage_view').style.display == "block") {
            //close
            document.getElementById('Manage_button_btn').classList = "statusbtn"
            document.getElementById('manage_view').style.display = ""
            if (config.properties.changed == true) {
                maininitalizer();//Efficiency goes VROOOOM
            }
        } else {
            //open
            document.getElementById('Manage_button_btn').classList = "statusbtn_active"
            document.getElementById('manage_view').style.display = "block"
            document.getElementById('title_bar').style.top = "0px"
        }
    },
    close_manage: function () {
        document.getElementById('title_bar').style.top = ""
        if (document.getElementById('manage_view').style.display == "block") {
            //close
            document.getElementById('Manage_button_btn').classList = "statusbtn"
            document.getElementById('manage_view').style.display = ""
            document.getElementById('title_bar').style.top = ""
        }
    },
    close_setting: function () {
        document.getElementById('title_bar').style.top = ""
        if (document.getElementById('setting_view').style.display == "block") {
            //close
            document.getElementById('Setting_btn').classList = "statusbtn"
            document.getElementById('setting_view').style.display = ""
            document.getElementById('title_bar').style.top = ""
        }
    },
    close_tile: function () {
        console.log('closed full tile function');
        document.getElementById('fullscreen_tile').classList = "fullscreen_tile"
    },
    minimize_maximize: function () {
        var state = main.maximize_main_window()
        /*if (state == true) {
            //is maximized
            document.getElementById('resise_constraint').style.display = "none"
        } else {
            //is not maximized
            document.getElementById('resise_constraint').style.display = "block"
        }*/
        console.log('Window maximized :', state);
    },
    setting: {
        set_theme: function () {
            console.log('Set theme')
            if (nativeTheme.shouldUseDarkColors == true) {
                document.getElementById('system_pallet').classList = "mincropallet amoled_pallet"
                if (main.get_theme() != "dark" && main.get_theme() != "light") {
                    set_dark()
                    mark_system()
                }
            } else {
                document.getElementById('system_pallet').classList = "mincropallet light_pallet"
                if (main.get_theme() != "dark" && main.get_theme() != "light") {
                    set_light()
                    mark_system()
                }
            }
            if (main.get_theme() == "dark") {
                set_dark()
                document.getElementById('light_selection_put').checked = false;
                document.getElementById('dark_selection_put').checked = true;
                document.getElementById('system_selection_put').checked = false;
            } else if (main.get_theme() == "light") {
                set_light()
                document.getElementById('light_selection_put').checked = true;
                document.getElementById('dark_selection_put').checked = false;
                document.getElementById('system_selection_put').checked = false;
            }

            function mark_system() {
                document.getElementById('light_selection_put').checked = false;
                document.getElementById('dark_selection_put').checked = false;
                document.getElementById('system_selection_put').checked = true;
                nativeTheme.addListener('updated', function () { UI.setting.set_theme() })
            }

            function set_dark() {
                config.properties.theme = 'dark'
                switch (main.get_colorpallet()) {
                    case -1:
                        document.body.classList = "dark";
                        console.log('Dark inverse theme');
                        break;
                    case 0:
                        document.body.classList = "dark _0";
                        console.log('%cdark _0', "color: hsl(0,100%,50%)")
                        break;
                    case 30:
                        document.body.classList = "dark _30";
                        console.log('%cdark _30', "color: hsl(30,100%,50%)");
                        break;
                    case 60:
                        document.body.classList = "dark _60";
                        console.log('%cdark _60', "color: hsl(60,100%,50%)");
                        break;
                    case 90:
                        document.body.classList = "dark _90";
                        console.log('%cdark _90', "color: hsl(90,100%,50%)");
                        break;
                    case 120:
                        document.body.classList = "dark _120";
                        console.log('%cdark _120', "color: hsl(120,100%,50%)");
                        break;
                    case 150:
                        document.body.classList = "dark _150";
                        console.log('%cdark _150', "color: hsl(150,100%,50%)");
                        break;
                    case 180:
                        document.body.classList = "dark _180";
                        console.log('%cdark _180', "color: hsl(180,100%,50%)");
                        break;
                    case 210:
                        document.body.classList = "dark _210";
                        console.log('%cdark _210', "color: hsl(210,100%,50%)");
                        break;
                    case 240:
                        document.body.classList = "dark _240";
                        console.log('%cdark _240', "color: hsl(240,100%,50%)");
                        break;
                    case 270:
                        document.body.classList = "dark _270";
                        console.log('%cdark _270', "color: hsl(270,100%,50%)");
                        break;
                    case 300:
                        document.body.classList = "dark _300";
                        console.log('%cdark _300', "color: hsl(300,100%,50%)");
                        break;
                    case 330:
                        document.body.classList = "dark _330";
                        console.log('%cdark _330', "color: hsl(330,100%,50%)");
                        break;
                    default:
                        console.error('Defaulted color pallet');
                        document.body.classList = "dark";
                        main.set_colorpallet(-1)
                }
            }

            function set_light() {
                config.properties.theme = 'light'
                switch (main.get_colorpallet()) {
                    case -1:
                        document.body.classList = "light";
                        console.log('light inverse theme');
                        break;
                    case 0:
                        document.body.classList = "light _0";
                        console.log('%clight_0', "color: hsl(0,100%,50%)")
                        break;
                    case 30:
                        document.body.classList = "light _30";
                        console.log('%clight_30', "color: hsl(30,100%,50%)");
                        break;
                    case 60:
                        document.body.classList = "light _60";
                        console.log('%clight_60', "color: hsl(60,100%,50%)");
                        break;
                    case 90:
                        document.body.classList = "light _90";
                        console.log('%clight_90', "color: hsl(90,100%,50%)");
                        break;
                    case 120:
                        document.body.classList = "light _120";
                        console.log('%clight_120', "color: hsl(120,100%,50%)");
                        break;
                    case 150:
                        document.body.classList = "light _150";
                        console.log('%clight_150', "color: hsl(150,100%,50%)");
                        break;
                    case 180:
                        document.body.classList = "light _180";
                        console.log('%clight_180', "color: hsl(180,100%,50%)");
                        break;
                    case 210:
                        document.body.classList = "light _210";
                        console.log('%clight_210', "color: hsl(210,100%,50%)");
                        break;
                    case 240:
                        document.body.classList = "light _240";
                        console.log('%clight_240', "color: hsl(240,100%,50%)");
                        break;
                    case 270:
                        document.body.classList = "light _270";
                        console.log('%clight_270', "color: hsl(270,100%,50%)");
                        break;
                    case 300:
                        document.body.classList = "light _300";
                        console.log('%clight_300', "color: hsl(300,100%,50%)");
                        break;
                    case 330:
                        document.body.classList = "light _330";
                        console.log('%clight_330', "color: hsl(330,100%,50%)");
                        break;
                    default:
                        console.error('Defaulted color pallet');
                        document.body.classList = "light";
                        main.set_colorpallet(-1)
                }
            }
        },
        hilight: {
            flip: function () {
                console.log('switch triggered');
                if (main.get_hilight_engine()) {
                    //turn off the switch
                    main.set_hilight_engine(false)
                    console.log('hilights dissabled');
                } else {
                    //turn on the witch
                    main.set_hilight_engine(true)
                    table.hilight_engine_go_vroom();
                    console.log('hilights enabled');
                    //table.hilight_engine_go_vroom();
                }
                config.save();
                UI.setting.hilight.setpostition();
            },
            setpostition: function () {
                if (main.get_hilight_engine() == true) {
                    document.getElementById('hilight_switch_container').className = 'switch_container_active';
                } else {
                    document.getElementById('hilight_switch_container').className = 'switch_container_dissabled';
                }
            },
        },
        animation: {
            flip: function () {
                console.log('animation switch triggered');
                if (process.platform != "linux" && systemPreferences.getAnimationSettings().shouldRenderRichAnimation == false) {//animations preffered OFF by system
                    main.set_animation(false)
                    notify.new('System', 'Animations dissabled by Your Systems animation preferences');
                } else {
                    if (main.get_animation() == true) {
                        //turn off the switch
                        main.set_animation(false)
                        console.warn('animations dissabled');
                    } else {
                        //turn on the witch
                        main.set_animation(true)
                        console.warn('animations enabled');
                    }
                }

                config.save();
                UI.setting.animation.setpostition();
            },
            setpostition: function () {
                switch (process.platform) {
                    case "linux"://Linux && free BSD
                        if (main.get_animation() == true) {
                            document.getElementById('Animations_switch_container').className = 'switch_container_active';
                            document.getElementById('nomation_box').innerText = ""
                        } else {
                            document.getElementById('Animations_switch_container').className = 'switch_container_dissabled';
                            document.getElementById('nomation_box').innerText = "*{transition: none !important;animation: none !important;}"
                        }
                        break;
                    default://Mac OS && windows
                        if (systemPreferences.getAnimationSettings().shouldRenderRichAnimation == true) {//animations preffered by system only works on windows and wackOS
                            if (main.get_animation() == true) {
                                document.getElementById('Animations_switch_container').className = 'switch_container_active';
                                document.getElementById('nomation_box').innerText = ""
                            } else {
                                document.getElementById('Animations_switch_container').className = 'switch_container_dissabled';
                                document.getElementById('nomation_box').innerText = "*{transition: none !important;animation: none !important;}"
                            }
                        } else {//system preffers no animations
                            document.getElementById('Animations_switch_container').className = 'switch_container_dissabled';
                            document.getElementById('nomation_box').innerText = "*{transition: none !important;animation: none !important;}"
                        }
                }
            },
        },
        tiles: {
            flip: function () {
                console.log('tiles switch triggered');
                if (main.get_tiles() == true) {
                    //turn off the switch
                    main.set_tiles(false);
                    console.warn('tiles dissabled');
                } else {
                    //turn on the witch
                    main.set_tiles(true);
                    console.warn('tiles enabled');
                }
                config.save();
                UI.setting.tiles.setpostition();
            },
            setpostition: function () {
                if (main.get_tiles() == true) {
                    document.getElementById('tiles_switch_container').className = 'switch_container_active';
                } else {
                    document.getElementById('tiles_switch_container').className = 'switch_container_dissabled';
                }
            },
        },
        Row: {
            flip: function () {
                console.log('Row switch triggered');
                if (main.get_empty_rows() == true) {
                    //turn off the switch
                    main.set_empty_rows(false);
                    console.warn('Empty Rows dissabled');
                    config.properties.changed = true;
                } else {
                    //turn on the witch
                    main.set_empty_rows(true);
                    console.warn('Empty Rows Enabled');
                    config.properties.changed = true;
                }
                config.save();
                UI.setting.Row.setpostition();
            },
            setpostition: function () {
                if (main.get_empty_rows() == true) {
                    document.getElementById('Row_switch_container').className = 'switch_container_active';
                } else {
                    document.getElementById('Row_switch_container').className = 'switch_container_dissabled';
                }
            },
        },
        frame: {
            flip: function () {
                console.log('frame switch triggered');
                var framestate = main.framestate()
                if (process.platform == 'linux') {
                    notify.new('Frame', 'app must restart')
                    setTimeout(() => {
                        if (framestate == true) {
                            //turn off the switch
                            main.setframe(false)
                        } else {
                            //turn on the witch
                            main.setframe(true)
                        }
                    }, 1500)
                } else {
                    if (framestate == true) {
                        //turn off the switch
                        main.setframe(false)
                    } else {
                        //turn on the witch
                        main.setframe(true)
                    }
                }
            },
            setpostition: function () {
                if (main.framestate() == true) {
                    document.getElementById('title_bar').classList = "title_bar"
                    document.getElementById('manage_view').classList = "view_framless"
                    document.getElementById('setting_view').classList = "view_framless"
                    document.getElementById('table1').classList = "view"
                    document.getElementById('frame_switch_container').className = 'switch_container_dissabled';
                    document.getElementById('menu_btn').style.display = "block"
                } else {
                    document.getElementById('title_bar').classList = "title_bar_frameless"
                    document.getElementById('manage_view').classList = "view_framless"
                    document.getElementById('setting_view').classList = "view_framless"
                    document.getElementById('table1').classList = "view_framless"
                    document.getElementById('frame_switch_container').className = 'switch_container_active';
                    document.getElementById('menu_btn').style.display = "none"
                }
            },
        },
        link: {
            flip: function () {
                console.log('link switch triggered');
                if (main.get_link() == true) {
                    //turn off the switch
                    main.set_link(false);
                    console.warn('link state off');
                    config.properties.changed = true;
                } else {
                    //turn on the witch
                    main.set_link(true);
                    console.warn('link state on');
                    config.properties.changed = true;
                }
                config.save();
                UI.setting.link.setpostition();
            },
            setpostition: function () {
                if (main.get_link() == true) {
                    document.getElementById('link_switch_container').className = 'switch_container_dissabled';
                } else {
                    document.getElementById('link_switch_container').className = 'switch_container_active';
                }
            },
        },
        slideclock: {
            flip: function () {
                console.log('slideclock triggered');
                if (main.get_alt_slideclock() == true) {
                    //turn off the switch
                    main.set_alt_slideclock(false);
                } else {
                    //turn on the witch
                    main.set_alt_slideclock(true);
                }
                UI.setting.slideclock.setpostition();
            },
            setpostition: function () {
                if (main.get_alt_slideclock() == true) {
                    document.getElementById('Clock_switch_container').className = 'switch_container_dissabled';
                    document.getElementById('slideclock').style.display = "none"
                } else {
                    document.getElementById('Clock_switch_container').className = 'switch_container_active';
                    document.getElementById('slideclock').style.display = "block"
                }
            },
        },
        wallpaper: {
            set_wallpaper: async function () {
                var backgroundimg = main.get_backgroundimg()
                if (backgroundimg != null || undefined) {
                    if (backgroundimg == "default") {//Use "Default" wallpaper
                        useDesktop();
                    } else {//use user selected wallpaper
                        useUserSelected();
                    }
                } else {//no wallperper, clear and use css wallpaper
                    useCSS();
                }

                function useCSS() {
                    document.getElementById('timetable').style.backgroundImage = "";
                    document.getElementById('wallpaper_pathrepresenter').value = "default wallpaper";
                }

                function useUserSelected() {
                    //Convert path to form css can understand
                    var resaucepath = process.resourcesPath
                    /*for (i = 0; i <= resaucepath.length; i++) {
                        console.log(resaucepath)*/
                    resaucepath = resaucepath.replaceAll('\\', '/');
                    /*}*/
                    if (fs.existsSync(resaucepath + "/backgroundimg" + backgroundimg.ext) || fs.existsSync(resaucepath + "\\backgroundimg" + backgroundimg.ext)) {
                        //document.getElementById('timetable').style.backgroundImage = "url('C:\\fakepath\\fakeimg.png')";
                        document.getElementById('timetable').style.backgroundImage = "url('" + resaucepath + "/backgroundimg" + backgroundimg.ext + "')";
                        document.getElementById('light_pallet_table').style.backgroundImage = "url('" + resaucepath + "/backgroundimg" + backgroundimg.ext + "')";
                        document.getElementById('dark_pallet_table').style.backgroundImage = "url('" + resaucepath + "/backgroundimg" + backgroundimg.ext + "')";
                        document.getElementById('system_pallet_table').style.backgroundImage = "url('" + resaucepath + "/backgroundimg" + backgroundimg.ext + "')";
                        document.getElementById('wallpaper_pathrepresenter').value = resaucepath + "/backgroundimg" + backgroundimg.ext;
                    } else {
                        useDesktop();
                        notify.new('file error', 'custom Wallpaper file not found')
                    }
                }

                async function useDesktop() {
                    wallpaper.get().then((wallpaperpath) => {//gets desktop wallpaper
                        if (path.parse(wallpaperpath).ext !== undefined) {//check if file is usable
                            //use desktop wallpaper
                            for (i = 0; i <= wallpaperpath.length; i++) { wallpaperpath = wallpaperpath.replace('\\', '/') }

                            //document.getElementById('timetable').style.backgroundImage = "";
                            document.getElementById('timetable').style.backgroundImage = "url('" + wallpaperpath + "')";
                            document.getElementById('light_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                            document.getElementById('dark_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                            document.getElementById('system_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                            document.getElementById('wallpaper_pathrepresenter').value = "Desktop wallpaper";
                        } else {//default to css wallpaper
                            document.getElementById('timetable').style.backgroundImage = "";
                            document.getElementById('wallpaper_pathrepresenter').value = "default wallpaper";
                        }
                    })
                }
            },
            select_wallpaper: async function () {//User selects wallpaper
                dialog.showOpenDialog({//electron async file dialogue
                    buttonLabel: "Select image", filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'jjif', 'bmp'] }, { name: 'All Files', extensions: ['*'] }]//Options for file dialogue
                }).then((filestuff) => {
                    if (filestuff.canceled == true) {//user canceled file dialogue
                        console.log('User canceled file dialogue')
                    } else {
                        var parsed_path = path.parse(filestuff.filePaths[0])
                        var wallpaperpath = filestuff.filePaths[0]
                        if (parsed_path.ext !== undefined) {//check if file is usable
                            for (i = 0; i <= wallpaperpath.length; i++) { wallpaperpath = wallpaperpath.replace('\\', '/') }
                        }
                        switch (process.platform) {
                            case "linux":
                                fs.copyFile(filestuff.filePaths[0], process.resourcesPath + "/backgroundimg" + parsed_path.ext, function () {
                                    console.log('Coppied: ', parsed_path, ' to: ', process.resourcesPath + "/backgroundimg" + parsed_path.ext)
                                    main.set_backgroundimg(parsed_path)
                                    console.log('Set background img as :', parsed_path)
                                    config.save()
                                    setTimeout(() => {
                                        document.getElementById('timetable').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('light_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('dark_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('system_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                    }, 50);
                                })
                                break;
                            default:
                                fs.copyFile(filestuff.filePaths[0], process.resourcesPath + "\\backgroundimg" + parsed_path.ext, function () {
                                    console.log('Coppied: ', parsed_path, ' to: ', process.resourcesPath + "\\backgroundimg" + parsed_path.ext)
                                    main.set_backgroundimg(parsed_path)
                                    console.log('Set background img as :', parsed_path)
                                    config.save()
                                    setTimeout(() => {
                                        document.getElementById('timetable').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('light_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('dark_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                        document.getElementById('system_pallet_table').style.backgroundImage = "url('" + wallpaperpath + "')";
                                    }, 50);
                                })
                        }
                    }
                }).catch((error) => {
                    alert('An error occured, ', error.message)
                })
            },
        },
        menu: {
            flip: function () {
                console.log('menu switch triggered');
                var menustate = main.menustate()
                if (process.platform == 'linux') {
                    notify.new('Menu', 'app must restart')
                    setTimeout(() => {
                        if (menustate == true) {
                            //turn off the switch
                            main.setmenu(false)
                        } else {
                            //turn on the witch
                            main.setmenu(true)
                        }
                    }, 1500)
                } else {
                    if (menustate == true) {
                        //turn off the switch
                        main.setmenu(false)
                    } else {
                        //turn on the witch
                        main.setmenu(true)
                    }
                }
                UI.setting.menu.setpostition()
            },
            setpostition: function () {
                if (main.menustate() == true) {
                    document.getElementById('menu_switch_container').className = 'switch_container_active';
                } else {
                    document.getElementById('menu_switch_container').className = 'switch_container_dissabled';
                }
            },
        }
    },
}

/*  Notification handler  */
let notify = {
    preset_height: 22, //2 more than the height in the css
    previous_type: 1,
    animate_old: true, //turn on and off old notification Animation
    current: 0, //Current is incimented every time theres a new notifyer
    resizecheck: window.addEventListener('resize', () => {
        notify.clearall()
    }),
    new: function (title, body, fx, bdytitle) {
        this.current++; //Inciment the current pisition

        //create the notification holder
        var tempnotif = document.createElement("div"); //create a div
        document.body.appendChild(tempnotif); //Put the div into the body of the page
        tempnotif.setAttribute("id", "notif" + this.current); //set an id to the div

        //create the title
        var tmptitle = document.createElement("div"); //create a div
        tmptitle.setAttribute("class", "title"); //set the class of the div to 'title'
        tempnotif.appendChild(tmptitle); //Put the 'title' div into the 'notification' div from before
        tmptitle.innerHTML = title; //Puts the title text into the 'title' div

        //create the body
        var tmpbdy = document.createElement("div"); //create a div
        tmpbdy.setAttribute("class", "notifbody"); //set the class of the div to 'notifbody'
        tempnotif.appendChild(tmpbdy); //put the 'notifbody' div into the 'notification' div from before
        tmpbdy.innerHTML = body; //puts body text into the 'notifbody' div

        tempnotif.setAttribute("class", "notification_style4"); //set the class of the div to 'notification_style2'

        //Timing effects
        setTimeout(() => {
            tempnotif.style.transform = 'translate(0vw,0vh)'
            //manuver old notifications out of the way
            if (this.animate_old) {
                if (document.getElementById('notif' + Number(this.current - 1))) { //stars at -1 because 1 less than the latest notification
                    document.getElementById('notif' + Number(this.current - 1)).style.transform = 'translate(0vw,-' + this.preset_height + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 2))) {
                    document.getElementById('notif' + Number(this.current - 2)).style.transform = 'translate(0vw,-' + this.preset_height * 2 + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 3))) {
                    document.getElementById('notif' + Number(this.current - 3)).style.transform = 'translate(0vw,-' + this.preset_height * 3 + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 4))) {
                    document.getElementById('notif' + Number(this.current - 4)).style.transform = 'translate(0vw,-' + this.preset_height * 4 + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 5))) {
                    document.getElementById('notif' + Number(this.current - 5)).style.transform = 'translate(0vw,-' + this.preset_height * 5 + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 6))) {
                    document.getElementById('notif' + Number(this.current - 6)).style.transform = 'translate(0vw,-' + this.preset_height * 6 + 'vh)';
                }
                if (document.getElementById('notif' + Number(this.current - 7))) {
                    document.getElementById('notif' + Number(this.current - 7)).style.transform = 'translate(0vw,-' + this.preset_height * 7 + 'vh)';
                }
            }

        }, 50); //Slide into view
        setTimeout(() => {
            tempnotif.style.opacity = '0.0'
        }, 10000); //dissapear
        setTimeout(() => {
            document.body.removeChild(tempnotif);
        }, 11000); //remove from document

        if (typeof (fx) == 'function') { //There is a function, use X button
            tempnotif.addEventListener('click', fx); //asign action to shutter

            //Close button
            var xbutton = document.createElement('div')
            xbutton.setAttribute('class', 'x-button')
            tempnotif.appendChild(xbutton)
            xbutton.title = 'click to dismiss';
            xbutton.addEventListener('click', function () {
                event.stopImmediatePropagation();
                //close app
                setTimeout(() => {
                    tempnotif.style.opacity = '0.0';
                }, 100)
                //yee.style.zIndex = '-999';
                tempnotif.style.transform = 'translate(35vw,0)'
            })

        }
        if (bdytitle != undefined) {
            tempnotif.title = bdytitle
        } else {
            tempnotif.title = 'click to dismiss'
        }
        tempnotif.addEventListener('click', function () { //close regardless of function
            setTimeout(() => {
                this.style.opacity = '0.0';
                this.style.zIndex = '-999';
            }, 100)
            this.style.transform = 'translate(35vw,0)'
        })

    },
    clearall: function () {
        if (document.getElementById('notif' + Number(this.current))) { //nep them from latest going up
            document.getElementById('notif' + Number(this.current)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current)).style.transform = 'translate(0vw,0vh)'
        }
        if (document.getElementById('notif' + Number(this.current - 1))) {
            document.getElementById('notif' + Number(this.current - 1)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 1)).style.transform = 'translate(0vw,0vh)'
        }
        if (document.getElementById('notif' + Number(this.current - 2))) {
            document.getElementById('notif' + Number(this.current - 2)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 2)).style.transform = 'translate(0vw,0vh)'

        }
        if (document.getElementById('notif' + Number(this.current - 3))) {
            document.getElementById('notif' + Number(this.current - 3)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 3)).style.transform = 'translate(0vw,0vh)'

        }
        if (document.getElementById('notif' + Number(this.current - 4))) {
            document.getElementById('notif' + Number(this.current - 4)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 4)).style.transform = 'translate(0vw,0vh)'

        }
        if (document.getElementById('notif' + Number(this.current - 5))) {
            document.getElementById('notif' + Number(this.current - 5)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 5)).style.transform = 'translate(0vw,0vh)'

        }
        if (document.getElementById('notif' + Number(this.current - 6))) {
            document.getElementById('notif' + Number(this.current - 6)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 6)).style.transform = 'translate(0vw,0vh)'

        }
        if (document.getElementById('notif' + Number(this.current - 7))) {
            document.getElementById('notif' + Number(this.current - 7)).style.opacity = '0.0';
            document.getElementById('notif' + Number(this.current - 7)).style.transform = 'translate(0vw,0vh)'

        }
    }
}

function Timerize(timecode) {//takes 24 hr time string "03:24" and converts 12hr to { hr: 3, min: '24', meridian: 'am' } object
    if (typeof (timecode) != 'string') { return { hr: 0, min: '00', meridian: 'bad data' } }

    let meridian;
    let hr = Number(timecode.slice(0, 2));
    let min = timecode.slice(3);
    if (hr > 12) {
        meridian = 'pm';
        hr = hr - 12;
    } else if (hr == 12) {
        meridian = 'pm';
    } else {
        meridian = 'am';
    }
    //console.log('Converted:', timecode, ' to: ', { hr, min, meridian })
    return { hr, min, meridian }
}

function linkify(input) {//use https://github.com/alexcorvi/anchorme.js to linkify links
    return anchorme({//anchorme converts links in text to clickable links
        input,
        // use some options
        options: {
            attributes: {
                target: "_blank",
                class: "detected",
            },
            truncate: function (string) {
                if (string.indexOf("google.com/search?") > -1) {
                    return 40;
                } else if (string.indexOf("github.com/") > -1) {
                    return Infinity;
                } else {
                    return 30;
                }
            },
            middleTruncation: false,
        },
        exclude: string => string.startsWith("file://"),
        protocol: "http://",
        specialTransform: [
            {
                test: /\.img$/,
                transform: string => `<a href="${string}">IMAGE FILE</a>`
            },
            {
                test: /^http:\/\//,
                transform: () => `<a href="${string}">INSECURE URL</a>`
            }
        ],
        // and extensions
        extensions: [
            // an extension for hashtag search
            {
                test: /#(\w|_)+/gi,
                transform: (string) =>
                    `<a href="https://a.b?s=${string.substr(1)}">${string}</a>`,
            },
            // an extension for mentions
            {
                test: /@(\w|_)+/gi,
                transform: (string) =>
                    `<a href="https://a.b/${string.substr(1)}">${string}</a>`,
            },
        ],
    });
}

async function refunctionizelink() {//finds links, changes their default function, and adds a menu to them to open externally or internally
    let lonks = document.querySelectorAll('a');
    var lonk_length = lonks.length;
    for (let i = 0; i < lonk_length; i++) { build_lonk_action(i) }

    function build_lonk_action(i) {
        var lonkihref = lonks[i].href;
        lonks[i].title = lonkihref;
        lonks[i].addEventListener('click', function (e) {
            e.preventDefault()
            e.stopPropagation()
            if (main.get_link() == true) {
                if (lonkihref.contains('file:///')) {
                    shell.openExternal(lonkihref)
                } else { main.secondary_battery(lonkihref) }
            } else { shell.openExternal(lonkihref) }
        });

        lonks[i].addEventListener('contextmenu', function (e) {
            e.preventDefault()
            e.stopPropagation()
            const lonk_menu = new Menu.buildFromTemplate([
                { label: 'open externally', click() { shell.openExternal(lonkihref) } },
                {
                    label: 'open internally', click() {
                        if (lonkihref.contains('file:///')) {
                            shell.openExternal(lonkihref)
                        } else { main.secondary_battery(lonkihref) }
                    }
                },
                { type: 'separator' },
                { label: 'copy', click() { clipboard.writeText(lonkihref) } }
            ])
            lonk_menu.popup({ window: remote.getCurrentWindow() })
        });
    }
}