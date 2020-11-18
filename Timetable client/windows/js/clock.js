//hours
const firstofHR = document.getElementById('hr1st');
const secondofHR = document.getElementById('hr2t');
const onesthr1 = document.getElementById('1sthr1');
const onesthr0 = document.getElementById('1sthr0');
const s2ndhr0 = document.getElementById('2ndhr0');
const s2ndhr1 = document.getElementById('2ndhr1');
const s2ndhr2 = document.getElementById('2ndhr2');
const s2ndhr3 = document.getElementById('2ndhr3');
const s2ndhr4 = document.getElementById('2ndhr4');
const s2ndhr5 = document.getElementById('2ndhr5');
const s2ndhr6 = document.getElementById('2ndhr6');
const s2ndhr7 = document.getElementById('2ndhr7');
const s2ndhr8 = document.getElementById('2ndhr8');
const s2ndhr9 = document.getElementById('2ndhr9');
const pm = document.getElementById('pm');
const am = document.getElementById('am');
const maridizer = document.getElementById('maridizer');

//minutes
const firstofmin = document.getElementById('min1st');
const secondofmin = document.getElementById('min2st');
const s1min0 = document.getElementById('1min0');
const s1min1 = document.getElementById('1min1');
const s1min2 = document.getElementById('1min2');
const s1min3 = document.getElementById('1min3');
const s1min4 = document.getElementById('1min4');
const s1min5 = document.getElementById('1min5');
const s2min0 = document.getElementById('2min0');
const s2min1 = document.getElementById('2min1');
const s2min2 = document.getElementById('2min2');
const s2min3 = document.getElementById('2min3');
const s2min4 = document.getElementById('2min4');
const s2min5 = document.getElementById('2min5');
const s2min6 = document.getElementById('2min6');
const s2min7 = document.getElementById('2min7');
const s2min8 = document.getElementById('2min8');
const s2min9 = document.getElementById('2min9');

//seconds
const firstofsec = document.getElementById('sec1st');
const secondofsec = document.getElementById('sec2st');
const s1sec0 = document.getElementById('1sec0');
const s1sec1 = document.getElementById('1sec1');
const s1sec2 = document.getElementById('1sec2');
const s1sec3 = document.getElementById('1sec3');
const s1sec4 = document.getElementById('1sec4');
const s1sec5 = document.getElementById('1sec5');
const s2sec0 = document.getElementById('2sec0');
const s2sec1 = document.getElementById('2sec1');
const s2sec2 = document.getElementById('2sec2');
const s2sec3 = document.getElementById('2sec3');
const s2sec4 = document.getElementById('2sec4');
const s2sec5 = document.getElementById('2sec5');
const s2sec6 = document.getElementById('2sec6');
const s2sec7 = document.getElementById('2sec7');
const s2sec8 = document.getElementById('2sec8');
const s2sec9 = document.getElementById('2sec9');

//Row time
const day_cell = document.getElementById('day_cell');
const timerow_23 = document.getElementById('timerow_23');
const timerow_22 = document.getElementById('timerow_22');
const timerow_21 = document.getElementById('timerow_21');
const timerow_20 = document.getElementById('timerow_20');
const timerow_19 = document.getElementById('timerow_19');
const timerow_18 = document.getElementById('timerow_18');
const timerow_17 = document.getElementById('timerow_17');
const timerow_16 = document.getElementById('timerow_16');
const timerow_15 = document.getElementById('timerow_15');
const timerow_14 = document.getElementById('timerow_14');
const timerow_13 = document.getElementById('timerow_13');
const timerow_12 = document.getElementById('timerow_12');
const timerow_11 = document.getElementById('timerow_11');
const timerow_10 = document.getElementById('timerow_10');
const timerow_9 = document.getElementById('timerow_9');
const timerow_8 = document.getElementById('timerow_8');
const timerow_7 = document.getElementById('timerow_7');
const timerow_6 = document.getElementById('timerow_6');
const timerow_5 = document.getElementById('timerow_5');
const timerow_4 = document.getElementById('timerow_4');
const timerow_3 = document.getElementById('timerow_3');
const timerow_2 = document.getElementById('timerow_2');
const timerow_1 = document.getElementById('timerow_1');
const timerow_0 = document.getElementById('timerow_0');
const live_clock = document.getElementById('live_clock');

