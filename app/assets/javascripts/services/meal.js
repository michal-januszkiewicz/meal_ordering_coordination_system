angular.module('orderingSystem').service('Meal', function($http) {
    var api_endpoint = '/api/v1/orders/';
    
    this.create = function(order_id, params) {
        return $http.post(api_endpoint + order_id + '/meals', params);
    };
    
    this.update = function(order_id, id, params) {
        return $http.put(api_endpoint + order_id + '/meals/' + id, params);
    };
});
