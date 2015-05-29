
$.label2.setText(function() {
    var o = $.createStyle({ classes: 'label-2' });
    _.extend(o, {
        text: 		'Label 2: setText example',
        textColor: 	"#616161",
        search: [
            { text: 'set', color: 'red' },
            { text: 'Text', color: 'blue', 'font': { 'fontSize': 18, 'fontFamily': 'HelveticaNeue-Bold' } }
        ]
    });
    return o;
}());

$.getView().add( Alloy.createWidget('com.imobicloud.label', function() {
    var o = $.createStyle({ classes: 'label-2' });
    _.extend(o, {
        text: 		'Label 3: Add label dynamically',
	 	search: [
            { text: 'Add', color: 'red' },
            { text: 'label', color: 'blue' },
            { text: 'dynamically', color: '616161', 'font': { 'fontSize': 18, 'fontFamily': 'HelveticaNeue-Bold' } }
        ]
    });
    return o;
}()).getView() );

$.index.open();