const day0 = document.getElementById('day0');
const day1 = document.getElementById('day1');
const day2 = document.getElementById('day2');
const day3 = document.getElementById('day3');
const day4 = document.getElementById('day4');
const day5 = document.getElementById('day5');
const day6 = document.getElementById('day6');

var date;

async function clocktick() {
    date = new Date;

    live_clock.innerHTML = date.toLocaleTimeString();

    //Hours
    switch (date.getHours()) {
        case 0:// 12am
            firstofHR.style.transform = "translatey(-6vw)"
            secondofHR.style.transform = "translatey(-12vw)"
            maridizer.style.transform = "translatey(-0vw)"
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "0.4"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "1"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 1:// 1am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-6vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.7"
            s2ndhr1.style.opacity = "1"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 2:// 2am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-12vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.4"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "1"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 3:// 3am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-18vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.1"
            s2ndhr1.style.opacity = "0.4"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "1"
            s2ndhr4.style.opacity = "0.7"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 4:// 4am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-24vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0.1"
            s2ndhr2.style.opacity = "0.4"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "1"
            s2ndhr5.style.opacity = "0.7"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 5:// 5am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-30vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0.1"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.7"
            s2ndhr5.style.opacity = "1"
            s2ndhr6.style.opacity = "0.7"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 6:// 6am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-36vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0.1"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.7"
            s2ndhr6.style.opacity = "1"
            s2ndhr7.style.opacity = "0.7"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 7:// 7am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-42vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0.1"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.7"
            s2ndhr7.style.opacity = "1"
            s2ndhr8.style.opacity = "0.7"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 8:// 8am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-48vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0"
            s2ndhr5.style.opacity = "0.1"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.7"
            s2ndhr8.style.opacity = "1"
            s2ndhr9.style.opacity = "0.7"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 9:// 9am
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-54vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0"
            s2ndhr5.style.opacity = "0"
            s2ndhr6.style.opacity = "0.1"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.7"
            s2ndhr9.style.opacity = "1"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 10:// 10am
            firstofHR.style.transform = "translatey(-6vw)";
            secondofHR.style.transform = "translatey(-0vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "1"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "0.4"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 11:// 11am
            firstofHR.style.transform = "translatey(-6vw)";
            secondofHR.style.transform = "translatey(-6vw)";
            maridizer.style.transform = "translatey(-0vw)";
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "0.7"
            s2ndhr1.style.opacity = "1"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "1"
            pm.style.opacity = "0.7"
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
        case 12:// 12pm
            firstofHR.style.transform = "translatey(-6vw)";
            secondofHR.style.transform = "translatey(-12vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "0.4"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "1"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 13:// 1pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-6vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.7"
            s2ndhr1.style.opacity = "1"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 14:// 2pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-12vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.4"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "1"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 15:// 3pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-18vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0.1"
            s2ndhr1.style.opacity = "0.4"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "1"
            s2ndhr4.style.opacity = "0.7"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 16:// 4pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-24vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0.1"
            s2ndhr2.style.opacity = "0.4"
            s2ndhr3.style.opacity = "0.7"
            s2ndhr4.style.opacity = "1"
            s2ndhr5.style.opacity = "0.7"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 17:// 5pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-30vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0.1"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.7"
            s2ndhr5.style.opacity = "1"
            s2ndhr6.style.opacity = "0.7"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 18:// 6pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-36vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0.1"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.7"
            s2ndhr6.style.opacity = "1"
            s2ndhr7.style.opacity = "0.7"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 19:// 7pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-42vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0.1"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.7"
            s2ndhr7.style.opacity = "1"
            s2ndhr8.style.opacity = "0.7"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 20:// 8pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-48vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0"
            s2ndhr5.style.opacity = "0.1"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.7"
            s2ndhr8.style.opacity = "1"
            s2ndhr9.style.opacity = "0.7"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 21:// 9pm
            firstofHR.style.transform = "translatey(-0vw)";
            secondofHR.style.transform = "translatey(-54vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "0.7"
            onesthr0.style.opacity = "1"
            s2ndhr0.style.opacity = "0"
            s2ndhr1.style.opacity = "0"
            s2ndhr2.style.opacity = "0"
            s2ndhr3.style.opacity = "0"
            s2ndhr4.style.opacity = "0"
            s2ndhr5.style.opacity = "0"
            s2ndhr6.style.opacity = "0.1"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.7"
            s2ndhr9.style.opacity = "1"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 22:// 10pm
            firstofHR.style.transform = "translatey(-6vw)";
            secondofHR.style.transform = "translatey(-0vw)";
            maridizer.style.transform = "translatey(-6vw)";
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "1"
            s2ndhr1.style.opacity = "0.7"
            s2ndhr2.style.opacity = "0.4"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
        case 23:// 11pm
            firstofHR.style.transform = "translatey(-6vw)"
            secondofHR.style.transform = "translatey(-6vw)"
            maridizer.style.transform = "translatey(-6vw)"
            onesthr1.style.opacity = "1"
            onesthr0.style.opacity = "0.7"
            s2ndhr0.style.opacity = "0.7"
            s2ndhr1.style.opacity = "1"
            s2ndhr2.style.opacity = "0.7"
            s2ndhr3.style.opacity = "0.4"
            s2ndhr4.style.opacity = "0.4"
            s2ndhr5.style.opacity = "0.4"
            s2ndhr6.style.opacity = "0.4"
            s2ndhr7.style.opacity = "0.4"
            s2ndhr8.style.opacity = "0.4"
            s2ndhr9.style.opacity = "0.4"
            am.style.opacity = "0.7"
            pm.style.opacity = "1"
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
            console.error(date);
    }

    //Minutes
    switch (date.getMinutes()) {
        case 0:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 1:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 2:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 3:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-18vw)";

            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 4:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-24vw)";


            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 5:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 6:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 7:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 8:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 9:
            firstofmin.style.transform = "translatey(-0vw)";
            secondofmin.style.transform = "translatey(-54vw)";


            s1min0.style.opacity = "1"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;
        case 10:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 11:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 12:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = ".7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 13:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-18vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 14:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-24vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 15:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 16:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 17:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 18:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 19:
            firstofmin.style.transform = "translatey(-6vw)";
            secondofmin.style.transform = "translatey(-54vw)";
            s1min0.style.opacity = "0.7"
            s1min1.style.opacity = "1"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;
        case 20:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 21:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 22:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 23:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-18vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0"
            s2min8.style.opacity = "0"
            s2min9.style.opacity = "0"
            break;
        case 24:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-24vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.1"
            s2min8.style.opacity = "0"
            s2min9.style.opacity = "0"
            break;
        case 25:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 26:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 27:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 28:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 29:
            firstofmin.style.transform = "translatey(-12vw)";
            secondofmin.style.transform = "translatey(-54vw)";
            s1min0.style.opacity = "0.4"
            s1min1.style.opacity = "0.7"
            s1min2.style.opacity = "1"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "0.4"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;
        case 30:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 31:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0"
            s2min7.style.opacity = "0"
            s2min8.style.opacity = "0"
            s2min9.style.opacity = "0"
            break;
        case 32:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 33:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-18vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = ".7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 34:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-24vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 35:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 36:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.1"
            break;
        case 37:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 38:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 39:
            firstofmin.style.transform = "translatey(-18vw)";
            secondofmin.style.transform = "translatey(-54vw)";
            s1min0.style.opacity = "0.1"
            s1min1.style.opacity = "0.4"
            s1min2.style.opacity = "0.7"
            s1min3.style.opacity = "1"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "0.4"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;
        case 40:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 41:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 42:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 43:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-18vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 44:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-24vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 45:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 46:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 47:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 48:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 49:
            firstofmin.style.transform = "translatey(-24vw)";
            secondofmin.style.transform = "translatey(-54vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0.1"
            s1min2.style.opacity = "0.4"
            s1min3.style.opacity = "0.7"
            s1min4.style.opacity = "1"
            s1min5.style.opacity = "0.7"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;

        case 50:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-0vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "1"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 51:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-6vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0.7"
            s2min1.style.opacity = "1"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 52:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-12vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0.4"
            s2min1.style.opacity = "0.7"
            s2min2.style.opacity = "1"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 53:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-18vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0.1"
            s2min1.style.opacity = "0.4"
            s2min2.style.opacity = "0.7"
            s2min3.style.opacity = "1"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 54:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-24vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0.1"
            s2min2.style.opacity = "0.4"
            s2min3.style.opacity = "0.7"
            s2min4.style.opacity = "1"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 55:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-30vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0.1"
            s2min3.style.opacity = "0.4"
            s2min4.style.opacity = "0.7"
            s2min5.style.opacity = "1"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 56:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-36vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0.1"
            s2min4.style.opacity = "0.4"
            s2min5.style.opacity = "0.7"
            s2min6.style.opacity = "1"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "0.4"
            s2min9.style.opacity = "0.4"
            break;
        case 57:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-42vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0.1"
            s2min5.style.opacity = "0.4"
            s2min6.style.opacity = "0.7"
            s2min7.style.opacity = "1"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "0.4"
            break;
        case 58:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-48vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0.1"
            s2min6.style.opacity = "0.4"
            s2min7.style.opacity = "0.7"
            s2min8.style.opacity = "1"
            s2min9.style.opacity = "0.7"
            break;
        case 59:
            firstofmin.style.transform = "translatey(-30vw)";
            secondofmin.style.transform = "translatey(-54vw)";
            s1min0.style.opacity = "0"
            s1min1.style.opacity = "0"
            s1min2.style.opacity = "0.1"
            s1min3.style.opacity = "0.4"
            s1min4.style.opacity = "0.7"
            s1min5.style.opacity = "1"

            s2min0.style.opacity = "0"
            s2min1.style.opacity = "0"
            s2min2.style.opacity = "0"
            s2min3.style.opacity = "0"
            s2min4.style.opacity = "0"
            s2min5.style.opacity = "0"
            s2min6.style.opacity = "0.1"
            s2min7.style.opacity = "0.4"
            s2min8.style.opacity = "0.7"
            s2min9.style.opacity = "1"
            break;
    }

    //Seconds
    switch (date.getSeconds()) {
        case 0:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 1:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 2:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 3:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-18vw)";

            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 4:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-24vw)";


            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 5:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 6:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 7:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 8:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 9:
            firstofsec.style.transform = "translatey(-0vw)";
            secondofsec.style.transform = "translatey(-54vw)";


            s1sec0.style.opacity = "1"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;
        case 10:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 11:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 12:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = ".7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 13:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-18vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 14:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-24vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 15:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 16:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 17:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 18:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 19:
            firstofsec.style.transform = "translatey(-6vw)";
            secondofsec.style.transform = "translatey(-54vw)";
            s1sec0.style.opacity = "0.7"
            s1sec1.style.opacity = "1"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;
        case 20:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 21:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 22:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 23:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-18vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0"
            s2sec8.style.opacity = "0"
            s2sec9.style.opacity = "0"
            break;
        case 24:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-24vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.1"
            s2sec8.style.opacity = "0"
            s2sec9.style.opacity = "0"
            break;
        case 25:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 26:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 27:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 28:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 29:
            firstofsec.style.transform = "translatey(-12vw)";
            secondofsec.style.transform = "translatey(-54vw)";
            s1sec0.style.opacity = "0.4"
            s1sec1.style.opacity = "0.7"
            s1sec2.style.opacity = "1"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "0.4"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;
        case 30:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 31:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0"
            s2sec7.style.opacity = "0"
            s2sec8.style.opacity = "0"
            s2sec9.style.opacity = "0"
            break;
        case 32:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 33:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-18vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = ".7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 34:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-24vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 35:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 36:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.1"
            break;
        case 37:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 38:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 39:
            firstofsec.style.transform = "translatey(-18vw)";
            secondofsec.style.transform = "translatey(-54vw)";
            s1sec0.style.opacity = "0.1"
            s1sec1.style.opacity = "0.4"
            s1sec2.style.opacity = "0.7"
            s1sec3.style.opacity = "1"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "0.4"

            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;
        case 40:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"

            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 41:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"

            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 42:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 43:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-18vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"

            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 44:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-24vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 45:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 46:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 47:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 48:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 49:
            firstofsec.style.transform = "translatey(-24vw)";
            secondofsec.style.transform = "translatey(-54vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0.1"
            s1sec2.style.opacity = "0.4"
            s1sec3.style.opacity = "0.7"
            s1sec4.style.opacity = "1"
            s1sec5.style.opacity = "0.7"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;

        case 50:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-0vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "1"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 51:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-6vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0.7"
            s2sec1.style.opacity = "1"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 52:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-12vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0.4"
            s2sec1.style.opacity = "0.7"
            s2sec2.style.opacity = "1"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 53:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-18vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0.1"
            s2sec1.style.opacity = "0.4"
            s2sec2.style.opacity = "0.7"
            s2sec3.style.opacity = "1"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 54:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-24vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0.1"
            s2sec2.style.opacity = "0.4"
            s2sec3.style.opacity = "0.7"
            s2sec4.style.opacity = "1"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 55:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-30vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0.1"
            s2sec3.style.opacity = "0.4"
            s2sec4.style.opacity = "0.7"
            s2sec5.style.opacity = "1"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 56:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-36vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0.1"
            s2sec4.style.opacity = "0.4"
            s2sec5.style.opacity = "0.7"
            s2sec6.style.opacity = "1"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "0.4"
            s2sec9.style.opacity = "0.4"
            break;
        case 57:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-42vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0.1"
            s2sec5.style.opacity = "0.4"
            s2sec6.style.opacity = "0.7"
            s2sec7.style.opacity = "1"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "0.4"
            break;
        case 58:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-48vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0.1"
            s2sec6.style.opacity = "0.4"
            s2sec7.style.opacity = "0.7"
            s2sec8.style.opacity = "1"
            s2sec9.style.opacity = "0.7"
            break;
        case 59:
            firstofsec.style.transform = "translatey(-30vw)";
            secondofsec.style.transform = "translatey(-54vw)";
            s1sec0.style.opacity = "0"
            s1sec1.style.opacity = "0"
            s1sec2.style.opacity = "0.1"
            s1sec3.style.opacity = "0.4"
            s1sec4.style.opacity = "0.7"
            s1sec5.style.opacity = "1"
            s2sec0.style.opacity = "0"
            s2sec1.style.opacity = "0"
            s2sec2.style.opacity = "0"
            s2sec3.style.opacity = "0"
            s2sec4.style.opacity = "0"
            s2sec5.style.opacity = "0"
            s2sec6.style.opacity = "0.1"
            s2sec7.style.opacity = "0.4"
            s2sec8.style.opacity = "0.7"
            s2sec9.style.opacity = "1"
            break;
    }

}

