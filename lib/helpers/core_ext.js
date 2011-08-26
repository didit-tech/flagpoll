/**
 * Extend obj with props.
 */

var extend = function(obj, props) {
  Object.getOwnPropertyNames(props).forEach(function(prop) {
    var descriptor = Object.getOwnPropertyDescriptor(props, prop)
    descriptor.enumerable = false
    Object.defineProperty(obj, prop, descriptor)
  })
}

// ext.js - Number
// Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

extend(Number.prototype, {

  /**
   * Convert a the given number _n_ to an ordinal string used to denote the
   * position in an ordered sequence such as 1st, 2nd, 3rd, 4th, etc.
   *
   * @return {string}
   * @api public
   */

  get ordinalize() {
    if ([11, 12, 13].indexOf(this % 100) !== -1)
      return this + 'th'
    else
      switch (this % 10) {
        case 1:  return this + 'st'
        case 2:  return this + 'nd'
        case 3:  return this + 'rd'
        default: return this + 'th'
      }
  },

  /**
   * Return a currency formatted string based on the given number _n_.
   *
   *  (1000.99).currency
   *  // => '1,000.99'
   *
   * @return {string}
   * @api public
   */

  get currency() {
    var n = this.toString().split('.')
    n.first = n.first.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    return n.join('.')
  },

  /**
   * Convert milliseconds to seconds.
   */

  get toSeconds() { return this / 1000 },

  /**
   * Convert milliseconds to minutes.
   *
   * @return {number}
   * @api public
   */

  get toMinutes() { return this / (1).minute },

  /**
   * Convert milliseconds to hours.
   *
   * @return {number}
   * @api public
   */

  get toHours() { return this / (1).hour },

  /**
   * Convert milliseconds to days.
   *
   * @return {number}
   * @api public
   */

  get toDays() { return this / (1).day },

  /**
   * Convert milliseconds to weeks.
   *
   * @return {number}
   * @api public
   */

  get toWeeks() { return this / (1).week },

  /**
   * Convert milliseconds to months.
   *
   * @return {number}
   * @api public
   */

  get toMonths() { return this / (1).month },

  /**
   * Convert milliseconds to years.
   *
   * @return {number}
   * @api public
   */

  get toYears() { return this / (1).year },

  /**
   * Return a new Date representing n milliseconds ago.
   *
   *  (5).minutes.ago
   *  // => Date
   *
   * @return {Date}
   * @api public
   */

  get ago() {
    return new Date(Date.now() - this)
  },

  /**
   * Executes the given function n times with optional _context_.
   *
   *  (3).times(function(){ })
   *  (5).times(function(){ }, this)
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @api public
   */

  times: function (fn, context) {
    var times = this
    while (times--) fn.call(context || this)
  },

  /**
   * Check if this number is a float.
   *
   *  (3.14159265).isFloat
   *  // => true
   *
   *  (42).isFloat
   *  // => false
   *
   * @return {bool}
   * @api public
   */

  get isFloat() {
    return this.toString().indexOf('.') !== -1
  },

  /**
   * Return a hex string representation of this number.
   *
   * @return {string}
   * @api public
   */

  get hex() { return this.toString(16) },

  /**
   * Return a octal string representation of this number.
   *
   * @return {string}
   * @api public
   */

   get octal() { return this.toString(8) },

  /**
   * Return n seconds in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get second() { return this * 1000 },
  get seconds() { return this * 1000 },

  /**
   * Return n minutes in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get minute() { return this * 60 * 1000 },
  get minutes() { return this * 60 * 1000 },

  /**
   * Return n hours in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get hour() { return this * 3600 * 1000 },
  get hours() { return this * 3600 * 1000 },

  /**
   * Return n days in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get day() { return this * 86400 * 1000 },
  get days() { return this * 86400 * 1000 },

  /**
   * Return n weeks in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get week() { return this * 604800 * 1000 },
  get weeks() { return this * 604800 * 1000 },

  /**
   * Return n months in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get month() { return this * 2592000 * 1000 },
  get months() { return this * 2592000 * 1000 },

  /**
   * Return n years in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get year() { return this * 31471200 * 1000 },
  get years() { return this * 31471200 * 1000 },

  /**
   * Return n bytes.
   *
   * @return {number}
   * @api public
   */

  get byte() { return this },
  get bytes() { return this },

  /**
   * Return n kilobytes in bytes.
   *
   * @return {number}
   * @api public
   */

  get kilobyte() { return this * 1024 },
  get kilobytes() { return this * 1024 },

  /**
   * Return n megabytes in bytes.
   *
   * @return {number}
   * @api public
   */

  get megabyte() { return this.kilobytes * 1024 },
  get megabytes() { return this.kilobytes * 1024 },

  /**
   * Return n gigabytes in bytes.
   *
   * @return {number}
   * @api public
   */

  get gigabyte() { return this.megabytes * 1024 },
  get gigabytes() { return this.megabytes * 1024 }

})

