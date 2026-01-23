const mongoose = require('mongoose');

const villageListSchema = new mongoose.Schema({
	villageName: {
		type: String,
		required: true,
	},
	villageCode: {
		type: String,
		required: true,
		index: true,
	},
	villageId: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports =
	mongoose.models.VillageList ||
	mongoose.model('VillageList', villageListSchema);
