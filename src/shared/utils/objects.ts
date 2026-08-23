export const isObject = (item: any): boolean => {
	return item !== null && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeepOutObject = (target: any, source: any) => {
	const output = { ...target };

	for (const key in source) {
		if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
			output[key] = mergeDeepOutObject(target[key] || {}, source[key]);
		} else {
			output[key] = source[key];
		}
	}
	return output;
};

export const isNumber = (value?: string | number): boolean => {
	return (
		value != null &&
		value.toString().replace(/\s+/g, "${$}$") !== "${$}$" &&
		!isNaN(Number(value.toString()))
	);
};

export const deepEqual = (object1: any, object2: any) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		const areObjects = isObject(val1) && isObject(val2);
		if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
			return false;
		}
	}
	return true;
};
