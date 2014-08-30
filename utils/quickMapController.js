var fs = require('fs');

exports.getMapHelper = function(app, exports) {
	return {
		mapPath: function(path, fun, name, isPost) {
			exports['name'] = fun;
			if (isPost) {
				app.post(path, fun);
			} else {
				app.get(path, fun);
			}

		},
		mapPathByPost: function(path, fun, name) {
			this.mapPath(path, fun, name, true);
		}
	};
}