// ext.js - Array
// Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

extend(Array.prototype, {

  /**
   * Returns a Boolean value that indicates whether the Array is empty.
   *
   *  [].isEmpty
   *  // => true
   *
   *  [1,2,3].isEmpty
   *  // => false
   *
   * @return {bool}
   * @api public
   */

  get isEmpty() { return this.length === 0 },

  /**
   * Removed all values strictly matching _obj_ from the array.
   *
   *  [1,2,2,2,3].remove(2)
   *  // => [1,3]
   *
   * @param {mixed} obj
   * @return {array}
   * @api public
   */

  remove: function (obj) {
    return this.reject(function(val){
      return val === obj
    })
  },

  /**
   * Removes all values.
   *
   *  [1,2,3].clear
   *  // => []
   *
   * @return {Array}
   * @api public
   */

  get clear() {
    this.length = 0
    return this
  },

  /**
   * Returns a Boolean value indicating the presence of the given item(s).
   * Accepts a single item, an array of items, or several arguments.
   *
   *  [1,2,3].includes(1)
   *  // => true
   *
   *  [1,2,3].includes(4)
   *  // => false
   *
   *  [1,2,3].includes([1,2,3,4])
   *  // => false
   *
   *  [1,2,3].includes([1,2,3])
   *  // => true
   *
   *  ['foo', 'bar'].includes('bar', 'foo')
   *  // => true
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  includes: function (items) {
    if (!(items instanceof Array))
      items = Object.values(arguments)
    for (var i = 0, len = items.length; i < len; ++i)
      if (this.indexOf(items[i]) === -1)
        return false
    return true
  },

  /**
   * Negated version of #includes().
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  excludes: function() {
    return ! this.includes.apply(this, arguments)
  },

  /**
   * Get / Set the first element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get first() { return this[0] },
  set first(val) { this[0] = val },

  /**
   * Get / Set the last element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get last() { return this[this.length - 1 || 0] },
  set last(val) { this[this.length - 1 || 0] = val },

  /**
   * Return a random value.
   *
   *  [1,2,3].sample
   *  // => 1
   *
   *  [1,2,3].sample
   *  // => 3
   *
   * @return {mixed}
   * @api public
   */

  get sample() {
    return this[Math.floor(Math.random() * this.length)]
  },

  /**
   * Get the value at the given _index_.
   *
   * @return {mixed}
   * @api public
   */

   at: function(index) { return this[index] },

   /**
    * Drop the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   drop: function(n) {
     return this.slice(n, this.length)
   },

   /**
    * Take the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   take: function(n) {
     return this.slice(0, n)
   },

   /**
    * Select values matching _pattern_.
    *
    *  ['foo', 'foobar', 'bar'].grep(/^foo(bar)?/)
    *  // => ['foo', 'foobar']
    *
    * @param  {regexp} pattern
    * @return {array}
    * @api public
    */

   grep: function(pattern) {
     return this.filter(function(val){
       return pattern.test(val)
     })
   },

  /**
   * Returns a new array void of the given args,
   * which default to [undefined, null].
   *
   *  [1,2,undefined,null].compact()
   *  // => [1,2]
   *
   *  [1,2,undefined,null].compact(null)
   *  // => [1,2,undefined]
   *
   *  [false, null, undefined, -1, 0].compact(null, undefined, false, -1, 0)
   *  // => []
   *
   * @param  {mixed} ...
   * @return {array}
   * @api public
   */

  compact: function() {
    var remove = arguments.length
          ? Object.values(arguments)
          : [undefined, null]
    return this.filter(function(val){
      return remove.excludes(val)
    })
  },

  /**
   * Returns a flattened version of the Array.
   *
   *  [1,[2,[3]]].flatten
   *  // => [1,2,3]
   *
   * @return {array}
   * @api public
   */

  get flattened() {
    return this.reduce(function(vals, val){
      return vals.concat(val.length ? val.flattened : val)
    }, [])
  },

  /**
   * Returns a transposed version of the Array.
   *
   *  [[1,2], [3,4], [5,6]].transposed
   *  // => [[1, 3, 5], [2, 4, 6]]
   *
   * @return {array}
   * @api public
   */

  get transposed() {
    var transposed = []
    if (!this.length) return transposed
    this[0].each(function (_, i) {
      transposed[i] = []
      this.each(function (_, j, a) {
        transposed[i][j] = a[j][i]
      })
    }, this)
    return transposed
  }

})

