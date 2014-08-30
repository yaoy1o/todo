/**
 * New node file
 */
function SelectedTestController($scope,$http) {



   $http.get("/area/parentAreas").success(function(data){
   				console.log(data);
                $scope.parentAreas=data;
                if(data.length>0){
                   $scope.selectedParentAreaValue=data[0]._id;
                }
               


              

            }).error(function(data, status, headers, config){
                alert("error");
            });


   $scope.$watch('selectedParentAreaValue', function(newVal, oldVal) {

        if (newVal === oldVal) { return; }

           $http.get("/area/childAreas",{params:{parentId:newVal}}).success(function(data){
                      console.log(data);
                        $scope.childAreas=data;
                    }).error(function(data, status, headers, config){
                        alert("error");
                    });

  });

   
    

  // $scope.parentAreas = [
  //   {"name": "福田",
  //    "value": "futian"},
  //   {"name": "罗湖",
  //    "value": "luohu"},
  //   {"name": "南山",
  //    "value": "nansan"}
  // ];


  // $scope.childAreas = {
  // 		  futian:[
		//     {"name": "上沙",
		//      "value": "shangsha"},
		//     {"name": "车公庙",
		//      "value": "chegonmiao"}
		    
		//   ],
		//    luohu:[
		//     {"name": "老街",
		//      "value": "laojie"},
		//     {"name": "东门",
		//      "value": "dongmen"} 
		//   ],

		//    nansan:[
		//     {"name": "保利",
		//      "value": "baoli"},
		//     {"name": "科技园",
		//      "value": "kejiyuan"} 
		//   ]


  // };

 
  // console.log($scope.childAreas[$scope.selectedParentArea]);

  // $scope.getChildArea=function(parentAreaValue){
  // 		return $scope.childAreas[parentAreaValue];
  // }

  // $scope.selectedChildArea=$scope.getChildArea($scope.selectedParentAreaValue);

  

}

 
