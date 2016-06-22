angular.module('orderingSystem').service('User', function($http, $cookies) {
    var api_endpoint = "/api/v1/users";
    var api_key = '';

    this.index = function () {
        return $http.get(api_endpoint, {
            headers: {
                'Authorization': api_key
            }
        });
    };

    this.setApiKey = function() {
        api_key = $cookies.get('api_key');
    };
    
    return this;
});
