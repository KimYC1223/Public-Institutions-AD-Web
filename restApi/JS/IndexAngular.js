let app = angular.module('myApp',[]);
let file = document.getElementById('jsonFile')
var parentElements = document.getElementsByClassName(`parentDivSub`);

function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

app.controller('MyController',['$scope',($scope)=> {
  $scope.groupData
  $scope.parents = []
  $isGreeting = false;
  $scope.childs = []
  $scope.searchName = getParameter("value")
  
  readGroupDataFile(`/read_group_info`, (str) => {
    $scope.groupData = JSON.parse(str)
    $scope.$apply()
    $scope.DrawMenuItem()
    if(getParameter("parent") != "") {
      $scope.selectParents(getParameter("parent"))
      $scope.$apply()
    }
  })

  $scope.DrawMenuItem = () => {
    $scope.parents = ["국무총리실 외", "법무부 외", "기획재정부 외", "교육부 외", "과학기술정보통신부 외", "외교부,통일부 외", "국방부 외", "행정안전부 외", "문화체육관광부 외", "농림축산식품부,해양수산부 외", "산업통상자원부 외", "보건복지부 외", "환경부,고용노동부 외", "국토교통부 외", "여성가족부 외"] 
    $scope.childs = []
    console.log($scope.parents)
    $scope.$apply()
  }

  $scope.selectParents = (p) => {
    $scope.childs = []
    $isGreeting = false;
    for(var i = 0 ; i < $scope.parents.length ; i++) {
      if($scope.parents[i] === p) {
        if(!parentElements[i].classList.contains('clicked'))
          parentElements[i].classList.add('clicked')
      } else {
        if(parentElements[i].classList.contains('clicked'))
          parentElements[i].classList.remove('clicked')
      }
    }

    for(var i = 0 ; i <$scope.groupData.length; i++) {
      if($scope.groupData[i].parent == p)
        $scope.childs.push($scope.groupData[i].child)
    }
  }

  $scope.selectChild = (c) => {
    location.href=`/dataPage?name=${c}`
  }

  $scope.greeting = () => {
    $scope.childs = []
    $scope.isGreeting = true;
  }
}])
