angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order, User, Meal) {
    $scope.users = {};
    $scope.allOrders = {
        active: {},
        history: {},
    };
    
    getUsers();
    getOrders('active');

    function getUsers() {
        User.index()
            .success(function(users) {
                users.forEach(function(user) {
                    $scope.users[user.id] = user;
                });
            });
    }

    function getOrders(type) {
        $scope.allOrders[type] = {};
        Order.index({type: type})
            .success(function(orders) {
                orders.forEach(function(order) {
                    $scope.allOrders[type][order.id] = order;
                });
            });
    }

    function onOrderCreateSuccess(order) {
        $scope.currentOrders[order.data.id] = order.data;
    }

    function onOrderCreateError(error) {
        // Display error.
    }
    
    function onMealCreateSuccess(meal) {
        $scope.currentOrder.meals.push(meal.data);
    }

    function onMealCreateError(error) {
        // Display error.
    }

    $scope.currentOrders = $scope.allOrders.active;
    $scope.currentOrder = '';
    $scope.newMeal = {
        order_id: '',
        name: '',
        price: '',
    };
    $scope.newOrder = {
        restaurant: '',
    };

    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';

    // Toggle between active and history orders.
    $scope.toggleOrdersTabs = function(type) {
        getOrders(type);
        $scope.currentOrders = $scope.allOrders[type];
        $scope.ordersTabType = type;
        $scope.currentOrder = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        $scope.currentOrder = $scope.currentOrders[orderID];
    };

    $scope.addNewMeal = function() {
        $scope.newMeal.order_id = $scope.currentOrder.id;
        Meal.create($scope.newMeal).then(onMealCreateSuccess, onMealCreateError);
    };

    $scope.showAddMealOption = function() {
        return $scope.currentOrder.status == 'in progress' && $scope.currentOrder != '';
    };

    $scope.showAddOrderOption = function() {
        return $scope.ordersTabType == 'active';
    };

    $scope.addNewOrder = function() {
        Order.create($scope.newOrder).then(onOrderCreateSuccess, onOrderCreateError);
    };
});
