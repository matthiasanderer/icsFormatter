


/* See the README or send me a mail if you need help to get this one running :-) */


var buildICSEntry = function( javascriptExampleDateObject ){

    	var calEntry = icsFormatter();

    	var title = 'sometitlestring';
    	var place = 'our secret meeting place';
    	var begin = new Date(javascriptExampleDateObject);
    	var end = new Date(begin.getTime() + 30*60000);

    	var description = 'A very long and boring description of what is the agenda of this super exclusiv pow-wow';

		calEntry.addEvent(title,description, place, begin.toUTCString(), begin.toUTCString());
		calEntry.download('ourSecretMeeting');
 }
