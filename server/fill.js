function multichoice( title, choices, correct) {
    _q = {};
    _q.type = "multichoice";
    _q.title = title;
    _q.correct = choices[ correct ];

    _q.choices = [];
    for( var i = 0; i < choices.length; i++ ) {
        _q.choices.push( {
            name : choices[i]
        } );
    }

    return JSON.stringify( _q );
}

function slide( title, min, max, correct) {
    _q = {};
    _q.type = "slide";
    _q.title = title;
    _q.correct = correct;

    _q.min = min;
    _q.max = max;

    return JSON.stringify( _q );
}

exports.db_init = function( db ) {

    db.set('question-1', slide("During 2013 United States made 11000-12000 information requests to Facebook. How many percent (%) of these were accepted?", 0, 100, 79) );
    db.set('question-2', multichoice("From 2010 to 2012 the number of Germany’s information requests to Google increased. How many times more information requests were made in 2012 than in 2010?", ['Same amount', 'Twice as much', 'Ten times more'], 1) );
}