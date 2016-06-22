angular.module('orderingSystem').service('AuthToken', function($http) {
    var api_endpoint = '/api/v1/auth_tokens';
    
    this.create = function() {
        return $http.post(api_endpoint);
    };
});
