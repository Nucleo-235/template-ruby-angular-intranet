angular.module('rails').factory('setPagingHeadersInterceptor', function () {
    var _parseIntOrNull = function(value, nullValue) {
        if (value != null)
            return parseInt(value);
        else
            return nullValue;
    };
    return {
        'response': function (response) {
            try
            {
                if (response.config.method == 'GET') {
                    var totalValue = response.headers('Total');
                    if (totalValue != null && response.hasOwnProperty('data')) {
                        response.data.total = parseInt(response.headers('Total'));
                        response.data.page = _parseIntOrNull(response.headers('Page'), 1);
                        response.data.per_page = _parseIntOrNull(response.headers('Per-Page'), null);
                    }
                }
            }
            catch(err) {
                console.log(err);
            }
            return response;
        }
    };  
});
