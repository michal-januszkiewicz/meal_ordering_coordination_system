angular.module('orderingSystem').service('Meal', function($http) {
    var api_endpoint = '/api/v1/meals';
    
    this.create = function(params) {
        return $http.post(api_endpoint, params);
    };
});
