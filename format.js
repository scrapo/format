const escape = require('escape');

const symbolOpenOuter = '{';
const symbolOpenInner = '{';
const symbolCloseInner = '}';
const symbolCloseOuter = '}';
const symbolOptional = '?';
const regExp = new RegExp(escape.regExp(symbolOpenOuter) + '(.*?)' + escape.regExp(symbolOpenInner) + '(' + escape.regExp(symbolOptional) + '?)(.+?)' + escape.regExp(symbolCloseInner) + '(.*?)' + escape.regExp(symbolCloseOuter), 'g');

const strategies = {
	object: function (o, values) {
		var result = {};
		for (var key in o) {
			if (o.hasOwnProperty(key)) {
				var value = o[key], valueType = typeof value;
				result[key] = strategies[valueType] ? strategies[valueType](value, values) : value;
			}
		}
		return result;
	},
	string: function (s, values) {
		return s.replace(regExp, function (match, prefix, optional, key, suffix) {
			if (optional || values[key]) {
				return prefix + (values[key] || '') + suffix;
			}
			throw new Error('Missing value "' + key + '"');
		});
	}
};

module.exports = function (o, values) {
	return strategies[typeof o](o, values);
};