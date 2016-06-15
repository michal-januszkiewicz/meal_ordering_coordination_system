angular.module('orderingSystem').controller('mealsCtrl', function($scope, Meal) {

    $scope.getMeals = function() {
        $scope.currentOrder.meals = {};
        Meal.index($scope.currentOrder.id)
            .success(function(meals) {
                meals.forEach(function(meal) {
                    $scope.currentOrder.meals[meal.id] = meal;
                });
            });
    };
    
    $scope.addNewMeal = function() {
        Meal.create($scope.currentOrder.id, $scope.newMeal).then(onMealCreateSuccess, onMealCreateError);
    };
    
    $scope.editMeal = function(meal_id) {
        Meal.update($scope.currentOrder.id, meal_id, $scope.currentMeal).then(onMealEditSuccess, onMealEditError);
        $scope.editMealClicked = false;
    };

    $scope.destroyMeal = function(meal_id) {
        Meal.destroy($scope.currentOrder.id, meal_id).then(onMealDestroySuccess, onMealDestroyError);
    };
    
    $scope.showAddMealForm = function() {
        return $scope.currentOrder.status == 'in progress' && $scope.currentOrder != '';
    };
    
    $scope.showMealEditForm = function(meal) {
        return meal.id == $scope.currentMeal.id && $scope.editMealClicked
    };

    $scope.toggleMealEditForm = function(meal) {
        $scope.editMealClicked = !$scope.editMealClicked;
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

    function onMealCreateSuccess(meal) {
        $scope.currentOrder.meals[meal.data.id] = meal.data;
    }

    function onMealCreateError(error) {
        // Display error.
    }

    function onMealEditSuccess(meal) {
        $scope.currentOrder.meals[meal.data.id] = meal.data;
    }

    function onMealEditError(error) {
        // Display error.
    }

    function onMealDestroySuccess(response) {
        $scope.getMeals();
    }

    function onMealDestroyError(error) {
        // Display error.
    }
});
