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
    db.set('question-3', multichoice("Total of 71 countries made information request to Facebook during Jan-July 2013. Which of these countries made most of the requests per capita?", ['Spain', 'Sweden', 'France'], 2));
    db.set('question-4', multichoice("By which factor did the overall number of information request to Google increase from 2010 to 2012?", ['1.5', '2', '5'], 0));
    db.set('question-5', multichoice("Following companies were asked to give data to US government during 2012. In the process companies review these requests and check their legality. Which of the following companies had the lowest acceptance rate?", ['Twitter', 'Microsoft', 'Google', 'LinkedIn'],0));
    db.set('question-6', slide("There are 206 sovereign countries in the World according to Wikipedia. How many of these made requests to Yahoo! to access their data in 2013?", 0, 206, 17));
    db.set('question-7', multichoice("Following companies were asked to give data to US government during 2012. In the process companies review these requests and check the their legality. Which of the following companies has the highest acceptance rate?", ['Twitter', 'Microsoft', 'Google', 'LinkedIn'], 2));
}

exports.clean = function(db) {
    for( var i = 1; i < 3; i++ ) {
        db.set('answer-1', "[]");
    }
}