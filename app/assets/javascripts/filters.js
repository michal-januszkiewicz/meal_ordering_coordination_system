app.filter('statusFilter', function() {
    return function(orders, status) {
        if (status !== '') {
            var filtered = {};
            for (var order in orders) {
                if (orders[order].status === status) {
                    filtered[order] = orders[order];
                }
            }
            return filtered;
        }
        return orders;
    }
});