$(document).ready(function() {
    /* charts END*/
    var ctx = document.getElementById("totalChart").getContext('2d');
    ccmn.totalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ccmn.getTimeArray(),
            datasets: [
                {
                    label: 'Hourly count of connected visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count of passerby visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count visitors',
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
        data: {
            labels: ['5-30 mins', '30-60 mins', '1-5 hours', '5-7 hours', '8+ hours'],
            datasets: [
                {
                    label: '5-30 mins',
                    data: ccmn.getRandomValues(1, 500, 12),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 12),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 12),
                    borderWidth: 1
                },
                {
                    label: '30-60 mins',
                    data: ccmn.getRandomValues(1, 100, 12),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 12),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 12),
                    borderWidth: 1
                },
                {
                    label: '1-5 hours',
                    data: ccmn.getRandomValues(1, 200, 12),
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 12),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 12),
                    borderWidth: 1
                },
                {
                    label: '5-7 hours',
                    data: ccmn.getRandomValues(1, 200, 12),
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 12),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 12),
                    borderWidth: 1
                },
                {
                    label: '8+ hours',
                    data: ccmn.getRandomValues(1, 200, 12),
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 12),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 12),
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

    var repeat_chart = document.getElementById("repeatChart").getContext('2d');
    ccmn.repeatChart = new Chart(repeat_chart, {
        type: 'bar',
        data: {
            labels: ccmn.getTimeArray(),
            datasets: [
                {
                    label: 'Hourly count of connected visitors',
                    data: ccmn.getRandomValues(1, 100, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count of passerby visitors',
                    data: ccmn.getRandomValues(1, 100, 24),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count visitors',
                    data: ccmn.getRandomValues(1, 100, 24),
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

});