// ext.js - String
// Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

extend(String.prototype, {

  /**
   * Drop _n_ characters.
   *
   * @param  {int} n
   * @return {string}
   * @api public
   */

  drop: function(n) {
    return this.slice(n, this.length)
  },

  /**
   * Take _n_ characters.
   *
   * @param  {int} n
   * @return {string}
   * @api public
   */

  take: function(n) {
    return this.slice(0, n)
  },

  /**
   * Strip leading and trailing whitespace.
   *
   *   '  \n\n foo '.strip
   *   // => 'foo'
   *
   * @return {string}
   * @api public
   */

  get strip() { return this.trim() },

  /**
   * Wrap with the given string, or _prefix_ and _suffix_.
   *
   *    'text'.wrap('<p>', '</p>')
   *    // => '<p>text</p>'
   *
   *    'foo'.wrap('...')
   *    // => '...foo...'
   *
   * @param  {string} prefix
   * @param  {string} suffix
   * @return {string}
   * @api public
   */

  wrap: function (prefix, suffix) {
    return prefix + this + (suffix || prefix)
  },

  /**
   * Check if this string starts with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */

  startsWith: function(str) {
    return this.indexOf(str) === 0
  },

  /**
   * Check if this string ends with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */

  endsWith: function(str) {
    return this.lastIndexOf(str) === this.length - str.length
  },

  /**
   * Remove all substrings matching the given _pattern_.
   *
   * @param  {regexp} pattern
   * @return {bool}
   * @api public
   */

  remove: function(pattern) {
    return this.replace(pattern, '')
  },

  /**
   * Return substring after the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  after: function(str) {
    var i = this.indexOf(str)
    return i === -1 ?  '' : this.substring(i + str.length)
  },

  /**
   * Return substring before the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  before: function(str) {
    var i = this.indexOf(str)
    return i === -1 ? '' : this.substring(0, i)
  },

  /**
   * Left pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */

  padLeft: function(width, char) {
    return Array(++width - this.length).join(char || ' ') + this
  },

  /**
   * Right pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */

  padRight: function(width, char) {
    return this + Array(++width - this.length).join(char || ' ')
  },

  /**
   * Returns a Boolean value that indicates whether the current string
   * includes the given string.
   *
   *  'the answer is 42'.includes('42')
   *  // => true
   *
   *  'the answer is 42'.includes('43')
   *  // => false
   *
   * @param {string} str
   * @return {bool}
   * @api public
   */

  includes: function(str) {
    return this.indexOf(str) !== -1
  },

  /**
   * Returns the count of occurences of the given string.
   *
   *  'A.lot.of.dots'.count('.')
   *  // => 3
   *
   * @param {string} str
   * @return {bool}
   * @api public
   */

  count: function(str) {
    return this.split(str).length - 1
  }

})

// ext.js - String - Inflections
// Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

