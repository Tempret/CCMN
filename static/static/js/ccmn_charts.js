$(document).ready(function() {
    /* charts END*/

    Chart.defaults.global.elements.point.pointStyle = 'circle';
    Chart.defaults.global.elements.point.hoverRadius = 6
    Chart.defaults.global.elements.point.radius = 2;

    var ctx = document.getElementById("totalChart").getContext('2d');
    ccmn.totalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ccmn.getTimeArray(24),
            datasets: [
                {
                    label: 'connected visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'passerby visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 24),
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var manufactChart = document.getElementById("manufactChact").getContext('2d');
    ccmn.manufactChart = new Chart(repeat_chart, {
        type: 'doughnut',
        data: {},
        options: {
//            scales: {
//                yAxes: [{
//                    ticks: {
//                        beginAtZero:true
//                    }
//                }]
//            }
        }
    });

});