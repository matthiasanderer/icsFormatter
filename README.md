icsFormatter
============

## This repository is not under active development and contains several issues. There are a lot of forks now that might work better.

My fork of the original ics.js

I took out the FileSaver.js and Blob.js parts as it better fit my needs.
Please have a look at the original repository!! -- https://github.com/nwcell/ics.js
(At least thats where I got my fork)

PLEASE NOTE: I only tested this simplification with single events and on Chrome/Firefox !!


My changes where applied to the download() function - have a look yourself :-)

My suggested use is to have a onclick or controller/service function (in case you use Angular or stuff) that builds your nice calendar data:

Example:
---------
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


/* Original Readme End */

Credits
------------------
* [Travis Krause](https://github.com/nwcell): Me
* [Kyle Hornberg](https://github.com/khornberg): Added multi event functionality and made everything a package firendly

/* Original Readme End */
