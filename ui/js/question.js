var exercise = function( data ) {
	console.log( data.type );
	return _types[ data.type ]( data );
}

var _multichoice = function( data ) {
	var title = $('<h2>', { html : data.title } );
	
	var choices = $('<div>');
	var temp = $.map( data.choices, function(choice){
		var p = $('<p>', { html: choice, class : "option" } );
		p.append( $('<input>', { type: 'radio', name: 'multichoice', value: choice } ) );
		return p;
	} );
	choices.append( temp );

	var respond = $('<button>', { html: 'OK, go'} );
	respond.on('click', function() {
		var temp = $('input[name="multichoice"]:checked');
		temp.parent().css('font-weight','bold');
		temp = temp.val();
		$('input[name="multichoice"]').remove();
		answer( data, temp );
		$(this).remove();
	});

	return $('<div>').append( title ).append( choices ).append( respond );
}

var _types = {
	"multichoice" : _multichoice
}

var answer = function( data, answer ) {
	var mockup = [10,20,70];
	var mockup2 = [false,false,true];
	$.each( $('.option'), function(i, element){
		element = $(element);
		element.append( ' ' + mockup[i] );
		if( mockup2[i] ) {
			element.css('color', 'green');
		}
	} );
}