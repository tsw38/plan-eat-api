// take two arrays of objects and update the original with the second array
const unify = (originalArray, updateArray, unifier) => {
	updateArray.forEach(obj2 => {
		for (let i = 0; i < originalArray.length; i++) {
			if (originalArray[i].hasOwnProperty(unifier) && originalArray[i][unifier] === obj2[unifier]) {
				originalArray[i] = obj2;
			}
		}
	});
	return originalArray;
};


module.exports = {
	unify
};
