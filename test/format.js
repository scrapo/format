const assert = require('assert');
const format = require('../format');

suite('format', function () {
	test('with string and without values returns string', function () {
		assert.equal(format('Test'), 'Test');
	});
	test('with string and empty values returns string', function () {
		assert.equal(format('Test', {}), 'Test');
	});
	test('with string and value returns string', function () {
		assert.equal(format('Lorem {{test}}', {test: 'ipsum'}), 'Lorem ipsum');
	});
	test('with string and optional value returns string', function () {
		assert.equal(format('Lorem {{?test}}', {test: 'ipsum'}), 'Lorem ipsum');
	});
	test('with string and values returns string', function () {
		assert.equal(format('Lorem {{first}} sit {{second}} amet', {first: 'ipsum', second: 'dolor'}), 'Lorem ipsum sit dolor amet');
	});
	test('with string and missing value throws error', function () {
		assert.throws(function () { format('Lorem {{test}} sit', {}); }, /Missing value "test"/);
	});
	test('with string and optional missing value returns string', function () {
		assert.equal(format('Lorem {{?test}} sit', {}), 'Lorem  sit');
	});
	test('with object and value returns object', function () {
		assert.deepStrictEqual(format({'url': '//host.com/?{{query}}'}, {'query': 'test'}), {url: '//host.com/?test'});
	});
	test('with object and optional value returns object', function () {
		assert.deepStrictEqual(format({'url': '{{?url}}'}, {'url': '//host.com'}), {url: '//host.com'});
	});
	test('with object and missing value throws error', function () {
		assert.throws(function () { format({'url': '//host.com/?{{query}}'}, {}); }, /Missing value "query"/);
	});
	suite('prefix and suffix', function () {
		test('with string and value returns string', function () {
			assert.equal(format('Lorem {prefix-{test}-suffix}', {test: 'ipsum'}), 'Lorem prefix-ipsum-suffix');
		});
		test('with string and optional value returns string', function () {
			assert.equal(format('Lorem {prefix-{?test}-suffix}', {test: 'ipsum'}), 'Lorem prefix-ipsum-suffix');
		});
		test('with string and values returns string', function () {
			assert.equal(format('Lorem {pre1-{first}-suf1} sit {pre2-{second}-suf2} amet', {first: 'ipsum', second: 'dolor'}), 'Lorem pre1-ipsum-suf1 sit pre2-dolor-suf2 amet');
		});
		test('with string and missing value throws error', function () {
			assert.throws(function () { format('Lorem {prefix-{test}-suffix} sit', {}); }, /Missing value "test"/);
		});
		test('with string and optional missing value returns string', function () {
			assert.equal(format('Lorem {prefix-{?test}-suffix} sit', {}), 'Lorem prefix--suffix sit');
		});
	});
});