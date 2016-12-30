window.onload = function () {
 	page.init()
};

var device = {
	height: window.innerHeight,
	width: window.innerWidth
};

var themes = ['minimalism','letters','dada'];

var page = {
	
	theme: null,

	alphabet: null,

	init: function() {
		var random = this.rand(themes.length);
		var theme = themes[random];
		this.theme = theme;

		this.themeClass();

		this[theme]();

	},

	// modified from source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	rand: function(max, min) {
		if (!min) min = 0;
  		return Math.floor(Math.random() * (max - min)) + min;
	},

	themeClass: function() {
		var body = document.body;
		body.classList.add(this.theme);
	},

	minimalism: function() {
		var links = document.getElementsByTagName('ul')[0].children;

		for(var i = 0; i < links.length; i++)
		{
			var link = links[i].children[0];
			var x = this.rand(device.width);
			var y = this.rand(device.height);

			link.style.left = x +'px';
			link.style.top = y + 'px';
		}
	},

	letters: function() {
		this.cacheAlphabet();

		var div = document.createElement('div'),
		    totalLetters = (device.height /10)* (device.width / 10);

		for(var i = 0; i < totalLetters; i++) {
			var letter = this.randChar();
			var content = document.createTextNode(letter);
			div.appendChild(content);
		}
		
		var list = document.getElementsByTagName('ul')[0],
			links = list.children;

		for(var i = 0; i < links.length; i++)
		{
			var link = links[i].children[0];
			var position = this.rand(div.innerHTML.length);
			var mess =div.innerHTML;
			var newcontent = mess.substr(0, position) + link.outerHTML + 
				mess.substr(position);

			div.innerHTML = newcontent;
		}

		document.body.removeChild(list);

		document.body.appendChild(div);
	},

	randChar: function () {
		if (this.alphabet == null) this.cacheAlphabet();

		var number = this.rand(this.alphabet.length);
		return this.alphabet[number];
	},

	cacheAlphabet: function(){
		var alphabetDiv = document.getElementById('alphabet');
		this.alphabet = alphabetDiv.innerHTML;
		document.body.removeChild(alphabetDiv);
	},

	dada: function() {
		this.cacheAlphabet();

		var list = document.getElementsByTagName('ul')[0],
			links = list.children;

		for(var i = 0; i < links.length; i++)
		{
			var link = links[i].children[0];
			link.style.left = this.rand(device.width) +'px';
			link.style.top = this.rand(device.height) + 'px';

			for(var c =0; c < link.innerHTML.length ; c ++)
			{
				var div = this.randTextString(link.innerHTML.length);
				div.style.left = this.rand(device.width) +'px';
				div.style.top = this.rand(device.height) + 'px';
				document.body.appendChild(div);
			}
		}
	},

	randTextString: function(charLength) {
		var text = '';

		for(var i =0; i < charLength; i ++)
		{
			text += this.randChar();
		}
		var div = document.createElement('a');
		div.appendChild(document.createTextNode(text));

		return div;
	}


};