const FIELDS = require('../../fields');

const Allergy = require('../../types/allergy/allergy');
const {	getAllergy, getAllergies } = require('../../queries/allergy/allergy');

module.exports = {
	allergy: {
		type: Allergy.type,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getAllergy(args.id)
	},
	allergies: {
		type: FIELDS.list(Allergy.type),
		args: {
			id: Allergy.defaultFields.id
		},
		resolve: async (parent, args) => {
			return await getAllergies(args);
		}
	}
};