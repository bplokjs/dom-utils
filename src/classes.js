export function hasClass(element, className) {
	if (element.classList)
		return !!className && element.classList.contains(className)
	else
		return ` ${element.className.baseVal || element.className} `.indexOf(` ${className} `) !== -1
}

export function addClass(element, className) {
	if (element.classList)
		element.classList.add(className)
	else if (!hasClass(element, className))
		if (typeof element.className === 'string')
			element.className = element.className + ' ' + className
		else
			element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className)
}

function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

export function removeClass(element, className) {
	if (element.classList)
		element.classList.remove(className)
	else if (typeof element.className === 'string')
		element.className = replaceClassName(element.className, className)
	else
		element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className))
}

export function toggleClass(element, className) {
	if (hasClass(element, className))
		removeClass(element, className)
	else
		addClass(element, className)
}