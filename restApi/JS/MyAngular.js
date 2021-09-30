let app = angular.module('myApp',[]);
let file = document.getElementById('jsonFile')
var Javafiltering 

function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

app.controller('MyController',['$scope',($scope)=> {
  $scope.dataList
  $scope.targetNewsList
  $scope.targetInternetList
  $scope.targetBroadcastList
  $scope.targetNewsList = []
  $scope.targetInternetList = []
  $scope.targetBroadcastList = []
  $scope.targetNewsListShow = []
  $scope.targetInternetListShow = []
  $scope.targetBroadcastListShow = []
  $scope.news_costs_total = 0
  $scope.internet_costs_total = 0
  $scope.broadcast_costs_total = 0
  $scope.news_num_total = 0
  $scope.internet_num_total = 0
  $scope.broadcast_num_total = 0
  $scope.news_num_start = 0
  $scope.internet_num_start = 0
  $scope.broadcast_num_start = 0
  $scope.news_num_end = 0
  $scope.internet_num_end = 0
  $scope.broadcast_num_end = 0
  $scope.NewsTableButtons = []
  $scope.InternetTableButtons = []
  $scope.BroadcastTableButtons = []
  $scope.highLightText = ``
  $scope.costs = [0,0,0,0,0,0,0,0];
  $scope.costs_other = [0,0,0,0,0,0,0,0];
  $scope.nums = [0,0,0,0,0,0,0,0];
  $scope.filterString = []

  $scope.news_page = 0;
  $scope.news_page_total = 0;
  $scope.broad_page = 0;
  $scope.broad_page_total = 0;
  $scope.internet_page = 0;
  $scope.internet_page_total = 0;

  $scope.media_cost_1 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_2 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_3 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_4 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_5 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_6 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_7 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_8 = [0,0,0,0,0,0,0,0];
  $scope.media_cost_total = [0,0,0,0,0,0,0,0];

  $scope.media_cost_whole = 0
  $scope.sum_cost = 0
  $scope.media_cost_percent = [`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`];

  $scope.media_num_1 = [0,0,0,0,0,0,0,0];
  $scope.media_num_2 = [0,0,0,0,0,0,0,0];
  $scope.media_num_3 = [0,0,0,0,0,0,0,0];
  $scope.media_num_4 = [0,0,0,0,0,0,0,0];
  $scope.media_num_5 = [0,0,0,0,0,0,0,0];
  $scope.media_num_6 = [0,0,0,0,0,0,0,0];
  $scope.media_num_7 = [0,0,0,0,0,0,0,0];
  $scope.media_num_8 = [0,0,0,0,0,0,0,0];
  $scope.media_num_total = [0,0,0,0,0,0,0,0];
  $scope.parentsName = ""
  $scope.empty = ""
  $scope.groupData

  readTextFile(`/read_group_info`, (str) => {
    $scope.groupData = JSON.parse(str);
    $scope.$apply()
    $scope.TargetName = getParameter("name")

    for(var i = 0 ; i < $scope.groupData.length; i++) {
      if($scope.groupData[i].child == $scope.TargetName) {
        $scope.parentsName = $scope.groupData[i].parent
        break;
      }
    }
    $scope.$apply()
  })

  $scope.parentClick = (parent) => {
    location.href = `/?parent=${parent}`
  }

  readTextFile(`/read_logs?name=${getParameter("name")}`, (str) => {
    if(str != "null") {
      $scope.dataList = JSON.parse(str).logs;
      $scope.SelectTarget();
    }
    $scope.$apply()
  })

  $scope.TargetName = getParameter("name")
  $scope.target = 1
  $scope.page_news = 0;
  $scope.page_internet = 0;
  $scope.page_broadcast = 0;

  $scope.news_costs = [0,0,0,0,0,0,0,0]
  $scope.internet_costs = [0,0,0,0,0,0,0,0]
  $scope.broadcast_costs = [0,0,0,0,0,0,0,0]
  $scope.news_num = [0,0,0,0,0,0,0,0]
  $scope.internet_num = [0,0,0,0,0,0,0,0]
  $scope.broadcast_num = [0,0,0,0,0,0,0,0]
  $scope.SelectTarget = () => {
    $scope.costs = [0,0,0,0,0,0,0,0];
    $scope.costs_other = [0,0,0,0,0,0,0,0];
    $scope.nums = [0,0,0,0,0,0,0,0];
    $scope.news_costs_total = 0
    $scope.internet_costs_total = 0
    $scope.broadcast_costs_total = 0
    $scope.news_num_total = 0
    $scope.internet_num_total = 0
    $scope.broadcast_num_total = 0
    $scope.sum_cost = 0
    $scope.news_costs = [0,0,0,0,0,0,0,0]
    $scope.internet_costs = [0,0,0,0,0,0,0,0]
    $scope.broadcast_costs = [0,0,0,0,0,0,0,0]
    $scope.news_num = [0,0,0,0,0,0,0,0]
    $scope.internet_num = [0,0,0,0,0,0,0,0]
    $scope.broadcast_num = [0,0,0,0,0,0,0,0]
    $scope.media_cost_1 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_2 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_3 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_4 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_5 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_6 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_7 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_8 = [0,0,0,0,0,0,0,0];
    $scope.media_cost_total = [0,0,0,0,0,0,0,0];

    $scope.media_num_1 = [0,0,0,0,0,0,0,0];
    $scope.media_num_2 = [0,0,0,0,0,0,0,0];
    $scope.media_num_3 = [0,0,0,0,0,0,0,0];
    $scope.media_num_4 = [0,0,0,0,0,0,0,0];
    $scope.media_num_5 = [0,0,0,0,0,0,0,0];
    $scope.media_num_6 = [0,0,0,0,0,0,0,0];
    $scope.media_num_7 = [0,0,0,0,0,0,0,0];
    $scope.media_num_8 = [0,0,0,0,0,0,0,0];
    $scope.media_num_total = [0,0,0,0,0,0,0,0];

    $scope.news_page = 0;
    $scope.news_page_total = 0;
    $scope.broad_page = 0;
    $scope.broad_page_total = 0;
    $scope.internet_page = 0;
    $scope.internet_page_total = 0;

    $scope.media_cost_whole = 0
    $scope.media_cost_percent = [`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`,`0.0 %`];

    $scope.targetNewsList = []
    $scope.targetInternetList = []
    $scope.targetBroadcastList = []
    $scope.page_news = 0;
    $scope.page_internet = 0;
    $scope.page_broadcast = 0;
    console.log($scope.dataList[0])
    $scope.dataList.sort((a,b) => {
      let a_n = Number.parseInt(a.timestamp.split('-')[0])
      let b_n = Number.parseInt(b.timestamp.split('-')[0])
      if(a_n != b_n) return b_n - a_n
      else {
        a_n = Number.parseInt(a.timestamp.split('-')[1])
        b_n = Number.parseInt(b.timestamp.split('-')[1])
        if(a_n != b_n) return b_n - a_n
        else {
          a_n = Number.parseInt(a.timestamp.split('-')[2])
          b_n = Number.parseInt(b.timestamp.split('-')[2])
          if(a_n != b_n) return b_n - a_n
          else return 0;
        }
      }
    })

    for(var i = 0 ; i < $scope.dataList.length; i++) {

      if($scope.dataList[i].hostName == getParameter("name")) {
        var index = $scope.dataList[i].years - 2014
        if($scope.dataList[i].type == "신문") {
          $scope.news_page_total ++
          $scope.news_costs[index] = $scope.news_costs[index] + $scope.dataList[i].cost
          $scope.costs[index] += $scope.dataList[i].cost
          $scope.nums[index] += $scope.dataList[i].num
          $scope.news_num[index] = $scope.news_num[index] + $scope.dataList[i].num
          $scope.targetNewsList.push($scope.dataList[i])

          $scope.media_cost_whole += $scope.dataList[i].cost
          if($scope.dataList[i].mediaName == "조선일보") {
            $scope.media_cost_1[index] += $scope.dataList[i].cost
            $scope.media_num_1[index] += $scope.dataList[i].num
            $scope.media_cost_total[0] += $scope.dataList[i].cost
            $scope.media_num_total[0] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "중앙일보") {
            $scope.media_cost_2[index] += $scope.dataList[i].cost
            $scope.media_num_2[index] += $scope.dataList[i].num
            $scope.media_cost_total[1] += $scope.dataList[i].cost
            $scope.media_num_total[1] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "동아일보") {
            $scope.media_cost_3[index] += $scope.dataList[i].cost
            $scope.media_num_3[index] += $scope.dataList[i].num
            $scope.media_cost_total[2] += $scope.dataList[i].cost
            $scope.media_num_total[2] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "한겨레") {
            $scope.media_cost_4[index] += $scope.dataList[i].cost
            $scope.media_num_4[index] += $scope.dataList[i].num
            $scope.media_cost_total[3] += $scope.dataList[i].cost
            $scope.media_num_total[3] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "경향신문") {
            $scope.media_cost_5[index] += $scope.dataList[i].cost
            $scope.media_num_5[index] += $scope.dataList[i].num
            $scope.media_cost_total[4] += $scope.dataList[i].cost
            $scope.media_num_total[4] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "매일경제") {
            $scope.media_cost_6[index] += $scope.dataList[i].cost
            $scope.media_num_6[index] += $scope.dataList[i].num
            $scope.media_cost_total[5] += $scope.dataList[i].cost
            $scope.media_num_total[5] += $scope.dataList[i].num
          } else if($scope.dataList[i].mediaName == "한국경제") {
            $scope.media_cost_7[index] += $scope.dataList[i].cost
            $scope.media_num_7[index] += $scope.dataList[i].num
            $scope.media_cost_total[6] += $scope.dataList[i].cost
            $scope.media_num_total[6] += $scope.dataList[i].num
          } else {
            $scope.media_cost_8[index] += $scope.dataList[i].cost
            $scope.media_num_8[index] += $scope.dataList[i].num
            $scope.media_cost_total[7] += $scope.dataList[i].cost
            $scope.media_num_total[7] += $scope.dataList[i].num
          }

        } else if($scope.dataList[i].type == "인터넷매체") {
          $scope.internet_page_total++
          $scope.internet_costs[index] = $scope.internet_costs[index]+ $scope.dataList[i].cost
          $scope.internet_num[index] = $scope.internet_num[index] +  $scope.dataList[i].num
          $scope.costs[index] += $scope.dataList[i].cost
          $scope.nums[index] += $scope.dataList[i].num
          $scope.targetInternetList.push($scope.dataList[i])
        } else if($scope.dataList[i].type == "방송") {
          $scope.broad_page_total ++
          $scope.broadcast_costs[index] =  $scope.broadcast_costs[index] + $scope.dataList[i].cost
          $scope.broadcast_num[index] = $scope.broadcast_num[index] +  $scope.dataList[i].num
          $scope.costs[index] += $scope.dataList[i].cost
          $scope.nums[index] += $scope.dataList[i].num
          $scope.targetBroadcastList.push($scope.dataList[i])
        }
      }
    }

    for(var i = 0 ; i < 8; i ++) {
      $scope.news_costs[i] = $scope.news_costs[i].toFixed(1)
      $scope.internet_costs[i] = $scope.internet_costs[i].toFixed(1)
      $scope.broadcast_costs[i] = $scope.broadcast_costs[i].toFixed(1)
      $scope.costs_other[i] = $scope.costs[i].toFixed(1)

      $scope.media_cost_1[i] = $scope.media_cost_1[i].toFixed(1)
      $scope.media_cost_2[i] = $scope.media_cost_2[i].toFixed(1)
      $scope.media_cost_3[i] = $scope.media_cost_3[i].toFixed(1)
      $scope.media_cost_4[i] = $scope.media_cost_4[i].toFixed(1)
      $scope.media_cost_5[i] = $scope.media_cost_5[i].toFixed(1)
      $scope.media_cost_6[i] = $scope.media_cost_6[i].toFixed(1)
      $scope.media_cost_7[i] = $scope.media_cost_7[i].toFixed(1)
      $scope.media_cost_8[i] = $scope.media_cost_8[i].toFixed(1)


      $scope.news_costs_total += Number($scope.news_costs[i])
      $scope.internet_costs_total += Number($scope.internet_costs[i])
      $scope.broadcast_costs_total += Number($scope.broadcast_costs[i])
      $scope.news_num_total += $scope.news_num[i]
      $scope.internet_num_total += $scope.internet_num[i]
      $scope.broadcast_num_total += $scope.broadcast_num[i]
      $scope.media_cost_total[i] = $scope.media_cost_total[i].toFixed(1)

      if($scope.media_cost_whole == 0) {
        $scope.media_cost_percent[i] = `0.0 %`
      } else {
        $scope.media_cost_percent[i] = `${(($scope.media_cost_total[i]/$scope.media_cost_whole) *100 ).toFixed(1)} %`
      }
    }

    for(var i = 0; i < 8; i++) {
      $scope.sum_cost = $scope.sum_cost + $scope.costs[i]
    }
    $scope.sum_cost = $scope.sum_cost.toFixed(1)

    $scope.news_costs_total = $scope.news_costs_total.toFixed(1)
    $scope.internet_costs_total = $scope.internet_costs_total.toFixed(1)
    $scope.broadcast_costs_total = $scope.broadcast_costs_total.toFixed(1)

    chart.load({
    		columns: [
    			["data1", $scope.news_costs[0], $scope.news_costs[1], $scope.news_costs[2], $scope.news_costs[3], $scope.news_costs[4], $scope.news_costs[5], $scope.news_costs[6], $scope.news_costs[7]],
          ["data2", $scope.internet_costs[0], $scope.internet_costs[1], $scope.internet_costs[2], $scope.internet_costs[3], $scope.internet_costs[4], $scope.internet_costs[5], $scope.internet_costs[6], $scope.internet_costs[7]],
          ["data3", $scope.broadcast_costs[0], $scope.broadcast_costs[1], $scope.broadcast_costs[2], $scope.broadcast_costs[3], $scope.broadcast_costs[4], $scope.broadcast_costs[5], $scope.broadcast_costs[6], $scope.broadcast_costs[7]],
          ["data4", $scope.news_num[0], $scope.news_num[1], $scope.news_num[2], $scope.news_num[3], $scope.news_num[4], $scope.news_num[5], $scope.news_num[6], $scope.news_num[7]],
          ["data5", $scope.internet_num[0], $scope.internet_num[1], $scope.internet_num[2], $scope.internet_num[3], $scope.internet_num[4], $scope.internet_num[5], $scope.internet_num[6], $scope.internet_num[7]],
    			["data6", $scope.broadcast_num[0], $scope.broadcast_num[1], $scope.broadcast_num[2], $scope.broadcast_num[3], $scope.broadcast_num[4], $scope.broadcast_num[5], $scope.broadcast_num[6], $scope.broadcast_num[7]],
    		],
    });

    if($scope.filterString.length > 0) {
      for(var i = 0 ; i < $scope.targetNewsList.length; i++){
        var flag = false;
        for(var j = 0 ; j <$scope.filterString.length;j++) {
          if($scope.targetNewsList[i].mediaName == $scope.filterString[j])  {
            flag = true;
            break;
          }
        }
        if(!flag) {
          $scope.targetNewsList.splice(i,1)
          $scope.news_page_total --;
          i--;
        } 
      }

      for(var i = 0 ; i < $scope.targetBroadcastList.length; i++){
        var flag = false;
        for(var j = 0 ; j <$scope.filterString.length;j++) {
          if($scope.targetBroadcastList[i].mediaName == $scope.filterString[j])  {
            flag = true;
            break;
          }
        }
        if(!flag) {
          $scope.targetBroadcastList.splice(i,1)
          $scope.broad_page_total --;
          i--;
        } 
      }

      for(var i = 0 ; i < $scope.targetInternetList.length; i++){
        var flag = false;
        for(var j = 0 ; j <$scope.filterString.length;j++) {
          if($scope.targetInternetList[i].mediaName == $scope.filterString[j])  {
            flag = true;
            break;
          }
        }
        if(!flag) {
          $scope.targetInternetList.splice(i,1)
          $scope.internet_page_total --;
          i--;
        } 
      }
    }
    
    $scope.targetNewsListShow = []
    $scope.targetInternetListShow = []
    $scope.targetBroadcastListShow = []

    $scope.broad_page_total /= 20
    $scope.news_page_total /= 20
    $scope.internet_page_total /= 20

    $scope.broad_page_total = Math.ceil($scope.broad_page_total)
    $scope.news_page_total = Math.ceil($scope.news_page_total)
    $scope.internet_page_total = Math.ceil($scope.internet_page_total)

    $scope.news_num_start = 0
    $scope.internet_num_start = 0
    $scope.broadcast_num_start = 0
    $scope.news_num_end = ($scope.news_page_total <= 9) ? $scope.news_page_total : 10
    $scope.internet_num_end = ($scope.internet_page_total <= 9) ? $scope.internet_page_total : 10
    $scope.broadcast_num_end = ($scope.broad_page_total <= 9) ? $scope.broad_page_total :10

    $scope.NewsTableButtons = []
    $scope.InternetTableButtons = []
    $scope.BroadcastTableButtons = []

    for(var i = $scope.news_num_start; i < $scope.news_num_end; i++) {
      $scope.NewsTableButtons.push(i)
    }

    for(var i = $scope.internet_num_start; i < $scope.internet_num_end; i++) {
      $scope.InternetTableButtons.push(i)
    }

    for(var i = $scope.broadcast_num_start; i < $scope.broadcast_num_end; i++) {
      $scope.BroadcastTableButtons.push(i)
    }

    $scope.targetBroadcastListShow = []
    $scope.targetInternetListShow = []
    $scope.targetNewsListShow = []

    for(var i = $scope.news_page * 20; i < ($scope.news_page * 20 + 20) && i < $scope.targetNewsList.length; i ++) {
      $scope.targetNewsListShow.push($scope.targetNewsList[i])
    }

    for(var i = $scope.internet_page * 20; i < ($scope.internet_page * 20 + 20) && i < $scope.targetInternetList.length; i ++) {
      $scope.targetInternetListShow.push($scope.targetInternetList[i])
    }

    for(var i = $scope.broad_page * 20; i < ($scope.broad_page * 20 + 20) && i < $scope.targetBroadcastList.length; i ++) {
      $scope.targetBroadcastListShow.push($scope.targetBroadcastList[i])
    }
  }

  $scope.newsTableLeftButton = () => {
    if($scope.news_num_start == 0) return;
    $scope.news_num_start -= 10
    $scope.news_num_end = $scope.news_num_start +10
    $scope.news_page = $scope.news_num_end-1

    $scope.NewsTableButtons = []
    for(var i = $scope.news_num_start; i < $scope.news_num_end; i++) {
      $scope.NewsTableButtons.push(i)
    }

    $scope.targetNewsListShow = []
    for(var i = $scope.news_page * 20; i < ($scope.news_page * 20 + 20) && i < $scope.targetNewsList.length; i ++) {
      $scope.targetNewsListShow.push($scope.targetNewsList[i])
    }
  }

  $scope.newsTableRightButton = () => {
    if($scope.news_num_start + 10 > $scope.news_num_end) return;
    $scope.news_num_end += 10
    $scope.news_num_end = ($scope.news_num_end > $scope.news_page_total) ? $scope.news_page_total : $scope.news_num_end
    $scope.news_num_start += 10
    $scope.news_page = $scope.news_num_start

    $scope.NewsTableButtons = []
    for(var i = $scope.news_num_start; i < $scope.news_num_end; i++) {
      $scope.NewsTableButtons.push(i)
    }

    $scope.targetNewsListShow = []

    for(var i = $scope.news_page * 20; i < ($scope.news_page * 20 + 20) && i < $scope.targetNewsList.length; i ++) {
      $scope.targetNewsListShow.push($scope.targetNewsList[i])
    }
  }

  $scope.newsTableIndexButton = (n) => {
    $scope.news_page = n

    $scope.targetNewsListShow = []

    for(var i = $scope.news_page * 20; i < ($scope.news_page * 20 + 20) && i < $scope.targetNewsList.length; i ++) {
      $scope.targetNewsListShow.push($scope.targetNewsList[i])
    }
  }

  $scope.internetTableLeftButton = () => {
    if($scope.internet_num_start == 0) return;
    $scope.internet_num_start -= 10
    $scope.internet_num_end = $scope.internet_num_start  + 10
    $scope.internet_page = $scope.internet_num_end-1

    $scope.InternetTableButtons = []
    for(var i = $scope.internet_num_start; i < $scope.internet_num_end; i++) {
      $scope.InternetTableButtons.push(i)
    }

    $scope.targetInternetListShow = []
    for(var i = $scope.internet_page * 20; i < ($scope.internet_page * 20 + 20) && i < $scope.targetInternetList.length; i ++) {
      $scope.targetInternetListShow.push($scope.targetInternetList[i])
    }
  }

  $scope.internetTableRightButton = () => {
    if($scope.internet_num_start + 10 > $scope.internet_num_end) return;
    $scope.internet_num_end += 10
    $scope.internet_num_end = ($scope.internet_num_end > $scope.internet_page_total) ? $scope.internet_page_total : $scope.internet_num_end
    $scope.internet_num_start += 10
    $scope.internet_page = $scope.internet_num_start

    $scope.InternetTableButtons = []
    for(var i = $scope.internet_num_start; i < $scope.internet_num_end; i++) {
      $scope.InternetTableButtons.push(i)
    }

    $scope.targetInternetListShow = []
    for(var i = $scope.internet_page * 20; i < ($scope.internet_page * 20 + 20) && i < $scope.targetInternetList.length; i ++) {
      $scope.targetInternetListShow.push($scope.targetInternetList[i])
    }
  }

  $scope.internetTableIndexButton = (n) => {
    $scope.internet_page = n

    $scope.targetInternetListShow = []

    for(var i = $scope.internet_page * 20; i < ($scope.internet_page * 20 + 20) && i < $scope.targetInternetList.length; i ++) {
      $scope.targetInternetListShow.push($scope.targetInternetList[i])
    }
  }



  $scope.broadTableLeftButton = () => {
    if($scope.broadcast_num_start == 0) return;
    $scope.broadcast_num_start -= 10
    $scope.broadcast_num_end = $scope.broadcast_num_start  + 10
    $scope.broad_page = $scope.broadcast_num_end-1

    $scope.BroadcastTableButtons = []
    for(var i = $scope.broadcast_num_start; i < $scope.broadcast_num_end; i++) {
      $scope.BroadcastTableButtons.push(i)
    }

    $scope.targetBroadcastListShow = []
    for(var i = $scope.broad_page * 20; i < ($scope.broad_page * 20 + 20) && i < $scope.targetBroadcastList.length; i ++) {
      $scope.targetBroadcastListShow.push($scope.targetBroadcastList[i])
    }
  }

  $scope.broadTableRightButton = () => {
    if($scope.broadcast_num_start + 10 > $scope.broadcast_num_end) return;
    $scope.broadcast_num_end += 10
    $scope.broadcast_num_end = ($scope.broadcast_num_end > $scope.broad_page_total) ? $scope.broad_page_total : $scope.broadcast_num_end
    $scope.broadcast_num_start += 10
    $scope.broad_page = $scope.broadcast_num_start

    $scope.BroadcastTableButtons = []
    for(var i = $scope.broadcast_num_start; i < $scope.broadcast_num_end; i++) {
      $scope.BroadcastTableButtons.push(i)
    }

    $scope.targetBroadcastListShow = []
    for(var i = $scope.broad_page * 20; i < ($scope.broad_page * 20 + 20) && i < $scope.targetBroadcastList.length; i ++) {
      $scope.targetBroadcastListShow.push($scope.targetBroadcastList[i])
    }
  }

  $scope.broadTableIndexButton = (n) => {
    $scope.broad_page = n

    $scope.targetBroadcastListShow = []
    for(var i = $scope.broad_page * 20; i < ($scope.broad_page * 20 + 20) && i < $scope.targetBroadcastList.length; i ++) {
      $scope.targetBroadcastListShow.push($scope.targetBroadcastList[i])
    }
  }


  $scope.filtering = () => {
    $scope.filterString = []

    if($scope.filterValue !== '') {
      var str1 = $scope.filterValue.replace(/ /gi,'')
      if(str1.length !== 0) {
        var temp = []
        
        var tempArr = str1.split(',')
        for(var i = 0 ; i < tempArr.length; i++) {
          if(tempArr[i] !== '') {
            $scope.filterString.push(tempArr[i])
          }
        }
      }
    }
    $scope.SelectTarget();
    
  }

  Javafiltering = () => {
    $scope.filtering();
    $scope.$apply();
  }

  $scope.clear = () => {
    $scope.filterString = []
    $scope.filterValue = ''
    $scope.SelectTarget();
  }
}])
