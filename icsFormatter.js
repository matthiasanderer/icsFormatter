
var icsFormatter = function() {
    'use strict';

    if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser');
        return;
    }

    var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
    var calendarEvents = [];
    var calendarStart = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
    ].join(SEPARATOR);
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';

    return {
        /**
         * Returns events array
         * @return {array} Events
         */
        'events': function() {
            return calendarEvents;
        },

        /**
         * Returns calendar
         * @return {string} Calendar in iCalendar format
         */
        'calendar': function() {
            return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
        },

        /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
         */
        'addEvent': function(subject, description, location, begin, stop) {
            // I'm not in the mood to make these optional... So they are all required
            if (typeof subject === 'undefined' ||
                typeof description === 'undefined' ||
                typeof location === 'undefined' ||
                typeof begin === 'undefined' ||
                typeof stop === 'undefined'
            ) {
                return false;
            }

            //TODO add time and time zone? use moment to format?
            var start_date = new Date(begin);
            var end_date = new Date(stop);

            // apply timezone to start_date and end_date so we have "UTC" time values for getHours(), etc.
            start_date.setMinutes(start_date.getMinutes() + start_date.getTimezoneOffset());
            end_date.setMinutes(end_date.getMinutes() + end_date.getTimezoneOffset());

            var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
            var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
            var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
            var start_hours = ("00" + (start_date.getHours().toString())).slice(-2);
            var start_minutes = ("00" + (start_date.getMinutes().toString())).slice(-2);
            var start_seconds = ("00" + (start_date.getSeconds().toString())).slice(-2);

            var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
            var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
            var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
            var end_hours = ("00" + (end_date.getHours().toString())).slice(-2);
            var end_minutes = ("00" + (end_date.getMinutes().toString())).slice(-2);
            var end_seconds = ("00" + (end_date.getSeconds().toString())).slice(-2);

            // Since some calendars don't add 0 second events, we need to remove time if there is none...
            var start = '';
            var end = '';
            if (start_hours + start_minutes + start_seconds + end_hours + end_minutes + end_seconds !== 0) {
                // time is not midnight to midnight - so we need to include the times and use them
                start = ':' + start_year + start_month + start_day 'T' + start_hours + start_minutes + start_seconds + 'Z';
                end = ':' + end_year + end_month + end_day + 'T' + end_hours + end_minutes + end_seconds + 'Z';
            }
            else {
                // this is an all day event - time is not needed (will be ignored by "VALUE=DATE" sub-statement)
                start = ';VALUE=DATE:' + start_year + start_month + start_day;
                end = ';VALUE=DATE:' + end_year + end_month + end_day;
            }

            var calendarEvent = [
                'BEGIN:VEVENT',
                'CLASS:PUBLIC',
                'DESCRIPTION:' + description,
                'DTSTART' + start,
                'DTEND' + end,
                'LOCATION:' + location,
                'SUMMARY;LANGUAGE=en-us:' + subject,
                'TRANSP:TRANSPARENT',
                'END:VEVENT'
            ].join(SEPARATOR);

            calendarEvents.push(calendarEvent);
            return calendarEvent;
        },

        /**
         * Download calendar using the saveAs function from filesave.js
         * @param  {string} filename Filename
         * @param  {string} ext      Extention
         */
        'download': function(filename, ext) {
            if (calendarEvents.length < 1) {
                return false;
            }

            ext = (typeof ext !== 'undefined') ? ext : '.ics';
            filename = (typeof filename !== 'undefined') ? filename : 'calendar';
            var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
            window.open( "data:text/calendar;charset=utf8," + escape(calendar));
        }
    };
};

if (typeof define === "function" && define.amd) {
  /* AMD Format */
  define("icsFormatter", [], function() {
    return icsFormatter();
  });
} else if (typeof module === "object" && module.exports) {
  /* CommonJS Format */
  module.exports = icsFormatter();
} else {
  /* Plain Browser Support */
  this.myModule = icsFormatter();
}

