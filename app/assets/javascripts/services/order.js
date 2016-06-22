angular.module('orderingSystem').service('Order', function($http, $cookies) {
    var api_endpoint = '/api/v1/orders';
    var api_key = '';

    this.index = function(params) {
        return $http({
            url: api_endpoint,
            method: 'GET',
            params: params,
            headers: {
                'Authorization': api_key
            },
        });
    };

    this.create = function(params) {
        return $http.post(api_endpoint, params, {
            headers: {
                'Authorization': api_key
            }
        });
    };

    this.update = function(params) {
        return $http.put(api_endpoint + '/' + params.id, params, {
            headers: {
                'Authorization': api_key
            }
        })
    };

    this.destroy = function(id) {
        return $http.delete(api_endpoint + '/' + id, {
            headers: {
                'Authorization': api_key
            }
        })
    };

    this.setApiKey = function() {
        api_key = $cookies.get('api_key');
    };

    return this;
});