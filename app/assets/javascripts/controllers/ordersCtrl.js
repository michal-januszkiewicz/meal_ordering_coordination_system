angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order, User) {
    $scope.users = {};
    User.index()
        .success(function(users) {
            users.forEach(function(user) {
                $scope.users[user.id] = user;
            });
        });
    $scope.allOrders = Order.index();
    $scope.currentOrders = $scope.allOrders.active;
    $scope.currentOrder = '';
    $scope.newMeal = {
        user_id: '',
        name: '',
        price: '',
    };
    $scope.newOrder = {
        restaurant: '',
        status: 'in progress',
        meals: [],
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
        console.log($scope.newOrder);
        $scope.currentOrders[$scope.newOrder.order_id] = $scope.newOrder;
    };
});
