
require(['angular','domReady!'],function(angular,doc){
        var personApp=angular.module("personApp",[]);
        function personaddController ($scope,$http) {
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



          }

          personApp.controller('personaddController',personaddController);


          personApp.directive('ensureunique', ['$http', '$timeout', function($http, $timeout) {
            console.log('directive here');
            var checking = null;
            return {
              require: 'ngModel',
              restrict: 'AE',
              link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function(newVal) {

                  if (!checking) {
                    checking = $timeout(function() {
                      $http({
                        method: 'POST',
                        url: '/'+attrs.ensureunique+'/'+newVal,
                        data: {'field': attrs.ensureunique}
                      }).success(function(data, status, headers, cfg) {
                       
                      
                         console.log('unique is'+data.isUnique);
                         c.$setValidity('nounique', data.isUnique);
                         checking = null;
                       
                       
                      }).error(function(data, status, headers, cfg) {

                        checking = null;
                      });
                    }, 500);
                  }
                });
              }
            }
          }]);

          angular.bootstrap(doc,['personApp']);

});


