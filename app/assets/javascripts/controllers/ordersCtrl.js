angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order) {

    // Get orders from api.
    $scope.getOrders = function(type) {
        $scope.currentOrders = {};
        // Get orders only for current tab.
        Order.index({type: type})
            .success(function(orders) {
                // Store orders in an object with order ids as keys.
                orders.forEach(function(order) {
                    $scope.currentOrders[order.id] = order;
                });
                // Set first order as active and display it.
                $scope.setDefaultOrder();
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };

    // Call api to add new order.
    $scope.addNewOrder = function() {
        Order.create($scope.newOrder)
            .success(function(order) {
                // Reset the form.
                $scope.newOrder = {};
                // Add new order to the currentOrders object.
                $scope.currentOrders[order.id] = order;
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };

    // Call api to edit order.
    $scope.editOrder = function() {
        Order.update($scope.currentOrderEdit)
            .success(function(order) {
                // Hide edit form and it's buttons.
                $scope.editOrderClicked = false;
                // Check if order will stay on current tab.
                if (order.status != 'finalized' && $scope.ordersTabType == 'active'
                    || order.status == 'finalized' && $scope.ordersTabType == 'history') {
                    // Update the order with data from api.
                    $scope.currentOrders[order.id] = order;
                    // Set updated order as active.
                    $scope.currentOrder = order;
                    // Get order's meals from api.
                    $scope.getMeals();
                }
                else {
                    // Delete order from current tab if it was moved.
                    delete $scope.currentOrders[order.id];
                    // Set first order as active and display it.
                    $scope.setDefaultOrder();
                }
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };

    // Call api to destroy order.
    $scope.destroyOrder = function() {
        Order.destroy($scope.currentOrder.id)
            .success(function() {
                // Delete destroyed order form currentOrders object.
                delete $scope.currentOrders[$scope.currentOrder.id];
                // Set first order as active because active order
                // was just deleted.
                $scope.setDefaultOrder();
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };
    
    // Set first order as active.
    $scope.setDefaultOrder = function() {
        var key = Object.keys($scope.currentOrders)[0];
        // Check if the object is not empty.
        if (key !== undefined) {
            $scope.changeCurrentOrder(key);
        }
    };

    // Toggle between active and history orders.
    $scope.toggleOrdersTabs = function(type) {
        // Get orders from api for a tab.
        $scope.getOrders(type);
        // Change current tab.
        $scope.ordersTabType = type;
        // Reset the filter.
        $scope.statusFilter = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        // Change current order to the clicked one.
        $scope.currentOrder = $scope.currentOrders[orderID];
        // Hide order edit form if it was visible before.
        $scope.editOrderClicked = false;
        // Get meals for the order from api.
        $scope.getMeals();
    };

    // Show the form for adding an order.
    $scope.showAddOrderForm = function() {
        // The form is displayed only on 'active' tab.
        return $scope.ordersTabType === 'active';
    };

    // Toggle edit order form display.
    $scope.toggleEditOrderForm = function() {
        // Show/hide the form.
        $scope.editOrderClicked = !$scope.editOrderClicked;
        // If the form is displayed.
        if ($scope.editOrderClicked) {
            // Clone current order to use a clone for editing
            // so the current order is not overwritten.
            $scope.currentOrderEdit = {
                id: $scope.currentOrder.id,
                restaurant: $scope.currentOrder.restaurant,
                status: $scope.currentOrder.status,
                user_id: $scope.currentOrder.user_id,
            }
        }
    };

});
