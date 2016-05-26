;(function (processor) {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = processor;
	} else {
		this.ProcessBEM = processor;
	}
})(function (html) {
	var isBemRegexp = /[.(]/g,
		whiteSpaceRegexp = /\s+/g,
		multipleWhiteSpaceRegexp = /\s\s+/g,
		classRegexp = /<[^>]*class\s*=\s*['"]\s*([^"']*)\s*['"]/g,
		getParenthesisRegexp = /(\([^)]+\))/g,
		getParenthesisValueRegexpString = '\\(([^)]+)\\)';

	function processHtml(html) {
		return html.replace(classRegexp, function (whole, match) {
			if (match.match(isBemRegexp)) {
				return whole.replace(match, processClassValue(match));
			}
			return whole;

		});

	}

	function processClassValue(classValue) {
		var classNames,
			i;

		classValue = classValue.replace(whiteSpaceRegexp, ' ');
		classValue = classValue.replace(multipleWhiteSpaceRegexp, ' ');
		classValue = classValue.replace(getParenthesisRegexp, function (match) {
			return match.replace(whiteSpaceRegexp, '')
		});
		classNames = classValue.split(' ');
		for (i = 0; i < classNames.length; i++) {
			if (classNames[i].match(isBemRegexp)) {
				classNames[i] = processClassName(classNames[i]);
			}
		}

		return classNames.join(' ');

	}

	function processClassName(className) {
		var dotSplit = className.split('.'),
			block = dotSplit[0].replace(getParenthesisRegexp, ''),
			element = dotSplit.length > 1 ? dotSplit.join('__').replace(getParenthesisRegexp, '') : false,
			parenthesisValues = (new RegExp(getParenthesisValueRegexpString, 'g')).exec(className),
			modifier = parenthesisValues ? parenthesisValues[1].split(',') : false,
			base = element ? element : block,
			result = [base],
			i;

		if (modifier) {
			for (i = 0; i < modifier.length; i++) {
				result.push(base + '--' + modifier[i]);
			}
		}

		return result.join(' ');

	}
	
	return processHtml(html);

});