function setday() {
    date = new Date;
    switch (date.getDay()) { //Date switch
        case 0:
            day0.className = 'maincell glowcell';
            day1.className = 'maincell';
            day2.className = 'maincell';
            day3.className = 'maincell';
            day4.className = 'maincell';
            day5.className = 'maincell';
            day6.className = 'maincell';
            break;
        case 1:
            day0.className = 'maincell';
            day1.className = 'maincell glowcell';
            day2.className = 'maincell';
            day3.className = 'maincell';
            day4.className = 'maincell';
            day5.className = 'maincell';
            day6.className = 'maincell';
            break;
        case 2:
            day0.className = 'maincell';
            day1.className = 'maincell';
            day2.className = 'maincell glowcell';
            day3.className = 'maincell';
            day4.className = 'maincell';
            day5.className = 'maincell';
            day6.className = 'maincell';
            break;
        case 3:
            day0.className = 'maincell';
            day1.className = 'maincell';
            day2.className = 'maincell';
            day3.className = 'maincell glowcell';
            day4.className = 'maincell';
            day5.className = 'maincell';
            day6.className = 'maincell';
            break;
        case 4:
            day0.className = 'maincell';
            day1.className = 'maincell';
            day2.className = 'maincell';
            day3.className = 'maincell';
            day4.className = 'maincell glowcell';
            day5.className = 'maincell';
            day6.className = 'maincell';
            break;
        case 5:
            day0.className = 'maincell';
            day1.className = 'maincell';
            day2.className = 'maincell';
            day3.className = 'maincell';
            day4.className = 'maincell';
            day5.className = 'maincell glowcell';
            day6.className = 'maincell';
            break;
        case 6:
            day0.className = 'maincell';
            day1.className = 'maincell';
            day2.className = 'maincell';
            day3.className = 'maincell';
            day4.className = 'maincell';
            day5.className = 'maincell';
            day6.className = 'maincell glowcell';
            break;
    }
}
