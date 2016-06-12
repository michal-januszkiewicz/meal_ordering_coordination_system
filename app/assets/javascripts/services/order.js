angular.module('orderingSystem').service('Order', function($http) {
    var api_endpoint = '/api/v1/orders';
    this.index = function(params) {
        return $http({
            url: api_endpoint,
            method: 'GET',
            params: params,
        });
    };

    this.create = function(params) {
        return $http.post(api_endpoint, params);
    };

    this.update = function(id, params) {
        return $http.put(api_endpoint + '/' + id, params)
    };
    
    return this;
});