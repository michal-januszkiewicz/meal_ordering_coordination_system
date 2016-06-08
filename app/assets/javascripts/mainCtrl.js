angular.module('orderingSystem', [])
    .controller('mainCtrl',
        function($scope, Order) {
            $scope.allOrders = Order.index();
            $scope.currentOrders = $scope.allOrders.active;
            $scope.currentOrder = $scope.currentOrders[1];

            // Display active orders tab in the beginning.
            $scope.ordersTabType = 'active';

            // Toggle between active and history orders.
            $scope.toggleOrdersTabs = function(type) {
                $scope.currentOrders = $scope.allOrders[type];
                $scope.ordersTabType = type;
            }
        }
    );
