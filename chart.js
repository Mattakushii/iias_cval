// ДИАГРАММА В main.html

let canvas = document.getElementById("main-progress-diagram");
// Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

let canvasData = {
    labels: [
        "Отлично",
        "Хорошо",
        "Удовлетворительно",
    ],
    datasets: [
        {
            data: [1, 2, 1],
            backgroundColor: [
                "red",
                "blue",
                "yellow",
            ],
            borderWidth: 0
        }]
};

var canvasOptions = {
  rotation: -2*Math.PI,
  cutoutPercentage: 60,
  circumference: 2*Math.PI,
  legend: {
    display: ""
  },
  animation: {
    animateRotate: false,
    animateScale: true
  }
};

var pieChart = new Chart(canvas, {
  type: 'doughnut',
  data: canvasData,
  options: canvasOptions
});