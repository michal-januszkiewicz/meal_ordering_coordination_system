angular.module('orderingSystem').controller('baseCtrl', function($scope, $controller) {
    
    // Get scopes of other controllers.
    angular.extend(this, $controller('ordersCtrl', {$scope: $scope}));
    angular.extend(this, $controller('mealsCtrl', {$scope: $scope}));
    angular.extend(this, $controller('usersCtrl', {$scope: $scope}));
    
    // Initialize models.
    $scope.users = {};
    $scope.newMeal = {};
    $scope.newOrder = {};
    $scope.currentMeal = {};
    $scope.currentOrder = {};
    
    // Hide edit forms.
    $scope.editOrderClicked = false;
    $scope.editMealClicked = false;
    
    // Hide div for error messages.
    $scope.error = '';
    $scope.showError = false;

    // Get users from api.
    $scope.getUsers();
    
    // Get only active orders from api.
    $scope.getOrders('active');
    
    // Turn off filtering.
    $scope.statusFilter = '';


    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';

    // Display error message when api call returns an error.
    $scope.displayError = function(error) {
        $scope.error = error.msg;
        $scope.showError = true;
    };
});

