angular.module('orderingSystem').service('Order', function() {
    this.index = function() {
        return {
            active : {
                1: {
                    restaurant: 'restaurant2',
                    status: 'ordered',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal4', price: '12.00'},
                        {user: 'user3', name: 'meal5', price: '13.00'},
                    ]},
                2: {
                    restaurant: 'restaurant1',
                    status: 'delivered',
                    initiator : 'user2',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '122.00'},
                        {user: 'user3', name: 'meal3', price: '133.00'},
                    ]},
                3: {
                    restaurant: 'restaurant3',
                    status: 'in progress',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '1.00'},
                        {user: 'user2', name: 'meal22', price: '9.00'},
                        {user: 'user3', name: 'meal32', price: '13.00'},
                    ]},
            },
            history : {
                4: {
                    restaurant: 'restaurant2',
                    status: 'finalized',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal1', price: '11.00'},
                        {user: 'user2', name: 'meal2', price: '12.00'},
                        {user: 'user3', name: 'meal3', price: '13.00'},
                    ]},
                5: {
                    restaurant: 'finalized',
                    status: 'delivered',
                    initiator : 'user2',
                    meals : [
                        {user: 'user1', name: 'meal1234', price: '15.00'},
                        {user: 'user2', name: 'meal223', price: '12.00'},
                        {user: 'user3', name: 'meal323', price: '8.00'},
                    ]},
                6: {
                    restaurant: 'restaurant3',
                    status: 'finalized',
                    initiator : 'user1',
                    meals : [
                        {user: 'user1', name: 'meal134', price: '11.00'},
                        {user: 'user2', name: 'meal23', price: '1222.00'},
                        {user: 'user3', name: 'meal32', price: '13.00'},
                    ]},
            },
        };
    }
});