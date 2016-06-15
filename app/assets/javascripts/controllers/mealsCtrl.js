angular.module('orderingSystem').controller('mealsCtrl', function($scope, Meal) {

    // Get meals from api.
    $scope.getMeals = function() {
        $scope.currentOrder.meals = {};
        Meal.index($scope.currentOrder.id)
            .success(function(meals) {
                // Store meals in an object with meal ids as keys.
                meals.forEach(function(meal) {
                    $scope.currentOrder.meals[meal.id] = meal;
                });
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };
    
    // Call api to add a new meal.
    $scope.addNewMeal = function() {
        Meal.create($scope.currentOrder.id, $scope.newMeal)
            .success(function(meal) {
                // Reset the form.
                $scope.newMeal = {};
                $scope.currentOrder.meals[meal.id] = meal;
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };
    
    // Call api to edit a meal.
    $scope.editMeal = function(meal_id) {
        Meal.update($scope.currentOrder.id, meal_id, $scope.currentMeal)
            .success(function(meal) {
                // Update the meal with api data.
                $scope.currentOrder.meals[meal.id] = meal;
                // Hide meal edit form.
                $scope.editMealClicked = false;
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };

    // Call api to destroy a meal.
    $scope.destroyMeal = function(meal_id) {
        Meal.destroy($scope.currentOrder.id, meal_id)
            .success(function() {
                delete $scope.currentOrder.meals[meal_id];
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };
    
    // Show meals only for orders with status 'in progress'.
    $scope.showAddMealForm = function() {
        return $scope.currentOrder.status == 'in progress' && $scope.currentOrder != '';
    };
    
    // Show edit meal form only for clicked meal.
    $scope.showMealEditForm = function(meal) {
        return meal.id == $scope.currentMeal.id && $scope.editMealClicked
    };

    // Toggle meal edit form display.
    $scope.toggleMealEditForm = function(meal) {
        // Hide/show form.
        $scope.editMealClicked = !$scope.editMealClicked;
        // If form is displayed.
        if ($scope.editMealClicked) {
            // Clone meal to use a clone for editing.
            $scope.currentMeal = {
                id: meal.id,
                name: meal.name,
                price: meal.price,
                user_id: meal.user_id,
                order_id: meal.order_id,
            };
        }
    };

});
