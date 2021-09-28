let app = angular.module('myApp',[]);
let file = document.getElementById('jsonFile')
document.getElementById('headImgReal').addEventListener('click',()=>{
    if(getParameter("value") == "") {
        location.href = `/`
    } else {
        location.href = `/?value=${getParameter("value")}`
    }
    
})

function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

app.controller('MyController',['$scope','$sce',($scope,$sce)=> {
  $scope.childs = []
  $scope.searchName = getParameter("value")

  $scope.printResult = () => {
      $scope.childs = []
      if($scope.searchName !== "") {
        for(var i = 0 ; i < $scope.groupData.length; i++) {
            var index = $scope.groupData[i].child.indexOf($scope.searchName)
            if(index !== -1) {
              var str = $scope.groupData[i].child.substring(0,index) + `<hh>${$scope.searchName}</hh>` + $scope.groupData[i].child.substring(index+$scope.searchName.length);
              var sceVar = $sce.trustAsHtml(str)
              $scope.childs.push({ parent : $scope.groupData[i].parent, child : sceVar, link :`/dataPage?name=${$scope.groupData[i].child}` })
            }
        }
      }
  }

  readGroupDataFile(`/read_group_info`, (str) => {
    $scope.groupData = JSON.parse(str)
    console.log($scope.groupData.length)
    $scope.printResult();
    $scope.$apply()
  })

  $scope.selectChild = (i) => {
    location.href= $scope.childs[i].link
  }

  $scope.ValueChange = () => {
    $scope.printResult();
  }
}])
