angular.module('orderingSystem').controller('baseCtrl', function($scope, $controller, $cookies, AuthToken, User, Order, Meal) {
    
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

    // Turn off filtering.
    $scope.statusFilter = '';

    // Create session's api key.
    AuthToken.create()
        .success(function(session) {
            // Add this string to api key so it can be accepted in the backend.
            session.api_key = 'Token token=' + session.api_key;
            
            // Put api key in a cookie.
            $cookies.put('api_key', session.api_key);

            // Set new api key for all services.
            User.setApiKey();
            Order.setApiKey();
            Meal.setApiKey();
            
            // Get users from api.
            $scope.getUsers();

            // Get only active orders from api.
            $scope.getOrders('active');
        })
        .error(function(error) {
            $scope.displayError(error);
        });

    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';

    // Display error message when api call returns an error.
    $scope.displayError = function(error) {
        $scope.error = error.msg;
        $scope.showError = true;
    };
});

