angular.module('orderingSystem').controller('ordersCtrl', function($scope, Order, User, Meal) {
    $scope.users = {};
    $scope.allOrders = {
        active: {},
        history: {},
    };
    $scope.newMeal = {
        name: '',
        price: '',
    };
    $scope.newOrder = {
        restaurant: '',
    };
    $scope.currentMeal = {};
    $scope.currentOrder = '';
    $scope.editOrderClicked = false;
    $scope.editMealClicked = false;
    
    getUsers();
    getOrders('active');

    $scope.currentOrders = $scope.allOrders.active;

    // Display active orders tab in the beginning.
    $scope.ordersTabType = 'active';

    // Toggle between active and history orders.
    $scope.toggleOrdersTabs = function(type) {
        getOrders(type);
        $scope.currentOrders = $scope.allOrders[type];
        $scope.ordersTabType = type;
        $scope.currentOrder = '';
    };

    // Display order chosen from the list.
    $scope.changeCurrentOrder = function(orderID) {
        $scope.currentOrder = $scope.currentOrders[orderID];
        getMeals();
    };

    $scope.addNewMeal = function() {
        Meal.create($scope.currentOrder.id, $scope.newMeal).then(onMealCreateSuccess, onMealCreateError);
    };

    $scope.showAddMealOption = function() {
        return $scope.currentOrder.status == 'in progress' && $scope.currentOrder != '';
    };

    $scope.toggleMealEditForm = function(meal) {
        $scope.editMealClicked = !$scope.editMealClicked;
        if ($scope.editMealClicked) {
            $scope.currentMeal = meal;
        }
    };
    
    $scope.showMealEditForm = function(meal) {
      return meal.id == $scope.currentMeal.id && $scope.editMealClicked  
    };
    
    $scope.editMeal = function(meal_id) {
        Meal.update($scope.currentOrder.id, meal_id, $scope.currentMeal).then(onMealEditSuccess, onMealEditError);
        $scope.editMealClicked = false;
    };
    
    $scope.destroyMeal = function(meal_id) {
        Meal.destroy($scope.currentOrder.id, meal_id).then(onMealDestroySuccess, onMealDestroyError);
    };

    $scope.showAddOrderOption = function() {
        return $scope.ordersTabType == 'active';
    };

    $scope.addNewOrder = function() {
        Order.create($scope.newOrder).then(onOrderCreateSuccess, onOrderCreateError);
    };
    
    $scope.showEditOrderOption = function() {
        $scope.editOrderClicked = true;
    };

    $scope.editOrder = function(order_id) {
        Order.update(order_id, $scope.currentOrder).then(onOrderEditSuccess, onOrderEditError);
    };

    $scope.destroyOrder = function(order_id) {
        Order.destroy(order_id).then(onOrderDestroySuccess, onOrderDestroyError);
    };
    
    function getUsers() {
        User.index()
            .success(function(users) {
                users.forEach(function(user) {
                    $scope.users[user.id] = user;
                });
            });
    }

    function getOrders(type) {
        $scope.allOrders[type] = {};
        Order.index({type: type})
            .success(function(orders) {
                orders.forEach(function(order) {
                    $scope.allOrders[type][order.id] = order;
                });
            });
    }

    function getMeals() {
        $scope.currentOrder.meals = {};
        Meal.index($scope.currentOrder.id)
            .success(function(meals) {
                meals.forEach(function(meal) {
                    $scope.currentOrder.meals[meal.id] = meal;
                });
            });
    }

    function onOrderCreateSuccess(order) {
        $scope.currentOrders[order.data.id] = order.data;
    }

    function onOrderCreateError(error) {
        // Display error.
    }
    
    function onOrderEditSuccess(order) {
        $scope.currentOrders[order.data.id] = order.data;
        $scope.currentOrder = order.data;
    }

    function onOrderEditError(error) {
        // Display error.
    }

    function onOrderDestroySuccess(response) {
        getOrders($scope.ordersTabType);
        $scope.currentOrders = $scope.allOrders[$scope.ordersTabType];
    }

    function onOrderDestroyError(error) {
        // Display error.
    }

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
        getMeals();
    }

    function onMealDestroyError(error) {
        // Display error.
    }
});
