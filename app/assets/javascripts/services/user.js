angular.module('orderingSystem').service('User', function($http) {
    var api_endpoint = "/api/v1/users";
    this.index = function () {
        return $http.get(api_endpoint);
    };
    return this;
});
