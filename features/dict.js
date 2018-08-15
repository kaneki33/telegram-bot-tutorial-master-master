
var parser = require("./parser.js");


function getDef(word, options, callback) {
    const lng = en;
	if(typeof callback != "function") throw "word-definition error: no callback specified (getDef function).";
	if(typeof options != "object") throw "word-definition error: options should be an object or null (getDef function).";

	if(!word || /[^\wœß]/.test(parser.stripAccents(word))) callback({ word: word, err: "invalid characters" });
	else if(!parsers[lng]) callback({ word: word, err: "unsupported language" });
	else new parsers[lng](word, options, callback).getTitles();

}

var languages = [

	{

		lng: "en",

		variants: [
			/^({{[^}]+}}\s*)*\[\[([^\]#|]+)[^\]]*\]\]\.*$/i,
			/\s*{{(([^|]+ of)|(alt form))\|([^}|]+)/
		],

		searchDef: function(page) {

			var def = "";

			var cats = this.cat || "(Verb)|(Noun)|(Adjective)|(Adverb)|(Conjunction)|(Preposition)|" +
				"(Determiner)|(Article)|(Pronoun)|(Interjection)";

			var match = new RegExp("===(" + cats + ")===[^]+").exec(page);

			if(match) {
				var match2 = /\n{{((en-)|(head\|en)).+([^]+)/.exec(match[0]);
				if(match2) {
					var match3 = /\n#\s(.+)/.exec(match2[4]);
					if(match3) {
						def = match3[1].trim();
						this.cat = match[1];
						var nonGloss = /{{non-gloss definition\|([^}]+)}}/.exec(def);
						if(nonGloss) def = this.cat + " " + nonGloss[1];
					}
				}
			}
			return def;
		}
    }]
    
var parsers = {};

languages.forEach(function(props) {

	var p = parsers[props.lng] = function(word, options, callback) {
		this.base = parser.parser;
		this.base(word, props.lng, options, callback);
	}

	var proto = p.prototype = new parser.parser;
	proto.variants = props.variants;
	proto.searchDef = props.searchDef;

});

module.exports.getDef = getDef;