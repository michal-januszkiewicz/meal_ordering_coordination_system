angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order) {

    $scope.getOrders = function(type) {
        $scope.currentOrders = {};
        Order.index({type: type})
            .success(function(orders) {
                orders.forEach(function(order) {
                    $scope.currentOrders[order.id] = order;
                });
                $scope.setDefaultOrder();
            })
            .error(function(error) {
                // Display error
            })
    };

    $scope.addNewOrder = function() {
        Order.create($scope.newOrder)
            .success(function(order) {
                $scope.newOrder = {};
                $scope.currentOrders[order.id] = order;
            })
            .error(function(error) {
                // Display error
            })
    };

    $scope.editOrder = function() {
        Order.update($scope.currentOrderEdit)
            .success(function(order) {
                $scope.editOrderClicked = false;
                if (order.status != 'finalized' && $scope.ordersTabType == 'active'
                    || order.status == 'finalized' && $scope.ordersTabType == 'history') {
                    $scope.currentOrders[order.id] = order;
                    $scope.currentOrder = order;
                    $scope.getMeals();
                }
                else {
                    delete $scope.currentOrders[order.id];
                    $scope.setDefaultOrder();
                }
            })
            .error(function(error) {
                // Display error
            })
    };

    $scope.destroyOrder = function() {
        Order.destroy($scope.currentOrder.id)
            .success(function() {
                delete $scope.currentOrders[$scope.currentOrder.id]
                $scope.currentOrder = {};
            })
            .error(function(error) {
                // Display error
            })
    };
    
    $scope.setDefaultOrder = function() {
        var key = Object.keys($scope.currentOrders)[0];
        if (key !== undefined) {
            $scope.changeCurrentOrder(key);
        }
    };

    // Toggle between active and history orders.
    $scope.toggleOrdersTabs = function(type) {
        $scope.getOrders(type);
        $scope.ordersTabType = type;
        $scope.showStatus = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        $scope.currentOrder = $scope.currentOrders[orderID];
        $scope.editOrderClicked = false;
        $scope.getMeals();
    };

    $scope.showAddOrderForm = function() {
        return $scope.ordersTabType === 'active';
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

});
