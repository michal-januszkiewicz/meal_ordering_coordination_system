angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order, User) {

    // Toggle between active and history orders.
    $scope.toggleOrdersTabs = function(type) {
        $scope.getOrders(type);
        $scope.ordersTabType = type;
        $scope.currentOrder = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        $scope.currentOrder = $scope.currentOrders[orderID];
        $scope.editOrderClicked = false;
        $scope.getMeals();
    };

    $scope.showAddOrderOption = function() {
        return $scope.ordersTabType == 'active';
    };

    $scope.addNewOrder = function() {
        Order.create($scope.newOrder).then(onOrderCreateSuccess, onOrderCreateError);
    };
    
    $scope.toggleEditOrderForm = function() {
        $scope.editOrderClicked = !$scope.editOrderClicked;
        if ($scope.editOrderClicked) {
            // Clone current order to use a clone for editing.
            $scope.currentOrderEdit = {
                id: $scope.currentOrder.id,
                restaurant: $scope.currentOrder.restaurant,
                status: $scope.currentOrder.status,
                user_id: $scope.currentOrder.user_id,
            }
        }
    };

    $scope.editOrder = function() {
        Order.update($scope.currentOrderEdit).then(onOrderEditSuccess, onOrderEditError);
    };

    $scope.destroyOrder = function() {
        Order.destroy($scope.currentOrder.id).then(onOrderDestroySuccess, onOrderDestroyError);
    };
    
    $scope.getUsers = function() {
        User.index()
            .success(function(users) {
                users.forEach(function(user) {
                    $scope.users[user.id] = user;
                });
            });
    };

    $scope.getOrders = function(type) {
        $scope.allOrders[type] = {};
        Order.index({type: type})
            .success(function(orders) {
                orders.forEach(function(order) {
                    $scope.allOrders[type][order.id] = order;
                });
                $scope.currentOrders = $scope.allOrders[type];
                $scope.setDefaultOrder();
            });
    };

    $scope.setDefaultOrder = function() {
        var key = Object.keys($scope.currentOrders)[0];
        if (key !== undefined) {
            $scope.changeCurrentOrder(key);
        }
    };

    function onOrderCreateSuccess(order) {
        $scope.currentOrders[order.data.id] = order.data;
    }

    function onOrderCreateError(error) {
        // Display error.
    }
    
    function onOrderEditSuccess(order) {
        $scope.editOrderClicked = false;
        if (order.data.status != 'finalized' && $scope.ordersTabType == 'active'
            || order.data.status == 'finalized' && $scope.ordersTabType == 'history') {
            $scope.currentOrders[order.data.id] = order.data;
            $scope.currentOrder = order.data;
            $scope.getMeals();
        }
        else {
            delete $scope.currentOrders[order.data.id];
            $scope.setDefaultOrder();
        }
    }

    function onOrderEditError(error) {
        // Display error.
    }

    function onOrderDestroySuccess(response) {
        $scope.getOrders($scope.ordersTabType);
        $scope.currentOrders = $scope.allOrders[$scope.ordersTabType];
        $scope.currentOrder = {};
    }

    function onOrderDestroyError(error) {
        // Display error.
    }
});
