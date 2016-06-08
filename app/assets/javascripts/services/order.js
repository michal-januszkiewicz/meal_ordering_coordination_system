angular.module('orderingSystem').service('Order', function() {
    this.index = function() {
        return {
            active : [
                {
                    restaurant: 'restaurant2',
                    status: 'ordered',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
                {
                    restaurant: 'restaurant1',
                    status: 'delivered',
                    initiator : 'user2',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
                {
                    restaurant: 'restaurant3',
                    status: 'in progress',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
            ],
            history : [
                {
                    restaurant: 'restaurant2',
                    status: 'finalized',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
                {
                    restaurant: 'finalized',
                    status: 'delivered',
                    initiator : 'user2',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
                {
                    restaurant: 'restaurant3',
                    status: 'finalized',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
            ],
        };
    }
});