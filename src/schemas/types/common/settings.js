const FIELDS = require('../../fields');

const SettingsType = FIELDS.object({
	name: 'Settings',
	description: '...',
	fields: () => ({
		startOfWeek: FIELDS.integer,
		units: FIELDS.boolean
	})
})

module.exports = {
	type: SettingsType
};