extend(String.prototype, {

  /**
   * Capitalize the given _str_, optionally _all_ words.
   *
   *   'hello there'.capitalize()
   *    // => 'Hello there'
   *
   *   'hello there'.capitalize('all') // or true
   *    // => 'Hello There'
   *
   * @param  {bool} all
   * @return {string}
   * @api public
   */

  capitalize: function (all) {
    return this.split(/\s+/).map(function(word, i){
      return (i === 0 || all)
        ? word.charAt(0).uppercase + word.drop(1)
        : word
    }).join(' ')
  },

  /**
   * Return lowercase string.
   *
   *   'HELLO'.lowercase
   *    // => 'hello'
   *
   * @return {string}
   * @api public
   */

  get lowercase() { return this.toLowerCase() },

  /**
   * Return uppercase string.
   *
   *   'hello'.uppercase
   *    // => 'HELLO'
   *
   * @return {string}
   * @api public
   */

  get uppercase() { return this.toUpperCase() },

  /**
   * Convert to camel-case.
   *
   *   'hello there'.camelcase
   *   // => 'HelloThere'
   *
   * @return {string}
   * @api public
   */

  get camelcase() {
    return this.replace(/[^a-zA-Z0-9 ]+/g, ' ').capitalize(true).remove(/ +/g)
  },

  /**
   * Return a string of digits.
   *
   *   '$1,000'.digits
   *   // => '1000'
   *
   * @return {string}
   * @api public
   */

  get digits() { return this.remove(/[^\d]/g) },

  /**
   * Returns the plural of the string.
   *
   *   'potato'.plural
   *   // => 'potatoes'
   *
   * @return {string}
   * @api public
   */

  get plural() { return inflect(this, pluralRules) },

  /**
   * Returns the singular of the string.
   *
   *   'potatoes'.singular
   *   // => 'potato'
   *
   * @return {string}
   * @api public
   */

  get singular() { return inflect(this, singularRules) },

  /**
   * Check if the string is plural.
   *
   * @return {bool}
   * @api public
   */

  get isPlural() {
    var plural = this.plural
    return this === plural ||
           this + 's' === plural
  },

  /**
   * Check if the string is singular.
   *
   * @return {bool}
   * @api public
   */

  get isSingular() { return this === this.singular }

})

function inflect(str, rules) {
  var rule
  if (!uncountables.includes(str.lowercase))
    if (rule = rules.find(function (rule) { return str.match(rule.first) }))
      return str.replace(rule.first, rule.last)
  return str;
}

/**
 * Uncountable words.
 */

var uncountables = [
  'advice',
  'energy',
  'excretion',
  'digestion',
  'cooperation',
  'health',
  'justice',
  'labour',
  'machinery',
  'equipment',
  'information',
  'pollution',
  'sewage',
  'paprer',
  'money',
  'species',
  'series',
  'rain',
  'rice',
  'fish',
  'sheep',
  'moose',
  'deer',
  'news'
]

/**
 * Pluralization rules.
 */

var pluralRules = [
  [/(m)an$/gi, '$1en'],
  [/(pe)rson$/gi, '$1ople'],
  [/(child)$/gi, '$1ren'],
  [/^(ox)$/gi, '$1en'],
  [/(ax|test)is$/gi, '$1es'],
  [/(octop|vir)us$/gi, '$1i'],
  [/(alias|status)$/gi, '$1es'],
  [/(bu)s$/gi, '$1ses'],
  [/(buffal|tomat|potat)o$/gi, '$1oes'],
  [/([ti])um$/gi, '$1a'],
  [/sis$/gi, 'ses'],
  [/(?:([^f])fe|([lr])f)$/gi, '$1$2ves'],
  [/(hive)$/gi, '$1s'],
  [/([^aeiouy]|qu)y$/gi, '$1ies'],
  [/(x|ch|ss|sh)$/gi, '$1es'],
  [/(matr|vert|ind)ix|ex$/gi, '$1ices'],
  [/([m|l])ouse$/gi, '$1ice'],
  [/(quiz)$/gi, '$1zes'],
  [/s$/gi, 's'],
  [/$/gi, 's']
]

/**
 * Singularization rules.
 */

