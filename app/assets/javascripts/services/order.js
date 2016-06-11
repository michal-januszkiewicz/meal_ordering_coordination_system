angular.module('orderingSystem').service('Order', function($http) {
    var api_endpoint = "/api/v1/orders";
    this.index = function() {
        return $http.get(api_endpoint);
    };
    
    this.create = function(params) {
        return $http.post(api_endpoint, params);
    };
    // this.index = function() {
    //     return {
    //         active : {
    //             1: {
    //                 restaurant: 'restaurant2',
    //                 status: 'ordered',
    //                 user_id: 1,
    //                 meals : [
    //                     {user_id: 1, name: 'meal1', price: '11.00'},
    //                     {user_id: 2, name: 'meal4', price: '12.00'},
    //                     {user_id: 3, name: 'meal5', price: '13.00'},
    //                 ]},
    //             2: {
    //                 restaurant: 'restaurant1',
    //                 status: 'delivered',
    //                 user_id: 2,
    //                 meals : [
    //                     {user_id: 1, name: 'meal1', price: '11.00'},
    //                     {user_id: 2, name: 'meal2', price: '122.00'},
    //                     {user_id: 3, name: 'meal3', price: '133.00'},
    //                 ]},
    //             3: {
    //                 restaurant: 'restaurant3',
    //                 status: 'in progress',
    //                 user_id: 1,
    //                 meals : [
    //                     {user_id: 1, name: 'meal1', price: '1.00'},
    //                     {user_id: 2, name: 'meal22', price: '9.00'},
    //                     {user_id: 3, name: 'meal32', price: '13.00'},
    //                 ]},
    //         },
    //         history : {
    //             4: {
    //                 restaurant: 'restaurant2',
    //                 status: 'finalized',
    //                 user_id: 1,
    //                 meals : [
    //                     {user_id: 1, name: 'meal1', price: '11.00'},
    //                     {user_id: 2, name: 'meal2', price: '12.00'},
    //                     {user_id: 3, name: 'meal3', price: '13.00'},
    //                 ]},
    //             5: {
    //                 restaurant: 'finalized',
    //                 status: 'delivered',
    //                 user_id: 2,
    //                 meals : [
    //                     {user_id: 1, name: 'meal1234', price: '15.00'},
    //                     {user_id: 2, name: 'meal223', price: '12.00'},
    //                     {user_id: 3, name: 'meal323', price: '8.00'},
    //                 ]},
    //             6: {
    //                 restaurant: 'restaurant3',
    //                 status: 'finalized',
    //                 user_id: 1,
    //                 meals : [
    //                     {user_id: 1, name: 'meal134', price: '11.00'},
    //                     {user_id: 2, name: 'meal23', price: '1222.00'},
    //                     {user_id: 3, name: 'meal32', price: '13.00'},
    //                 ]},
    //         },
    //     };
    // };
    return this;
});