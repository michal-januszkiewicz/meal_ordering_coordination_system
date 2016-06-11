angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order, User) {
    $scope.users = {};
    $scope.allOrders = {};

    User.index()
        .success(function(users) {
            users.forEach(function(user) {
                $scope.users[user.id] = user;
            });
        });

    Order.index()
        .success(function(orders) {
            orders.forEach(function(order) {
                $scope.allOrders[order.id] = order;
            });
        });

    function onOrderCreateSuccess(order) {
        $scope.currentOrders[order.data.id] = order.data;
    }

    function onOrderCreateError(error) {
        // Display error.
    }

    // $scope.currentOrders = $scope.allOrders.active;
    $scope.currentOrders = $scope.allOrders;
    $scope.currentOrder = '';
    $scope.newMeal = {
        user_id: '',
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
        $scope.currentOrders = $scope.allOrders[type];
        $scope.ordersTabType = type;
        $scope.currentOrder = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        $scope.currentOrder = $scope.currentOrders[orderID];
    };

    $scope.addNewMeal = function() {
        $scope.currentOrder.meals.push($scope.newMeal);
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
