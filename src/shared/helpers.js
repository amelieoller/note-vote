export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const arrayify = obj => {
	let array = [];
	for (let key in obj) if (obj.hasOwnProperty(key)) array.push([key, obj[key]]);
	return array;
};

export const sortArray = array =>
	array.sort(function(a, b) {
		return b[1].votes - a[1].votes;
	});
