let chart = bb.generate({
    bindto: "#chart",
    data: {
      order: null,
      x:"x",
      type: "bar",
      columns: [
            ["x", 2014,2015,2016,2017,2018,2019,2020,2021],
            ["data1", 0, 0, 0, 0, 0, 0, 0, 0],
            ["data2", 0, 0, 0, 0, 0, 0, 0, 0],
            ["data3", 0, 0, 0, 0, 0, 0, 0, 0],
            ["data4", 0, 0, 0, 0, 0, 0, 0, 0],
            ["data5", 0, 0, 0, 0, 0, 0, 0, 0],
            ["data6", 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      names: {
        data1 : "신문매체 광고료",
        data2 : "인터넷매체 광고료",
        data3 : "방송매체 광고료",
        data4 : "신문매체 건수",
        data5 : "인터넷매체 건수",
        data6 : "방송매체 건수",
      },
      groups: [
        [ "data1","data2", "data3" ],
        [ "data4","data5", "data6" ]
      ],
      axes: {
        data1: "y", data2: "y", data3: "y",
        data4: "y2", data5: "y2", data6: "y2",
      },
      colors: {
        data1: "#f28996",
        data2: "#7db8f0",
        data3: "#ade888",
        data4: "#d72d42",
        data5: "#3b73d2",
        data6: "#5a7e44"
      }
    },
    axis: {
      y2: {
        show: true
      }
    },
    zoom: {
      enabled: true, // for ESM specify as: zoom()
      type: "drag"
    },
});

// chart.load({
// 		columns: [
// 			["download", 30, 30, 20, 170],
// 			["loading", 90, 30, 40, 40]
// 		],
// });


function readTextFile(file, callback) {
  var urlString = file;
  jQuery.ajax({
    type:'GET',
    url: urlString,
    processData:false,
    contentType: false,
    success: function(msg) {			// 성공시
      callback(msg)
    },error: function(msg) {			// 실패시
      console.log(msg)
    }
  });
}

let headImg = document.getElementById('headImg')
headImg.addEventListener('click' () => {
  location.href = '/';
})
