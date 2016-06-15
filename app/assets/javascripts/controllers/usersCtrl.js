angular.module('orderingSystem').controller('ordersCtrl', function($scope, User) {

    $scope.getUsers = function() {
        User.index()
            .success(function(users) {
                users.forEach(function(user) {
                    $scope.users[user.id] = user;
                });
            });
    };

});
