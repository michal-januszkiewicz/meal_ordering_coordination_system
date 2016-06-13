angular.module('orderingSystem').service('Meal', function($http) {
    var api_endpoint = '/api/v1/orders/';
    
    this.index = function(order_id) {
        return $http.get(api_endpoint + order_id + '/meals');
    };
    
    this.create = function(order_id, params) {
        return $http.post(api_endpoint + order_id + '/meals', params);
    };
    
    this.update = function(order_id, id, params) {
        return $http.put(api_endpoint + order_id + '/meals/' + id, params);
    };

    this.destroy = function(order_id, id) {
        return $http.delete(api_endpoint + order_id + '/meals/' + id);
    }
});
