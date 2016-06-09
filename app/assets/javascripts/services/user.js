angular.module('orderingSystem').service('User', function() {
    this.index = function () {
        return {
            1: { name: 'user1' },
            2: { name: 'user2' },
            3: { name: 'user3' },
        }
    }
});
