let app = angular.module('myApp',[]);
let file = document.getElementById('jsonFile')

function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

app.controller('MyController',['$scope',($scope)=> {
  $scope.groupData
  $scope.parents = []
  $scope.childs = []
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
    $scope.parents = ["법사위", "정무위", "기재위", "교육위",  "과방위", "외통위",  "국방위", "행안위", "문체위", "농해수위", "산자위", "복지위", "환노위", "국토위",  "여가위"]
    $scope.childs = []
    console.log($scope.parents)
    $scope.$apply()
  }

  $scope.selectParents = (p) => {
    $scope.childs = []
    for(var i = 0 ; i <$scope.groupData.length; i++) {
      if($scope.groupData[i].parent == p) {
        $scope.childs.push($scope.groupData[i].child)
      }
    }
  }

  $scope.selectChild = (c) => {
    location.href=`/dataPage?name=${c}`
  }
}])
