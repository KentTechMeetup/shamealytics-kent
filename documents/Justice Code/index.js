function customersController($scope,$http) {
    $http.get("data.js")
    .success(function(response) {$scope.customers = response;});
}