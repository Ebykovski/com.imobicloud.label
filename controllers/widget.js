
init(arguments[0]);
function init(args) {
	if (args && args.text) {
		formatText(args);
	}
};
exports.setText = init;

/*
args = {
    // ... tss styles
    text:       '',
    textColor:  '#ffffff',
    textFont: 	{ 'fontSize': 18, 'fontFamily': 'HelveticaNeue-Light' },
    search:     [{ 'text': '', 'color': '#ffffff', 'font': { 'fontSize': 18, 'fontFamily': 'HelveticaNeue-Medium' } }],
    duplicate:  true | false,
    case_sensitive: true | false 
}
 * */
function formatText(args) {
    var exclude = ['id', 'text', 'textColor', 'search'];
    $.label.applyProperties( _.omit(args, exclude) );
    
    var text = args.text,
       _text = args.case_sensitive ? text.toLowerCase() : text,
        search, s, sText;
    
    if (args.search) {
        if (typeof(args.search) != 'string') {
            search = args.search;
        } else {
            search = JSON.parse( args.search.replace(/\'/g, '"') );
        }
    } else {
        search = [];
    }
        
    var attributedString = Ti.UI.createAttributedString({ text: text }),
        startAt = 0,
        sIndex, sLength;
    
    if (args.textColor) {
        attributedString.addAttribute({
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: args.textColor,
            range: [0, text.length]
        });
    }
    
    if (args.textFont) {
        attributedString.addAttribute({
            type: Ti.UI.ATTRIBUTE_FONT,
            value: args.textFont,
            range: [0, text.length]
        });
    }
    
    for(var i=0,j=search.length; i<j; i++) {
        s = search[i];
        sText = (args.case_sensitive) ? (s.text + '').toLowerCase(): s.text + '';
        sIndex  = _text.indexOf(sText, startAt);
                      
        sLength = sText.length;
        
        s.font && attributedString.addAttribute({
            type: Ti.UI.ATTRIBUTE_FONT,
            value: s.font,
            range: [sIndex, sLength]
        });
        
        s.color && attributedString.addAttribute({
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: s.color,
            range: [sIndex, sLength]
        });
        
        if (args.duplicate == false && sIndex > -1) {
            startAt += sIndex + sLength;
        };
    };
    
    $.label.attributedString = attributedString;
}

function onClick(e) {
  	$.trigger('click', e);
}