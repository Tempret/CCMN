$(document).ready(function() {
    /* charts END*/

    Chart.defaults.global.elements.point.pointStyle = 'circle';
    Chart.defaults.global.elements.point.hoverRadius = 6
    Chart.defaults.global.elements.point.radius = 2;

    var ctx = document.getElementById("totalChart").getContext('2d');
    ccmn.totalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'connected visitors',
                    data: [],
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24 * 3),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24 * 3),
                    borderWidth: 1
                },
                {
                    label: 'passerby visitors',
                    data: [],
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24 * 3),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24 * 3),
                    borderWidth: 1
                },
                {
                    label: 'visitors',
                    data: [],
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 24 * 3),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 24 * 3),
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var dwell_chart = document.getElementById("dwellChart").getContext('2d');
    ccmn.dwellChart = new Chart(dwell_chart, {
        type: 'line',
        data: {},
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var repeat_chart = document.getElementById("repeatChart").getContext('2d');
    ccmn.repeatChart = new Chart(repeat_chart, {
        type: 'line',
        data: {},
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var manufact_chart = document.getElementById('manufactChact').getContext('2d');
    ccmn.manufactChart = new Chart(manufact_chart, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            datasets: [
            {
                data: [],
                backgroundColor: ['rgb(0, 255, 0)', 'rgb(0, 255, 225)', 'rgb(255, 23, 225)']
            }],
            labels: []
        },

        // Configuration options go here
        options: {
            cutoutPercentage: 60,
            legend: {
                position: 'right',
                fullWidth: false,
                labels: {
                    fontSize: 12,
                }
            }
        }
    });

});