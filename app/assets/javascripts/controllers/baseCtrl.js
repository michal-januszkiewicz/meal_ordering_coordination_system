angular.module('orderingSystem').controller('baseCtrl', function($scope, $controller) {
    angular.extend(this, $controller('ordersCtrl', {$scope: $scope}));
    angular.extend(this, $controller('mealsCtrl', {$scope: $scope}));
    angular.extend(this, $controller('usersCtrl', {$scope: $scope}));
    
    $scope.users = {};
    $scope.newMeal = {};
    $scope.newOrder = {};
    $scope.currentMeal = {};
    $scope.currentOrder = {};
    $scope.editOrderClicked = false;
    $scope.editMealClicked = false;
    
    $scope.error = '';
    $scope.showError = false;

    $scope.getUsers();
    $scope.getOrders('active');
    $scope.showStatus = '';


    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';

    $scope.displayError = function(error) {
        $scope.error = error.msg;
        $scope.showError = true;
    };
});

