/* global google */
/* global dateFormat */

var deaths = [
    "20-Jan 17:10 Trakanon",
    "20-Jan 6:52 Dracoliche",
    "21-Jan 7:30 Dread",
    "18-Jan 13:49 Fright",
    "21-Jan 11:55 Terror",
    "19-Jan 8:28 Phara Dar",
    "19-Jan 14:37 Hoshkar",
    "16-Jan 23:19 Silverwing",
    "18-Jan 12:37 Xygoz",
    "18-Jan 17:20 Druushk",
    "17-Jan 12:02 Nexona",
    "16-Jan 19:25 Statue",
    "17-Jan 8:15 Cazic Thule",
    "18-Jan 12:19 King Tormax",
    "17-Jan 19:53 Klandicar",
    "17-Jan 12:10 Yelinak",
    "19-Jan 11:44 Dain",
    "17-Jan 11:14 Telkorenar",
    "17-Jan 17:22 Gozzrem",
    "17-Jan 17:19 LTK",
    "17-Jan 14:15 Ikatiar",
    "18-Jan 5:37 Eashen",
    "18-Jan 7:00 Dozekar",
    "18-Jan 7:25 Aaryonar",
    "18-Jan 6:40 Cekenar",
    "18-Jan 18:15 Sevalak",
    "17-Jan 16:06 Zlexak",
    "18-Jan 2:12 Jorlleag",
    "17-Jan 18:17 Lady Nevederia",
    "17-Jan 22:02 Dagarn",
    "17-Jan 18:48 Lady Mirenilla",
    "17-Jan 18:31 Lord Feshlak",
    "18-Jan 11:27 Lord Koi'Doken",
    "17-Jan 20:26 Lord Kreizenn",
    "17-Jan 19:28 Lord Vyemm",
    "10-Jan 11:45 Venril Sathir",
    "4-Jan 11:21 Innoruuk",
    "27-Dec 1:25 Severilous",
    "15-Jan 11:42 Gorenaire",
    "18-Jan 22:40 Vox",
    "19-Jan 10:48 Nagafen",
    "31-Dec 4:03 Velketor",
    "27-Dec 7:49 Talendor",
    "27-Dec 17:10 Faydedar",
    "4-Jan 12:20 Kelorek'Dar",
    "17-Jan 18:08 Vulak'Aerr",
    "27-Dec 0:43 Sontalak",
    "27-Dec 19:00 Zlandicar"
];

var Mob = function Mob(_name, _death) {
    function name() {
        return _name;
    }

    function death() {
        return new Date(_death);
    }

    function windowStart() {
        var start = death();
        start.setDate(start.getDate() + 7);
        return start;
    }

    function windowEnd() {
        var end = windowStart();
        end.setHours(end.getHours() + 16);
        return end;
    }

    function isOpen() {
        return Date.now() < windowEnd();
    }

    function windowString() {
        var format = 'm/d (h:MM TT)';
        var start = dateFormat(windowStart(), format);
        var end = dateFormat(windowEnd(), format);
        return start + ' to ' + end;
    }

    function toString() {
        var format = 'm/d (h:MM TT)';
        return name() + ' [' + dateFormat(death(), format) + ']';
    }

    return {
        name: name,
        death: death,
        windowStart: windowStart,
        windowEnd: windowEnd,
        isOpen: isOpen,
        windowString: windowString,
        toString: toString,
    };
};

Mob.empty = function() {
    return new Mob('a large rat', new Date());
};

Mob.fromGoogleSheetsEntry = function(entry) {
    var pieces = entry.split(' ');
    var date = pieces.shift().split('-');
    var time = pieces.shift().split(':');
    var name = pieces.join(' ');

    var day = parseInt(date.shift(), 10);
    var month = indexMonth(date.shift(), 10);

    var year = 2016;
    if (month == 11) {
        year = 2015;
    }

    var hour = parseInt(time.shift(), 10);
    var minute = parseInt(time.shift(), 10);

    return new Mob(name, new Date(year, month, day, hour, minute));
};

Mob.isOpen = function(mob) {
    return mob.isOpen();
};

Mob.compareWindowStart = function(a, b) {
    return a.windowStart() - b.windowStart();
};

var mobs = deaths.map(Mob.fromGoogleSheetsEntry).filter(Mob.isOpen);
mobs.sort(Mob.compareWindowStart);

function indexMonth(month) {
    return {
        'Jan': 0,
        'Feb': 1,
        'Mar': 2,
        'Apr': 3,
        'May': 4,
        'Jun': 5,
        'Jul': 6,
        'Aug': 7,
        'Sep': 8,
        'Oct': 9,
        'Nov': 10,
        'Dec': 11,
    }[month];
}

google.charts.load('current', {'packages': ['timeline']});
google.charts.setOnLoadCallback(drawChart);
window.onresize = drawChart;

function drawChart() {
    var table = new google.visualization.DataTable();
    table.addColumn({
        type: 'string',
        id: 'MobName'
    });
    table.addColumn({
        type: 'string',
        id: 'BarLabel'
    });
    table.addColumn({
        type: 'string',
        role: 'tooltip',
        p: {html: true}
    });
    table.addColumn({
        type: 'date',
        id: 'Start'
    });
    table.addColumn({
        type: 'date',
        id: 'End'
    });

    for (var i in mobs) {
        table.addRow(row(mobs[i]));
    }

    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var options = {
        height: 2048,
        isHtml: true
    };
    chart.draw(table, options);
}

function row(mob) {
    var name = mob.name();
    var tooltip = mob.windowString();
    var start = mob.windowStart();
    var end = mob.windowEnd();
    return [name, null, tooltip, start, end];
}