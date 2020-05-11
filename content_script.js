var dict;
var GERMAN = "de";
var SPANISH = "es";
var supported_languages = [GERMAN, SPANISH];
var dictionaries = {"de": "big_german_dictionary.json", "es": "spanish_dictionary.json"};
var regexes = {
	"de": new RegExp('[A-ZÄÖÜ][a-zäöüß]+','g'), // German nouns
	"es": new RegExp('[A-ZÑÁÉÍÓÚÜa-zñáéíóúü]+', 'g'), // Spanish words (not just nouns)
};
run();

function run() {
	let htmlTag = document.getElementsByTagName("html").item(0);
	let lang = htmlTag.getAttribute("lang"); // let's try checking what language the page claims it is first
	if (lang != "" & lang != null) {
		colorize(lang);
	} else {
		let paragraphs = document.getElementsByTagName("p");
		let index = Math.round(paragraphs.length / 2); // grabbing a sample of text halfway down the page (hopefully)
		let sample = paragraphs[index].textContent;
		while (sample.length < 20) {
			index++;
			sample = paragraphs[index].textContent;
		}
		return detectLanguage(sample);
	}

}

function detectLanguage(inputText) {
	// wow cool, Chrome has built-in language detection!
	chrome.i18n.detectLanguage(inputText, function(result) {
		let output = result.languages[0];
		colorize(output.language);
	});
  }
  

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
		var matches = node.textContent.match(re); // later on: match based on language

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

function wrapper(match) {
	//let wrapped_match = '<span style="color:blue">' + match + '</span>';
	let color = "orange";
	if (dict.hasOwnProperty(match)) {
		console.log(`${match}: ${dict[match]}`);
		switch (dict[match]) {
			case "Masc":
				color = "blue";
				break;
			case "Fem":
				color = "red";
				break;
			case "MascFem":
			case "Ambiguous":
				color = "purple";
				break;
			case "Neut":
				color = "green";
				break
			default:
				console.log("how did you get here?", match, dict[match]);
				color = "pink";
		}
	}
	return `<span style="color: ${color}">${match}</span>`;
}

