//(function ($) {
  //$(document).ready(function () {
     //you awesome code goes here
  //});
//})(jQuery);
function customersController($scope,$http) {
  $http.get("data.js")
  .success(function(response) {$scope.customers = response;});
}
