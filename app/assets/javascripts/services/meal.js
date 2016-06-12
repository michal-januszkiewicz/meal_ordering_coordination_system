angular.module('orderingSystem').service('Meal', function($http) {
    var api_endpoint = '/api/v1/orders/';
    
    this.create = function(order_id, params) {
        return $http.post(api_endpoint + order_id + '/meals', params);
    };
});