var singularRules = [
  [/(m)en$/gi, '$1an'],
  [/(pe)ople$/gi, '$1rson'],
  [/(child)ren$/gi, '$1'],
  [/([ti])a$/gi, '$1um'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis'],
  [/(hive)s$/gi, '$1'],
  [/(tive)s$/gi, '$1'],
  [/(curve)s$/gi, '$1'],
  [/([lr])ves$/gi, '$1f'],
  [/([^fo])ves$/gi, '$1fe'],
  [/([^aeiouy]|qu)ies$/gi, '$1y'],
  [/(s)eries$/gi, '$1eries'],
  [/(m)ovies$/gi, '$1ovie'],
  [/(x|ch|ss|sh)es$/gi, '$1'],
  [/([m|l])ice$/gi, '$1ouse'],
  [/(bus)es$/gi, '$1'],
  [/(o)es$/gi, '$1'],
  [/(shoe)s$/gi, '$1'],
  [/(cris|ax|test)es$/gi, '$1is'],
  [/(octop|vir)i$/gi, '$1us'],
  [/(alias|status)es$/gi, '$1'],
  [/^(ox)en/gi, '$1'],
  [/(vert|ind)ices$/gi, '$1ex'],
  [/(matr)ices$/gi, '$1ix'],
  [/(quiz)zes$/gi, '$1'],
  [/s$/gi, '']
]

// ext.js - Date
// Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Month names.
 */

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

/**
 * Day names.
 */

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']

// --- Extensions

extend(Date.prototype, {

  /**
   * Shortcuts for getMETHOD
   */

  get milliseconds() { return this.getMilliseconds() },
  get seconds() { return this.getSeconds() },
  get minutes() { return this.getMinutes() },
  get hours() { return this.getHours() },
  get date() { return this.getDate() },
  get day() { return this.getDay() },
  get month() { return this.getMonth() },
  get year() { return this.getFullYear() },

  /**
   * Return month name string.
   *
   * @return {string}
   * @api public
   */

  get monthName() { return months[this.month] },

  /**
   * Return 3 character month name string.
   *
   * @return {string}
   * @api public
   */

  get shortMonthName() { return months[this.month].substr(0, 3) },

  /**
   * Return day name string.
   *
   * @return {string}
   * @api public
   */

  get dayName() { return days[this.day] },

  /**
   * Return 3 character day name string.
   *
   * @return {string}
   * @api public
   */

  get shortDayName() { return days[this.day].substr(0, 3) },

  /**
   * Format date using the given _str_ using the
   * following format syntax:
   *
   *  % [flag]specifier
   *
   *  Flags:
   *    - n  Passes numeric value through ordinalize() to produce '12th', '3rd', etc
   *
   *  Specifiers:
   *    - a  Short weekday name ('Mon')
   *    - A  Full weekday name ('Monday')
   *    - b  Short month name ('Jan')
   *    - B  Full month name ('January')
   *    - e  Day number (12)
   *    - p  AM / PM
   *    - P  am / pm
   *    - S  Seconds (34)
   *    - d  Day with leading zero (01, 30)
   *    - m  Month with leading zero (01, 12)
   *    - M  Minutes with leading zero (01, 60)
   *    - H  Hours with leading zero (01, 24)
   *    - Y  Year with century (2010)
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  format: function(str) {
    var val, self = this
    function pad(n){ return n < 10 ? '0' + n : n }
    return str.replace(/%(n)?(\w)/g, function(_, flag, specifier){
      val = (function(){
        switch (specifier) {
          case 'a': return self.shortDayName
          case 'A': return self.dayName
          case 'b': return self.shortMonthName
          case 'B': return self.monthName
          case 'd': return pad(self.date)
          case 'e': return self.date
          case 'P': return self.hours > 11 ? 'pm' : 'am'
          case 'p': return self.hours > 11 ? 'PM' : 'AM'
          case 'S': return pad(self.seconds)
          case 'm': return pad(self.month + 1)
          case 'M': return pad(self.minutes)
          case 'H': return pad(self.hours)
          case 'l': return self.hours > 12 ? self.hours - 12 : self.hours
          case 'Y': return pad(self.year)
        }
      })()
      return flag === 'n' ? val.ordinalize : val
    })
  },

  /**
   * Format date using the given _str_ as UTC,
   * using the same formatters as Date.format().
   *
   * @param  {string} str
   * @return {string}
   * @see Date#format
   * @api public
   */

  formatUTC: function(str) {
    return (new Date(this.getTime() + this.getTimezoneOffset() * 60 * 1000)).format(str)
  },

  /**
   * Return in words since the given _date_.
   *
   *  'completed ' + (5).days.ago.inWordsSince(new Date) + ' ago'
   *  // => "completed 5 days ago"
   *
   * @param  {Date} date
   * @return {string}
   * @api public
   */

   inWordsSince: function(date) {
     if (this > date) return
     var ms = (Number(date) - Number(this))
     function as(type) {
       var n = parseInt(ms['to' + type + 's'].toFixed(0)),
           type = type.toLowerCase()
       return n === 1 ? 'one ' + type : n + ' ' + type + 's'
     }
     if (ms < (60).seconds)
       return 'less than one minute'
     else if (ms < (60).minutes)
       return as('Minute')
     else if (ms < (24).hours)
       return as('Hour')
     else if (ms < (7).days)
       return as('Day')
     else if (ms < (4).weeks)
       return as('Week')
     else if (ms < (12).months)
       return as('Month')
     else if (ms < (99).years)
       return as('Year')
   },

   /**
    * Return in words since now.
    *
    *  'completed' + (5).days.ago.inWordsSinceNow + ' ago'
    *  // => "completed 5 days ago"
    *
    * @return {string}
    * @api public
    */

   get inWordsSinceNow() {
     return this.inWordsSince(new Date)
   }

})
