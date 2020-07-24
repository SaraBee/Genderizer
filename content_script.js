var dict;
var GERMAN = "de";
var SPANISH = "es";
var supported_languages = [GERMAN, SPANISH];
var dictionaries = {"de": "big_german_dictionary.json", "es": "spanish_dictionary.json"};
var regexes = {
	"de": new RegExp('[A-ZÄÖÜ][a-zäöüß]+|(<[^>]*>)','g'), // German nouns
	"es": new RegExp('[A-ZÑÁÉÍÓÚÜa-zñáéíóúü]+|(<[^>]*>)', 'g'), // Spanish words (not just nouns)
};

var fcolor = "blue";
var mcolor = "red";
var ncolor = "green";
var acolor = "purple";

chrome.storage.sync.get(['femColor', 'mascColor', 'neutColor', 'ambColor'], function(result) {
	fcolor = result.femColor;
	mcolor = result.mascColor;
	ncolor = result.neutColor;
	acolor = result.ambColor;
});

chrome.storage.sync.get(['ext_active'], function(result) {
	if (result.ext_active == 'on') {
		chrome.i18n.detectLanguage(document.body.innerText, function(result) {
			if (result.languages.length > 0) {
				colorize(result.languages[0].language);
			}
		})
	}
});

function colorize(language) {
	if (supported_languages.indexOf(language) < 0) {
		return;
	}
	var dictionary = dictionaries[language];

	url = chrome.runtime.getURL('lexicon/' + dictionary); // load conditioning on if extension is enabled
	fetch(url).then(f => f.json()).then(j => {dict = j; walkAndReplace(language)}).catch(e => console.log(e));
}

function walkAndReplace(language) {
	let re = regexes[language];
	var walker = document.createTreeWalker(
	document.body,
	NodeFilter.SHOW_TEXT,
	function(node) {
		var matches = node.textContent.match(re);

		if (matches) {
		return NodeFilter.FILTER_ACCEPT;
		} else {
		return NodeFilter.FILTER_SKIP;
		}
	},
	false);

	var nodes = [];

	while (walker.nextNode()) {
	nodes.push(walker.currentNode);
	}

	for(var i = 0; node=nodes[i] ; i++) {
		if (node.parentNode) {
			node.parentNode.innerHTML = (node.parentNode.innerHTML.replace(re, wrapper))
		}
	}
}

function getSuffixGender(word) {
	// If we've made it in here, the word isn't in the dictionary and we're checking for
	// a suffix that predictably imparts gender

	let suffixes = {
		'a': 'Fem',
		'anz': 'Fem',
		'ei': 'Fem',
		'enz': 'Fem',
		'heit': 'Fem',
		'ie': 'Fem',
		'ik': 'Fem',
		'in': 'Fem',
		'keit': 'Fem',
		'schaft': 'Fem',
		'sion': 'Fem',
		'tät': 'Fem',
		'tion': 'Fem',
		'ung': 'Fem',
		'ur': 'Fem',
		'ant': 'Masc',
		'ast': 'Masc',
		'ich': 'Masc',
		'ig': 'Masc',
		'ismus': 'Masc',
		'ling': 'Masc',
		'or': 'Masc',
		'us': 'Masc',
		'chen': 'Neut',
		'lein': 'Neut',
		'ma': 'Neut',
		'ment': 'Neut',
		'sel': 'Neut',
		'tel': 'Neut',
		'um': 'Neut'
	};

	word_ending = word.substring(word.length - 6);

	while (word_ending.length > 0) {
		if (word_ending in suffixes) {
			return suffixes[word_ending];
		}

		word_ending = word_ending.substring(1)
	}

	// we still haven't found it! return ambiguous for now
	return null;
}

function wrapper(match) {
	//let wrapped_match = '<span style="color:blue">' + match + '</span>';
	let color = "black";
	let gender = null;
	if (dict.hasOwnProperty(match)) {
		gender = dict[match];
		switch (gender) {
			case "Masc":
				color = mcolor;
				break;
			case "Fem":
			case "Plur":
				color = fcolor;
				break;
			case "MascFem":
			case "Ambiguous":
				color = acolor;
				break;
			case "Neut":
				color = ncolor;
				break
			default:
				console.log("how did you get here?", match, dict[match]);
				color = "black";
		}
		console.log(`Dictionary match - ${match}: ${dict[match]}`);
		return `<span style="color: ${color}">${match}</span>`;
	}
	return match
}

