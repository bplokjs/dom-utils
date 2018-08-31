const rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,
	// Used by camelCase as callback to replace()
	fcamelCase = function (all, letter) {
		return letter.toUpperCase();
	};

export default function camelCase(string) {
	return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}