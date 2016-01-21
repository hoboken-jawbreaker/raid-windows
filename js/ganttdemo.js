/* global google */

var ganttdemo = function() {
    function main() {
        google.charts.load('current', {
            'packages': ['gantt']
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Task ID');
            data.addColumn('string', 'Task Name');
            data.addColumn('string', 'Resource');
            data.addColumn('date', 'Start Date');
            data.addColumn('date', 'End Date');
            data.addColumn('number', 'Duration');
            data.addColumn('number', 'Percent Complete');
            data.addColumn('string', 'Dependencies');

            var rows = [
                ['2014Spring', 'Spring 2014', null,
                    new Date(2014, 2, 22), new Date(2014, 5, 20),
                    null, 100, null],
                ['2014Summer', 'Summer 2014', null,
                    new Date(2014, 5, 21), new Date(2014, 8, 20),
                    null, 100, null],
                ['2014Autumn', 'Autumn 2014', null,
                    new Date(2014, 8, 21), new Date(2014, 11, 20),
                    null, 100, null],
                ['2014Winter', 'Winter 2014', null,
                    new Date(2014, 11, 21), new Date(2015, 2, 21),
                    null, 100, null],
                ['2015Spring', 'Spring 2015', null,
                    new Date(2015, 2, 22), new Date(2015, 5, 20),
                    null, 50, null],
                ['2015Summer', 'Summer 2015', null,
                    new Date(2015, 5, 21), new Date(2015, 8, 20),
                    null, 0, null],
                ['2015Autumn', 'Autumn 2015', null,
                    new Date(2015, 8, 21), new Date(2015, 11, 20),
                    null, 0, null],
                ['2015Winter', 'Winter 2015', null,
                    new Date(2015, 11, 21), new Date(2016, 2, 21),
                    null, 0, null],
                ['Football', 'Football Season', null,
                    new Date(2014, 8, 4), new Date(2015, 1, 1),
                    null, 100, null],
                ['Baseball', 'Baseball Season', null,
                    new Date(2015, 2, 31), new Date(2015, 9, 20),
                    null, 14, null],
                ['Basketball', 'Basketball Season', null,
                    new Date(2014, 9, 28), new Date(2015, 5, 20),
                    null, 86, null],
                ['Hockey', 'Hockey Season', null,
                    new Date(2014, 9, 8), new Date(2015, 5, 21),
                    null, 89, null]
            ];
            data.addRows(rows);

            var trackHeight = 20;
            var horizontalLabelHeight = 50
            var height = rows.length * trackHeight + horizontalLabelHeight
            var options = {
                title: 'Raid Windows',
                height: height,
                gantt: {
                    trackHeight: trackHeight,
                    barHeight: 12,
                    barCornerRadius: 2,
                    innerGridDarkTrack: { fill: '#181818' },
                    labelStyle: {
                      fontName: 'sans-serif',
                      fontSize: 14
                    }
                },
                backgroundColor: { fill: '#2b2b2b' }
            };

            var div = document.getElementById('chart');
            var chart = new google.visualization.Gantt(div);

            chart.draw(data, options);
        }
    }

    return {
        main: main
    };
}();
Object.keys(ganttdemo); // suppress unused warning