var array = []
var labels2 = []
var data2 = []

var originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation

console.log(firebase);


async function getData() {
  // $.getJSON("./db.json", async (res) => {
  //   const json = res
  //   // console.log(res)
  //   array = Object.keys(json).map(key => ({ time: key, number: json[key] }))
  //   labels2 = await array.map((e) => {
  //     return e.time;
  //   }); 
  //   data2 = await array.map((e) => {
  //     return e.number
  //   });;
  //   console.log(labels2);
  //   console.log(data2);
  // });
  firebase.database().ref('/tweet').on('value', function (snapshot) {
    labels2 = []
    data2 = []
    const database = Object.values(snapshot.val())
    
    database.map(data => {
      labels2.push(data.currenttime)
      data2.push(data.count)
    })
    console.log(labels2);
    console.log(data2);
  })
}

var ctx_live = document.getElementById("chart0");

var updateChart = async function () {
  await getData()
  var myChart = new Chart(ctx_live, {
    type: 'line',
    data: {
      labels: labels2,
      datasets: [{
        data: data2,
        borderWidth: 1,
        borderColor: '#00c0ef',
        label: 'liveCount',
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Dynamically Tweets(Trade War)Update Chart ",
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
};

// get new data every 3 seconds
setInterval(updateChart, 1000);
