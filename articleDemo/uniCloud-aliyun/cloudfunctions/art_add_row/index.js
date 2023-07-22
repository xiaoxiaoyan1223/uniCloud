'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let {detail}=event
	return detail
	db.collection("article").add({
		postTime=Date.now(),
		...detail
	})
	
};
