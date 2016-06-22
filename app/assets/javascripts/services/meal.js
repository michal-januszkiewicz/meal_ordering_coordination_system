angular.module('orderingSystem').service('Meal', function($http, $cookies) {
    var api_endpoint = '/api/v1/orders/';
    var api_key = '';
    
    this.index = function(order_id) {
        return $http.get(api_endpoint + order_id + '/meals', {
            headers: {
                'Authorization': api_key
            }
        });
    };
    
    this.create = function(order_id, params) {
        return $http.post(api_endpoint + order_id + '/meals', params, {
            headers: {
                'Authorization': api_key
            }
        });
    };
    
    this.update = function(order_id, id, params){
        return $http.put(api_endpoint + order_id + '/meals/' + id, params, {
            headers: {
                'Authorization': api_key
            }
        });
    };

    this.destroy = function(order_id, id) {
        return $http.delete(api_endpoint + order_id + '/meals/' + id, {
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
