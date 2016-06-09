angular.module('orderingSystem', []).controller('mainCtrl', function($scope, Order, User) {
        $scope.allOrders = Order.index();
        $scope.users = User.index();
        $scope.currentOrders = $scope.allOrders.active;
        $scope.currentOrder = '';
        $scope.newMeal = {
            user_id: '',
            name: '',
            price: '',
        };

        // Display active orders tab in the beginning.
        $scope.ordersTabType = 'active';

        // Toggle between active and history orders.
        $scope.toggleOrdersTabs = function(type) {
            $scope.currentOrders = $scope.allOrders[type];
            $scope.ordersTabType = type;
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
        }
    }
);

