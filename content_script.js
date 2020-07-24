let dict;
const GERMAN = "de";
const SPANISH = "es";
const supported_languages = [GERMAN, SPANISH];
const dictionaries = {"de": "german_dictionary.json", "es": "spanish_dictionary.json"};
const regexes = {
	"de": new RegExp('[A-ZÄÖÜ][a-zäöüß]+|(<[^>]*>)','g'), // German nouns
	"es": new RegExp('[A-ZÑÁÉÍÓÚÜa-zñáéíóúü]+|(<[^>]*>)', 'g'), // Spanish words (not just nouns)
};

let fcolor = "blue";
let mcolor = "red";
let ncolor = "green";
let acolor = "purple";

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

	url = chrome.runtime.getURL('lexicon/' + dictionaries[language]);
	fetch(url).then(f => f.json()).then(j => {dict = j; walkAndReplace(language)}).catch(e => console.log(e));
}

function walkAndReplace(language) {
	const re = regexes[language];
	const walker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT,
		node => node.textContent.match(re) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
		false
	);

	const nodes = [];

	while (walker.nextNode()) {
		nodes.push(walker.currentNode);
	}

	nodes.forEach(function(node) {
		if (node.parentNode) {
			node.parentNode.innerHTML = (node.parentNode.innerHTML.replace(re, wrapper))
		}
	});
}

function wrapper(match) {
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
				color = "black";
		}
		return `<span style="color: ${color}">${match}</span>`;
	}
	return match
}

