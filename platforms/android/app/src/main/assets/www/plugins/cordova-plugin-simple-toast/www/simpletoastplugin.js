cordova.define("cordova-plugin-simple-toast.SimpleToastPlugin", function(require, exports, module) {
"use strict";

var exec = require("cordova/exec");

var simpleToastPlugin = {
	show: function(txt, duration, sc, ec) {
		exec(sc, ec, "SimpleToastPlugin", "show", [txt, duration]);
	}
};

module.exports = simpleToastPlugin;
});
