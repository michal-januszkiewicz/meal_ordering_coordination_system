angular.module('orderingSystem').controller('usersCtrl', function($scope, User) {

    // Get users from api.
    $scope.getUsers = function() {
        User.index()
            .success(function(users) {
                // Store users in an object with user ids as keys.
                users.forEach(function(user) {
                    $scope.users[user.id] = user;
                });
            })
            .error(function(error) {
                $scope.displayError(error);
            })
    };

});
