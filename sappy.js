var sappyJs = {
    // sappy.js // version 1.0.0 
	// @grungerabbit // cheryl wu 
	// - - - - - - - - - - - - - - - - 
	// ? / ! / ... / $%@#& ~~> https://github.com/grungerabbit/sappy.js
    "config": {
        "version": "1.0.0",
        "repo": "https://github.com/grungerabbit/sappy.js",
        "setNames": ["normcore", "nirr"],
        "selected": "alt", // setNames || "mixed" || "alt"
        "startIndex": 0,
        "increment": false,
        "commonEmoji": ["💖", "🌺", "💎", "💐", "🐝", "👶", "🌷", "🌸", "🌹", "🐥", "🐰", "😸", "😽", "😻", "🎶"],
        "maxEmoji": 20,
        "normcore": {
            "colors": ["#E2BBAC", "#F2919B", "#ED9357", "#F25467", "#F2744B", "#DEEFB7", "#98DFAF", "#5FB49C", "#414288", "#682D63", "#D30C7B", "#DBB4AD", "#894498", "#774C60", "#F1E3F3", "#3590F3"],
            "emoji": ["✨", "🎉", "💒", "👠", "🔮", "👗", "💕", "💗", "💌", "🎀", "💍", "🇫🇷", "🏠", "🎩", "💃", "👰", "👨‍👩‍👧‍👦","💑"],
            "fonts": [
                "Dancing Script",
                "Satisfy",
                "Cookie",
                "Great Vibes",
                "Calligraffitti",
                "Homemade Apple",
                "Love Ya Like A Sister",
                "Mountains of Christmas",
                "Mystery Quest"
            ],
            "transform": "none"
        },
        "nirr": {
            "colors": ["black", "yellow", "#303F3E", "#F9FCFF", "#D8E8FF", "#3F7787", "#1E4949", "#FF715B", "#4C5454", "#FBF2C0", "#C06E52", "#F96F5D", "#D56F3E", "#523F38", "#1A1423", "#363020"],
            // doubled the emoji set to weigh it more against the common set
            "emoji": ["💩", "🙀", "👃", "💸", "📉", "💣", "👖", "👔", "🔫", "💉", "💊", "™", "🎸", "💔", "💥", "👯", "💀", "🔥", "😵", "🍆", "🍌","💩", "🙀", "👃", "💸", "📉", "💣", "👖", "👔", "🔫", "💉", "💊", "™", "🎸", "💔", "💥", "👯", "💀", "🔥", "😵", "🍆", "🍌"],
            "fonts": [
            	"Oswald",
            	"Anton",
            	"Pathway Gothic One",
            	"Playfair Display",
            	"Special Elite",
            	"Contrail One",
            	"Six Caps",
            	"Allerta Stencil",
            	"Unica One",
            	"Averia Sans Libre"
            ],
            "transform": "uppercase"
        }
    },
    "init": function(settings) {
        console.log("// sappy.js // version " + sappyJs.config.version + " \n" 
                    + "// @grungerabbit // cheryl wu" 
                    + " \n// - - - - - - - - - - - - - - - - \n" 
                    + "// ? / ! / ... / $%@#& ~~> " + sappyJs.config.repo);
        sappyJs.applyAll(settings);
    },
    "rng": function(max) {
    	return Math.floor(Math.random() * (max));
    },
    "selectSet": function() {
    	var setObj;
        var randomSet = sappyJs.config.setNames[sappyJs.rng(sappyJs.config.setNames.length)];
        var setName = sappyJs.config.selected;
        
        switch (sappyJs.config.selected) {
            case "mixed":
                // {?} mélangé
                setObj = sappyJs.config[randomSet];
                break;
            case "alt":
                // {?} every other
                startIndex = sappyJs.config.startIndex;
                var chosen = sappyJs.config.setNames[startIndex];
                setObj = sappyJs.config[chosen];
                break;
            default:
                setObj = sappyJs.config[setName];
                break;
        }
        return setObj;
    },
    "versechorusverse": function(dataset, reroll) {        
        var currentSet = sappyJs.selectSet()[dataset];
        var roll;

        // {?} add in the lulz common emoji
        if (dataset === "emoji") {
        	currentSet = currentSet.concat(sappyJs.config.commonEmoji);
        }
        
        roll = currentSet[sappyJs.rng(currentSet.length)];
        
        // {?} to avoid invisible text
        while (roll === reroll) {
        	roll = currentSet[sappyJs.rng(currentSet.length)];
        }
    	return roll;
    },
    "emojiRoll": function(pos) {
        var vcv = sappyJs.versechorusverse;
        var rng = sappyJs.rng;
        
        // {?} pos controls spacing
        emojiList = [" "];
        for (var i = 0; i < rng(sappyJs.config.maxEmoji); i++) {
            pos === "after" ? emojiList.push(vcv("emoji")) : emojiList.unshift(vcv("emoji"));
        }
            
        // {?} if we rolled a 0
        emojiList = emojiList.length === 1 ? [" ", vcv("emoji")] : emojiList;
        return '<span class="sappy__emoji">' + emojiList.join("") + '</span>';
    },
    "SappyStyle": function(set) {
        this["font-family"] = sappyJs.versechorusverse("fonts");
        this["text-transform"] = set.transform;
        this.color = sappyJs.versechorusverse("colors");
        this.backgroundColor = sappyJs.versechorusverse("colors", this.color);
    },
    "sappyMods": function($el, settings) {
        if (!!settings) {
        	for (var prop in settings) {
                sappyJs.config[prop] = settings[prop];
            }
        }
        
    	return $el.css(new sappyJs.SappyStyle(sappyJs.selectSet()))
                .prepend(sappyJs.emojiRoll())
                .append(sappyJs.emojiRoll("after"));
    },
	"applyAll": function(settings) {
        $("sappy").each(function() {
            sappyJs.sappyMods($(this), settings);

            // {?} alternate
            if (sappyJs.config.increment === false) {
            	sappyJs.config.increment = true;
                sappyJs.config.startIndex = 1;
            } else {
            	sappyJs.config.increment = false;
                sappyJs.config.startIndex = 0;
            }
        });
    }
}
WebFontConfig = {
	google: { families: [ 'Dancing+Script::latin', 'Satisfy::latin', 'Cookie::latin', 'Great+Vibes::latin', 'Calligraffitti::latin', 'Homemade+Apple::latin', 'Love+Ya+Like+A+Sister::latin', 'Mountains+of+Christmas::latin', 'Mystery+Quest::latin', 'Oswald::latin', 'Anton::latin', 'Pathway+Gothic+One::latin', 'Playfair+Display:900:latin', 'Special+Elite::latin', 'Contrail+One::latin', 'Six+Caps::latin', 'Allerta+Stencil::latin', 'Unica+One::latin', 'Averia+Sans+Libre:300:latin' ] }
};
(function() {
    // GOOGLE WEBFONTS
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
$.fn.sappy = function(options) {
    var settings = $.extend({
        selected: "alt"
    }, options);
    
	sappyJs.sappyMods(this, settings);
    return this;
}
