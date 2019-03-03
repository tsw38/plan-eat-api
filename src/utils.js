const uuid = require('uuid/v4');

for(let i = 0; i < 10; i++) {
	console.warn(uuid());
}