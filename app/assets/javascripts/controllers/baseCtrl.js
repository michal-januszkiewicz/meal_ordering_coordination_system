angular.module('orderingSystem').controller('baseCtrl', function($scope, $controller) {
    angular.extend(this, $controller('ordersCtrl', {$scope: $scope}));
    angular.extend(this, $controller('mealsCtrl', {$scope: $scope}));
    
    $scope.users = {};
    $scope.newMeal = {
        name: '',
        price: '',
    };
    $scope.newOrder = {
        restaurant: '',
    };
    $scope.currentMeal = {};
    $scope.currentOrder = {};
    $scope.editOrderClicked = false;
    $scope.editMealClicked = false;

    $scope.getUsers();
    $scope.getOrders('active');
    $scope.showStatus = '';


    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';
});

