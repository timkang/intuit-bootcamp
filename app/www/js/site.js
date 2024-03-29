/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  // Support: Firefox 18+
  // Can't be in strict mode, several libs including ASP.NET trace
  // the stack via arguments.caller.callee and Firefox dies if
  // you try to trace through "use strict" call chains. (#13335)
  //
  var arr = [];
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var // Use the correct document accordingly with window argument (sandbox)
  document = window.document, version = "2.1.3", // Define a local copy of jQuery
  jQuery = function(selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  }, // Support: Android<4.1
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
  fcamelCase = function(all, letter) {
    return letter.toUpperCase();
  };
  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // Start with an empty selector
    selector: "",
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function(num) {
      // Return just the one element from the set
      // Return all the elements in a clean array
      return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function(elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems);
      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;
      ret.context = this.context;
      // Return the newly-formed element set
      return ret;
    },
    // Execute a callback for every element in the matched set.
    // (You can seed the arguments with an array of args, but this is
    // only used internally.)
    each: function(callback, args) {
      return jQuery.each(this, callback, args);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length, j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (;i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
  };
  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      // parseFloat NaNs numeric-cast false positives (null|true|false|"")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      // adding 1 corrects loss of precision from parseFloat (#15100)
      return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
    },
    isPlainObject: function(obj) {
      // Not plain objects:
      // - Any object or value whose internal [[Class]] property is not "[object Object]"
      // - DOM nodes
      // - window
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      // If the function hasn't returned already, we're confident that
      // |obj| is a plain object, created by {} or constructed with new Object
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      // Support: Android<4.0, iOS<6 (functionish RegExp)
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    // Evaluates a script in a global context
    globalEval: function(code) {
      var script, indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        // If the code includes a valid, prologue position
        // strict mode pragma, execute code by injecting a
        // script tag into the document.
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          // Otherwise, avoid the DOM node creation, insertion
          // and removal by using an indirect global eval
          indirect(code);
        }
      }
    },
    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE9-11+
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    // args is for internal usage only
    each: function(obj, callback, args) {
      var value, i = 0, length = obj.length, isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (;i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (;i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    // Support: Android<4.1
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    // results is for internal usage only
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length, j = 0, i = first.length;
      for (;j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
      // Go through the array, only saving the items
      // that pass the validator function
      for (;i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    // arg is for internal usage only
    map: function(elems, callback, arg) {
      var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
      // Go through the array, translating each of the items to their new values
      if (isArray) {
        for (;i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      // Flatten any nested arrays
      return concat.apply([], ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function(fn, context) {
      var tmp, args, proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      // Quick check to determine if target is callable, in the spec
      // this throws a TypeError, but we will just return undefined.
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      // Simulated bind
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      // Set the guid of unique handler to the same of original handler, so it can be removed
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });
  // Populate the class2type map
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArraylike(obj) {
    var length = obj.length, type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  var Sizzle = /*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
  function(window) {
    var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, // Local document vars
    setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, // Instance-specific data
    expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
      if (a === b) {
        hasDuplicate = true;
      }
      return 0;
    }, // General-purpose constants
    MAX_NEGATIVE = 1 << 31, // Instance methods
    hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, // Use a stripped-down indexOf as it's faster than native
    // http://jsperf.com/thor-indexof-vs-for/5
    indexOf = function(list, elem) {
      var i = 0, len = list.length;
      for (;i < len; i++) {
        if (list[i] === elem) {
          return i;
        }
      }
      return -1;
    }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", // Regular expressions
    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/css3-syntax/#characters
    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", // Loosely modeled on CSS identifier characters
    // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = characterEncoding.replace("w", "w#"), // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
    ".*" + ")\\)|)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
      ID: new RegExp("^#(" + characterEncoding + ")"),
      CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
      TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
      ATTR: new RegExp("^" + attributes),
      PSEUDO: new RegExp("^" + pseudos),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
      var high = "0x" + escaped - 65536;
      // NaN means non-codepoint
      // Support: Firefox<24
      // Workaround erroneous numeric interpretation of +"0x"
      // BMP codepoint
      // Supplemental Plane codepoint (surrogate pair)
      return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
    }, // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function() {
      setDocument();
    };
    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? // Leverage slice if possible
        function(target, els) {
          push_native.apply(target, slice.call(els));
        } : // Support: IE<9
        // Otherwise append directly
        function(target, els) {
          var j = target.length, i = 0;
          // Can't trust NodeList.length
          while (target[j++] = els[i++]) {}
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, // QSA vars
      i, groups, old, nid, newContext, newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      nodeType = context.nodeType;
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed && documentIsHTML) {
        // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
          // Speed-up: Sizzle("#ID")
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document (jQuery #6963)
              if (elem && elem.parentNode) {
                // Handle the case where IE, Opera, and Webkit return items
                // by name instead of ID
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              // Context is not a document
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if ((m = match[3]) && support.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        // QSA path
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType !== 1 && selector;
          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
            groups = tokenize(selector);
            if (old = context.getAttribute("id")) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {} finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      // All others
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }
    /**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        // release memory in IE
        div = null;
      }
    }
    /**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"), i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      // Use IE sourceIndex if available on both nodes
      if (diff) {
        return diff;
      }
      // Check if b follows a
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    // Expose support vars for convenience
    support = Sizzle.support = {};
    /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
    isXML = Sizzle.isXML = function(elem) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
      // If no document and documentElement is available, return
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      // Set our document
      document = doc;
      docElem = doc.documentElement;
      parent = doc.defaultView;
      // Support: IE>8
      // If iframe document is assigned to "document" variable and if iframe has been reloaded,
      // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
      // IE6-8 do not support the defaultView property so parent will be undefined
      if (parent && parent !== parent.top) {
        // IE11 does not have attachEvent, so all must suffer
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      /* Support tests
	---------------------------------------------------------------------- */
      documentIsHTML = !isXML(doc);
      /* Attributes
	---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      /* getElement(s)By*
	---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(doc.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      // Support: IE<9
      support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      // ID find and filter
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            return m && m.parentNode ? [ m ] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      // Tag
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem, tmp = [], i = 0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      // Class
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
	---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];
      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See http://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];
      if (support.qsa = rnative.test(doc.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function(div) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibing-combinator selector` fails
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = doc.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function(div) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(div, "div");
          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      /* Contains
	---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      // Element contains another
      // Purposefully does not implement inclusive descendent
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      /* Sorting
	---------------------------------------------------------------------- */
      // Document order sorting
      sortOrder = hasCompare ? function(a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        // Calculate position if both inputs belong to the same document
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1;
        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          // Maintain original order
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
        // Parentless nodes are either documents or disconnected
        if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        // Walk down the tree looking for a discrepancy
        while (ap[i] === bp[i]) {
          i++;
        }
        // Do a sibling check if the nodes have a common ancestor
        // Otherwise nodes in our document sort first
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return doc;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      // Make sure that attribute selectors are quoted
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [ elem ]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
    Sizzle.uniqueSort = function(results) {
      var elem, duplicates = [], j = 0, i = 0;
      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };
    /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
    getText = Sizzle.getText = function(elem) {
      var node, ret = "", i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes
      return ret;
    };
    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(match) {
          match[1] = match[1].replace(runescape, funescape);
          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        CHILD: function(match) {
          /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        PSEUDO: function(match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (// Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && (// advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        TAG: function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        CHILD: function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
          // Shortcut for :nth-*(n)
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [ forward ? parent.firstChild : parent.lastChild ];
              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (// Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                    break;
                  }
                }
              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                diff = cache[1];
              } else {
                // Use the same loop as above to seek `elem` from the start
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                    // Cache the index of each encountered element
                    if (useCache) {
                      (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                    }
                    if (node === elem) {
                      break;
                    }
                  }
                }
              }
              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO: function(pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }
          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [ pseudo, pseudo, "", argument ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        not: markFunction(function(selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            // Don't keep the element (issue #299)
            input[0] = null;
            return !results.pop();
          };
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction(function(lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        target: function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function(elem) {
          return elem === docElem;
        },
        focus: function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        enabled: function(elem) {
          return elem.disabled === false;
        },
        disabled: function(elem) {
          return elem.disabled === true;
        },
        checked: function(elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        selected: function(elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        empty: function(elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        header: function(elem) {
          return rheader.test(elem.nodeName);
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        text: function(elem) {
          var attr;
          // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        first: createPositionalPseudo(function() {
          return [ 0 ];
        }),
        last: createPositionalPseudo(function(matchIndexes, length) {
          return [ length - 1 ];
        }),
        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
          return [ argument < 0 ? argument + length : argument ];
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (;i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (;i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (;--i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (;++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    // Add button/input type pseudos
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        // Combinators
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      // Cache the tokens
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = "";
      for (;i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
      // Check against closest ancestor/preceding element
      // Check against all ancestor/preceding elements
      return combinator.first ? function(elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache, outerCache, newCache = [ dirruns, doneName ];
        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                outerCache[dir] = newCache;
                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (;i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (;i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, // Get initial elements from seed or context
        elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), // Prefilter to get matcher input, preserving a map for seed-results synchronization
        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
        [] : // ...otherwise use results directly
        results : matcherIn;
        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, // The foundational matcher ensures that elements are reachable from top-level context(s)
      matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
        return indexOf(checkContext, elem) > -1;
      }, implicitRelative, true), matchers = [ function(elem, context, xml) {
        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        // Avoid hanging onto element (issue #299)
        checkContext = null;
        return ret;
      } ];
      for (;i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (;j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
        var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]("*", outermost), // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
        if (outermost) {
          outermostContext = context !== document && context;
        }
        // Add elements passing elementMatchers directly to results
        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
        // Support: IE<9, Safari
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
        for (;i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0;
            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context, xml)) {
                results.push(elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }
          // Track unmatched elements for set filters
          if (bySet) {
            // They will have gone through all possible matchers
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            // Lengthen the array for every element, matched or not
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        // Apply set filters to unmatched elements
        matchedCount += i;
        if (bySet && i !== matchedCount) {
          j = 0;
          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }
          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            }
            // Discard index placeholder values to get only actual matches
            setMatched = condense(setMatched);
          }
          // Add matches to results
          push.apply(results, setMatched);
          // Seedless set matches succeeding multiple successful matchers stipulate sorting
          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        }
        // Override manipulation of globals by nested matchers
        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }
        return unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    };
    /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
    select = Sizzle.select = function(selector, context, results, seed) {
      var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      // Try to minimize operations if there is no seed and only one group
      if (match.length === 1) {
        // Take a shortcut and set the context if the root selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        // Fetch a seed set for right-to-left matching
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    // One-time assignments
    // Sort stability
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;
    // Initialize against the default document
    setDocument();
    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function(div1) {
      // Should return 1, but returns 4 (following)
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  }(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  var risSimple = /^.[^:#\[\.,]*$/;
  // Implement the identical functionality for filter and not
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        /* jshint -W018 */
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return indexOf.call(qualifier, elem) >= 0 !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i, len = this.length, ret = [], self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      // Needed because $( selector, context ) becomes $( context ).find( selector )
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  // Initialize a jQuery object
  // A central reference to the root jQuery(document)
  var rootjQuery, // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
    var match, elem;
    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
      return this;
    }
    // Handle HTML strings
    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];
      } else {
        match = rquickExpr.exec(selector);
      }
      // Match html or make sure no context is specified for #id
      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context;
          // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
          // HANDLE: $(html, props)
          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (jQuery.isFunction(this[match])) {
                this[match](context[match]);
              } else {
                this.attr(match, context[match]);
              }
            }
          }
          return this;
        } else {
          elem = document.getElementById(match[2]);
          // Support: Blackberry 4.6
          // gEBID returns nodes no longer in the document (#6963)
          if (elem && elem.parentNode) {
            // Inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
          }
          this.context = document;
          this.selector = selector;
          return this;
        }
      } else if (!context || context.jquery) {
        return (context || rootjQuery).find(selector);
      } else {
        return this.constructor(context).find(selector);
      }
    } else if (selector.nodeType) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;
    } else if (jQuery.isFunction(selector)) {
      // Execute immediately if ready is not present
      return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
    }
    if (selector.selector !== undefined) {
      this.selector = selector.selector;
      this.context = selector.context;
    }
    return jQuery.makeArray(selector, this);
  };
  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;
  // Initialize central reference
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/, // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery.extend({
    dir: function(elem, dir, until) {
      var matched = [], truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling: function(n, elem) {
      var matched = [];
      for (;n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
  });
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this), l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (;i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (;i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          // Always skip document fragments
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : // Don't pass non-elements to Sizzle
          cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function(elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }
      // Index in selector
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      // Locate the position of the desired element
      // If it receives a jQuery object, the first element is used
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return jQuery.dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return jQuery.dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return jQuery.dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.unique(matched);
        }
        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = /\S+/g;
  // String to Object options format cache
  var optionsCache = {};
  // Convert String-formatted options into Object-formatted ones and store in cache
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
  jQuery.Callbacks = function(options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var // Last fire value (for non-forgettable lists)
    memory, // Flag to know if list was already fired
    fired, // Flag to know if list is currently firing
    firing, // First callback to fire (used internally by add and fireWith)
    firingStart, // End of the loop when firing
    firingLength, // Index of currently firing callback (modified by remove if needed)
    firingIndex, // Actual callback list
    list = [], // Stack of fire calls for repeatable lists
    stack = !options.once && [], // Fire callbacks
    fire = function(data) {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for (;list && firingIndex < firingLength; firingIndex++) {
        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
          memory = false;
          // To prevent further calls using add
          break;
        }
      }
      firing = false;
      if (list) {
        if (stack) {
          if (stack.length) {
            fire(stack.shift());
          }
        } else if (memory) {
          list = [];
        } else {
          self.disable();
        }
      }
    }, // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if (list) {
          // First, we save the current length
          var start = list.length;
          (function add(args) {
            jQuery.each(args, function(_, arg) {
              var type = jQuery.type(arg);
              if (type === "function") {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && type !== "string") {
                // Inspect recursively
                add(arg);
              }
            });
          })(arguments);
          // Do we need to add the callbacks to the
          // current firing batch?
          if (firing) {
            firingLength = list.length;
          } else if (memory) {
            firingStart = start;
            fire(memory);
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        if (list) {
          jQuery.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              // Handle firing indexes
              if (firing) {
                if (index <= firingLength) {
                  firingLength--;
                }
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            }
          });
        }
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function(fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
      },
      // Remove all callbacks from the list
      empty: function() {
        list = [];
        firingLength = 0;
        return this;
      },
      // Have the list do nothing anymore
      disable: function() {
        list = stack = memory = undefined;
        return this;
      },
      // Is it disabled?
      disabled: function() {
        return !list;
      },
      // Lock the list in its current state
      lock: function() {
        stack = undefined;
        if (!memory) {
          self.disable();
        }
        return this;
      },
      // Is it locked?
      locked: function() {
        return !stack;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function(context, args) {
        if (list && (!fired || stack)) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          if (firing) {
            stack.push(args);
          } else {
            fire(args);
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [ // action, add listener, listener list, final state
      [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        then: function() {
          var fns = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(tuples, function(i, tuple) {
              var fn = jQuery.isFunction(fns[i]) && fns[i];
              // deferred[ done | fail | progress ] for forwarding actions to newDefer
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                } else {
                  newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function(obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        }
      }, deferred = {};
      // Keep pipe for back-compat
      promise.pipe = promise.then;
      // Add list-specific methods
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        // promise[ done | fail | progress ] = list.add
        promise[tuple[1]] = list.add;
        // Handle state
        if (stateString) {
          list.add(function() {
            // state = [ resolved | rejected ]
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        // deferred[ resolve | reject | notify ]
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      // Make the deferred a promise
      promise.promise(deferred);
      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }
      // All done!
      return deferred;
    },
    // Deferred helper
    when: function(subordinate) {
      var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, // the count of uncompleted subordinates
      remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(), // Update function for both resolve and progress values
      updateFunc = function(i, contexts, values) {
        return function(value) {
          contexts[i] = this;
          values[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (values === progressValues) {
            deferred.notifyWith(contexts, values);
          } else if (!--remaining) {
            deferred.resolveWith(contexts, values);
          }
        };
      }, progressValues, progressContexts, resolveContexts;
      // Add listeners to Deferred subordinates; treat others as resolved
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (;i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      // If we're not waiting on anything, resolve the master
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  // The deferred used on DOM ready
  var readyList;
  jQuery.fn.ready = function(fn) {
    // Add the callback
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Hold (or release) the ready event
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    // Handle when the DOM is ready
    ready: function(wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      // Remember that the DOM is ready
      jQuery.isReady = true;
      // If a normal DOM Ready event fired, decrement, and wait if need be
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      // If there are functions bound, to execute
      readyList.resolveWith(document, [ jQuery ]);
      // Trigger any bound ready events
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  /**
 * The ready event handler and self cleanup method
 */
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed, false);
    window.removeEventListener("load", completed, false);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      // Catch cases where $(document).ready() is called after the browser event has already occurred.
      // We once tried to use readyState "interactive" here, but it caused issues like the one
      // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
      if (document.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        setTimeout(jQuery.ready);
      } else {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed, false);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed, false);
      }
    }
    return readyList.promise(obj);
  };
  // Kick off the DOM ready check even if the user does not
  jQuery.ready.promise();
  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0, len = elems.length, bulk = key == null;
    // Sets many values
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (;i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    // Gets
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  /**
 * Determines whether an object can have data
 */
  jQuery.acceptData = function(owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    /* jshint -W018 */
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };
  function Data() {
    // Support: Android<4,
    // Old WebKit does not have Object.preventExtensions/freeze method,
    // return new empty object instead with no [[set]] accessor
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {};
      }
    });
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.accepts = jQuery.acceptData;
  Data.prototype = {
    key: function(owner) {
      // We can accept data for non-element nodes in modern browsers,
      // but we should not, see #8335.
      // Always return the key for a frozen object.
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {}, // Check if the owner object already has a cache key
      unlock = owner[this.expando];
      // If not, create one
      if (!unlock) {
        unlock = Data.uid++;
        // Secure it in a non-enumerable, non-writable property
        try {
          descriptor[this.expando] = {
            value: unlock
          };
          Object.defineProperties(owner, descriptor);
        } catch (e) {
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      // Ensure the cache object
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    set: function(owner, data, value) {
      var prop, // There may be an unlock assigned to this node,
      // if there is no entry for this "owner", create one inline
      // and set the unlock as though an owner entry had always existed
      unlock = this.key(owner), cache = this.cache[unlock];
      // Handle: [ owner, key, value ] args
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        // Fresh assignments by object are shallow copied
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data);
        } else {
          for (prop in data) {
            cache[prop] = data[prop];
          }
        }
      }
      return cache;
    },
    get: function(owner, key) {
      // Either a valid cache is found, or will be created.
      // New caches will be created and the unlock returned,
      // allowing direct access to the newly created
      // empty data object. A valid owner object must be provided.
      var cache = this.cache[this.key(owner)];
      return key === undefined ? cache : cache[key];
    },
    access: function(owner, key, value) {
      var stored;
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      // [*]When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //
      this.set(owner, key, value);
      // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
      if (key === undefined) {
        this.cache[unlock] = {};
      } else {
        // Support array or space separated string of keys
        if (jQuery.isArray(key)) {
          // If "name" is an array of keys...
          // When data is initially created, via ("key", "val") signature,
          // keys will be converted to camelCase.
          // Since there is no way to tell _how_ a key was added, remove
          // both plain key and camelCase key. #12786
          // This will only penalize the array argument path.
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          // Try the string as a key before any manipulation
          if (key in cache) {
            name = [ key, camel ];
          } else {
            // If a key with the spaces exists, use it.
            // Otherwise, create an array by matching non-whitespace
            name = camel;
            name = name in cache ? [ name ] : name.match(rnotwhite) || [];
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
    },
    hasData: function(owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
    },
    discard: function(owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  var data_priv = new Data();
  var data_user = new Data();
  //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
  function dataAttr(elem, key, data) {
    var name;
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        // Make sure we set the data so it isn't changed later
        data_user.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    data: function(elem, name, data) {
      return data_user.access(elem, name, data);
    },
    removeData: function(elem, name) {
      data_user.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to data_priv methods, these can be deprecated.
    _data: function(elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i, name, data, elem = this[0], attrs = elem && elem.attributes;
      // Gets all values
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem);
          if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              // Support: IE11+
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            data_priv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      // Sets multiple values
      if (typeof key === "object") {
        return this.each(function() {
          data_user.set(this, key);
        });
      }
      return access(this, function(value) {
        var data, camelKey = jQuery.camelCase(key);
        // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.
        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // with the key as-is
          data = data_user.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          // Attempt to get data from the cache
          // with the key camelized
          data = data_user.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          // Attempt to "discover" the data in
          // HTML5 custom data-* attrs
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          // We tried really hard, but the data doesn't exist.
          return;
        }
        // Set the data...
        this.each(function() {
          // First, attempt to store a copy or reference of any
          // data that might've been store with a camelCased key.
          var data = data_user.get(this, camelKey);
          // For HTML5 data-* attribute interop, we have to
          // store property names with dashes in a camelCase form.
          // This might not apply to all properties...*
          data_user.set(this, camelKey, value);
          // *... In the case of properties that might _actually_
          // have dashes, we need to also store a copy of that
          // unchanged property.
          if (key.indexOf("-") !== -1 && data !== undefined) {
            data_user.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        data_user.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = data_priv.get(elem, type);
        // Speed up dequeue by getting out quickly if this is just a lookup
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
        jQuery.dequeue(elem, type);
      };
      // If the fx queue is dequeued, always remove the progress sentinel
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        // Clear up the last queue stop function
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function() {
          data_priv.remove(elem, [ type + "queue", key ]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        // Ensure a hooks for this queue
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function(type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
        if (!--count) {
          defer.resolveWith(elements, [ elements ]);
        }
      };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = data_priv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
  var isHidden = function(elem, el) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  var rcheckableType = /^(?:checkbox|radio)$/i;
  (function() {
    var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
    // Support: Safari<=5.1
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    // Support: Safari<=5.1, Android<4.2
    // Older WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    // Support: IE<=11+
    // Make sure textarea (and checkbox) defaultValue is properly cloned
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var strundefined = typeof undefined;
  support.focusinBubbles = "onfocusin" in window;
  var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
      // Don't attach events to noData or text/comment nodes (but allow plain objects)
      if (!elemData) {
        return;
      }
      // Caller can pass in an object of custom data in lieu of the handler
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      // Make sure that the handler has a unique ID, used to find/remove it later
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      // Init the element's event structure and main handler, if this is the first
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      // Handle multiple events separated by a space
      types = (types || "").match(rnotwhite) || [ "" ];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue;
        }
        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};
        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;
        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};
        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          // Only use addEventListener if the special events handler returns false
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      // Once for each type.namespace in types; type may be omitted
      types = (types || "").match(rnotwhite) || [ "" ];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        // Remove matching events
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      // Remove the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        data_priv.remove(elem, "events");
      }
    },
    trigger: function(event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      // Don't do events on text and comment nodes
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") >= 0) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      // Caller can pass in a jQuery.Event object, Object, or just an event type string
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      // Clean up the event in case it is being reused
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
      // Allow special events to draw outside the lines
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (;cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      // Fire handlers on the event path
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        // jQuery handler
        handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        // Native handler
        handle = ontype && cur[ontype];
        if (handle && handle.apply && jQuery.acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      // If nobody prevented the default action, do it now
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          // Call a native DOM method on the target with the same name name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function(event) {
      // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix(event);
      var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;
      event.delegateTarget = this;
      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      // Determine handlers
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      // Run delegates first; they may want to stop propagation beneath us
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // Triggered event must either 1) have no namespace, or 2) have namespace(s)
          // a subset or equal to those in the bound event (both can have no namespace).
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      // Call the postDispatch hook for the mapped type
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
      // Find delegate handlers
      // Black-hole SVG <use> instance trees (#13180)
      // Avoid non-left-click bubbling in Firefox (#3861)
      if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
        for (;cur !== this; cur = cur.parentNode || this) {
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.disabled !== true || event.type !== "click") {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              // Don't conflict with Object.prototype properties (#13203)
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      // Add the remaining (directly-bound) handlers
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    // Includes some event props shared by KeyEvent and MouseEvent
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        // Add which for key events
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(event, original) {
        var eventDoc, doc, body, button = original.button;
        // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        // Add which for click: 1 === left; 2 === middle; 3 === right
        // Note: button is not normalized, so don't use it
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      // Create a writable copy of the event object and normalize some properties
      var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      // Support: Cordova 2.5 (WebKit) (#13255)
      // All events should have a target; Cordova deviceready doesn't
      if (!event.target) {
        event.target = document;
      }
      // Support: Safari 6.0+, Chrome<28
      // Target should not be a text node (#504, #13143)
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      focus: {
        // Fire native event if possible so blur/focus sequence is correct
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        // For checkbox, fire native event so checked state will be right
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        // For cross-browser consistency, don't fire native .click() on links
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function(event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate: function(type, elem, event, bubble) {
      // Piggyback on a donor event to simulate a different one.
      // Fake originalEvent to avoid donor's stopPropagation, but if the
      // simulated event prevents default then we do the same on the donor.
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
        originalEvent: {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };
  jQuery.Event = function(src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    // Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android<4.0
      src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    // Put explicitly provided properties onto the event object
    if (props) {
      jQuery.extend(this, props);
    }
    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || jQuery.now();
    // Mark it as fixed
    this[jQuery.expando] = true;
  };
  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  // Create mouseenter/leave events using mouseover/out and event-time checks
  // Support: Chrome 15+
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
        // For mousenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  // Support: Firefox, Chrome, Safari
  // Create "bubbling" focus and blur events
  if (!support.focusinBubbles) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          data_priv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            data_priv.remove(doc, fix);
          } else {
            data_priv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function(types, selector, data, fn, /*INTERNAL*/ one) {
      var origFn, type;
      // Types can be a map of types/handlers
      if (typeof types === "object") {
        // ( types-Object, selector, data )
        if (typeof selector !== "string") {
          // ( types-Object, data )
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        // ( types, fn )
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === "string") {
          // ( types, selector, fn )
          fn = data;
          data = undefined;
        } else {
          // ( types, data, fn )
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event) {
          // Can use an empty set, since event contains the info
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        // Use same guid so caller can remove using origFn
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function(types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, // We have to close these tags to support XHTML (#13200)
  wrapMap = {
    // Support: IE9
    option: [ 1, "<select multiple='multiple'>", "</select>" ],
    thead: [ 1, "<table>", "</table>" ],
    col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
    _default: [ 0, "", "" ]
  };
  // Support: IE9
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  // Support: 1.x compatibility
  // Manipulating tables requires a tbody
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  // Mark scripts as having already been evaluated
  function setGlobalEval(elems, refElements) {
    var i = 0, l = elems.length;
    for (;i < l; i++) {
      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    // 1. Copy private data: events, handlers, etc.
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src);
      pdataCur = data_priv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    // 2. Copy user data
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src);
      udataCur = jQuery.extend({}, udataOld);
      data_user.set(dest, udataCur);
    }
  }
  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
  }
  // Fix IE bugs, see support tests
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    // Fails to persist the checked state of a cloned checkbox or radio button.
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.extend({
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
      // Fix IE cloning issues
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      // Copy the events from the original to the clone
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      // Preserve script evaluation history
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      // Return the cloned set
      return clone;
    },
    buildFragment: function(elems, context, scripts, selection) {
      var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
      for (;i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          // Add nodes directly
          if (jQuery.type(elem) === "object") {
            // Support: QtWebKit, PhantomJS
            // push.apply(_, arraylike) throws on ancient WebKit
            jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            // Support: QtWebKit, PhantomJS
            // push.apply(_, arraylike) throws on ancient WebKit
            jQuery.merge(nodes, tmp.childNodes);
            // Remember the top-level container
            tmp = fragment.firstChild;
            // Ensure the created nodes are orphaned (#12392)
            tmp.textContent = "";
          }
        }
      }
      // Remove wrapper from fragment
      fragment.textContent = "";
      i = 0;
      while (elem = nodes[i++]) {
        // #4087 - If origin and destination elements are the same, and this is
        // that element, do not do anything
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        // Append to fragment
        tmp = getAll(fragment.appendChild(elem), "script");
        // Preserve script evaluation history
        if (contains) {
          setGlobalEval(tmp);
        }
        // Capture executables
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData: function(elems) {
      var data, elem, type, key, special = jQuery.event.special, i = 0;
      for (;(elem = elems[i]) !== undefined; i++) {
        if (jQuery.acceptData(elem)) {
          key = elem[data_priv.expando];
          if (key && (data = data_priv.cache[key])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (data_priv.cache[key]) {
              // Discard any remaining `private` data
              delete data_priv.cache[key];
            }
          }
        }
        // Discard any remaining `user` data
        delete data_user.cache[elem[data_user.expando]];
      }
    }
  });
  jQuery.fn.extend({
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return this.domManip(arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return this.domManip(arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function(selector, keepData) {
      var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
      for (;(elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function() {
      var elem, i = 0;
      for (;(elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false));
          // Remove any remaining nodes
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        // See if we can take a shortcut and just use innerHTML
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (;i < l; i++) {
              elem = this[i] || {};
              // Remove element nodes and prevent memory leaks
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var arg = arguments[0];
      // Make the changes, replacing each context element with the new content
      this.domManip(arguments, function(elem) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(elem, this);
        }
      });
      // Force removal if there was no new content (e.g., from empty arguments)
      return arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    detach: function(selector) {
      return this.remove(selector, true);
    },
    domManip: function(args, callback) {
      // Flatten any nested arrays
      args = concat.apply([], args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
      // We can't cloneNode fragments that contain checked, in WebKit
      if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
        return this.each(function(index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          // Use the original fragment for the last item instead of the first because it can end up
          // being emptied incorrectly in certain situations (#8070).
          for (;i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              // Keep references to cloned scripts for later restoration
              if (hasScripts) {
                // Support: QtWebKit
                // jQuery.merge because push.apply(_, arraylike) throws
                jQuery.merge(scripts, getAll(node, "script"));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            // Reenable scripts
            jQuery.map(scripts, restoreScript);
            // Evaluate executable scripts on first document insertion
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                if (node.src) {
                  // Optional AJAX dependency, but won't run scripts if not present
                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src);
                  }
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                }
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
      for (;i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        // Support: QtWebKit
        // .get() because push.apply(_, arraylike) throws
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe, elemdisplay = {};
  /**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
  // Called only from within defaultDisplay
  function actualDisplay(name, doc) {
    var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), // getDefaultComputedStyle might be reliably used only on attached element
    display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? // Use of this method is a temporary fix (more like optimization) until something better comes along,
    // since it was removed from specification and supported only in FF
    style.display : jQuery.css(elem[0], "display");
    // We don't have any data stored on the element,
    // so use "detach" method as fast way to get rid of the element
    elem.detach();
    return display;
  }
  /**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
  function defaultDisplay(nodeName) {
    var doc = document, display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      // If the simple way fails, read from inside an iframe
      if (display === "none" || !display) {
        // Use the already-created iframe if possible
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
        doc = iframe[0].contentDocument;
        // Support: IE
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      // Store the correct default display
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = /^margin/;
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    if (elem.ownerDocument.defaultView.opener) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    }
    return window.getComputedStyle(elem, null);
  };
  function curCSS(elem, name, computed) {
    var width, minWidth, maxWidth, ret, style = elem.style;
    computed = computed || getStyles(elem);
    // Support: IE9
    // getPropertyValue is only needed for .css('filter') (#12537)
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
    }
    if (computed) {
      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      // Support: iOS < 6
      // A tribute to the "awesome hack by Dean Edwards"
      // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
      // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    // Support: IE
    // IE returns zIndex value as an integer.
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function() {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        }
        // Hook needed; redefine it so that the support test is not executed again.
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  (function() {
    var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
    if (!div.style) {
      return;
    }
    // Support: IE9-11+
    // Style of cloned element affects source element cloned (#8908)
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
    container.appendChild(div);
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computePixelPositionAndBoxSizingReliable() {
      div.style.cssText = // Support: Firefox<29, Android 2.3
      // Vendor-prefix box-sizing
      "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
      div.innerHTML = "";
      docElem.appendChild(container);
      var divStyle = window.getComputedStyle(div, null);
      pixelPositionVal = divStyle.top !== "1%";
      boxSizingReliableVal = divStyle.width === "4px";
      docElem.removeChild(container);
    }
    // Support: node.js jsdom
    // Don't assume that getComputedStyle is a property of the global object
    if (window.getComputedStyle) {
      jQuery.extend(support, {
        pixelPosition: function() {
          // This test is executed only once but we still do memoizing
          // since we can use the boxSizingReliable pre-computing.
          // No need to check if the test was already performed, though.
          computePixelPositionAndBoxSizingReliable();
          return pixelPositionVal;
        },
        boxSizingReliable: function() {
          if (boxSizingReliableVal == null) {
            computePixelPositionAndBoxSizingReliable();
          }
          return boxSizingReliableVal;
        },
        reliableMarginRight: function() {
          // Support: Android 2.3
          // Check if div with explicit width and no margin-right incorrectly
          // gets computed margin-right based on width of container. (#3333)
          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
          // This support function is only executed once so no memoizing is needed.
          var ret, marginDiv = div.appendChild(document.createElement("div"));
          // Reset CSS: box-sizing; display; margin; border; padding
          marginDiv.style.cssText = div.style.cssText = // Support: Firefox<29, Android 2.3
          // Vendor-prefix box-sizing
          "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
          marginDiv.style.marginRight = marginDiv.style.width = "0";
          div.style.width = "1px";
          docElem.appendChild(container);
          ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
          docElem.removeChild(container);
          div.removeChild(marginDiv);
          return ret;
        }
      });
    }
  })();
  // A method for quickly swapping in/out CSS properties to get correct calculations.
  jQuery.swap = function(elem, options, callback, args) {
    var ret, name, old = {};
    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var // Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  }, cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
  // Return a css property mapped to a potentially vendor prefixed property
  function vendorPropName(style, name) {
    // Shortcut for names that are not vendor prefixed
    if (name in style) {
      return name;
    }
    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? // If we already have the right measurement, avoid augmentation
    4 : // Otherwise initialize for horizontal or vertical properties
    name === "width" ? 1 : 0, val = 0;
    for (;i < 4; i += 2) {
      // Both box models exclude margin, so add it if we want it
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        // border-box includes padding, so remove it if we want content
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        // At this point, extra isn't border nor margin, so remove border
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        // At this point, extra isn't content, so add padding
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        // At this point, extra isn't content nor padding, so add border
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    // Start with offset property, which is equivalent to the border-box value
    var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    // Some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if (val <= 0 || val == null) {
      // Fall back to computed then uncomputed css if necessary
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      // Computed unit is not pixels. Stop here and return.
      if (rnumnonpx.test(val)) {
        return val;
      }
      // Check for style in case a browser which returns unreliable values
      // for getComputedStyle silently falls back to the reliable elem.style
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      // Normalize "", auto, and prepare for extra
      val = parseFloat(val) || 0;
    }
    // Use the active box-sizing model to add/subtract irrelevant styles
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  function showHide(elements, show) {
    var display, elem, hidden, values = [], index = 0, length = elements.length;
    for (;index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = data_priv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        // Reset the inline display of this element to learn if it is
        // being hidden by cascaded rules or not
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        // Set elements which have been overridden with display: none
        // in a stylesheet to whatever the default browser style is
        // for such an element
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
      "float": "cssFloat"
    },
    // Get and set the style property on a DOM Node
    style: function(elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      // Make sure that we're working with the right name
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      // Gets hook for the prefixed version, then unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      // Check if we're setting a value
      if (value !== undefined) {
        type = typeof value;
        // Convert "+=" or "-=" to relative numbers (#7345)
        if (type === "string" && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          // Fixes bug #9237
          type = "number";
        }
        // Make sure that null and NaN values aren't set (#7116)
        if (value == null || value !== value) {
          return;
        }
        // If a number, add 'px' to the (except for certain CSS properties)
        if (type === "number" && !jQuery.cssNumber[origName]) {
          value += "px";
        }
        // Support: IE9-11+
        // background-* props affect original clone's values
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        // If a hook was provided, use that value, otherwise just set the specified value
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        // Otherwise just get the value from the style object
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      // Make sure that we're working with the right name
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      // Try prefixed name followed by the unprefixed name
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      // If a hook was provided get the computed value from there
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      // Otherwise, if a way to get the computed value exists, use that
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      // Convert "normal" to computed value
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      // Make numeric if forced or a qualifier was provided and val looks numeric
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each([ "height", "width" ], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
      }
    };
  });
  // Support: Android 2.3
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return jQuery.swap(elem, {
        display: "inline-block"
      }, curCSS, [ elem, "marginRight" ]);
    }
  });
  // These hooks are used by animate to expand properties
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function(value) {
        var i = 0, expanded = {}, // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [ value ];
        for (;i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles, len, map = {}, i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (;i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || "swing";
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.
        result = jQuery.css(tween.elem, tween.prop, "");
        // Empty strings, null, undefined and "auto" are converted to 0.
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  // Support: IE9
  // Panic based approach to setting things on disconnected nodes
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return .5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.fx = Tween.prototype.init;
  // Back Compat <1.8 extension point
  jQuery.fx.step = {};
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
    "*": [ function(prop, value) {
      var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), // Starting value computation is required for potential unit mismatches
      start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
      if (start && start[3] !== unit) {
        // Trust units reported by jQuery.css
        unit = unit || start[3];
        // Make sure we update the tween properties later on
        parts = parts || [];
        // Iteratively approximate from a nonzero starting point
        start = +target || 1;
        do {
          // If previous iteration zeroed out, double until we get *something*.
          // Use string for doubling so we don't accidentally see scale as unchanged below
          scale = scale || ".5";
          // Adjust and apply
          start = start / scale;
          jQuery.style(tween.elem, prop, start + unit);
        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
      }
      // Update tween properties
      if (parts) {
        start = tween.start = +start || +target || 0;
        tween.unit = unit;
        // If a +=/-= token was provided, we're doing a relative animation
        tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
      }
      return tween;
    } ]
  };
  // Animations created synchronously will run synchronously
  function createFxNow() {
    setTimeout(function() {
      fxNow = undefined;
    });
    return fxNow = jQuery.now();
  }
  // Generate parameters to create a standard animation
  function genFx(type, includeWidth) {
    var which, i = 0, attrs = {
      height: type
    };
    // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for (;i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
    for (;index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // We're done with this property
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    /* jshint validthis: true */
    var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
    // Handle queue: false promises
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        // Ensure the complete handler is called before this completes
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    // Height/width overflow pass
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      // Make sure that nothing sneaks out
      // Record all 3 overflow attributes because IE9-10 do not
      // change the overflow attribute when overflowX and
      // overflowY are set to the same value
      opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
      // Set display property to inline-block for height/width
      // animations on inline elements that are having width/height animated
      display = jQuery.css(elem, "display");
      // Test default display if display is currently "none"
      checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    // show/hide pass
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, "fxshow", {});
      }
      // Store state if its toggle - enables .stop().toggle() to "reverse"
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        data_priv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    // camelCase, specialEasing and expand cssHook pass
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
      // Don't match elem in the :animated selector
      delete tick.elem;
    }), tick = function() {
      if (stopped) {
        return false;
      }
      var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), // Support: Android 2.3
      // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
      temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
      for (;index < length; index++) {
        animation.tweens[index].run(percent);
      }
      deferred.notifyWith(elem, [ animation, percent, remaining ]);
      if (percent < 1 && length) {
        return remaining;
      } else {
        deferred.resolveWith(elem, [ animation ]);
        return false;
      }
    }, animation = deferred.promise({
      elem: elem,
      props: jQuery.extend({}, properties),
      opts: jQuery.extend(true, {
        specialEasing: {}
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function(prop, end) {
        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        animation.tweens.push(tween);
        return tween;
      },
      stop: function(gotoEnd) {
        var index = 0, // If we are going to the end, we want to run all the tweens
        // otherwise we skip this part
        length = gotoEnd ? animation.tweens.length : 0;
        if (stopped) {
          return this;
        }
        stopped = true;
        for (;index < length; index++) {
          animation.tweens[index].run(1);
        }
        // Resolve when we played the last frame; otherwise, reject
        if (gotoEnd) {
          deferred.resolveWith(elem, [ animation, gotoEnd ]);
        } else {
          deferred.rejectWith(elem, [ animation, gotoEnd ]);
        }
        return this;
      }
    }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (;index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    // attach callbacks from options
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = [ "*" ];
      } else {
        props = props.split(" ");
      }
      var prop, index = 0, length = props.length;
      for (;index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function(callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    // Normalize opt.queue - true/undefined/null -> "fx"
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    // Queueing
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHidden).css("opacity", 0).show().end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        // Empty animations, or finishing resolves immediately
        if (empty || data_priv.get(this, "finish")) {
          anim.stop(true);
        }
      };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
        // Enable finishing flag on private data
        data.finish = true;
        // Empty the queue first
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        // Look for any active animations, and finish them
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        // Look for any animations in the old queue and finish them
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        // Turn off finishing flag
        delete data.finish;
      });
    }
  });
  jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  // Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer, i = 0, timers = jQuery.timers;
    fxNow = jQuery.now();
    for (;i < timers.length; i++) {
      timer = timers[i];
      // Checks the timer has not already been removed
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  };
  // Based off of the plugin by Clint Helfers, with permission.
  // http://blindsignals.com/index.php/2009/07/jquery-delay/
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = setTimeout(next, time);
      hooks.stop = function() {
        clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    // Support: iOS<=5.1, Android<=4.2+
    // Default value for a checkbox should be "on"
    support.checkOn = input.value !== "";
    // Support: IE<=11+
    // Must access selectedIndex to make default options select
    support.optSelected = opt.selected;
    // Support: Android<=2.3
    // Options inside disabled selects are incorrectly marked as disabled
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    // Support: IE<=11+
    // An input loses its value after becoming a radio
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      // don't get/set attributes on text, comment and attribute nodes
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      // Fallback to prop when attributes are not supported
      if (typeof elem.getAttribute === strundefined) {
        return jQuery.prop(elem, name, value);
      }
      // All attributes are lowercase
      // Grab necessary hook if one is defined
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + "");
          return value;
        }
      } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        // Non-existent attributes return null, we normalize to undefined
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function(elem, value) {
      var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          propName = jQuery.propFix[name] || name;
          // Boolean attributes get special treatment (#10870)
          if (jQuery.expr.match.bool.test(name)) {
            // Set corresponding property to false
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks: {
      type: {
        set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    }
  });
  // Hooks for boolean attributes
  boolHook = {
    set: function(elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret, handle;
      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      // Don't get/set properties on text, comment and attribute nodes
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
      } else {
        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
      }
    },
    propHooks: {
      tabIndex: {
        get: function(elem) {
          return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
        }
      }
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }
    };
  }
  jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass: function(value) {
      var classes, elem, cur, clazz, j, finalValue, proceed = typeof value === "string" && value, i = 0, len = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        // The disjunction here is for better compressibility (see removeClass)
        classes = (value || "").match(rnotwhite) || [];
        for (;i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            // only assign if different to avoid unneeded rendering.
            finalValue = jQuery.trim(cur);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes, elem, cur, clazz, j, finalValue, proceed = arguments.length === 0 || typeof value === "string" && value, i = 0, len = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(rnotwhite) || [];
        for (;i < len; i++) {
          elem = this[i];
          // This expression is here for better compressibility (see addClass)
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") >= 0) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            // Only assign if different to avoid unneeded rendering.
            finalValue = value ? jQuery.trim(cur) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function() {
        if (type === "string") {
          // Toggle individual class names
          var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || [];
          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (type === strundefined || type === "boolean") {
          if (this.className) {
            // store className if set
            data_priv.set(this, "__className__", this.className);
          }
          // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.
          this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
        }
      });
    },
    hasClass: function(selector) {
      var className = " " + selector + " ", i = 0, l = this.length;
      for (;i < l; i++) {
        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function(value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          // Handle most common string cases
          // Handle cases where value is null/undef or number
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        // Treat null/undefined as ""; convert numbers to string
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        // If set returns undefined, fall back to normal setting
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          // Support: IE10-11+
          // option.text throws exceptions (#14686, #14858)
          return val != null ? val : jQuery.trim(jQuery.text(elem));
        }
      },
      select: {
        get: function(elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          // Loop through all the selected options
          for (;i < max; i++) {
            option = options[i];
            // IE6-9 doesn't update selected after form reset (#2551)
            if ((option.selected || i === index) && (// Don't return options that are disabled or in a disabled optgroup
            support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val();
              // We don't need an array for one selects
              if (one) {
                return value;
              }
              // Multi-Selects return an array
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(option.value, values) >= 0) {
              optionSet = true;
            }
          }
          // Force browsers to behave consistently when non-matching value is set
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }
  });
  // Radios and checkboxes getter/setter
  jQuery.each([ "radio", "checkbox" ], function() {
    jQuery.valHooks[this] = {
      set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  // Return jQuery for attributes-only inclusion
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    // Handle event binding
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  });
  var nonce = jQuery.now();
  var rquery = /\?/;
  // Support: Android 2.3
  // Workaround failure to string-cast null input
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  // Cross-browser xml parsing
  jQuery.parseXML = function(data) {
    var xml, tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    // Support: IE9
    try {
      tmp = new DOMParser();
      xml = tmp.parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
  prefilters = {}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
  transports = {}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*"), // Document location
  ajaxLocation = window.location.href, // Segment location into parts
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
    // Remove auto dataType and get content-type in the process
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    // Check if we're dealing with a known content-type
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    // Check to see if we have a response for the expected dataType
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }
    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice();
    // Create converters map with lowercased keys
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    // Convert to each sequential dataType
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      // Apply the dataFilter if provided
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current];
          // If none found, seek a pair
          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          // Apply converter (if not an equivalence)
          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": jQuery.parseJSON,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function(target, settings) {
      // Building a settings object
      // Extending ajaxSettings
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function(url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      // Force options to be an object
      options = options || {};
      var transport, // URL without anti-cache param
      cacheURL, // Response headers
      responseHeadersString, responseHeaders, // timeout handle
      timeoutTimer, // Cross-domain detection vars
      parts, // To know if global events are to be dispatched
      fireGlobals, // Loop variable
      i, // Create the final options object
      s = jQuery.ajaxSetup({}, options), // Callbacks context
      callbackContext = s.context || s, // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, // Deferreds
      deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), // Status-dependent callbacks
      statusCode = s.statusCode || {}, // Headers (they are sent all at once)
      requestHeaders = {}, requestHeadersNames = {}, // The jqXHR state
      state = 0, // Default abort message
      strAbort = "canceled", // Fake xhr
      jqXHR = {
        readyState: 0,
        // Builds headers hashtable if needed
        getResponseHeader: function(key) {
          var match;
          if (state === 2) {
            if (!responseHeaders) {
              responseHeaders = {};
              while (match = rheaders.exec(responseHeadersString)) {
                responseHeaders[match[1].toLowerCase()] = match[2];
              }
            }
            match = responseHeaders[key.toLowerCase()];
          }
          return match == null ? null : match;
        },
        // Raw string
        getAllResponseHeaders: function() {
          return state === 2 ? responseHeadersString : null;
        },
        // Caches the header
        setRequestHeader: function(name, value) {
          var lname = name.toLowerCase();
          if (!state) {
            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
            requestHeaders[name] = value;
          }
          return this;
        },
        // Overrides response content-type header
        overrideMimeType: function(type) {
          if (!state) {
            s.mimeType = type;
          }
          return this;
        },
        // Status-dependent callbacks
        statusCode: function(map) {
          var code;
          if (map) {
            if (state < 2) {
              for (code in map) {
                // Lazy-add the new callback in a way that preserves old ones
                statusCode[code] = [ statusCode[code], map[code] ];
              }
            } else {
              // Execute the appropriate callbacks
              jqXHR.always(map[jqXHR.status]);
            }
          }
          return this;
        },
        // Cancel the request
        abort: function(statusText) {
          var finalText = statusText || strAbort;
          if (transport) {
            transport.abort(finalText);
          }
          done(0, finalText);
          return this;
        }
      };
      // Attach deferreds
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      // Remove hash character (#7531: and string promotion)
      // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available
      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
      // Alias method option to type as per ticket #12004
      s.type = options.method || options.type || s.method || s.type;
      // Extract dataTypes list
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
      // A cross-domain request is in order when we have a protocol:host:port mismatch
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
      }
      // Convert data if not already a string
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      // Apply prefilters
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      // If request was aborted inside a prefilter, stop there
      if (state === 2) {
        return jqXHR;
      }
      // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
      fireGlobals = jQuery.event && s.global;
      // Watch for a new set of requests
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      // Uppercase the type
      s.type = s.type.toUpperCase();
      // Determine if request has content
      s.hasContent = !rnoContent.test(s.type);
      // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      cacheURL = s.url;
      // More options handling for requests with no content
      if (!s.hasContent) {
        // If data is available, append data to url
        if (s.data) {
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          // #9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }
        // Add anti-cache in url if needed
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? // If there is already a '_' parameter, set its value
          cacheURL.replace(rts, "$1_=" + nonce++) : // Otherwise add one to the end
          cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      // Set the correct header, if data is being sent
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      // Check for headers option
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      // Allow custom headers/mimetypes and early abort
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        // Abort if not done already and return
        return jqXHR.abort();
      }
      // Aborting is no longer a cancellation
      strAbort = "abort";
      // Install callbacks on deferreds
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      // Get transport
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      // If no transport, we auto-abort
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        // Send global event
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
        }
        // Timeout
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Propagate exception as error if not done
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      // Callback for when everything is done
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        // Called once
        if (state === 2) {
          return;
        }
        // State is "done" now
        state = 2;
        // Clear timeout if it exists
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;
        // Cache response headers
        responseHeadersString = headers || "";
        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;
        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;
        // Get response data
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        // If successful, handle type chaining
        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          // if no content
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        // Success/Error
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
        } else {
          deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
        }
        // Status-dependent callbacks
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
        }
        // Complete
        completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
          // Handle the global AJAX counter
          if (!--jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each([ "get", "post" ], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        // The elements to wrap the target around
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    // Support: Opera <= 12.12
    // Opera reports offsetWidths and offsetHeights less than zero on some elements
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
  };
  jQuery.expr.filters.visible = function(elem) {
    return !jQuery.expr.filters.hidden(elem);
  };
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }
  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function(a, traditional) {
    var prefix, s = [], add = function(key, value) {
      // If value is a function, invoke it and return its value
      value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    // If an array was passed in, assume that it is an array of form elements.
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    // Return the resulting serialization
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        // Use .is( ":disabled" ) so that fieldset[disabled] works
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
  };
  var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
    // file protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE9
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  }, xhrSupported = jQuery.ajaxSettings.xhr();
  // Support: IE9
  // Open requests must be manually aborted on unload (#5280)
  // See https://support.microsoft.com/kb/2856746 for more info
  if (window.attachEvent) {
    window.attachEvent("onunload", function() {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
    });
  }
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback;
    // Cross domain only allowed if supported through XMLHttpRequest
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i, xhr = options.xhr(), id = ++xhrId;
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          // Apply custom fields if provided
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          // Override mime type if needed
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          // Set headers
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          // Callback
          callback = function(type) {
            return function() {
              if (callback) {
                delete xhrCallbacks[id];
                callback = xhr.onload = xhr.onerror = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  complete(// file: protocol always yields status 0; see #8605, #14207
                  xhr.status, xhr.statusText);
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, // Support: IE9
                  // Accessing binary-data responseText throws an exception
                  // (#11426)
                  typeof xhr.responseText === "string" ? {
                    text: xhr.responseText
                  } : undefined, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          // Listen to events
          xhr.onload = callback();
          xhr.onerror = callback("error");
          // Create the abort callback
          callback = xhrCallbacks[id] = callback("abort");
          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // #14683: Only rethrow if this hasn't been notified as an error yet
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  // Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  // Bind script tag hack transport
  jQuery.ajaxTransport("script", function(s) {
    // This transport only deals with cross domain requests
    if (s.crossDomain) {
      var script, callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            async: true,
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
  // Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      this[callback] = true;
      return callback;
    }
  });
  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      // Insert callback into url or form data
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      // Use data converter to retrieve json after script execution
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      // force json dataType
      s.dataTypes[0] = "json";
      // Install callback
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      // Clean-up function (fires after converters)
      jqXHR.always(function() {
        // Restore preexisting value
        window[callbackName] = overwritten;
        // Save back as free
        if (s[callbackName]) {
          // make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback;
          // save the callback name for future use
          oldCallbacks.push(callbackName);
        }
        // Call if it was a function and we have a response
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      // Delegate to script
      return "script";
    }
  });
  // data: string of html
  // context (optional): If specified, the fragment will be created in this context, defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
    // Single tag
    if (parsed) {
      return [ context.createElement(parsed[1]) ];
    }
    parsed = jQuery.buildFragment([ data ], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  // Keep a copy of the old load method
  var _load = jQuery.fn.load;
  /**
 * Load a url into a page
 */
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector, type, response, self = this, off = url.indexOf(" ");
    if (off >= 0) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    // If it's a function
    if (jQuery.isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // if "type" variable is undefined, then "GET" method will be used
        type: type,
        dataType: "html",
        data: params
      }).done(function(responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
        responseText);
      }).complete(callback && function(jqXHR, status) {
        self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
      });
    }
    return this;
  };
  // Attach a bunch of functions for handling common AJAX events
  jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = window.document.documentElement;
  /**
 * Gets a window from an element
 */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {
    setOffset: function(elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
      // Set position first, in-case top/left are set even on static elem
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem, win, elem = this[0], box = {
        top: 0,
        left: 0
      }, doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      // Make sure it's not a disconnected DOM node
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      // Support: BlackBerry 5, iOS 3 (original iPhone)
      // If we don't have gBCR, just use 0,0 rather than error
      if (typeof elem.getBoundingClientRect !== strundefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent, offset, elem = this[0], parentOffset = {
        top: 0,
        left: 0
      };
      // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
      if (jQuery.css(elem, "position") === "fixed") {
        // Assume getBoundingClientRect is there when computed position is fixed
        offset = elem.getBoundingClientRect();
      } else {
        // Get *real* offsetParent
        offsetParent = this.offsetParent();
        // Get correct offsets
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        // Add offsetParent borders
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      // Subtract parent offsets and element margins
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  // Create scrollLeft and scrollTop methods
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  // Support: Safari<7+, Chrome<37+
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here
  jQuery.each([ "top", "left" ], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        // If curCSS returns percentage, fallback to offset
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
            // isn't a whole lot we can do. See pull request at this URL for discussion:
            // https://github.com/jquery/jquery/pull/764
            return elem.document.documentElement["client" + name];
          }
          // Get document width or height
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          // Get width or height on the element, requesting but not forcing parseFloat
          // Set width or height on the element
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  // The number of elements contained in the matched element set
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  }
  var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery, // Map over the $ in case of overwrite
  _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)
  if (typeof noGlobal === strundefined) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if (typeof jQuery === "undefined") {
  throw new Error("Bootstrap's JavaScript requires jQuery");
}

+function($) {
  "use strict";
  var version = $.fn.jquery.split(" ")[0].split(".");
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================
  function transitionEnd() {
    var el = document.createElement("bootstrap");
    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }
  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one("bsTransitionEnd", function() {
      called = true;
    });
    var callback = function() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };
  $(function() {
    $.support.transition = transitionEnd();
    if (!$.support.transition) return;
    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // ALERT CLASS DEFINITION
  // ======================
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function(el) {
    $(el).on("click", dismiss, this.close);
  };
  Alert.VERSION = "3.3.4";
  Alert.TRANSITION_DURATION = 150;
  Alert.prototype.close = function(e) {
    var $this = $(this);
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = $(selector);
    if (e) e.preventDefault();
    if (!$parent.length) {
      $parent = $this.closest(".alert");
    }
    $parent.trigger(e = $.Event("close.bs.alert"));
    if (e.isDefaultPrevented()) return;
    $parent.removeClass("in");
    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger("closed.bs.alert").remove();
    }
    $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };
  // ALERT PLUGIN DEFINITION
  // =======================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.alert");
      if (!data) $this.data("bs.alert", data = new Alert(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.alert;
  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;
  // ALERT NO CONFLICT
  // =================
  $.fn.alert.noConflict = function() {
    $.fn.alert = old;
    return this;
  };
  // ALERT DATA-API
  // ==============
  $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================
  var Button = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };
  Button.VERSION = "3.3.4";
  Button.DEFAULTS = {
    loadingText: "loading..."
  };
  Button.prototype.setState = function(state) {
    var d = "disabled";
    var $el = this.$element;
    var val = $el.is("input") ? "val" : "html";
    var data = $el.data();
    state = state + "Text";
    if (data.resetText == null) $el.data("resetText", $el[val]());
    // push to event loop to allow forms to submit
    setTimeout($.proxy(function() {
      $el[val](data[state] == null ? this.options[state] : data[state]);
      if (state == "loadingText") {
        this.isLoading = true;
        $el.addClass(d).attr(d, d);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d);
      }
    }, this), 0);
  };
  Button.prototype.toggle = function() {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');
    if ($parent.length) {
      var $input = this.$element.find("input");
      if ($input.prop("type") == "radio") {
        if ($input.prop("checked") && this.$element.hasClass("active")) changed = false; else $parent.find(".active").removeClass("active");
      }
      if (changed) $input.prop("checked", !this.$element.hasClass("active")).trigger("change");
    } else {
      this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
    }
    if (changed) this.$element.toggleClass("active");
  };
  // BUTTON PLUGIN DEFINITION
  // ========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.button");
      var options = typeof option == "object" && option;
      if (!data) $this.data("bs.button", data = new Button(this, options));
      if (option == "toggle") data.toggle(); else if (option) data.setState(option);
    });
  }
  var old = $.fn.button;
  $.fn.button = Plugin;
  $.fn.button.Constructor = Button;
  // BUTTON NO CONFLICT
  // ==================
  $.fn.button.noConflict = function() {
    $.fn.button = old;
    return this;
  };
  // BUTTON DATA-API
  // ===============
  $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
    var $btn = $(e.target);
    if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
    Plugin.call($btn, "toggle");
    e.preventDefault();
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
    $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // CAROUSEL CLASS DEFINITION
  // =========================
  var Carousel = function(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;
    this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
    this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
  };
  Carousel.VERSION = "3.3.4";
  Carousel.TRANSITION_DURATION = 600;
  Carousel.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: true,
    keyboard: true
  };
  Carousel.prototype.keydown = function(e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
     case 37:
      this.prev();
      break;

     case 39:
      this.next();
      break;

     default:
      return;
    }
    e.preventDefault();
  };
  Carousel.prototype.cycle = function(e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this;
  };
  Carousel.prototype.getItemIndex = function(item) {
    this.$items = item.parent().children(".item");
    return this.$items.index(item || this.$active);
  };
  Carousel.prototype.getItemForDirection = function(direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == "prev" && activeIndex === 0 || direction == "next" && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == "prev" ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };
  Carousel.prototype.to = function(pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (pos > this.$items.length - 1 || pos < 0) return;
    if (this.sliding) return this.$element.one("slid.bs.carousel", function() {
      that.to(pos);
    });
    // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();
    return this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
  };
  Carousel.prototype.pause = function(e) {
    e || (this.paused = true);
    if (this.$element.find(".next, .prev").length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }
    this.interval = clearInterval(this.interval);
    return this;
  };
  Carousel.prototype.next = function() {
    if (this.sliding) return;
    return this.slide("next");
  };
  Carousel.prototype.prev = function() {
    if (this.sliding) return;
    return this.slide("prev");
  };
  Carousel.prototype.slide = function(type, next) {
    var $active = this.$element.find(".item.active");
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == "next" ? "left" : "right";
    var that = this;
    if ($next.hasClass("active")) return this.sliding = false;
    var relatedTarget = $next[0];
    var slideEvent = $.Event("slide.bs.carousel", {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;
    this.sliding = true;
    isCycling && this.pause();
    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass("active");
    }
    var slidEvent = $.Event("slid.bs.carousel", {
      relatedTarget: relatedTarget,
      direction: direction
    });
    // yes, "slid"
    if ($.support.transition && this.$element.hasClass("slide")) {
      $next.addClass(type);
      $next[0].offsetWidth;
      // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one("bsTransitionEnd", function() {
        $next.removeClass([ type, direction ].join(" ")).addClass("active");
        $active.removeClass([ "active", direction ].join(" "));
        that.sliding = false;
        setTimeout(function() {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass("active");
      $next.addClass("active");
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }
    isCycling && this.cycle();
    return this;
  };
  // CAROUSEL PLUGIN DEFINITION
  // ==========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.carousel");
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
      var action = typeof option == "string" ? option : options.slide;
      if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
      if (typeof option == "number") data.to(option); else if (action) data[action](); else if (options.interval) data.pause().cycle();
    });
  }
  var old = $.fn.carousel;
  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;
  // CAROUSEL NO CONFLICT
  // ====================
  $.fn.carousel.noConflict = function() {
    $.fn.carousel = old;
    return this;
  };
  // CAROUSEL DATA-API
  // =================
  var clickHandler = function(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
    // strip for ie7
    if (!$target.hasClass("carousel")) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr("data-slide-to");
    if (slideIndex) options.interval = false;
    Plugin.call($target, options);
    if (slideIndex) {
      $target.data("bs.carousel").to(slideIndex);
    }
    e.preventDefault();
  };
  $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
  $(window).on("load", function() {
    $('[data-ride="carousel"]').each(function() {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================
  var Collapse = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;
    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }
    if (this.options.toggle) this.toggle();
  };
  Collapse.VERSION = "3.3.4";
  Collapse.TRANSITION_DURATION = 350;
  Collapse.DEFAULTS = {
    toggle: true
  };
  Collapse.prototype.dimension = function() {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height";
  };
  Collapse.prototype.show = function() {
    if (this.transitioning || this.$element.hasClass("in")) return;
    var activesData;
    var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
    if (actives && actives.length) {
      activesData = actives.data("bs.collapse");
      if (activesData && activesData.transitioning) return;
    }
    var startEvent = $.Event("show.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    if (actives && actives.length) {
      Plugin.call(actives, "hide");
      activesData || actives.data("bs.collapse", null);
    }
    var dimension = this.dimension();
    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
    this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
    this.transitioning = 1;
    var complete = function() {
      this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
      this.transitioning = 0;
      this.$element.trigger("shown.bs.collapse");
    };
    if (!$.support.transition) return complete.call(this);
    var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };
  Collapse.prototype.hide = function() {
    if (this.transitioning || !this.$element.hasClass("in")) return;
    var startEvent = $.Event("hide.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    var dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
    this.$trigger.addClass("collapsed").attr("aria-expanded", false);
    this.transitioning = 1;
    var complete = function() {
      this.transitioning = 0;
      this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
    };
    if (!$.support.transition) return complete.call(this);
    this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };
  Collapse.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };
  Collapse.prototype.getParent = function() {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };
  Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
    var isOpen = $element.hasClass("in");
    $element.attr("aria-expanded", isOpen);
    $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
  };
  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
    // strip for ie7
    return $(target);
  }
  // COLLAPSE PLUGIN DEFINITION
  // ==========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.collapse");
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
      if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.collapse;
  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse;
  // COLLAPSE NO CONFLICT
  // ====================
  $.fn.collapse.noConflict = function() {
    $.fn.collapse = old;
    return this;
  };
  // COLLAPSE DATA-API
  // =================
  $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
    var $this = $(this);
    if (!$this.attr("data-target")) e.preventDefault();
    var $target = getTargetFromTrigger($this);
    var data = $target.data("bs.collapse");
    var option = data ? "toggle" : $this.data();
    Plugin.call($target, option);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // DROPDOWN CLASS DEFINITION
  // =========================
  var backdrop = ".dropdown-backdrop";
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function(element) {
    $(element).on("click.bs.dropdown", this.toggle);
  };
  Dropdown.VERSION = "3.3.4";
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this);
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
      }
      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger("focus").attr("aria-expanded", "true");
      $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
    }
    return false;
  };
  Dropdown.prototype.keydown = function(e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger("focus");
      return $this.trigger("click");
    }
    var desc = " li:not(.disabled):visible a";
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--;
    // up
    if (e.which == 40 && index < $items.length - 1) index++;
    // down
    if (!~index) index = 0;
    $items.eq(index).trigger("focus");
  };
  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function() {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass("open")) return;
      $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr("aria-expanded", "false");
      $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget);
    });
  }
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }
  // DROPDOWN PLUGIN DEFINITION
  // ==========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.dropdown");
      if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;
  // DROPDOWN NO CONFLICT
  // ====================
  $.fn.dropdown.noConflict = function() {
    $.fn.dropdown = old;
    return this;
  };
  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================
  $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
    e.stopPropagation();
  }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', Dropdown.prototype.keydown);
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // MODAL CLASS DEFINITION
  // ======================
  var Modal = function(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find(".modal-dialog");
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;
    if (this.options.remote) {
      this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
        this.$element.trigger("loaded.bs.modal");
      }, this));
    }
  };
  Modal.VERSION = "3.3.4";
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  Modal.prototype.toggle = function(_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };
  Modal.prototype.show = function(_relatedTarget) {
    var that = this;
    var e = $.Event("show.bs.modal", {
      relatedTarget: _relatedTarget
    });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass("modal-open");
    this.escape();
    this.resize();
    this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.$dialog.on("mousedown.dismiss.bs.modal", function() {
      that.$element.one("mouseup.dismiss.bs.modal", function(e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });
    this.backdrop(function() {
      var transition = $.support.transition && that.$element.hasClass("fade");
      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body);
      }
      that.$element.show().scrollTop(0);
      that.adjustDialog();
      if (transition) {
        that.$element[0].offsetWidth;
      }
      that.$element.addClass("in").attr("aria-hidden", false);
      that.enforceFocus();
      var e = $.Event("shown.bs.modal", {
        relatedTarget: _relatedTarget
      });
      transition ? that.$dialog.one("bsTransitionEnd", function() {
        that.$element.trigger("focus").trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
    });
  };
  Modal.prototype.hide = function(e) {
    if (e) e.preventDefault();
    e = $.Event("hide.bs.modal");
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off("focusin.bs.modal");
    this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
    this.$dialog.off("mousedown.dismiss.bs.modal");
    $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };
  Modal.prototype.enforceFocus = function() {
    $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger("focus");
      }
    }, this));
  };
  Modal.prototype.escape = function() {
    if (this.isShown && this.options.keyboard) {
      this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off("keydown.dismiss.bs.modal");
    }
  };
  Modal.prototype.resize = function() {
    if (this.isShown) {
      $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
    } else {
      $(window).off("resize.bs.modal");
    }
  };
  Modal.prototype.hideModal = function() {
    var that = this;
    this.$element.hide();
    this.backdrop(function() {
      that.$body.removeClass("modal-open");
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger("hidden.bs.modal");
    });
  };
  Modal.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  Modal.prototype.backdrop = function(callback) {
    var that = this;
    var animate = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body);
      this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == "static" ? this.$element[0].focus() : this.hide();
      }, this));
      if (doAnimate) this.$backdrop[0].offsetWidth;
      // force reflow
      this.$backdrop.addClass("in");
      if (!callback) return;
      doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var callbackRemove = function() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };
  // these following methods are used to handle overflowing modals
  Modal.prototype.handleUpdate = function() {
    this.adjustDialog();
  };
  Modal.prototype.adjustDialog = function() {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
    });
  };
  Modal.prototype.resetAdjustments = function() {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    });
  };
  Modal.prototype.checkScrollbar = function() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };
  Modal.prototype.setScrollbar = function() {
    var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "";
    if (this.bodyIsOverflowing) this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
  };
  Modal.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad);
  };
  Modal.prototype.measureScrollbar = function() {
    // thx walsh
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "modal-scrollbar-measure";
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };
  // MODAL PLUGIN DEFINITION
  // =======================
  function Plugin(option, _relatedTarget) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.modal");
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
      if (!data) $this.data("bs.modal", data = new Modal(this, options));
      if (typeof option == "string") data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
    });
  }
  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;
  // MODAL NO CONFLICT
  // =================
  $.fn.modal.noConflict = function() {
    $.fn.modal = old;
    return this;
  };
  // MODAL DATA-API
  // ==============
  $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
    var $this = $(this);
    var href = $this.attr("href");
    var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
    // strip for ie7
    var option = $target.data("bs.modal") ? "toggle" : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    if ($this.is("a")) e.preventDefault();
    $target.one("show.bs.modal", function(showEvent) {
      if (showEvent.isDefaultPrevented()) return;
      // only register focus restorer if modal will actually get shown
      $target.one("hidden.bs.modal", function() {
        $this.is(":visible") && $this.trigger("focus");
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================
  var Tooltip = function(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.init("tooltip", element, options);
  };
  Tooltip.VERSION = "3.3.4";
  Tooltip.TRANSITION_DURATION = 150;
  Tooltip.DEFAULTS = {
    animation: true,
    placement: "top",
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: "body",
      padding: 0
    }
  };
  Tooltip.prototype.init = function(type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    }
    var triggers = this.options.trigger.split(" ");
    for (var i = triggers.length; i--; ) {
      var trigger = triggers[i];
      if (trigger == "click") {
        this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != "manual") {
        var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
        var eventOut = trigger == "hover" ? "mouseleave" : "focusout";
        this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }
    this.options.selector ? this._options = $.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle();
  };
  Tooltip.prototype.getDefaults = function() {
    return Tooltip.DEFAULTS;
  };
  Tooltip.prototype.getOptions = function(options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);
    if (options.delay && typeof options.delay == "number") {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }
    return options;
  };
  Tooltip.prototype.getDelegateOptions = function() {
    var options = {};
    var defaults = this.getDefaults();
    this._options && $.each(this._options, function(key, value) {
      if (defaults[key] != value) options[key] = value;
    });
    return options;
  };
  Tooltip.prototype.enter = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
    if (self && self.$tip && self.$tip.is(":visible")) {
      self.hoverState = "in";
      return;
    }
    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data("bs." + this.type, self);
    }
    clearTimeout(self.timeout);
    self.hoverState = "in";
    if (!self.options.delay || !self.options.delay.show) return self.show();
    self.timeout = setTimeout(function() {
      if (self.hoverState == "in") self.show();
    }, self.options.delay.show);
  };
  Tooltip.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data("bs." + this.type, self);
    }
    clearTimeout(self.timeout);
    self.hoverState = "out";
    if (!self.options.delay || !self.options.delay.hide) return self.hide();
    self.timeout = setTimeout(function() {
      if (self.hoverState == "out") self.hide();
    }, self.options.delay.hide);
  };
  Tooltip.prototype.show = function() {
    var e = $.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;
      var $tip = this.tip();
      var tipId = this.getUID(this.type);
      this.setContent();
      $tip.attr("id", tipId);
      this.$element.attr("aria-describedby", tipId);
      if (this.options.animation) $tip.addClass("fade");
      var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, "") || "top";
      $tip.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(placement).data("bs." + this.type, this);
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;
      if (autoPlace) {
        var orgPlacement = placement;
        var $container = this.options.container ? $(this.options.container) : this.$element.parent();
        var containerDim = this.getPosition($container);
        placement = placement == "bottom" && pos.bottom + actualHeight > containerDim.bottom ? "top" : placement == "top" && pos.top - actualHeight < containerDim.top ? "bottom" : placement == "right" && pos.right + actualWidth > containerDim.width ? "left" : placement == "left" && pos.left - actualWidth < containerDim.left ? "right" : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement);
      var complete = function() {
        var prevHoverState = that.hoverState;
        that.$element.trigger("shown.bs." + that.type);
        that.hoverState = null;
        if (prevHoverState == "out") that.leave(that);
      };
      $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };
  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;
    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css("margin-top"), 10);
    var marginLeft = parseInt($tip.css("margin-left"), 10);
    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;
    offset.top = offset.top + marginTop;
    offset.left = offset.left + marginLeft;
    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);
    $tip.addClass("in");
    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if (placement == "top" && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }
    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
    if (delta.left) offset.left += delta.left; else offset.top += delta.top;
    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };
  Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
    this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
  };
  Tooltip.prototype.setContent = function() {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right");
  };
  Tooltip.prototype.hide = function(callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event("hide.bs." + this.type);
    function complete() {
      if (that.hoverState != "in") $tip.detach();
      that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type);
      callback && callback();
    }
    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;
    $tip.removeClass("in");
    $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    this.hoverState = null;
    return this;
  };
  Tooltip.prototype.fixTitle = function() {
    var $e = this.$element;
    if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
      $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }
  };
  Tooltip.prototype.hasContent = function() {
    return this.getTitle();
  };
  Tooltip.prototype.getPosition = function($element) {
    $element = $element || this.$element;
    var el = $element[0];
    var isBody = el.tagName == "BODY";
    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, {
        width: elRect.right - elRect.left,
        height: elRect.bottom - elRect.top
      });
    }
    var elOffset = isBody ? {
      top: 0,
      left: 0
    } : $element.offset();
    var scroll = {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
    };
    var outerDims = isBody ? {
      width: $(window).width(),
      height: $(window).height()
    } : null;
    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };
  Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
    /* placement == 'right' */
    return placement == "bottom" ? {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == "top" ? {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == "left" ? {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    } : {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    };
  };
  Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
    var delta = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return delta;
    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);
    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.width) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }
    return delta;
  };
  Tooltip.prototype.getTitle = function() {
    var title;
    var $e = this.$element;
    var o = this.options;
    title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
    return title;
  };
  Tooltip.prototype.getUID = function(prefix) {
    do prefix += ~~(Math.random() * 1e6); while (document.getElementById(prefix));
    return prefix;
  };
  Tooltip.prototype.tip = function() {
    return this.$tip = this.$tip || $(this.options.template);
  };
  Tooltip.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  };
  Tooltip.prototype.enable = function() {
    this.enabled = true;
  };
  Tooltip.prototype.disable = function() {
    this.enabled = false;
  };
  Tooltip.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled;
  };
  Tooltip.prototype.toggle = function(e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data("bs." + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data("bs." + this.type, self);
      }
    }
    self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
  };
  Tooltip.prototype.destroy = function() {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function() {
      that.$element.off("." + that.type).removeData("bs." + that.type);
    });
  };
  // TOOLTIP PLUGIN DEFINITION
  // =========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.tooltip");
      var options = typeof option == "object" && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data("bs.tooltip", data = new Tooltip(this, options));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.tooltip;
  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;
  // TOOLTIP NO CONFLICT
  // ===================
  $.fn.tooltip.noConflict = function() {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================
  var Popover = function(element, options) {
    this.init("popover", element, options);
  };
  if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
  Popover.VERSION = "3.3.4";
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;
  Popover.prototype.getDefaults = function() {
    return Popover.DEFAULTS;
  };
  Popover.prototype.setContent = function() {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip.find(".popover-content").children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == "string" ? "html" : "append" : "text"](content);
    $tip.removeClass("fade top bottom left right in");
    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide();
  };
  Popover.prototype.hasContent = function() {
    return this.getTitle() || this.getContent();
  };
  Popover.prototype.getContent = function() {
    var $e = this.$element;
    var o = this.options;
    return $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content);
  };
  Popover.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  // POPOVER PLUGIN DEFINITION
  // =========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.popover");
      var options = typeof option == "object" && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data("bs.popover", data = new Popover(this, options));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.popover;
  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;
  // POPOVER NO CONFLICT
  // ===================
  $.fn.popover.noConflict = function() {
    $.fn.popover = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // SCROLLSPY CLASS DEFINITION
  // ==========================
  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || "") + " .nav li > a";
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
    this.refresh();
    this.process();
  }
  ScrollSpy.VERSION = "3.3.4";
  ScrollSpy.DEFAULTS = {
    offset: 10
  };
  ScrollSpy.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };
  ScrollSpy.prototype.refresh = function() {
    var that = this;
    var offsetMethod = "offset";
    var offsetBase = 0;
    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = "position";
      offsetBase = this.$scrollElement.scrollTop();
    }
    this.$body.find(this.selector).map(function() {
      var $el = $(this);
      var href = $el.data("target") || $el.attr("href");
      var $href = /^#./.test(href) && $(href);
      return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
    }).sort(function(a, b) {
      return a[0] - b[0];
    }).each(function() {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };
  ScrollSpy.prototype.process = function() {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;
    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }
    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }
    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }
    for (i = offsets.length; i--; ) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };
  ScrollSpy.prototype.activate = function(target) {
    this.activeTarget = target;
    this.clear();
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents("li").addClass("active");
    if (active.parent(".dropdown-menu").length) {
      active = active.closest("li.dropdown").addClass("active");
    }
    active.trigger("activate.bs.scrollspy");
  };
  ScrollSpy.prototype.clear = function() {
    $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  // SCROLLSPY PLUGIN DEFINITION
  // ===========================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.scrollspy");
      var options = typeof option == "object" && option;
      if (!data) $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.scrollspy;
  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;
  // SCROLLSPY NO CONFLICT
  // =====================
  $.fn.scrollspy.noConflict = function() {
    $.fn.scrollspy = old;
    return this;
  };
  // SCROLLSPY DATA-API
  // ==================
  $(window).on("load.bs.scrollspy.data-api", function() {
    $('[data-spy="scroll"]').each(function() {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // TAB CLASS DEFINITION
  // ====================
  var Tab = function(element) {
    this.element = $(element);
  };
  Tab.VERSION = "3.3.4";
  Tab.TRANSITION_DURATION = 150;
  Tab.prototype.show = function() {
    var $this = this.element;
    var $ul = $this.closest("ul:not(.dropdown-menu)");
    var selector = $this.data("target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    if ($this.parent("li").hasClass("active")) return;
    var $previous = $ul.find(".active:last a");
    var hideEvent = $.Event("hide.bs.tab", {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event("show.bs.tab", {
      relatedTarget: $previous[0]
    });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
    var $target = $(selector);
    this.activate($this.closest("li"), $ul);
    this.activate($target, $target.parent(), function() {
      $previous.trigger({
        type: "hidden.bs.tab",
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: "shown.bs.tab",
        relatedTarget: $previous[0]
      });
    });
  };
  Tab.prototype.activate = function(element, container, callback) {
    var $active = container.find("> .active");
    var transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
    function next() {
      $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
      element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
      if (transition) {
        element[0].offsetWidth;
        // reflow for transition
        element.addClass("in");
      } else {
        element.removeClass("fade");
      }
      if (element.parent(".dropdown-menu").length) {
        element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true);
      }
      callback && callback();
    }
    $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
    $active.removeClass("in");
  };
  // TAB PLUGIN DEFINITION
  // =====================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.tab");
      if (!data) $this.data("bs.tab", data = new Tab(this));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;
  // TAB NO CONFLICT
  // ===============
  $.fn.tab.noConflict = function() {
    $.fn.tab = old;
    return this;
  };
  // TAB DATA-API
  // ============
  var clickHandler = function(e) {
    e.preventDefault();
    Plugin.call($(this), "show");
  };
  $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
  "use strict";
  // AFFIX CLASS DEFINITION
  // ======================
  var Affix = function(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
  };
  Affix.VERSION = "3.3.4";
  Affix.RESET = "affix affix-top affix-bottom";
  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };
  Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();
    if (offsetTop != null && this.affixed == "top") return scrollTop < offsetTop ? "top" : false;
    if (this.affixed == "bottom") {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : "bottom";
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : "bottom";
    }
    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;
    if (offsetTop != null && scrollTop <= offsetTop) return "top";
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return "bottom";
    return false;
  };
  Affix.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass("affix");
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };
  Affix.prototype.checkPositionWithEventLoop = function() {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };
  Affix.prototype.checkPosition = function() {
    if (!this.$element.is(":visible")) return;
    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = $(document.body).height();
    if (typeof offset != "object") offsetBottom = offsetTop = offset;
    if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == "function") offsetBottom = offset.bottom(this.$element);
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css("top", "");
      var affixType = "affix" + (affix ? "-" + affix : "");
      var e = $.Event(affixType + ".bs.affix");
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;
      this.affixed = affix;
      this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;
      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
    }
    if (affix == "bottom") {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  };
  // AFFIX PLUGIN DEFINITION
  // =======================
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.affix");
      var options = typeof option == "object" && option;
      if (!data) $this.data("bs.affix", data = new Affix(this, options));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.affix;
  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix;
  // AFFIX NO CONFLICT
  // =================
  $.fn.affix.noConflict = function() {
    $.fn.affix = old;
    return this;
  };
  // AFFIX DATA-API
  // ==============
  $(window).on("load", function() {
    $('[data-spy="affix"]').each(function() {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;
      Plugin.call($spy, data);
    });
  });
}(jQuery);

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
  // Baseline setup
  // --------------
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;
  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;
  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, nativeCreate = Object.create;
  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function() {};
  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  // Current version.
  _.VERSION = "1.8.3";
  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
     case 1:
      return function(value) {
        return func.call(context, value);
      };

     case 2:
      return function(value, other) {
        return func.call(context, value, other);
      };

     case 3:
      return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };

     case 4:
      return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };
  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };
  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index], keys = keysFunc(source), l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };
  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
  };
  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };
  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property("length");
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
  };
  // Collection Functions
  // --------------------
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };
  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (;index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }
    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }
  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);
  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);
  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };
  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };
  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };
  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };
  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };
  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != "number" || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };
  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };
  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };
  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };
  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };
  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity, value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity, value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };
  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };
  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), "value");
  };
  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };
  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [ value ];
  });
  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });
  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };
  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };
  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [ pass, fail ];
  };
  // Array Functions
  // ---------------
  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };
  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };
  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };
  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };
  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };
  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };
  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };
  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };
  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };
  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };
  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };
  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value) {
      return !_.contains(rest, value);
    });
  };
  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };
  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);
    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };
  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };
  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (;index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }
  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);
  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };
  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == "number") {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }
  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  };
  // Function (ahem) Functions
  // ------------------
  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };
  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError("Bind must be called on a function");
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };
  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };
  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error("bindAll must be passed function names");
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };
  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = "" + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  };
  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };
  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };
  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };
  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };
  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };
  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);
  // Object Functions
  // ----------------
  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{
    toString: null
  }.propertyIsEnumerable("toString");
  var nonEnumerableProps = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
    // Constructor is a special case.
    var prop = "constructor";
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }
  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };
  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj), length = keys.length, results = {}, currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [ keys[i], obj[keys[i]] ];
    }
    return pairs;
  };
  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };
  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);
  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);
  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };
  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) {
        return key in obj;
      };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };
  // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };
  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);
  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };
  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };
  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };
  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };
  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
     // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case "[object RegExp]":
     // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case "[object String]":
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return "" + a === "" + b;

     case "[object Number]":
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

     case "[object Date]":
     case "[object Boolean]":
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object") return false;
      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };
  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };
  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };
  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };
  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || type === "object" && !!obj;
  };
  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(name) {
    _["is" + name] = function(obj) {
      return toString.call(obj) === "[object " + name + "]";
    };
  });
  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, "callee");
    };
  }
  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != "function" && typeof Int8Array != "object") {
    _.isFunction = function(obj) {
      return typeof obj == "function" || false;
    };
  }
  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };
  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };
  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
  };
  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };
  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };
  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };
  // Utility Functions
  // -----------------
  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };
  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };
  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };
  _.noop = function() {};
  _.property = property;
  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function() {} : function(key) {
      return obj[key];
    };
  };
  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };
  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };
  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };
  // List of HTML entities for escaping.
  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };
  var unescapeMap = _.invert(escapeMap);
  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = "(?:" + _.keys(map).join("|") + ")";
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, "g");
    return function(string) {
      string = string == null ? "" : "" + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);
  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };
  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + "";
    return prefix ? prefix + id : id;
  };
  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;
  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\u2028": "u2028",
    "\u2029": "u2029"
  };
  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
  var escapeChar = function(match) {
    return "\\" + escapes[match];
  };
  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);
    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g");
    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;
      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";
    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
    try {
      var render = new Function(settings.variable || "obj", "_", source);
    } catch (e) {
      e.source = source;
      throw e;
    }
    var template = function(data) {
      return render.call(this, data, _);
    };
    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || "obj";
    template.source = "function(" + argument + "){\n" + source + "}";
    return template;
  };
  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };
  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };
  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [ this._wrapped ];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };
  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);
  // Add all mutator Array functions to the wrapper.
  _.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === "shift" || name === "splice") && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });
  // Add all accessor Array functions to the wrapper.
  _.each([ "concat", "join", "slice" ], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });
  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };
  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  _.prototype.toString = function() {
    return "" + this._wrapped;
  };
  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === "function" && define.amd) {
    define("underscore", [], function() {
      return _;
    });
  }
}).call(this);

//     Backbone.js 1.1.2
//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org
(function(root, factory) {
  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === "function" && define.amd) {
    define([ "underscore", "jquery", "exports" ], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });
  } else if (typeof exports !== "undefined") {
    var _ = require("underscore");
    factory(root, exports, _);
  } else {
    root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
  }
})(this, function(root, Backbone, _, $) {
  // Initial Setup
  // -------------
  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;
  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;
  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = "1.1.2";
  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;
  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };
  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;
  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;
  // Backbone.Events
  // ---------------
  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {
    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({
        callback: callback,
        context: context,
        ctx: context || this
      });
      return this;
    },
    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },
    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [ name ] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }
      return this;
    },
    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, "trigger", name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },
    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === "object") callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }
  };
  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;
  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    // Handle event maps.
    if (typeof name === "object") {
      for (var key in name) {
        obj[action].apply(obj, [ key, name[key] ].concat(rest));
      }
      return false;
    }
    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [ names[i] ].concat(rest));
      }
      return false;
    }
    return true;
  };
  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
     case 0:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx);
      return;

     case 1:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
      return;

     case 2:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
      return;

     case 3:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
      return;

     default:
      while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
      return;
    }
  };
  var listenMethods = {
    listenTo: "on",
    listenToOnce: "once"
  };
  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId("l"));
      listeningTo[id] = obj;
      if (!callback && typeof name === "object") callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });
  // Aliases for backwards compatibility.
  Events.bind = Events.on;
  Events.unbind = Events.off;
  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);
  // Backbone.Model
  // --------------
  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.
  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId("c");
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, "defaults"));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };
  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {
    // A hash of attributes whose current and previous value differ.
    changed: null,
    // The value returned during the last failed validation.
    validationError: null,
    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: "id",
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function() {},
    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },
    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },
    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },
    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },
    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },
    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;
      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === "object") {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      options || (options = {});
      // Run validation.
      if (!this._validate(attrs, options)) return false;
      // Extract attributes and options.
      unset = options.unset;
      silent = options.silent;
      changes = [];
      changing = this._changing;
      this._changing = true;
      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;
      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }
      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger("change:" + changes[i], this, current[changes[i]], options);
        }
      }
      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger("change", this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },
    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {
        unset: true
      }));
    },
    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {
        unset: true
      }));
    },
    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },
    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], val = diff[attr])) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },
    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },
    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },
    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger("sync", model, resp, options);
      };
      wrapError(this, options);
      return this.sync("read", this, options);
    },
    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;
      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === "object") {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      options = _.extend({
        validate: true
      }, options);
      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }
      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }
      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger("sync", model, resp, options);
      };
      wrapError(this, options);
      method = this.isNew() ? "create" : options.patch ? "patch" : "update";
      if (method === "patch") options.attrs = attrs;
      xhr = this.sync(method, this, options);
      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;
      return xhr;
    },
    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var destroy = function() {
        model.trigger("destroy", model, model.collection, options);
      };
      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger("sync", model, resp, options);
      };
      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);
      var xhr = this.sync("delete", this, options);
      if (!options.wait) destroy();
      return xhr;
    },
    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id);
    },
    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },
    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },
    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },
    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, {
        validate: true
      }));
    },
    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger("invalid", this, error, _.extend(options, {
        validationError: error
      }));
      return false;
    }
  });
  // Underscore methods that we want to implement on the Model.
  var modelMethods = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });
  // Backbone.Collection
  // -------------------
  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.
  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({
      silent: true
    }, options));
  };
  // Default options for `Collection#set`.
  var setOptions = {
    add: true,
    remove: true,
    merge: true
  };
  var addOptions = {
    add: true,
    remove: false
  };
  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {
    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function() {},
    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) {
        return model.toJSON(options);
      });
    },
    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },
    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({
        merge: false
      }, options, addOptions));
    },
    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [ models ] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger("remove", model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },
    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? models ? [ models ] : [] : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;
      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || "id"];
        }
        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }
        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }
      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }
      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || order && order.length) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }
      // Silently sort the collection if appropriate.
      if (sort) this.sort({
        silent: true
      });
      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger("add", model, this, options);
        }
        if (sort || order && order.length) this.trigger("sort", this, options);
      }
      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },
    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({
        silent: true
      }, options));
      if (!options.silent) this.trigger("reset", this, options);
      return models;
    },
    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({
        at: this.length
      }, options));
    },
    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },
    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({
        at: 0
      }, options));
    },
    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },
    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },
    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },
    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },
    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? "find" : "filter"](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },
    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },
    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
      options || (options = {});
      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }
      if (!options.silent) this.trigger("sort", this, options);
      return this;
    },
    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, "get", attr);
    },
    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? "reset" : "set";
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger("sync", collection, resp, options);
      };
      wrapError(this, options);
      return this.sync("read", this, options);
    },
    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },
    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },
    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },
    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId = {};
    },
    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger("invalid", this, model.validationError, options);
      return false;
    },
    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on("all", this._onModelEvent, this);
    },
    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off("all", this._onModelEvent, this);
    },
    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === "add" || event === "remove") && collection !== this) return;
      if (event === "destroy") this.remove(model, options);
      if (model && event === "change:" + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }
  });
  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample" ];
  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });
  // Underscore methods that take a property name as an argument.
  var attributeMethods = [ "groupBy", "countBy", "sortBy", "indexBy" ];
  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });
  // Backbone.View
  // -------------
  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.
  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId("view");
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };
  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  // List of view options to be merged as properties.
  var viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {
    // The default `tagName` of a View's element is `"div"`.
    tagName: "div",
    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function() {},
    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },
    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },
    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },
    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, "events")))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += ".delegateEvents" + this.cid;
        if (selector === "") {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },
    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off(".delegateEvents" + this.cid);
      return this;
    },
    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, "attributes"));
        if (this.id) attrs.id = _.result(this, "id");
        if (this.className) attrs["class"] = _.result(this, "className");
        var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, "el"), false);
      }
    }
  });
  // Backbone.sync
  // -------------
  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];
    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });
    // Default JSON-request options.
    var params = {
      type: type,
      dataType: "json"
    };
    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, "url") || urlError();
    }
    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === "create" || method === "update" || method === "patch")) {
      params.contentType = "application/json";
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }
    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = "application/x-www-form-urlencoded";
      params.data = params.data ? {
        model: params.data
      } : {};
    }
    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === "PUT" || type === "DELETE" || type === "PATCH")) {
      params.type = "POST";
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader("X-HTTP-Method-Override", type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }
    // Don't process data on a non-GET request.
    if (params.type !== "GET" && !options.emulateJSON) {
      params.processData = false;
    }
    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === "PATCH" && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }
    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger("request", model, xhr, options);
    return xhr;
  };
  var noXhrPatch = typeof window !== "undefined" && !!window.ActiveXObject && !(window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent);
  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    "delete": "DELETE",
    read: "GET"
  };
  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };
  // Backbone.Router
  // ---------------
  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };
  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function() {},
    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = "";
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, [ "route:" + name ].concat(args));
        router.trigger("route", name, args);
        Backbone.history.trigger("route", router, name, args);
      });
      return this;
    },
    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },
    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },
    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, "routes");
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },
    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
        return optional ? match : "([^/?]+)";
      }).replace(splatParam, "([^?]*?)");
      return new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$");
    },
    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }
  });
  // Backbone.History
  // ----------------
  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, "checkUrl");
    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== "undefined") {
      this.location = window.location;
      this.history = window.history;
    }
  };
  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;
  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;
  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;
  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;
  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;
  // Has the history handling already been started?
  History.started = false;
  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {
    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,
    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root;
    },
    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : "";
    },
    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, "");
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, "");
    },
    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;
      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options = _.extend({
        root: "/"
      }, this.options, options);
      this.root = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState = !!this.options.pushState;
      this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment = this.getFragment();
      var docMode = document.documentMode;
      var oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7);
      // Normalize root to always include a leading and trailing slash.
      this.root = ("/" + this.root + "/").replace(rootStripper, "/");
      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo("body")[0].contentWindow;
        this.navigate(fragment);
      }
      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on("popstate", this.checkUrl);
      } else if (this._wantsHashChange && "onhashchange" in window && !oldIE) {
        Backbone.$(window).on("hashchange", this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }
      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {
        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + "#" + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, "");
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }
      }
      if (!this.options.silent) return this.loadUrl();
    },
    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },
    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({
        route: route,
        callback: callback
      });
    },
    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },
    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },
    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {
        trigger: !!options
      };
      var url = this.root + (fragment = this.getFragment(fragment || ""));
      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, "");
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      // Don't include a trailing slash on the root.
      if (fragment === "" && url !== "/") url = url.slice(0, -1);
      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getFragment(this.getHash(this.iframe))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },
    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, "");
        location.replace(href + "#" + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = "#" + fragment;
      }
    }
  });
  // Create the default Backbone.history.
  Backbone.history = new History();
  // Helpers
  // -------
  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, "constructor")) {
      child = protoProps.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }
    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);
    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function() {
      this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
  };
  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger("error", model, resp, options);
    };
  };
  return Backbone;
});

/*!

 handlebars v3.0.2

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define(factory); else if (typeof exports === "object") exports["Handlebars"] = factory(); else root["Handlebars"] = factory();
})(this, function() {
  /******/
  return function(modules) {
    // webpackBootstrap
    /******/
    // The module cache
    /******/
    var installedModules = {};
    /******/
    // The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/
      // Check if module is in cache
      /******/
      if (installedModules[moduleId]) /******/
      return installedModules[moduleId].exports;
      /******/
      // Create a new module (and put it into the cache)
      /******/
      var module = installedModules[moduleId] = {
        /******/
        exports: {},
        /******/
        id: moduleId,
        /******/
        loaded: false
      };
      /******/
      // Execute the module function
      /******/
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      // Flag the module as loaded
      /******/
      module.loaded = true;
      /******/
      // Return the exports of the module
      /******/
      return module.exports;
    }
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    // Load entry module and return exports
    /******/
    return __webpack_require__(0);
  }([ /* 0 */
  /***/
  function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(global) {
      "use strict";
      var _interopRequireWildcard = __webpack_require__(7)["default"];
      exports.__esModule = true;
      var _Handlebars = __webpack_require__(1);
      var _Handlebars2 = _interopRequireWildcard(_Handlebars);
      // Compiler imports
      var _AST = __webpack_require__(2);
      var _AST2 = _interopRequireWildcard(_AST);
      var _Parser$parse = __webpack_require__(3);
      var _Compiler$compile$precompile = __webpack_require__(4);
      var _JavaScriptCompiler = __webpack_require__(5);
      var _JavaScriptCompiler2 = _interopRequireWildcard(_JavaScriptCompiler);
      var _Visitor = __webpack_require__(6);
      var _Visitor2 = _interopRequireWildcard(_Visitor);
      var _create = _Handlebars2["default"].create;
      function create() {
        var hb = _create();
        hb.compile = function(input, options) {
          return _Compiler$compile$precompile.compile(input, options, hb);
        };
        hb.precompile = function(input, options) {
          return _Compiler$compile$precompile.precompile(input, options, hb);
        };
        hb.AST = _AST2["default"];
        hb.Compiler = _Compiler$compile$precompile.Compiler;
        hb.JavaScriptCompiler = _JavaScriptCompiler2["default"];
        hb.Parser = _Parser$parse.parser;
        hb.parse = _Parser$parse.parse;
        return hb;
      }
      var inst = create();
      inst.create = create;
      inst.Visitor = _Visitor2["default"];
      /*jshint -W040 */
      /* istanbul ignore next */
      var $Handlebars = global.Handlebars;
      /* istanbul ignore next */
      inst.noConflict = function() {
        if (global.Handlebars === inst) {
          global.Handlebars = $Handlebars;
        }
      };
      inst["default"] = inst;
      exports["default"] = inst;
      module.exports = exports["default"];
    }).call(exports, function() {
      return this;
    }());
  }, /* 1 */
  /***/
  function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(global) {
      "use strict";
      var _interopRequireWildcard = __webpack_require__(7)["default"];
      exports.__esModule = true;
      /*global window */
      var _import = __webpack_require__(8);
      var base = _interopRequireWildcard(_import);
      // Each of these augment the Handlebars object. No need to setup here.
      // (This is done to easily share code between commonjs and browse envs)
      var _SafeString = __webpack_require__(9);
      var _SafeString2 = _interopRequireWildcard(_SafeString);
      var _Exception = __webpack_require__(10);
      var _Exception2 = _interopRequireWildcard(_Exception);
      var _import2 = __webpack_require__(11);
      var Utils = _interopRequireWildcard(_import2);
      var _import3 = __webpack_require__(12);
      var runtime = _interopRequireWildcard(_import3);
      // For compatibility and usage outside of module systems, make the Handlebars object a namespace
      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _SafeString2["default"];
        hb.Exception = _Exception2["default"];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;
        hb.template = function(spec) {
          return runtime.template(spec, hb);
        };
        return hb;
      }
      var Handlebars = create();
      Handlebars.create = create;
      /*jshint -W040 */
      /* istanbul ignore next */
      var root = typeof global !== "undefined" ? global : window, $Handlebars = root.Handlebars;
      /* istanbul ignore next */
      Handlebars.noConflict = function() {
        if (root.Handlebars === Handlebars) {
          root.Handlebars = $Handlebars;
        }
      };
      Handlebars["default"] = Handlebars;
      exports["default"] = Handlebars;
      module.exports = exports["default"];
    }).call(exports, function() {
      return this;
    }());
  }, /* 2 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var AST = {
      Program: function Program(statements, blockParams, strip, locInfo) {
        this.loc = locInfo;
        this.type = "Program";
        this.body = statements;
        this.blockParams = blockParams;
        this.strip = strip;
      },
      MustacheStatement: function MustacheStatement(path, params, hash, escaped, strip, locInfo) {
        this.loc = locInfo;
        this.type = "MustacheStatement";
        this.path = path;
        this.params = params || [];
        this.hash = hash;
        this.escaped = escaped;
        this.strip = strip;
      },
      BlockStatement: function BlockStatement(path, params, hash, program, inverse, openStrip, inverseStrip, closeStrip, locInfo) {
        this.loc = locInfo;
        this.type = "BlockStatement";
        this.path = path;
        this.params = params || [];
        this.hash = hash;
        this.program = program;
        this.inverse = inverse;
        this.openStrip = openStrip;
        this.inverseStrip = inverseStrip;
        this.closeStrip = closeStrip;
      },
      PartialStatement: function PartialStatement(name, params, hash, strip, locInfo) {
        this.loc = locInfo;
        this.type = "PartialStatement";
        this.name = name;
        this.params = params || [];
        this.hash = hash;
        this.indent = "";
        this.strip = strip;
      },
      ContentStatement: function ContentStatement(string, locInfo) {
        this.loc = locInfo;
        this.type = "ContentStatement";
        this.original = this.value = string;
      },
      CommentStatement: function CommentStatement(comment, strip, locInfo) {
        this.loc = locInfo;
        this.type = "CommentStatement";
        this.value = comment;
        this.strip = strip;
      },
      SubExpression: function SubExpression(path, params, hash, locInfo) {
        this.loc = locInfo;
        this.type = "SubExpression";
        this.path = path;
        this.params = params || [];
        this.hash = hash;
      },
      PathExpression: function PathExpression(data, depth, parts, original, locInfo) {
        this.loc = locInfo;
        this.type = "PathExpression";
        this.data = data;
        this.original = original;
        this.parts = parts;
        this.depth = depth;
      },
      StringLiteral: function StringLiteral(string, locInfo) {
        this.loc = locInfo;
        this.type = "StringLiteral";
        this.original = this.value = string;
      },
      NumberLiteral: function NumberLiteral(number, locInfo) {
        this.loc = locInfo;
        this.type = "NumberLiteral";
        this.original = this.value = Number(number);
      },
      BooleanLiteral: function BooleanLiteral(bool, locInfo) {
        this.loc = locInfo;
        this.type = "BooleanLiteral";
        this.original = this.value = bool === "true";
      },
      UndefinedLiteral: function UndefinedLiteral(locInfo) {
        this.loc = locInfo;
        this.type = "UndefinedLiteral";
        this.original = this.value = undefined;
      },
      NullLiteral: function NullLiteral(locInfo) {
        this.loc = locInfo;
        this.type = "NullLiteral";
        this.original = this.value = null;
      },
      Hash: function Hash(pairs, locInfo) {
        this.loc = locInfo;
        this.type = "Hash";
        this.pairs = pairs;
      },
      HashPair: function HashPair(key, value, locInfo) {
        this.loc = locInfo;
        this.type = "HashPair";
        this.key = key;
        this.value = value;
      },
      // Public API used to evaluate derived attributes regarding AST nodes
      helpers: {
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        helperExpression: function helperExpression(node) {
          return !!(node.type === "SubExpression" || node.params.length || node.hash);
        },
        scopedId: function scopedId(path) {
          return /^\.|this\b/.test(path.original);
        },
        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        simpleId: function simpleId(path) {
          return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
        }
      }
    };
    // Must be exported as an object rather than the root of the module as the jison lexer
    // must modify the object to operate properly.
    exports["default"] = AST;
    module.exports = exports["default"];
  }, /* 3 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    exports.parse = parse;
    var _parser = __webpack_require__(13);
    var _parser2 = _interopRequireWildcard(_parser);
    var _AST = __webpack_require__(2);
    var _AST2 = _interopRequireWildcard(_AST);
    var _WhitespaceControl = __webpack_require__(14);
    var _WhitespaceControl2 = _interopRequireWildcard(_WhitespaceControl);
    var _import = __webpack_require__(15);
    var Helpers = _interopRequireWildcard(_import);
    var _extend = __webpack_require__(11);
    exports.parser = _parser2["default"];
    var yy = {};
    _extend.extend(yy, Helpers, _AST2["default"]);
    function parse(input, options) {
      // Just return if an already-compiled AST was passed in.
      if (input.type === "Program") {
        return input;
      }
      _parser2["default"].yy = yy;
      // Altering the shared object here, but this is ok as parser is a sync operation
      yy.locInfo = function(locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo);
      };
      var strip = new _WhitespaceControl2["default"]();
      return strip.accept(_parser2["default"].parse(input));
    }
  }, /* 4 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    exports.Compiler = Compiler;
    exports.precompile = precompile;
    exports.compile = compile;
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    var _isArray$indexOf = __webpack_require__(11);
    var _AST = __webpack_require__(2);
    var _AST2 = _interopRequireWildcard(_AST);
    var slice = [].slice;
    function Compiler() {}
    // the foundHelper register will disambiguate helper lookup from finding a
    // function in a context. This is necessary for mustache compatibility, which
    // requires that context functions in blocks are evaluated by blockHelperMissing,
    // and then proceed as if the resulting value was provided to blockHelperMissing.
    Compiler.prototype = {
      compiler: Compiler,
      equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false;
        }
        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false;
          }
        }
        // We know that length is the same between the two arrays because they are directly tied
        // to the opcode behavior above.
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false;
          }
        }
        return true;
      },
      guid: 0,
      compile: function compile(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        // These changes will propagate to the other compiler components
        var knownHelpers = options.knownHelpers;
        options.knownHelpers = {
          helperMissing: true,
          blockHelperMissing: true,
          each: true,
          "if": true,
          unless: true,
          "with": true,
          log: true,
          lookup: true
        };
        if (knownHelpers) {
          for (var _name in knownHelpers) {
            if (_name in knownHelpers) {
              options.knownHelpers[_name] = knownHelpers[_name];
            }
          }
        }
        return this.accept(program);
      },
      compileProgram: function compileProgram(program) {
        var childCompiler = new this.compiler(), // eslint-disable-line new-cap
        result = childCompiler.compile(program, this.options), guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid;
      },
      accept: function accept(node) {
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret;
      },
      Program: function Program(program) {
        this.options.blockParams.unshift(program.blockParams);
        var body = program.body, bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i]);
        }
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;
        return this;
      },
      BlockStatement: function BlockStatement(block) {
        transformLiteralToPath(block);
        var program = block.program, inverse = block.inverse;
        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);
        var type = this.classifySexpr(block);
        if (type === "helper") {
          this.helperSexpr(block, program, inverse);
        } else if (type === "simple") {
          this.simpleSexpr(block);
          // now that the simple mustache is resolved, we need to
          // evaluate it by executing `blockHelperMissing`
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("blockValue", block.path.original);
        } else {
          this.ambiguousSexpr(block, program, inverse);
          // now that the simple mustache is resolved, we need to
          // evaluate it by executing `blockHelperMissing`
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("ambiguousBlockValue");
        }
        this.opcode("append");
      },
      PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;
        var params = partial.params;
        if (params.length > 1) {
          throw new _Exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
        } else if (!params.length) {
          params.push({
            type: "PathExpression",
            parts: [],
            depth: 0
          });
        }
        var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) {
          this.accept(partial.name);
        }
        this.setupFullMustacheParams(partial, undefined, undefined, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
          this.opcode("appendContent", indent);
          indent = "";
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append");
      },
      MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        // eslint-disable-line new-cap
        if (mustache.escaped && !this.options.noEscape) {
          this.opcode("appendEscaped");
        } else {
          this.opcode("append");
        }
      },
      ContentStatement: function ContentStatement(content) {
        if (content.value) {
          this.opcode("appendContent", content.value);
        }
      },
      CommentStatement: function CommentStatement() {},
      SubExpression: function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") {
          this.simpleSexpr(sexpr);
        } else if (type === "helper") {
          this.helperSexpr(sexpr);
        } else {
          this.ambiguousSexpr(sexpr);
        }
      },
      ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
        var path = sexpr.path, name = path.parts[0], isBlock = program != null || inverse != null;
        this.opcode("getContext", path.depth);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        this.accept(path);
        this.opcode("invokeAmbiguous", name, isBlock);
      },
      simpleSexpr: function simpleSexpr(sexpr) {
        this.accept(sexpr.path);
        this.opcode("resolvePossibleLambda");
      },
      helperSexpr: function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse), path = sexpr.path, name = path.parts[0];
        if (this.options.knownHelpers[name]) {
          this.opcode("invokeKnownHelper", params.length, name);
        } else if (this.options.knownHelpersOnly) {
          throw new _Exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
        } else {
          path.falsy = true;
          this.accept(path);
          this.opcode("invokeHelper", params.length, path.original, _AST2["default"].helpers.simpleId(path));
        }
      },
      PathExpression: function PathExpression(path) {
        this.addDepth(path.depth);
        this.opcode("getContext", path.depth);
        var name = path.parts[0], scoped = _AST2["default"].helpers.scopedId(path), blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) {
          this.opcode("lookupBlockParam", blockParamId, path.parts);
        } else if (!name) {
          // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
          this.opcode("pushContext");
        } else if (path.data) {
          this.options.data = true;
          this.opcode("lookupData", path.depth, path.parts);
        } else {
          this.opcode("lookupOnContext", path.parts, path.falsy, scoped);
        }
      },
      StringLiteral: function StringLiteral(string) {
        this.opcode("pushString", string.value);
      },
      NumberLiteral: function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value);
      },
      BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value);
      },
      UndefinedLiteral: function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined");
      },
      NullLiteral: function NullLiteral() {
        this.opcode("pushLiteral", "null");
      },
      Hash: function Hash(hash) {
        var pairs = hash.pairs, i = 0, l = pairs.length;
        this.opcode("pushHash");
        for (;i < l; i++) {
          this.pushParam(pairs[i].value);
        }
        while (i--) {
          this.opcode("assignToHash", pairs[i].key);
        }
        this.opcode("popHash");
      },
      // HELPERS
      opcode: function opcode(name) {
        this.opcodes.push({
          opcode: name,
          args: slice.call(arguments, 1),
          loc: this.sourceNode[0].loc
        });
      },
      addDepth: function addDepth(depth) {
        if (!depth) {
          return;
        }
        this.useDepths = true;
      },
      classifySexpr: function classifySexpr(sexpr) {
        var isSimple = _AST2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        // a mustache is an eligible helper if:
        // * its id is simple (a single part, not `this` or `..`)
        var isHelper = !isBlockParam && _AST2["default"].helpers.helperExpression(sexpr);
        // if a mustache is an eligible helper but not a definite
        // helper, it is ambiguous, and will be resolved in a later
        // pass or at runtime.
        var isEligible = !isBlockParam && (isHelper || isSimple);
        // if ambiguous, we can possibly resolve the ambiguity now
        // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
        if (isEligible && !isHelper) {
          var _name2 = sexpr.path.parts[0], options = this.options;
          if (options.knownHelpers[_name2]) {
            isHelper = true;
          } else if (options.knownHelpersOnly) {
            isEligible = false;
          }
        }
        if (isHelper) {
          return "helper";
        } else if (isEligible) {
          return "ambiguous";
        } else {
          return "simple";
        }
      },
      pushParams: function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i]);
        }
      },
      pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
          }
          if (val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode("getContext", val.depth || 0);
          this.opcode("pushStringParam", value, val.type);
          if (val.type === "SubExpression") {
            // SubExpressions get evaluated and passed in
            // in string params mode.
            this.accept(val);
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = undefined;
            if (val.parts && !_AST2["default"].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0]);
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild);
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^\.\//g, "").replace(/^\.$/g, "");
              }
              this.opcode("pushId", val.type, value);
            }
          }
          this.accept(val);
        }
      },
      setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        if (sexpr.hash) {
          this.accept(sexpr.hash);
        } else {
          this.opcode("emptyHash", omitEmpty);
        }
        return params;
      },
      blockParamIndex: function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth], param = blockParams && _isArray$indexOf.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [ depth, param ];
          }
        }
      }
    };
    function precompile(input, options, env) {
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _Exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
      }
      options = options || {};
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options);
      return new env.JavaScriptCompiler().compile(environment, options);
    }
    function compile(input, _x, env) {
      var options = arguments[1] === undefined ? {} : arguments[1];
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _Exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
      }
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var compiled = undefined;
      function compileInput() {
        var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
        return env.template(templateSpec);
      }
      // Template is only compiled on first use and cached after that point.
      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled.call(this, context, execOptions);
      }
      ret._setup = function(setupOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._setup(setupOptions);
      };
      ret._child = function(i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._child(i, data, blockParams, depths);
      };
      return ret;
    }
    function argEquals(a, b) {
      if (a === b) {
        return true;
      }
      if (_isArray$indexOf.isArray(a) && _isArray$indexOf.isArray(b) && a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
    }
    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        // Casting to string here to make false and 0 literal values play nicely with the rest
        // of the system.
        sexpr.path = new _AST2["default"].PathExpression(false, 0, [ literal.original + "" ], literal.original + "", literal.loc);
      }
    }
  }, /* 5 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    var _COMPILER_REVISION$REVISION_CHANGES = __webpack_require__(8);
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    var _isArray = __webpack_require__(11);
    var _CodeGen = __webpack_require__(16);
    var _CodeGen2 = _interopRequireWildcard(_CodeGen);
    function Literal(value) {
      this.value = value;
    }
    function JavaScriptCompiler() {}
    JavaScriptCompiler.prototype = {
      // PUBLIC API: You can override these methods in a subclass to provide
      // alternative compiled forms for name lookup and buffering semantics
      nameLookup: function nameLookup(parent, name) {
        if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
          return [ parent, ".", name ];
        } else {
          return [ parent, "['", name, "']" ];
        }
      },
      depthedLookup: function depthedLookup(name) {
        return [ this.aliasable("this.lookup"), '(depths, "', name, '")' ];
      },
      compilerInfo: function compilerInfo() {
        var revision = _COMPILER_REVISION$REVISION_CHANGES.COMPILER_REVISION, versions = _COMPILER_REVISION$REVISION_CHANGES.REVISION_CHANGES[revision];
        return [ revision, versions ];
      },
      appendToBuffer: function appendToBuffer(source, location, explicit) {
        // Force a source as this simplifies the merge logic.
        if (!_isArray.isArray(source)) {
          source = [ source ];
        }
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) {
          return [ "return ", source, ";" ];
        } else if (explicit) {
          // This is a case where the buffer operation occurs as a child of another
          // construct, generally braces. We have to explicitly output these buffer
          // operations to ensure that the emitted code goes in the correct location.
          return [ "buffer += ", source, ";" ];
        } else {
          source.appendToBuffer = true;
          return source;
        }
      },
      initializeBuffer: function initializeBuffer() {
        return this.quotedString("");
      },
      // END PUBLIC API
      compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          programs: [],
          environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = {
          list: []
        };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes, opcode = undefined, firstLoc = undefined, i = undefined, l = undefined;
        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];
          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args);
        }
        // Flush any trailing content that might be pending.
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        /* istanbul ignore next */
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _Exception2["default"]("Compile completed with content left on stack");
        }
        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn
          };
          var programs = this.context.programs;
          for (i = 0, l = programs.length; i < l; i++) {
            if (programs[i]) {
              ret[i] = programs[i];
            }
          }
          if (this.environment.usePartial) {
            ret.usePartial = true;
          }
          if (this.options.data) {
            ret.useData = true;
          }
          if (this.useDepths) {
            ret.useDepths = true;
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true;
          }
          if (this.options.compat) {
            ret.compat = true;
          }
          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);
            this.source.currentLocation = {
              start: {
                line: 1,
                column: 0
              }
            };
            ret = this.objectLiteral(ret);
            if (options.srcName) {
              ret = ret.toStringWithSourceMap({
                file: options.destName
              });
              ret.map = ret.map && ret.map.toString();
            } else {
              ret = ret.toString();
            }
          } else {
            ret.compilerOptions = this.options;
          }
          return ret;
        } else {
          return fn;
        }
      },
      preamble: function preamble() {
        // track the last context pushed into place to allow skipping the
        // getContext opcode when it would be a noop
        this.lastContext = 0;
        this.source = new _CodeGen2["default"](this.options.srcName);
      },
      createFunctionContext: function createFunctionContext(asObject) {
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ", " + locals.join(", ");
        }
        // Generate minimizer alias mappings
        //
        // When using true SourceNodes, this will update all references to the given alias
        // as the source nodes are reused in situ. For the non-source node compilation mode,
        // aliases will not be used, but this case is already being run on the client and
        // we aren't concern about minimizing the template size.
        var aliasCount = 0;
        for (var alias in this.aliases) {
          // eslint-disable-line guard-for-in
          var node = this.aliases[alias];
          if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
            varDeclarations += ", alias" + ++aliasCount + "=" + alias;
            node.children[0] = "alias" + aliasCount;
          }
        }
        var params = [ "depth0", "helpers", "partials", "data" ];
        if (this.useBlockParams || this.useDepths) {
          params.push("blockParams");
        }
        if (this.useDepths) {
          params.push("depths");
        }
        // Perform a second pass over the output to merge content when possible
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
          params.push(source);
          return Function.apply(this, params);
        } else {
          return this.source.wrap([ "function(", params.join(","), ") {\n  ", source, "}" ]);
        }
      },
      mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = undefined, sourceSeen = undefined, bufferStart = undefined, bufferEnd = undefined;
        this.source.each(function(line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend("  + ");
            } else {
              bufferStart = line;
            }
            bufferEnd = line;
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true;
              } else {
                bufferStart.prepend("buffer += ");
              }
              bufferEnd.add(";");
              bufferStart = bufferEnd = undefined;
            }
            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false;
            }
          }
        });
        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend("return ");
            bufferEnd.add(";");
          } else if (!sourceSeen) {
            this.source.push('return "";');
          }
        } else {
          varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
          if (bufferStart) {
            bufferStart.prepend("return buffer + ");
            bufferEnd.add(";");
          } else {
            this.source.push("return buffer;");
          }
        }
        if (varDeclarations) {
          this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
        }
        return this.source.merge();
      },
      // [blockValue]
      //
      // On stack, before: hash, inverse, program, value
      // On stack, after: return value of blockHelperMissing
      //
      // The purpose of this opcode is to take a block of the form
      // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
      // replace it on the stack with the result of properly
      // invoking blockHelperMissing.
      blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"), params = [ this.contextName(0) ];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params));
      },
      // [ambiguousBlockValue]
      //
      // On stack, before: hash, inverse, program, value
      // Compiler value, before: lastHelper=value of last found helper, if any
      // On stack, after, if no lastHelper: same as [blockValue]
      // On stack, after, if lastHelper: value
      ambiguousBlockValue: function ambiguousBlockValue() {
        // We're being a bit cheeky and reusing the options value from the prior exec
        var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"), params = [ this.contextName(0) ];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource([ "if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}" ]);
      },
      // [appendContent]
      //
      // On stack, before: ...
      // On stack, after: ...
      //
      // Appends the string value of `content` to the current buffer
      appendContent: function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content;
        } else {
          this.pendingLocation = this.source.currentLocation;
        }
        this.pendingContent = content;
      },
      // [append]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Coerces `value` to a String and appends it to the current buffer.
      //
      // If `value` is truthy, or 0, it is coerced into a string and appended
      // Otherwise, the empty string is appended
      append: function append() {
        if (this.isInline()) {
          this.replaceStack(function(current) {
            return [ " != null ? ", current, ' : ""' ];
          });
          this.pushSource(this.appendToBuffer(this.popStack()));
        } else {
          var local = this.popStack();
          this.pushSource([ "if (", local, " != null) { ", this.appendToBuffer(local, undefined, true), " }" ]);
          if (this.environment.isSimple) {
            this.pushSource([ "else { ", this.appendToBuffer("''", undefined, true), " }" ]);
          }
        }
      },
      // [appendEscaped]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Escape `value` and append it to the buffer
      appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([ this.aliasable("this.escapeExpression"), "(", this.popStack(), ")" ]));
      },
      // [getContext]
      //
      // On stack, before: ...
      // On stack, after: ...
      // Compiler value, after: lastContext=depth
      //
      // Set the value of the `lastContext` compiler value to the depth
      getContext: function getContext(depth) {
        this.lastContext = depth;
      },
      // [pushContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext, ...
      //
      // Pushes the value of the current context onto the stack.
      pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext));
      },
      // [lookupOnContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext[name], ...
      //
      // Looks up the value of `name` on the current context and pushes
      // it onto the stack.
      lookupOnContext: function lookupOnContext(parts, falsy, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) {
          // The depthed query is expected to handle the undefined logic for the root level that
          // is implemented below, so we evaluate that directly in compat mode
          this.push(this.depthedLookup(parts[i++]));
        } else {
          this.pushContext();
        }
        this.resolvePath("context", parts, i, falsy);
      },
      // [lookupBlockParam]
      //
      // On stack, before: ...
      // On stack, after: blockParam[name], ...
      //
      // Looks up the value of `parts` on the given block param and pushes
      // it onto the stack.
      lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push([ "blockParams[", blockParamId[0], "][", blockParamId[1], "]" ]);
        this.resolvePath("context", parts, 1);
      },
      // [lookupData]
      //
      // On stack, before: ...
      // On stack, after: data, ...
      //
      // Push the data lookup operator
      lookupData: function lookupData(depth, parts) {
        /*jshint -W083 */
        if (!depth) {
          this.pushStackLiteral("data");
        } else {
          this.pushStackLiteral("this.data(data, " + depth + ")");
        }
        this.resolvePath("data", parts, 0, true);
      },
      resolvePath: function resolvePath(type, parts, i, falsy) {
        var _this = this;
        /*jshint -W083 */
        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict, this, parts, type));
          return;
        }
        var len = parts.length;
        for (;i < len; i++) {
          /*eslint-disable no-loop-func */
          this.replaceStack(function(current) {
            var lookup = _this.nameLookup(current, parts[i], type);
            // We want to ensure that zero and false are handled properly if the context (falsy flag)
            // needs to have the special handling for these values.
            if (!falsy) {
              return [ " != null ? ", lookup, " : ", current ];
            } else {
              // Otherwise we can use generic falsy handling
              return [ " && ", lookup ];
            }
          });
        }
      },
      // [resolvePossibleLambda]
      //
      // On stack, before: value, ...
      // On stack, after: resolved value, ...
      //
      // If the `value` is a lambda, replace it on the stack by
      // the return value of the lambda
      resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([ this.aliasable("this.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")" ]);
      },
      // [pushStringParam]
      //
      // On stack, before: ...
      // On stack, after: string, currentContext, ...
      //
      // This opcode is designed for use in string mode, which
      // provides the string value of a parameter along with its
      // depth rather than resolving it immediately.
      pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        // If it's a subexpression, the string result
        // will be pushed after this opcode.
        if (type !== "SubExpression") {
          if (typeof string === "string") {
            this.pushString(string);
          } else {
            this.pushStackLiteral(string);
          }
        }
      },
      emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push("{}");
        }
        if (this.stringParams) {
          this.push("{}");
          // hashContexts
          this.push("{}");
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
      },
      pushHash: function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash);
        }
        this.hash = {
          values: [],
          types: [],
          contexts: [],
          ids: []
        };
      },
      popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids));
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types));
        }
        this.push(this.objectLiteral(hash.values));
      },
      // [pushString]
      //
      // On stack, before: ...
      // On stack, after: quotedString(string), ...
      //
      // Push a quoted version of `string` onto the stack
      pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string));
      },
      // [pushLiteral]
      //
      // On stack, before: ...
      // On stack, after: value, ...
      //
      // Pushes a value onto the stack. This operation prevents
      // the compiler from creating a temporary variable to hold
      // it.
      pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value);
      },
      // [pushProgram]
      //
      // On stack, before: ...
      // On stack, after: program(guid), ...
      //
      // Push a program expression onto the stack. This takes
      // a compile-time guid and converts it into a runtime-accessible
      // expression.
      pushProgram: function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid));
        } else {
          this.pushStackLiteral(null);
        }
      },
      // [invokeHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // Pops off the helper's parameters, invokes the helper,
      // and pushes the helper's return value onto the stack.
      //
      // If the helper is not found, `helperMissing` is called.
      invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name), simple = isSimple ? [ helper.name, " || " ] : "";
        var lookup = [ "(" ].concat(simple, nonHelper);
        if (!this.options.strict) {
          lookup.push(" || ", this.aliasable("helpers.helperMissing"));
        }
        lookup.push(")");
        this.push(this.source.functionCall(lookup, "call", helper.callParams));
      },
      // [invokeKnownHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // This operation is used when the helper is known to exist,
      // so a `helperMissing` fallback is not required.
      invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams));
      },
      // [invokeAmbiguous]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of disambiguation
      //
      // This operation is used when an expression like `{{foo}}`
      // is provided, but we don't know at compile-time whether it
      // is a helper or a path.
      //
      // This operation emits more code than the other options,
      // and can be avoided by passing the `knownHelpers` and
      // `knownHelpersOnly` flags at compile-time.
      invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup = [ "(", "(helper = ", helperName, " || ", nonHelper, ")" ];
        if (!this.options.strict) {
          lookup[0] = "(helper = ";
          lookup.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"));
        }
        this.push([ "(", lookup, helper.paramsInit ? [ "),(", helper.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))" ]);
      },
      // [invokePartial]
      //
      // On stack, before: context, ...
      // On stack after: result of partial invocation
      //
      // This operation pops off a context, invokes a partial with that context,
      // and pushes the result of the invocation back.
      invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [], options = this.setupParams(name, 1, params, false);
        if (isDynamic) {
          name = this.popStack();
          delete options.name;
        }
        if (indent) {
          options.indent = JSON.stringify(indent);
        }
        options.helpers = "helpers";
        options.partials = "partials";
        if (!isDynamic) {
          params.unshift(this.nameLookup("partials", name, "partial"));
        } else {
          params.unshift(name);
        }
        if (this.options.compat) {
          options.depths = "depths";
        }
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("this.invokePartial", "", params));
      },
      // [assignToHash]
      //
      // On stack, before: value, ..., hash, ...
      // On stack, after: ..., hash, ...
      //
      // Pops a value off the stack and assigns it to the current hash
      assignToHash: function assignToHash(key) {
        var value = this.popStack(), context = undefined, type = undefined, id = undefined;
        if (this.trackIds) {
          id = this.popStack();
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack();
        }
        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context;
        }
        if (type) {
          hash.types[key] = type;
        }
        if (id) {
          hash.ids[key] = id;
        }
        hash.values[key] = value;
      },
      pushId: function pushId(type, name, child) {
        if (type === "BlockParam") {
          this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
        } else if (type === "PathExpression") {
          this.pushString(name);
        } else if (type === "SubExpression") {
          this.pushStackLiteral("true");
        } else {
          this.pushStackLiteral("null");
        }
      },
      // HELPERS
      compiler: JavaScriptCompiler,
      compileChildren: function compileChildren(environment, options) {
        var children = environment.children, child = undefined, compiler = undefined;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler();
          // eslint-disable-line new-cap
          var index = this.matchExistingProgram(child);
          if (index == null) {
            this.context.programs.push("");
            // Placeholder to prevent name conflicts for nested children
            index = this.context.programs.length;
            child.index = index;
            child.name = "program" + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.environments[index] = child;
            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
          } else {
            child.index = index;
            child.name = "program" + index;
            this.useDepths = this.useDepths || child.useDepths;
            this.useBlockParams = this.useBlockParams || child.useBlockParams;
          }
        }
      },
      matchExistingProgram: function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return i;
          }
        }
      },
      programExpression: function programExpression(guid) {
        var child = this.environment.children[guid], programParams = [ child.index, "data", child.blockParams ];
        if (this.useBlockParams || this.useDepths) {
          programParams.push("blockParams");
        }
        if (this.useDepths) {
          programParams.push("depths");
        }
        return "this.program(" + programParams.join(", ") + ")";
      },
      useRegister: function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name);
        }
      },
      push: function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr);
        }
        this.inlineStack.push(expr);
        return expr;
      },
      pushStackLiteral: function pushStackLiteral(item) {
        this.push(new Literal(item));
      },
      pushSource: function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = undefined;
        }
        if (source) {
          this.source.push(source);
        }
      },
      replaceStack: function replaceStack(callback) {
        var prefix = [ "(" ], stack = undefined, createdStack = undefined, usedLiteral = undefined;
        /* istanbul ignore next */
        if (!this.isInline()) {
          throw new _Exception2["default"]("replaceStack on non-inline");
        }
        // We want to merge the inline statement into the replacement statement via ','
        var top = this.popStack(true);
        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = [ top.value ];
          prefix = [ "(", stack ];
          usedLiteral = true;
        } else {
          // Get or create the current stack name for use by the inline
          createdStack = true;
          var _name = this.incrStack();
          prefix = [ "((", this.push(_name), " = ", top, ")" ];
          stack = this.topStack();
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push(prefix.concat(item, ")"));
      },
      incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push("stack" + this.stackSlot);
        }
        return this.topStackName();
      },
      topStackName: function topStackName() {
        return "stack" + this.stackSlot;
      },
      flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          /* istanbul ignore if */
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            var stack = this.incrStack();
            this.pushSource([ stack, " = ", entry, ";" ]);
            this.compileStack.push(stack);
          }
        }
      },
      isInline: function isInline() {
        return this.inlineStack.length;
      },
      popStack: function popStack(wrapped) {
        var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof Literal) {
          return item.value;
        } else {
          if (!inline) {
            /* istanbul ignore next */
            if (!this.stackSlot) {
              throw new _Exception2["default"]("Invalid stack pop");
            }
            this.stackSlot--;
          }
          return item;
        }
      },
      topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
        /* istanbul ignore if */
        if (item instanceof Literal) {
          return item.value;
        } else {
          return item;
        }
      },
      contextName: function contextName(context) {
        if (this.useDepths && context) {
          return "depths[" + context + "]";
        } else {
          return "depth" + context;
        }
      },
      quotedString: function quotedString(str) {
        return this.source.quotedString(str);
      },
      objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj);
      },
      aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret;
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret;
      },
      setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper");
        return {
          params: params,
          paramsInit: paramsInit,
          name: foundHelper,
          callParams: [ this.contextName(0) ].concat(params)
        };
      },
      setupParams: function setupParams(helper, paramSize, params) {
        var options = {}, contexts = [], types = [], ids = [], param = undefined;
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) {
          options.hashIds = this.popStack();
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack();
        }
        var inverse = this.popStack(), program = this.popStack();
        // Avoid setting fn and inverse if neither are set. This allows
        // helpers to do a check for `if (options.fn)`
        if (program || inverse) {
          options.fn = program || "this.noop";
          options.inverse = inverse || "this.noop";
        }
        // The parameters go on to the stack in order (making sure that they are evaluated in order)
        // so we need to pop them off the stack in reverse order
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;
          if (this.trackIds) {
            ids[i] = this.popStack();
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack();
          }
        }
        if (this.trackIds) {
          options.ids = this.source.generateArray(ids);
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts);
        }
        if (this.options.data) {
          options.data = "data";
        }
        if (this.useBlockParams) {
          options.blockParams = "blockParams";
        }
        return options;
      },
      setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params, true);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister("options");
          params.push("options");
          return [ "options=", options ];
        } else {
          params.push(options);
          return "";
        }
      }
    };
    (function() {
      var reservedWords = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield await" + " null true false").split(" ");
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true;
      }
    })();
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
    };
    function strictLookup(requireTerminal, compiler, parts, type) {
      var stack = compiler.popStack(), i = 0, len = parts.length;
      if (requireTerminal) {
        len--;
      }
      for (;i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type);
      }
      if (requireTerminal) {
        return [ compiler.aliasable("this.strict"), "(", stack, ", ", compiler.quotedString(parts[i]), ")" ];
      } else {
        return stack;
      }
    }
    exports["default"] = JavaScriptCompiler;
    module.exports = exports["default"];
  }, /* 6 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    var _AST = __webpack_require__(2);
    var _AST2 = _interopRequireWildcard(_AST);
    function Visitor() {
      this.parents = [];
    }
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      // Visits a given value. If mutating, will replace the value if necessary.
      acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          // Hacky sanity check:
          if (value && (!value.type || !_AST2["default"][value.type])) {
            throw new _Exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
          }
          node[name] = value;
        }
      },
      // Performs an accept operation with added sanity check to ensure
      // required keys are not removed.
      acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new _Exception2["default"](node.type + " requires " + name);
        }
      },
      // Traverses a given array. If mutating, empty respnses will be removed
      // for child elements.
      acceptArray: function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--;
          }
        }
      },
      accept: function accept(object) {
        if (!object) {
          return;
        }
        if (this.current) {
          this.parents.unshift(this.current);
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret;
        } else if (ret !== false) {
          return object;
        }
      },
      Program: function Program(program) {
        this.acceptArray(program.body);
      },
      MustacheStatement: function MustacheStatement(mustache) {
        this.acceptRequired(mustache, "path");
        this.acceptArray(mustache.params);
        this.acceptKey(mustache, "hash");
      },
      BlockStatement: function BlockStatement(block) {
        this.acceptRequired(block, "path");
        this.acceptArray(block.params);
        this.acceptKey(block, "hash");
        this.acceptKey(block, "program");
        this.acceptKey(block, "inverse");
      },
      PartialStatement: function PartialStatement(partial) {
        this.acceptRequired(partial, "name");
        this.acceptArray(partial.params);
        this.acceptKey(partial, "hash");
      },
      ContentStatement: function ContentStatement() {},
      CommentStatement: function CommentStatement() {},
      SubExpression: function SubExpression(sexpr) {
        this.acceptRequired(sexpr, "path");
        this.acceptArray(sexpr.params);
        this.acceptKey(sexpr, "hash");
      },
      PathExpression: function PathExpression() {},
      StringLiteral: function StringLiteral() {},
      NumberLiteral: function NumberLiteral() {},
      BooleanLiteral: function BooleanLiteral() {},
      UndefinedLiteral: function UndefinedLiteral() {},
      NullLiteral: function NullLiteral() {},
      Hash: function Hash(hash) {
        this.acceptArray(hash.pairs);
      },
      HashPair: function HashPair(pair) {
        this.acceptRequired(pair, "value");
      }
    };
    exports["default"] = Visitor;
    module.exports = exports["default"];
  }, /* 7 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports["default"] = function(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    };
    exports.__esModule = true;
  }, /* 8 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;
    exports.createFrame = createFrame;
    var _import = __webpack_require__(11);
    var Utils = _interopRequireWildcard(_import);
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    var VERSION = "3.0.1";
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 6;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      // 1.0.rc.2 is actually rev2 but doesn't report it
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1"
    };
    exports.REVISION_CHANGES = REVISION_CHANGES;
    var isArray = Utils.isArray, isFunction = Utils.isFunction, toString = Utils.toString, objectType = "[object Object]";
    function HandlebarsEnvironment(helpers, partials) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      registerDefaultHelpers(this);
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: logger,
      log: log,
      registerHelper: function registerHelper(name, fn) {
        if (toString.call(name) === objectType) {
          if (fn) {
            throw new _Exception2["default"]("Arg not supported with multiple helpers");
          }
          Utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn;
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
      },
      registerPartial: function registerPartial(name, partial) {
        if (toString.call(name) === objectType) {
          Utils.extend(this.partials, name);
        } else {
          if (typeof partial === "undefined") {
            throw new _Exception2["default"]("Attempting to register a partial as undefined");
          }
          this.partials[name] = partial;
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
      }
    };
    function registerDefaultHelpers(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          // A missing field in a {{foo}} constuct.
          return undefined;
        } else {
          // Someone is actually trying to call something, blow up.
          throw new _Exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse, fn = options.fn;
        if (context === true) {
          return fn(this);
        } else if (context === false || context == null) {
          return inverse(this);
        } else if (isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [ options.name ];
            }
            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = createFrame(options.data);
            data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
            options = {
              data: data
            };
          }
          return fn(context, options);
        }
      });
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _Exception2["default"]("Must pass iterator to #each");
        }
        var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = undefined, contextPath = undefined;
        if (options.data && options.ids) {
          contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
        }
        if (isFunction(context)) {
          context = context.call(this);
        }
        if (options.data) {
          data = createFrame(options.data);
        }
        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }
          ret = ret + fn(context[field], {
            data: data,
            blockParams: Utils.blockParams([ context[field], field ], [ contextPath + field, null ])
          });
        }
        if (context && typeof context === "object") {
          if (isArray(context)) {
            for (var j = context.length; i < j; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            var priorKey = undefined;
            for (var key in context) {
              if (context.hasOwnProperty(key)) {
                // We're running the iterations one step out of sync so we can detect
                // the last iteration without have to scan the object twice and create
                // an itermediate keys array.
                if (priorKey) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              }
            }
            if (priorKey) {
              execIteration(priorKey, i - 1, true);
            }
          }
        }
        if (i === 0) {
          ret = inverse(this);
        }
        return ret;
      });
      instance.registerHelper("if", function(conditional, options) {
        if (isFunction(conditional)) {
          conditional = conditional.call(this);
        }
        // Default behavior is to render the positive path if the value is truthy and not empty.
        // The `includeZero` option may be set to treat the condtional as purely not empty based on the
        // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
        if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        });
      });
      instance.registerHelper("with", function(context, options) {
        if (isFunction(context)) {
          context = context.call(this);
        }
        var fn = options.fn;
        if (!Utils.isEmpty(context)) {
          if (options.data && options.ids) {
            var data = createFrame(options.data);
            data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
            options = {
              data: data
            };
          }
          return fn(context, options);
        } else {
          return options.inverse(this);
        }
      });
      instance.registerHelper("log", function(message, options) {
        var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
        instance.log(level, message);
      });
      instance.registerHelper("lookup", function(obj, field) {
        return obj && obj[field];
      });
    }
    var logger = {
      methodMap: {
        0: "debug",
        1: "info",
        2: "warn",
        3: "error"
      },
      // State enum
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      level: 1,
      // Can be overridden in the host environment
      log: function log(level, message) {
        if (typeof console !== "undefined" && logger.level <= level) {
          var method = logger.methodMap[level];
          (console[method] || console.log).call(console, message);
        }
      }
    };
    exports.logger = logger;
    var log = logger.log;
    exports.log = log;
    function createFrame(object) {
      var frame = Utils.extend({}, object);
      frame._parent = object;
      return frame;
    }
  }, /* 9 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    // Build out our basic SafeString type
    function SafeString(string) {
      this.string = string;
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string;
    };
    exports["default"] = SafeString;
    module.exports = exports["default"];
  }, /* 10 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var errorProps = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
    function Exception(message, node) {
      var loc = node && node.loc, line = undefined, column = undefined;
      if (loc) {
        line = loc.start.line;
        column = loc.start.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      if (loc) {
        this.lineNumber = line;
        this.column = column;
      }
    }
    Exception.prototype = new Error();
    exports["default"] = Exception;
    module.exports = exports["default"];
  }, /* 11 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    exports.extend = extend;
    // Older IE versions do not directly support indexOf so we must implement our own, sadly.
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;
    /*jshint -W004 */
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    };
    var badChars = /[&<>"'`]/g, possible = /[&<>"'`]/;
    function escapeChar(chr) {
      return escape[chr];
    }
    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
    var toString = Object.prototype.toString;
    exports.toString = toString;
    // Sourced from lodash
    // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
    /*eslint-disable func-style, no-var */
    var isFunction = function isFunction(value) {
      return typeof value === "function";
    };
    // fallback for older versions of Chrome and Safari
    /* istanbul ignore next */
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]";
      };
    }
    var isFunction;
    exports.isFunction = isFunction;
    /*eslint-enable func-style, no-var */
    /* istanbul ignore next */
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
    };
    exports.isArray = isArray;
    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    function escapeExpression(string) {
      if (typeof string !== "string") {
        // don't escape SafeStrings, since they're already safe
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return "";
        } else if (!string) {
          return string + "";
        }
        // Force a string conversion as this will be done by the append regardless and
        // the regex test will do this transparently behind the scenes, causing issues if
        // an object's to string has escaped characters in it.
        string = "" + string;
      }
      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }
    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }
    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id;
    }
  }, /* 12 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    // TODO: Remove this line and break up compilePartial
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;
    var _import = __webpack_require__(11);
    var Utils = _interopRequireWildcard(_import);
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(8);
    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;
      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision], compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
          throw new _Exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new _Exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").");
        }
      }
    }
    function template(templateSpec, env) {
      /* istanbul ignore next */
      if (!env) {
        throw new _Exception2["default"]("No environment passed to template");
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _Exception2["default"]("Unknown template object: " + typeof templateSpec);
      }
      // Note: Using env.VM references rather than local var references throughout this section to allow
      // for external users to override these as psuedo-supported APIs.
      env.VM.checkRevision(templateSpec.compiler);
      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var result = env.VM.invokePartial.call(this, partial, context, options);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, options);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }
              lines[i] = options.indent + lines[i];
            }
            result = lines.join("\n");
          }
          return result;
        } else {
          throw new _Exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
        }
      }
      // Just add water
      var container = {
        strict: function strict(obj, name) {
          if (!(name in obj)) {
            throw new _Exception2["default"]('"' + name + '" not defined in ' + obj);
          }
          return obj[name];
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            if (depths[i] && depths[i][name] != null) {
              return depths[i][name];
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current;
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
          return templateSpec[i];
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i], fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
          }
          return programWrapper;
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        },
        merge: function merge(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param);
          }
          return obj;
        },
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };
      function ret(context) {
        var options = arguments[1] === undefined ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = undefined, blockParams = templateSpec.useBlockParams ? [] : undefined;
        if (templateSpec.useDepths) {
          depths = options.depths ? [ context ].concat(options.depths) : [ context ];
        }
        return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          container.helpers = container.merge(options.helpers, env.helpers);
          if (templateSpec.usePartial) {
            container.partials = container.merge(options.partials, env.partials);
          }
        } else {
          container.helpers = options.helpers;
          container.partials = options.partials;
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _Exception2["default"]("must pass block params");
        }
        if (templateSpec.useDepths && !depths) {
          throw new _Exception2["default"]("must pass parent depths");
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }
    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments[1] === undefined ? {} : arguments[1];
        return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [ options.blockParams ].concat(blockParams), depths && [ context ].concat(depths));
      }
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }
    function resolvePartial(partial, context, options) {
      if (!partial) {
        partial = options.partials[options.name];
      } else if (!partial.call && !options.name) {
        // This is a dynamic partial that returned a string
        options.name = partial;
        partial = options.partials[partial];
      }
      return partial;
    }
    function invokePartial(partial, context, options) {
      options.partial = true;
      if (partial === undefined) {
        throw new _Exception2["default"]("The partial " + options.name + " could not be found");
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }
    function noop() {
      return "";
    }
    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }
  }, /* 13 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    /* jshint ignore:start */
    /* istanbul ignore next */
    /* Jison generated parser */
    var handlebars = function() {
      var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
          error: 2,
          root: 3,
          program: 4,
          EOF: 5,
          program_repetition0: 6,
          statement: 7,
          mustache: 8,
          block: 9,
          rawBlock: 10,
          partial: 11,
          content: 12,
          COMMENT: 13,
          CONTENT: 14,
          openRawBlock: 15,
          END_RAW_BLOCK: 16,
          OPEN_RAW_BLOCK: 17,
          helperName: 18,
          openRawBlock_repetition0: 19,
          openRawBlock_option0: 20,
          CLOSE_RAW_BLOCK: 21,
          openBlock: 22,
          block_option0: 23,
          closeBlock: 24,
          openInverse: 25,
          block_option1: 26,
          OPEN_BLOCK: 27,
          openBlock_repetition0: 28,
          openBlock_option0: 29,
          openBlock_option1: 30,
          CLOSE: 31,
          OPEN_INVERSE: 32,
          openInverse_repetition0: 33,
          openInverse_option0: 34,
          openInverse_option1: 35,
          openInverseChain: 36,
          OPEN_INVERSE_CHAIN: 37,
          openInverseChain_repetition0: 38,
          openInverseChain_option0: 39,
          openInverseChain_option1: 40,
          inverseAndProgram: 41,
          INVERSE: 42,
          inverseChain: 43,
          inverseChain_option0: 44,
          OPEN_ENDBLOCK: 45,
          OPEN: 46,
          mustache_repetition0: 47,
          mustache_option0: 48,
          OPEN_UNESCAPED: 49,
          mustache_repetition1: 50,
          mustache_option1: 51,
          CLOSE_UNESCAPED: 52,
          OPEN_PARTIAL: 53,
          partialName: 54,
          partial_repetition0: 55,
          partial_option0: 56,
          param: 57,
          sexpr: 58,
          OPEN_SEXPR: 59,
          sexpr_repetition0: 60,
          sexpr_option0: 61,
          CLOSE_SEXPR: 62,
          hash: 63,
          hash_repetition_plus0: 64,
          hashSegment: 65,
          ID: 66,
          EQUALS: 67,
          blockParams: 68,
          OPEN_BLOCK_PARAMS: 69,
          blockParams_repetition_plus0: 70,
          CLOSE_BLOCK_PARAMS: 71,
          path: 72,
          dataName: 73,
          STRING: 74,
          NUMBER: 75,
          BOOLEAN: 76,
          UNDEFINED: 77,
          NULL: 78,
          DATA: 79,
          pathSegments: 80,
          SEP: 81,
          $accept: 0,
          $end: 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          13: "COMMENT",
          14: "CONTENT",
          16: "END_RAW_BLOCK",
          17: "OPEN_RAW_BLOCK",
          21: "CLOSE_RAW_BLOCK",
          27: "OPEN_BLOCK",
          31: "CLOSE",
          32: "OPEN_INVERSE",
          37: "OPEN_INVERSE_CHAIN",
          42: "INVERSE",
          45: "OPEN_ENDBLOCK",
          46: "OPEN",
          49: "OPEN_UNESCAPED",
          52: "CLOSE_UNESCAPED",
          53: "OPEN_PARTIAL",
          59: "OPEN_SEXPR",
          62: "CLOSE_SEXPR",
          66: "ID",
          67: "EQUALS",
          69: "OPEN_BLOCK_PARAMS",
          71: "CLOSE_BLOCK_PARAMS",
          74: "STRING",
          75: "NUMBER",
          76: "BOOLEAN",
          77: "UNDEFINED",
          78: "NULL",
          79: "DATA",
          81: "SEP"
        },
        productions_: [ 0, [ 3, 2 ], [ 4, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 12, 1 ], [ 10, 3 ], [ 15, 5 ], [ 9, 4 ], [ 9, 4 ], [ 22, 6 ], [ 25, 6 ], [ 36, 6 ], [ 41, 2 ], [ 43, 3 ], [ 43, 1 ], [ 24, 3 ], [ 8, 5 ], [ 8, 5 ], [ 11, 5 ], [ 57, 1 ], [ 57, 1 ], [ 58, 5 ], [ 63, 1 ], [ 65, 3 ], [ 68, 3 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 54, 1 ], [ 54, 1 ], [ 73, 2 ], [ 72, 1 ], [ 80, 3 ], [ 80, 1 ], [ 6, 0 ], [ 6, 2 ], [ 19, 0 ], [ 19, 2 ], [ 20, 0 ], [ 20, 1 ], [ 23, 0 ], [ 23, 1 ], [ 26, 0 ], [ 26, 1 ], [ 28, 0 ], [ 28, 2 ], [ 29, 0 ], [ 29, 1 ], [ 30, 0 ], [ 30, 1 ], [ 33, 0 ], [ 33, 2 ], [ 34, 0 ], [ 34, 1 ], [ 35, 0 ], [ 35, 1 ], [ 38, 0 ], [ 38, 2 ], [ 39, 0 ], [ 39, 1 ], [ 40, 0 ], [ 40, 1 ], [ 44, 0 ], [ 44, 1 ], [ 47, 0 ], [ 47, 2 ], [ 48, 0 ], [ 48, 1 ], [ 50, 0 ], [ 50, 2 ], [ 51, 0 ], [ 51, 1 ], [ 55, 0 ], [ 55, 2 ], [ 56, 0 ], [ 56, 1 ], [ 60, 0 ], [ 60, 2 ], [ 61, 0 ], [ 61, 1 ], [ 64, 1 ], [ 64, 2 ], [ 70, 1 ], [ 70, 2 ] ],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
           case 1:
            return $$[$0 - 1];
            break;

           case 2:
            this.$ = new yy.Program($$[$0], null, {}, yy.locInfo(this._$));
            break;

           case 3:
            this.$ = $$[$0];
            break;

           case 4:
            this.$ = $$[$0];
            break;

           case 5:
            this.$ = $$[$0];
            break;

           case 6:
            this.$ = $$[$0];
            break;

           case 7:
            this.$ = $$[$0];
            break;

           case 8:
            this.$ = new yy.CommentStatement(yy.stripComment($$[$0]), yy.stripFlags($$[$0], $$[$0]), yy.locInfo(this._$));
            break;

           case 9:
            this.$ = new yy.ContentStatement($$[$0], yy.locInfo(this._$));
            break;

           case 10:
            this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;

           case 11:
            this.$ = {
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1]
            };
            break;

           case 12:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
            break;

           case 13:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
            break;

           case 14:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

           case 15:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

           case 16:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

           case 17:
            this.$ = {
              strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
              program: $$[$0]
            };
            break;

           case 18:
            var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = new yy.Program([ inverse ], null, {}, yy.locInfo(this._$));
            program.chained = true;
            this.$ = {
              strip: $$[$0 - 2].strip,
              program: program,
              chain: true
            };
            break;

           case 19:
            this.$ = $$[$0];
            break;

           case 20:
            this.$ = {
              path: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 2], $$[$0])
            };
            break;

           case 21:
            this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;

           case 22:
            this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;

           case 23:
            this.$ = new yy.PartialStatement($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], yy.stripFlags($$[$0 - 4], $$[$0]), yy.locInfo(this._$));
            break;

           case 24:
            this.$ = $$[$0];
            break;

           case 25:
            this.$ = $$[$0];
            break;

           case 26:
            this.$ = new yy.SubExpression($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], yy.locInfo(this._$));
            break;

           case 27:
            this.$ = new yy.Hash($$[$0], yy.locInfo(this._$));
            break;

           case 28:
            this.$ = new yy.HashPair(yy.id($$[$0 - 2]), $$[$0], yy.locInfo(this._$));
            break;

           case 29:
            this.$ = yy.id($$[$0 - 1]);
            break;

           case 30:
            this.$ = $$[$0];
            break;

           case 31:
            this.$ = $$[$0];
            break;

           case 32:
            this.$ = new yy.StringLiteral($$[$0], yy.locInfo(this._$));
            break;

           case 33:
            this.$ = new yy.NumberLiteral($$[$0], yy.locInfo(this._$));
            break;

           case 34:
            this.$ = new yy.BooleanLiteral($$[$0], yy.locInfo(this._$));
            break;

           case 35:
            this.$ = new yy.UndefinedLiteral(yy.locInfo(this._$));
            break;

           case 36:
            this.$ = new yy.NullLiteral(yy.locInfo(this._$));
            break;

           case 37:
            this.$ = $$[$0];
            break;

           case 38:
            this.$ = $$[$0];
            break;

           case 39:
            this.$ = yy.preparePath(true, $$[$0], this._$);
            break;

           case 40:
            this.$ = yy.preparePath(false, $$[$0], this._$);
            break;

           case 41:
            $$[$0 - 2].push({
              part: yy.id($$[$0]),
              original: $$[$0],
              separator: $$[$0 - 1]
            });
            this.$ = $$[$0 - 2];
            break;

           case 42:
            this.$ = [ {
              part: yy.id($$[$0]),
              original: $$[$0]
            } ];
            break;

           case 43:
            this.$ = [];
            break;

           case 44:
            $$[$0 - 1].push($$[$0]);
            break;

           case 45:
            this.$ = [];
            break;

           case 46:
            $$[$0 - 1].push($$[$0]);
            break;

           case 53:
            this.$ = [];
            break;

           case 54:
            $$[$0 - 1].push($$[$0]);
            break;

           case 59:
            this.$ = [];
            break;

           case 60:
            $$[$0 - 1].push($$[$0]);
            break;

           case 65:
            this.$ = [];
            break;

           case 66:
            $$[$0 - 1].push($$[$0]);
            break;

           case 73:
            this.$ = [];
            break;

           case 74:
            $$[$0 - 1].push($$[$0]);
            break;

           case 77:
            this.$ = [];
            break;

           case 78:
            $$[$0 - 1].push($$[$0]);
            break;

           case 81:
            this.$ = [];
            break;

           case 82:
            $$[$0 - 1].push($$[$0]);
            break;

           case 85:
            this.$ = [];
            break;

           case 86:
            $$[$0 - 1].push($$[$0]);
            break;

           case 89:
            this.$ = [ $$[$0] ];
            break;

           case 90:
            $$[$0 - 1].push($$[$0]);
            break;

           case 91:
            this.$ = [ $$[$0] ];
            break;

           case 92:
            $$[$0 - 1].push($$[$0]);
            break;
          }
        },
        table: [ {
          3: 1,
          4: 2,
          5: [ 2, 43 ],
          6: 3,
          13: [ 2, 43 ],
          14: [ 2, 43 ],
          17: [ 2, 43 ],
          27: [ 2, 43 ],
          32: [ 2, 43 ],
          46: [ 2, 43 ],
          49: [ 2, 43 ],
          53: [ 2, 43 ]
        }, {
          1: [ 3 ]
        }, {
          5: [ 1, 4 ]
        }, {
          5: [ 2, 2 ],
          7: 5,
          8: 6,
          9: 7,
          10: 8,
          11: 9,
          12: 10,
          13: [ 1, 11 ],
          14: [ 1, 18 ],
          15: 16,
          17: [ 1, 21 ],
          22: 14,
          25: 15,
          27: [ 1, 19 ],
          32: [ 1, 20 ],
          37: [ 2, 2 ],
          42: [ 2, 2 ],
          45: [ 2, 2 ],
          46: [ 1, 12 ],
          49: [ 1, 13 ],
          53: [ 1, 17 ]
        }, {
          1: [ 2, 1 ]
        }, {
          5: [ 2, 44 ],
          13: [ 2, 44 ],
          14: [ 2, 44 ],
          17: [ 2, 44 ],
          27: [ 2, 44 ],
          32: [ 2, 44 ],
          37: [ 2, 44 ],
          42: [ 2, 44 ],
          45: [ 2, 44 ],
          46: [ 2, 44 ],
          49: [ 2, 44 ],
          53: [ 2, 44 ]
        }, {
          5: [ 2, 3 ],
          13: [ 2, 3 ],
          14: [ 2, 3 ],
          17: [ 2, 3 ],
          27: [ 2, 3 ],
          32: [ 2, 3 ],
          37: [ 2, 3 ],
          42: [ 2, 3 ],
          45: [ 2, 3 ],
          46: [ 2, 3 ],
          49: [ 2, 3 ],
          53: [ 2, 3 ]
        }, {
          5: [ 2, 4 ],
          13: [ 2, 4 ],
          14: [ 2, 4 ],
          17: [ 2, 4 ],
          27: [ 2, 4 ],
          32: [ 2, 4 ],
          37: [ 2, 4 ],
          42: [ 2, 4 ],
          45: [ 2, 4 ],
          46: [ 2, 4 ],
          49: [ 2, 4 ],
          53: [ 2, 4 ]
        }, {
          5: [ 2, 5 ],
          13: [ 2, 5 ],
          14: [ 2, 5 ],
          17: [ 2, 5 ],
          27: [ 2, 5 ],
          32: [ 2, 5 ],
          37: [ 2, 5 ],
          42: [ 2, 5 ],
          45: [ 2, 5 ],
          46: [ 2, 5 ],
          49: [ 2, 5 ],
          53: [ 2, 5 ]
        }, {
          5: [ 2, 6 ],
          13: [ 2, 6 ],
          14: [ 2, 6 ],
          17: [ 2, 6 ],
          27: [ 2, 6 ],
          32: [ 2, 6 ],
          37: [ 2, 6 ],
          42: [ 2, 6 ],
          45: [ 2, 6 ],
          46: [ 2, 6 ],
          49: [ 2, 6 ],
          53: [ 2, 6 ]
        }, {
          5: [ 2, 7 ],
          13: [ 2, 7 ],
          14: [ 2, 7 ],
          17: [ 2, 7 ],
          27: [ 2, 7 ],
          32: [ 2, 7 ],
          37: [ 2, 7 ],
          42: [ 2, 7 ],
          45: [ 2, 7 ],
          46: [ 2, 7 ],
          49: [ 2, 7 ],
          53: [ 2, 7 ]
        }, {
          5: [ 2, 8 ],
          13: [ 2, 8 ],
          14: [ 2, 8 ],
          17: [ 2, 8 ],
          27: [ 2, 8 ],
          32: [ 2, 8 ],
          37: [ 2, 8 ],
          42: [ 2, 8 ],
          45: [ 2, 8 ],
          46: [ 2, 8 ],
          49: [ 2, 8 ],
          53: [ 2, 8 ]
        }, {
          18: 22,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          18: 33,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          4: 34,
          6: 3,
          13: [ 2, 43 ],
          14: [ 2, 43 ],
          17: [ 2, 43 ],
          27: [ 2, 43 ],
          32: [ 2, 43 ],
          37: [ 2, 43 ],
          42: [ 2, 43 ],
          45: [ 2, 43 ],
          46: [ 2, 43 ],
          49: [ 2, 43 ],
          53: [ 2, 43 ]
        }, {
          4: 35,
          6: 3,
          13: [ 2, 43 ],
          14: [ 2, 43 ],
          17: [ 2, 43 ],
          27: [ 2, 43 ],
          32: [ 2, 43 ],
          42: [ 2, 43 ],
          45: [ 2, 43 ],
          46: [ 2, 43 ],
          49: [ 2, 43 ],
          53: [ 2, 43 ]
        }, {
          12: 36,
          14: [ 1, 18 ]
        }, {
          18: 38,
          54: 37,
          58: 39,
          59: [ 1, 40 ],
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          5: [ 2, 9 ],
          13: [ 2, 9 ],
          14: [ 2, 9 ],
          16: [ 2, 9 ],
          17: [ 2, 9 ],
          27: [ 2, 9 ],
          32: [ 2, 9 ],
          37: [ 2, 9 ],
          42: [ 2, 9 ],
          45: [ 2, 9 ],
          46: [ 2, 9 ],
          49: [ 2, 9 ],
          53: [ 2, 9 ]
        }, {
          18: 41,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          18: 42,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          18: 43,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          31: [ 2, 73 ],
          47: 44,
          59: [ 2, 73 ],
          66: [ 2, 73 ],
          74: [ 2, 73 ],
          75: [ 2, 73 ],
          76: [ 2, 73 ],
          77: [ 2, 73 ],
          78: [ 2, 73 ],
          79: [ 2, 73 ]
        }, {
          21: [ 2, 30 ],
          31: [ 2, 30 ],
          52: [ 2, 30 ],
          59: [ 2, 30 ],
          62: [ 2, 30 ],
          66: [ 2, 30 ],
          69: [ 2, 30 ],
          74: [ 2, 30 ],
          75: [ 2, 30 ],
          76: [ 2, 30 ],
          77: [ 2, 30 ],
          78: [ 2, 30 ],
          79: [ 2, 30 ]
        }, {
          21: [ 2, 31 ],
          31: [ 2, 31 ],
          52: [ 2, 31 ],
          59: [ 2, 31 ],
          62: [ 2, 31 ],
          66: [ 2, 31 ],
          69: [ 2, 31 ],
          74: [ 2, 31 ],
          75: [ 2, 31 ],
          76: [ 2, 31 ],
          77: [ 2, 31 ],
          78: [ 2, 31 ],
          79: [ 2, 31 ]
        }, {
          21: [ 2, 32 ],
          31: [ 2, 32 ],
          52: [ 2, 32 ],
          59: [ 2, 32 ],
          62: [ 2, 32 ],
          66: [ 2, 32 ],
          69: [ 2, 32 ],
          74: [ 2, 32 ],
          75: [ 2, 32 ],
          76: [ 2, 32 ],
          77: [ 2, 32 ],
          78: [ 2, 32 ],
          79: [ 2, 32 ]
        }, {
          21: [ 2, 33 ],
          31: [ 2, 33 ],
          52: [ 2, 33 ],
          59: [ 2, 33 ],
          62: [ 2, 33 ],
          66: [ 2, 33 ],
          69: [ 2, 33 ],
          74: [ 2, 33 ],
          75: [ 2, 33 ],
          76: [ 2, 33 ],
          77: [ 2, 33 ],
          78: [ 2, 33 ],
          79: [ 2, 33 ]
        }, {
          21: [ 2, 34 ],
          31: [ 2, 34 ],
          52: [ 2, 34 ],
          59: [ 2, 34 ],
          62: [ 2, 34 ],
          66: [ 2, 34 ],
          69: [ 2, 34 ],
          74: [ 2, 34 ],
          75: [ 2, 34 ],
          76: [ 2, 34 ],
          77: [ 2, 34 ],
          78: [ 2, 34 ],
          79: [ 2, 34 ]
        }, {
          21: [ 2, 35 ],
          31: [ 2, 35 ],
          52: [ 2, 35 ],
          59: [ 2, 35 ],
          62: [ 2, 35 ],
          66: [ 2, 35 ],
          69: [ 2, 35 ],
          74: [ 2, 35 ],
          75: [ 2, 35 ],
          76: [ 2, 35 ],
          77: [ 2, 35 ],
          78: [ 2, 35 ],
          79: [ 2, 35 ]
        }, {
          21: [ 2, 36 ],
          31: [ 2, 36 ],
          52: [ 2, 36 ],
          59: [ 2, 36 ],
          62: [ 2, 36 ],
          66: [ 2, 36 ],
          69: [ 2, 36 ],
          74: [ 2, 36 ],
          75: [ 2, 36 ],
          76: [ 2, 36 ],
          77: [ 2, 36 ],
          78: [ 2, 36 ],
          79: [ 2, 36 ]
        }, {
          21: [ 2, 40 ],
          31: [ 2, 40 ],
          52: [ 2, 40 ],
          59: [ 2, 40 ],
          62: [ 2, 40 ],
          66: [ 2, 40 ],
          69: [ 2, 40 ],
          74: [ 2, 40 ],
          75: [ 2, 40 ],
          76: [ 2, 40 ],
          77: [ 2, 40 ],
          78: [ 2, 40 ],
          79: [ 2, 40 ],
          81: [ 1, 45 ]
        }, {
          66: [ 1, 32 ],
          80: 46
        }, {
          21: [ 2, 42 ],
          31: [ 2, 42 ],
          52: [ 2, 42 ],
          59: [ 2, 42 ],
          62: [ 2, 42 ],
          66: [ 2, 42 ],
          69: [ 2, 42 ],
          74: [ 2, 42 ],
          75: [ 2, 42 ],
          76: [ 2, 42 ],
          77: [ 2, 42 ],
          78: [ 2, 42 ],
          79: [ 2, 42 ],
          81: [ 2, 42 ]
        }, {
          50: 47,
          52: [ 2, 77 ],
          59: [ 2, 77 ],
          66: [ 2, 77 ],
          74: [ 2, 77 ],
          75: [ 2, 77 ],
          76: [ 2, 77 ],
          77: [ 2, 77 ],
          78: [ 2, 77 ],
          79: [ 2, 77 ]
        }, {
          23: 48,
          36: 50,
          37: [ 1, 52 ],
          41: 51,
          42: [ 1, 53 ],
          43: 49,
          45: [ 2, 49 ]
        }, {
          26: 54,
          41: 55,
          42: [ 1, 53 ],
          45: [ 2, 51 ]
        }, {
          16: [ 1, 56 ]
        }, {
          31: [ 2, 81 ],
          55: 57,
          59: [ 2, 81 ],
          66: [ 2, 81 ],
          74: [ 2, 81 ],
          75: [ 2, 81 ],
          76: [ 2, 81 ],
          77: [ 2, 81 ],
          78: [ 2, 81 ],
          79: [ 2, 81 ]
        }, {
          31: [ 2, 37 ],
          59: [ 2, 37 ],
          66: [ 2, 37 ],
          74: [ 2, 37 ],
          75: [ 2, 37 ],
          76: [ 2, 37 ],
          77: [ 2, 37 ],
          78: [ 2, 37 ],
          79: [ 2, 37 ]
        }, {
          31: [ 2, 38 ],
          59: [ 2, 38 ],
          66: [ 2, 38 ],
          74: [ 2, 38 ],
          75: [ 2, 38 ],
          76: [ 2, 38 ],
          77: [ 2, 38 ],
          78: [ 2, 38 ],
          79: [ 2, 38 ]
        }, {
          18: 58,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          28: 59,
          31: [ 2, 53 ],
          59: [ 2, 53 ],
          66: [ 2, 53 ],
          69: [ 2, 53 ],
          74: [ 2, 53 ],
          75: [ 2, 53 ],
          76: [ 2, 53 ],
          77: [ 2, 53 ],
          78: [ 2, 53 ],
          79: [ 2, 53 ]
        }, {
          31: [ 2, 59 ],
          33: 60,
          59: [ 2, 59 ],
          66: [ 2, 59 ],
          69: [ 2, 59 ],
          74: [ 2, 59 ],
          75: [ 2, 59 ],
          76: [ 2, 59 ],
          77: [ 2, 59 ],
          78: [ 2, 59 ],
          79: [ 2, 59 ]
        }, {
          19: 61,
          21: [ 2, 45 ],
          59: [ 2, 45 ],
          66: [ 2, 45 ],
          74: [ 2, 45 ],
          75: [ 2, 45 ],
          76: [ 2, 45 ],
          77: [ 2, 45 ],
          78: [ 2, 45 ],
          79: [ 2, 45 ]
        }, {
          18: 65,
          31: [ 2, 75 ],
          48: 62,
          57: 63,
          58: 66,
          59: [ 1, 40 ],
          63: 64,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          66: [ 1, 70 ]
        }, {
          21: [ 2, 39 ],
          31: [ 2, 39 ],
          52: [ 2, 39 ],
          59: [ 2, 39 ],
          62: [ 2, 39 ],
          66: [ 2, 39 ],
          69: [ 2, 39 ],
          74: [ 2, 39 ],
          75: [ 2, 39 ],
          76: [ 2, 39 ],
          77: [ 2, 39 ],
          78: [ 2, 39 ],
          79: [ 2, 39 ],
          81: [ 1, 45 ]
        }, {
          18: 65,
          51: 71,
          52: [ 2, 79 ],
          57: 72,
          58: 66,
          59: [ 1, 40 ],
          63: 73,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          24: 74,
          45: [ 1, 75 ]
        }, {
          45: [ 2, 50 ]
        }, {
          4: 76,
          6: 3,
          13: [ 2, 43 ],
          14: [ 2, 43 ],
          17: [ 2, 43 ],
          27: [ 2, 43 ],
          32: [ 2, 43 ],
          37: [ 2, 43 ],
          42: [ 2, 43 ],
          45: [ 2, 43 ],
          46: [ 2, 43 ],
          49: [ 2, 43 ],
          53: [ 2, 43 ]
        }, {
          45: [ 2, 19 ]
        }, {
          18: 77,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          4: 78,
          6: 3,
          13: [ 2, 43 ],
          14: [ 2, 43 ],
          17: [ 2, 43 ],
          27: [ 2, 43 ],
          32: [ 2, 43 ],
          45: [ 2, 43 ],
          46: [ 2, 43 ],
          49: [ 2, 43 ],
          53: [ 2, 43 ]
        }, {
          24: 79,
          45: [ 1, 75 ]
        }, {
          45: [ 2, 52 ]
        }, {
          5: [ 2, 10 ],
          13: [ 2, 10 ],
          14: [ 2, 10 ],
          17: [ 2, 10 ],
          27: [ 2, 10 ],
          32: [ 2, 10 ],
          37: [ 2, 10 ],
          42: [ 2, 10 ],
          45: [ 2, 10 ],
          46: [ 2, 10 ],
          49: [ 2, 10 ],
          53: [ 2, 10 ]
        }, {
          18: 65,
          31: [ 2, 83 ],
          56: 80,
          57: 81,
          58: 66,
          59: [ 1, 40 ],
          63: 82,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          59: [ 2, 85 ],
          60: 83,
          62: [ 2, 85 ],
          66: [ 2, 85 ],
          74: [ 2, 85 ],
          75: [ 2, 85 ],
          76: [ 2, 85 ],
          77: [ 2, 85 ],
          78: [ 2, 85 ],
          79: [ 2, 85 ]
        }, {
          18: 65,
          29: 84,
          31: [ 2, 55 ],
          57: 85,
          58: 66,
          59: [ 1, 40 ],
          63: 86,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          69: [ 2, 55 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          18: 65,
          31: [ 2, 61 ],
          34: 87,
          57: 88,
          58: 66,
          59: [ 1, 40 ],
          63: 89,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          69: [ 2, 61 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          18: 65,
          20: 90,
          21: [ 2, 47 ],
          57: 91,
          58: 66,
          59: [ 1, 40 ],
          63: 92,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          31: [ 1, 93 ]
        }, {
          31: [ 2, 74 ],
          59: [ 2, 74 ],
          66: [ 2, 74 ],
          74: [ 2, 74 ],
          75: [ 2, 74 ],
          76: [ 2, 74 ],
          77: [ 2, 74 ],
          78: [ 2, 74 ],
          79: [ 2, 74 ]
        }, {
          31: [ 2, 76 ]
        }, {
          21: [ 2, 24 ],
          31: [ 2, 24 ],
          52: [ 2, 24 ],
          59: [ 2, 24 ],
          62: [ 2, 24 ],
          66: [ 2, 24 ],
          69: [ 2, 24 ],
          74: [ 2, 24 ],
          75: [ 2, 24 ],
          76: [ 2, 24 ],
          77: [ 2, 24 ],
          78: [ 2, 24 ],
          79: [ 2, 24 ]
        }, {
          21: [ 2, 25 ],
          31: [ 2, 25 ],
          52: [ 2, 25 ],
          59: [ 2, 25 ],
          62: [ 2, 25 ],
          66: [ 2, 25 ],
          69: [ 2, 25 ],
          74: [ 2, 25 ],
          75: [ 2, 25 ],
          76: [ 2, 25 ],
          77: [ 2, 25 ],
          78: [ 2, 25 ],
          79: [ 2, 25 ]
        }, {
          21: [ 2, 27 ],
          31: [ 2, 27 ],
          52: [ 2, 27 ],
          62: [ 2, 27 ],
          65: 94,
          66: [ 1, 95 ],
          69: [ 2, 27 ]
        }, {
          21: [ 2, 89 ],
          31: [ 2, 89 ],
          52: [ 2, 89 ],
          62: [ 2, 89 ],
          66: [ 2, 89 ],
          69: [ 2, 89 ]
        }, {
          21: [ 2, 42 ],
          31: [ 2, 42 ],
          52: [ 2, 42 ],
          59: [ 2, 42 ],
          62: [ 2, 42 ],
          66: [ 2, 42 ],
          67: [ 1, 96 ],
          69: [ 2, 42 ],
          74: [ 2, 42 ],
          75: [ 2, 42 ],
          76: [ 2, 42 ],
          77: [ 2, 42 ],
          78: [ 2, 42 ],
          79: [ 2, 42 ],
          81: [ 2, 42 ]
        }, {
          21: [ 2, 41 ],
          31: [ 2, 41 ],
          52: [ 2, 41 ],
          59: [ 2, 41 ],
          62: [ 2, 41 ],
          66: [ 2, 41 ],
          69: [ 2, 41 ],
          74: [ 2, 41 ],
          75: [ 2, 41 ],
          76: [ 2, 41 ],
          77: [ 2, 41 ],
          78: [ 2, 41 ],
          79: [ 2, 41 ],
          81: [ 2, 41 ]
        }, {
          52: [ 1, 97 ]
        }, {
          52: [ 2, 78 ],
          59: [ 2, 78 ],
          66: [ 2, 78 ],
          74: [ 2, 78 ],
          75: [ 2, 78 ],
          76: [ 2, 78 ],
          77: [ 2, 78 ],
          78: [ 2, 78 ],
          79: [ 2, 78 ]
        }, {
          52: [ 2, 80 ]
        }, {
          5: [ 2, 12 ],
          13: [ 2, 12 ],
          14: [ 2, 12 ],
          17: [ 2, 12 ],
          27: [ 2, 12 ],
          32: [ 2, 12 ],
          37: [ 2, 12 ],
          42: [ 2, 12 ],
          45: [ 2, 12 ],
          46: [ 2, 12 ],
          49: [ 2, 12 ],
          53: [ 2, 12 ]
        }, {
          18: 98,
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          36: 50,
          37: [ 1, 52 ],
          41: 51,
          42: [ 1, 53 ],
          43: 100,
          44: 99,
          45: [ 2, 71 ]
        }, {
          31: [ 2, 65 ],
          38: 101,
          59: [ 2, 65 ],
          66: [ 2, 65 ],
          69: [ 2, 65 ],
          74: [ 2, 65 ],
          75: [ 2, 65 ],
          76: [ 2, 65 ],
          77: [ 2, 65 ],
          78: [ 2, 65 ],
          79: [ 2, 65 ]
        }, {
          45: [ 2, 17 ]
        }, {
          5: [ 2, 13 ],
          13: [ 2, 13 ],
          14: [ 2, 13 ],
          17: [ 2, 13 ],
          27: [ 2, 13 ],
          32: [ 2, 13 ],
          37: [ 2, 13 ],
          42: [ 2, 13 ],
          45: [ 2, 13 ],
          46: [ 2, 13 ],
          49: [ 2, 13 ],
          53: [ 2, 13 ]
        }, {
          31: [ 1, 102 ]
        }, {
          31: [ 2, 82 ],
          59: [ 2, 82 ],
          66: [ 2, 82 ],
          74: [ 2, 82 ],
          75: [ 2, 82 ],
          76: [ 2, 82 ],
          77: [ 2, 82 ],
          78: [ 2, 82 ],
          79: [ 2, 82 ]
        }, {
          31: [ 2, 84 ]
        }, {
          18: 65,
          57: 104,
          58: 66,
          59: [ 1, 40 ],
          61: 103,
          62: [ 2, 87 ],
          63: 105,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          30: 106,
          31: [ 2, 57 ],
          68: 107,
          69: [ 1, 108 ]
        }, {
          31: [ 2, 54 ],
          59: [ 2, 54 ],
          66: [ 2, 54 ],
          69: [ 2, 54 ],
          74: [ 2, 54 ],
          75: [ 2, 54 ],
          76: [ 2, 54 ],
          77: [ 2, 54 ],
          78: [ 2, 54 ],
          79: [ 2, 54 ]
        }, {
          31: [ 2, 56 ],
          69: [ 2, 56 ]
        }, {
          31: [ 2, 63 ],
          35: 109,
          68: 110,
          69: [ 1, 108 ]
        }, {
          31: [ 2, 60 ],
          59: [ 2, 60 ],
          66: [ 2, 60 ],
          69: [ 2, 60 ],
          74: [ 2, 60 ],
          75: [ 2, 60 ],
          76: [ 2, 60 ],
          77: [ 2, 60 ],
          78: [ 2, 60 ],
          79: [ 2, 60 ]
        }, {
          31: [ 2, 62 ],
          69: [ 2, 62 ]
        }, {
          21: [ 1, 111 ]
        }, {
          21: [ 2, 46 ],
          59: [ 2, 46 ],
          66: [ 2, 46 ],
          74: [ 2, 46 ],
          75: [ 2, 46 ],
          76: [ 2, 46 ],
          77: [ 2, 46 ],
          78: [ 2, 46 ],
          79: [ 2, 46 ]
        }, {
          21: [ 2, 48 ]
        }, {
          5: [ 2, 21 ],
          13: [ 2, 21 ],
          14: [ 2, 21 ],
          17: [ 2, 21 ],
          27: [ 2, 21 ],
          32: [ 2, 21 ],
          37: [ 2, 21 ],
          42: [ 2, 21 ],
          45: [ 2, 21 ],
          46: [ 2, 21 ],
          49: [ 2, 21 ],
          53: [ 2, 21 ]
        }, {
          21: [ 2, 90 ],
          31: [ 2, 90 ],
          52: [ 2, 90 ],
          62: [ 2, 90 ],
          66: [ 2, 90 ],
          69: [ 2, 90 ]
        }, {
          67: [ 1, 96 ]
        }, {
          18: 65,
          57: 112,
          58: 66,
          59: [ 1, 40 ],
          66: [ 1, 32 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          5: [ 2, 22 ],
          13: [ 2, 22 ],
          14: [ 2, 22 ],
          17: [ 2, 22 ],
          27: [ 2, 22 ],
          32: [ 2, 22 ],
          37: [ 2, 22 ],
          42: [ 2, 22 ],
          45: [ 2, 22 ],
          46: [ 2, 22 ],
          49: [ 2, 22 ],
          53: [ 2, 22 ]
        }, {
          31: [ 1, 113 ]
        }, {
          45: [ 2, 18 ]
        }, {
          45: [ 2, 72 ]
        }, {
          18: 65,
          31: [ 2, 67 ],
          39: 114,
          57: 115,
          58: 66,
          59: [ 1, 40 ],
          63: 116,
          64: 67,
          65: 68,
          66: [ 1, 69 ],
          69: [ 2, 67 ],
          72: 23,
          73: 24,
          74: [ 1, 25 ],
          75: [ 1, 26 ],
          76: [ 1, 27 ],
          77: [ 1, 28 ],
          78: [ 1, 29 ],
          79: [ 1, 31 ],
          80: 30
        }, {
          5: [ 2, 23 ],
          13: [ 2, 23 ],
          14: [ 2, 23 ],
          17: [ 2, 23 ],
          27: [ 2, 23 ],
          32: [ 2, 23 ],
          37: [ 2, 23 ],
          42: [ 2, 23 ],
          45: [ 2, 23 ],
          46: [ 2, 23 ],
          49: [ 2, 23 ],
          53: [ 2, 23 ]
        }, {
          62: [ 1, 117 ]
        }, {
          59: [ 2, 86 ],
          62: [ 2, 86 ],
          66: [ 2, 86 ],
          74: [ 2, 86 ],
          75: [ 2, 86 ],
          76: [ 2, 86 ],
          77: [ 2, 86 ],
          78: [ 2, 86 ],
          79: [ 2, 86 ]
        }, {
          62: [ 2, 88 ]
        }, {
          31: [ 1, 118 ]
        }, {
          31: [ 2, 58 ]
        }, {
          66: [ 1, 120 ],
          70: 119
        }, {
          31: [ 1, 121 ]
        }, {
          31: [ 2, 64 ]
        }, {
          14: [ 2, 11 ]
        }, {
          21: [ 2, 28 ],
          31: [ 2, 28 ],
          52: [ 2, 28 ],
          62: [ 2, 28 ],
          66: [ 2, 28 ],
          69: [ 2, 28 ]
        }, {
          5: [ 2, 20 ],
          13: [ 2, 20 ],
          14: [ 2, 20 ],
          17: [ 2, 20 ],
          27: [ 2, 20 ],
          32: [ 2, 20 ],
          37: [ 2, 20 ],
          42: [ 2, 20 ],
          45: [ 2, 20 ],
          46: [ 2, 20 ],
          49: [ 2, 20 ],
          53: [ 2, 20 ]
        }, {
          31: [ 2, 69 ],
          40: 122,
          68: 123,
          69: [ 1, 108 ]
        }, {
          31: [ 2, 66 ],
          59: [ 2, 66 ],
          66: [ 2, 66 ],
          69: [ 2, 66 ],
          74: [ 2, 66 ],
          75: [ 2, 66 ],
          76: [ 2, 66 ],
          77: [ 2, 66 ],
          78: [ 2, 66 ],
          79: [ 2, 66 ]
        }, {
          31: [ 2, 68 ],
          69: [ 2, 68 ]
        }, {
          21: [ 2, 26 ],
          31: [ 2, 26 ],
          52: [ 2, 26 ],
          59: [ 2, 26 ],
          62: [ 2, 26 ],
          66: [ 2, 26 ],
          69: [ 2, 26 ],
          74: [ 2, 26 ],
          75: [ 2, 26 ],
          76: [ 2, 26 ],
          77: [ 2, 26 ],
          78: [ 2, 26 ],
          79: [ 2, 26 ]
        }, {
          13: [ 2, 14 ],
          14: [ 2, 14 ],
          17: [ 2, 14 ],
          27: [ 2, 14 ],
          32: [ 2, 14 ],
          37: [ 2, 14 ],
          42: [ 2, 14 ],
          45: [ 2, 14 ],
          46: [ 2, 14 ],
          49: [ 2, 14 ],
          53: [ 2, 14 ]
        }, {
          66: [ 1, 125 ],
          71: [ 1, 124 ]
        }, {
          66: [ 2, 91 ],
          71: [ 2, 91 ]
        }, {
          13: [ 2, 15 ],
          14: [ 2, 15 ],
          17: [ 2, 15 ],
          27: [ 2, 15 ],
          32: [ 2, 15 ],
          42: [ 2, 15 ],
          45: [ 2, 15 ],
          46: [ 2, 15 ],
          49: [ 2, 15 ],
          53: [ 2, 15 ]
        }, {
          31: [ 1, 126 ]
        }, {
          31: [ 2, 70 ]
        }, {
          31: [ 2, 29 ]
        }, {
          66: [ 2, 92 ],
          71: [ 2, 92 ]
        }, {
          13: [ 2, 16 ],
          14: [ 2, 16 ],
          17: [ 2, 16 ],
          27: [ 2, 16 ],
          32: [ 2, 16 ],
          37: [ 2, 16 ],
          42: [ 2, 16 ],
          45: [ 2, 16 ],
          46: [ 2, 16 ],
          49: [ 2, 16 ],
          53: [ 2, 16 ]
        } ],
        defaultActions: {
          4: [ 2, 1 ],
          49: [ 2, 50 ],
          51: [ 2, 19 ],
          55: [ 2, 52 ],
          64: [ 2, 76 ],
          73: [ 2, 80 ],
          78: [ 2, 17 ],
          82: [ 2, 84 ],
          92: [ 2, 48 ],
          99: [ 2, 18 ],
          100: [ 2, 72 ],
          105: [ 2, 88 ],
          107: [ 2, 58 ],
          110: [ 2, 64 ],
          111: [ 2, 11 ],
          123: [ 2, 70 ],
          124: [ 2, 29 ]
        },
        parseError: function parseError(str, hash) {
          throw new Error(str);
        },
        parse: function parse(input) {
          var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token;
            }
            return token;
          }
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
                if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {
                  text: this.lexer.match,
                  token: this.terminals_[symbol] || symbol,
                  line: this.lexer.yylineno,
                  loc: yyloc,
                  expected: expected
                });
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
             case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) recovering--;
              } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }
              break;

             case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };
              if (ranges) {
                yyval._$.range = [ lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1] ];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                return r;
              }
              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;

             case 3:
              return true;
            }
          }
          return true;
        }
      };
      /* Jison generated lexer */
      var lexer = function() {
        var lexer = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          setInput: function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = [ "INITIAL" ];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) this.yylloc.range = [ 0, 0 ];
            this.offset = 0;
            return this;
          },
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch;
          },
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            //this.yyleng -= len;
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [ r[0], r[0] + this.yyleng - len ];
            }
            return this;
          },
          more: function more() {
            this._more = true;
            return this;
          },
          less: function less(n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          next: function next() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [ this.offset, this.offset += this.yyleng ];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input) this.done = false;
              if (token) {
                return token;
              } else {
                return;
              }
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
          },
          lex: function lex() {
            var r = this.next();
            if (typeof r !== "undefined") {
              return r;
            } else {
              return this.lex();
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          popState: function popState() {
            return this.conditionStack.pop();
          },
          _currentRules: function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          },
          topState: function topState() {
            return this.conditionStack[this.conditionStack.length - 2];
          },
          pushState: function begin(condition) {
            this.begin(condition);
          }
        };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
          }
          var YYSTATE = YY_START;
          switch ($avoiding_name_collisions) {
           case 0:
            if (yy_.yytext.slice(-2) === "\\\\") {
              strip(0, 1);
              this.begin("mu");
            } else if (yy_.yytext.slice(-1) === "\\") {
              strip(0, 1);
              this.begin("emu");
            } else {
              this.begin("mu");
            }
            if (yy_.yytext) {
              return 14;
            }
            break;

           case 1:
            return 14;
            break;

           case 2:
            this.popState();
            return 14;
            break;

           case 3:
            yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
            this.popState();
            return 16;
            break;

           case 4:
            return 14;
            break;

           case 5:
            this.popState();
            return 13;
            break;

           case 6:
            return 59;
            break;

           case 7:
            return 62;
            break;

           case 8:
            return 17;
            break;

           case 9:
            this.popState();
            this.begin("raw");
            return 21;
            break;

           case 10:
            return 53;
            break;

           case 11:
            return 27;
            break;

           case 12:
            return 45;
            break;

           case 13:
            this.popState();
            return 42;
            break;

           case 14:
            this.popState();
            return 42;
            break;

           case 15:
            return 32;
            break;

           case 16:
            return 37;
            break;

           case 17:
            return 49;
            break;

           case 18:
            return 46;
            break;

           case 19:
            this.unput(yy_.yytext);
            this.popState();
            this.begin("com");
            break;

           case 20:
            this.popState();
            return 13;
            break;

           case 21:
            return 46;
            break;

           case 22:
            return 67;
            break;

           case 23:
            return 66;
            break;

           case 24:
            return 66;
            break;

           case 25:
            return 81;
            break;

           case 26:
            // ignore whitespace
            break;

           case 27:
            this.popState();
            return 52;
            break;

           case 28:
            this.popState();
            return 31;
            break;

           case 29:
            yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
            return 74;
            break;

           case 30:
            yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
            return 74;
            break;

           case 31:
            return 79;
            break;

           case 32:
            return 76;
            break;

           case 33:
            return 76;
            break;

           case 34:
            return 77;
            break;

           case 35:
            return 78;
            break;

           case 36:
            return 75;
            break;

           case 37:
            return 69;
            break;

           case 38:
            return 71;
            break;

           case 39:
            return 66;
            break;

           case 40:
            return 66;
            break;

           case 41:
            return "INVALID";
            break;

           case 42:
            return 5;
            break;
          }
        };
        lexer.rules = [ /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/ ];
        lexer.conditions = {
          mu: {
            rules: [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42 ],
            inclusive: false
          },
          emu: {
            rules: [ 2 ],
            inclusive: false
          },
          com: {
            rules: [ 5 ],
            inclusive: false
          },
          raw: {
            rules: [ 3, 4 ],
            inclusive: false
          },
          INITIAL: {
            rules: [ 0, 1, 42 ],
            inclusive: true
          }
        };
        return lexer;
      }();
      parser.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser();
    }();
    exports["default"] = handlebars;
    /* jshint ignore:end */
    module.exports = exports["default"];
  }, /* 14 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    var _Visitor = __webpack_require__(6);
    var _Visitor2 = _interopRequireWildcard(_Visitor);
    function WhitespaceControl() {}
    WhitespaceControl.prototype = new _Visitor2["default"]();
    WhitespaceControl.prototype.Program = function(program) {
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i], strip = this.accept(current);
        if (!strip) {
          continue;
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true);
        }
        if (strip.open) {
          omitLeft(body, i, true);
        }
        if (inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            // If we are on a standalone node, save the indent info for partials
            if (current.type === "PartialStatement") {
              // Pull out the whitespace from the final line
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
          }
        }
        if (openStandalone) {
          omitRight((current.program || current.inverse).body);
          // Strip out the previous content node if it's whitespace only
          omitLeft(body, i);
        }
        if (closeStandalone) {
          // Always strip the next node
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body);
        }
      }
      return program;
    };
    WhitespaceControl.prototype.BlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      // Find the inverse program that is involed with whitespace stripping.
      var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        // Walk the inverse chain to find the last inverse that is actually in the chain.
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        // Determine the standalone candiacy. Basically flag our content as being possibly standalone
        // so our parent can determine if we actually are standalone
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };
      if (block.openStrip.close) {
        omitRight(program.body, null, true);
      }
      if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program.body, null, true);
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true);
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true);
        }
        // Find standalone else statments
        if (isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body);
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true);
      }
      return strip;
    };
    WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip;
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      /* istanbul ignore next */
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      };
    };
    function isPrevWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = body.length;
      }
      // Nodes that end with newlines are considered whitespace (but are special
      // cased for strip operations)
      var prev = body[i - 1], sibling = body[i - 2];
      if (!prev) {
        return isRoot;
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
      }
    }
    function isNextWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = -1;
      }
      var next = body[i + 1], sibling = body[i + 2];
      if (!next) {
        return isRoot;
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
      }
    }
    // Marks the node to the right of the position as omitted.
    // I.e. {{foo}}' ' will mark the ' ' node as omitted.
    //
    // If i is undefined, then the first child will be marked as such.
    //
    // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    // content is met.
    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original;
    }
    // Marks the node to the left of the position as omitted.
    // I.e. ' '{{foo}} will mark the ' ' node as omitted.
    //
    // If i is undefined then the last child will be marked as such.
    //
    // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    // content is met.
    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return;
      }
      // We omit the last node if it's whitespace only and not preceeded by a non-content node.
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped;
    }
    exports["default"] = WhitespaceControl;
    module.exports = exports["default"];
  }, /* 15 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(7)["default"];
    exports.__esModule = true;
    exports.SourceLocation = SourceLocation;
    exports.id = id;
    exports.stripFlags = stripFlags;
    exports.stripComment = stripComment;
    exports.preparePath = preparePath;
    exports.prepareMustache = prepareMustache;
    exports.prepareRawBlock = prepareRawBlock;
    exports.prepareBlock = prepareBlock;
    var _Exception = __webpack_require__(10);
    var _Exception2 = _interopRequireWildcard(_Exception);
    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      };
    }
    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substr(1, token.length - 2);
      } else {
        return token;
      }
    }
    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      };
    }
    function stripComment(comment) {
      return comment.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "");
    }
    function preparePath(data, parts, locInfo) {
      /*jshint -W040 */
      locInfo = this.locInfo(locInfo);
      var original = data ? "@" : "", dig = [], depth = 0, depthString = "";
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part, // If we have [] syntax then we do not treat path references as operators,
        // i.e. foo.[this] resolves to approximately context.foo['this']
        isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new _Exception2["default"]("Invalid path: " + original, {
              loc: locInfo
            });
          } else if (part === "..") {
            depth++;
            depthString += "../";
          }
        } else {
          dig.push(part);
        }
      }
      return new this.PathExpression(data, depth, dig, original, locInfo);
    }
    function prepareMustache(path, params, hash, open, strip, locInfo) {
      /*jshint -W040 */
      // Must use charAt to support IE pre-10
      var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
      return new this.MustacheStatement(path, params, hash, escaped, strip, this.locInfo(locInfo));
    }
    function prepareRawBlock(openRawBlock, content, close, locInfo) {
      /*jshint -W040 */
      if (openRawBlock.path.original !== close) {
        var errorNode = {
          loc: openRawBlock.path.loc
        };
        throw new _Exception2["default"](openRawBlock.path.original + " doesn't match " + close, errorNode);
      }
      locInfo = this.locInfo(locInfo);
      var program = new this.Program([ content ], null, {}, locInfo);
      return new this.BlockStatement(openRawBlock.path, openRawBlock.params, openRawBlock.hash, program, undefined, {}, {}, {}, locInfo);
    }
    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      /*jshint -W040 */
      // When we are chaining inverse calls, we will not have a close path
      if (close && close.path && openBlock.path.original !== close.path.original) {
        var errorNode = {
          loc: openBlock.path.loc
        };
        throw new _Exception2["default"](openBlock.path.original + " doesn't match " + close.path.original, errorNode);
      }
      program.blockParams = openBlock.blockParams;
      var inverse = undefined, inverseStrip = undefined;
      if (inverseAndProgram) {
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip;
        }
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program;
      }
      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted;
      }
      return new this.BlockStatement(openBlock.path, openBlock.params, openBlock.hash, program, inverse, openBlock.strip, inverseStrip, close && close.strip, this.locInfo(locInfo));
    }
  }, /* 16 */
  /***/
  function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    /*global define */
    var _isArray = __webpack_require__(11);
    var SourceNode = undefined;
    try {
      /* istanbul ignore next */
      if (false) {
        // We don't support this in AMD environments. For these environments, we asusme that
        // they are running on the browser and thus have no need for the source-map library.
        var SourceMap = require("source-map");
        SourceNode = SourceMap.SourceNode;
      }
    } catch (err) {}
    /* istanbul ignore if: tested but not covered in istanbul due to dist build  */
    if (!SourceNode) {
      SourceNode = function(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) {
          this.add(chunks);
        }
      };
      /* istanbul ignore next */
      SourceNode.prototype = {
        add: function add(chunks) {
          if (_isArray.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src += chunks;
        },
        prepend: function prepend(chunks) {
          if (_isArray.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src = chunks + this.src;
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
          return {
            code: this.toString()
          };
        },
        toString: function toString() {
          return this.src;
        }
      };
    }
    function castChunk(chunk, codeGen, loc) {
      if (_isArray.isArray(chunk)) {
        var ret = [];
        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc));
        }
        return ret;
      } else if (typeof chunk === "boolean" || typeof chunk === "number") {
        // Handle primitives that the SourceNode will throw up on
        return chunk + "";
      }
      return chunk;
    }
    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = [];
    }
    CodeGen.prototype = {
      prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc));
      },
      push: function push(source, loc) {
        this.source.push(this.wrap(source, loc));
      },
      merge: function merge() {
        var source = this.empty();
        this.each(function(line) {
          source.add([ "  ", line, "\n" ]);
        });
        return source;
      },
      each: function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i]);
        }
      },
      empty: function empty() {
        var loc = arguments[0] === undefined ? this.currentLocation || {
          start: {}
        } : arguments[0];
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
      },
      wrap: function wrap(chunk) {
        var loc = arguments[1] === undefined ? this.currentLocation || {
          start: {}
        } : arguments[1];
        if (chunk instanceof SourceNode) {
          return chunk;
        }
        chunk = castChunk(chunk, this, loc);
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
      },
      functionCall: function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([ fn, type ? "." + type + "(" : "(", params, ")" ]);
      },
      quotedString: function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
      },
      objectLiteral: function objectLiteral(obj) {
        var pairs = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = castChunk(obj[key], this);
            if (value !== "undefined") {
              pairs.push([ this.quotedString(key), ":", value ]);
            }
          }
        }
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret;
      },
      generateList: function generateList(entries, loc) {
        var ret = this.empty(loc);
        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(",");
          }
          ret.add(castChunk(entries[i], this, loc));
        }
        return ret;
      },
      generateArray: function generateArray(entries, loc) {
        var ret = this.generateList(entries, loc);
        ret.prepend("[");
        ret.add("]");
        return ret;
      }
    };
    exports["default"] = CodeGen;
    module.exports = exports["default"];
  } ]);
});

/*!
    localForage -- Offline Storage, Improved
    Version 1.2.2
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
(function() {
  var define, requireModule, require, requirejs;
  (function() {
    var registry = {}, seen = {};
    define = function(name, deps, callback) {
      registry[name] = {
        deps: deps,
        callback: callback
      };
    };
    requirejs = require = requireModule = function(name) {
      requirejs._eak_seen = registry;
      if (seen[name]) {
        return seen[name];
      }
      seen[name] = {};
      if (!registry[name]) {
        throw new Error("Could not find module " + name);
      }
      var mod = registry[name], deps = mod.deps, callback = mod.callback, reified = [], exports;
      for (var i = 0, l = deps.length; i < l; i++) {
        if (deps[i] === "exports") {
          reified.push(exports = {});
        } else {
          reified.push(requireModule(resolve(deps[i])));
        }
      }
      var value = callback.apply(this, reified);
      return seen[name] = exports || value;
      function resolve(child) {
        if (child.charAt(0) !== ".") {
          return child;
        }
        var parts = child.split("/");
        var parentBase = name.split("/").slice(0, -1);
        for (var i = 0, l = parts.length; i < l; i++) {
          var part = parts[i];
          if (part === "..") {
            parentBase.pop();
          } else if (part === ".") {
            continue;
          } else {
            parentBase.push(part);
          }
        }
        return parentBase.join("/");
      }
    };
  })();
  define("promise/all", [ "./utils", "exports" ], function(__dependency1__, __exports__) {
    "use strict";
    /* global toString */
    var isArray = __dependency1__.isArray;
    var isFunction = __dependency1__.isFunction;
    /**
      Returns a promise that is fulfilled when all the given promises have been
      fulfilled, or rejected if any of them become rejected. The return promise
      is fulfilled with an array that gives all the values in the order they were
      passed in the `promises` array argument.

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.resolve(2);
      var promise3 = RSVP.resolve(3);
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```

      If any of the `promises` given to `RSVP.all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.reject(new Error("2"));
      var promise3 = RSVP.reject(new Error("3"));
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```

      @method all
      @for RSVP
      @param {Array} promises
      @param {String} label
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
    */
    function all(promises) {
      /*jshint validthis:true */
      var Promise = this;
      if (!isArray(promises)) {
        throw new TypeError("You must pass an array to all.");
      }
      return new Promise(function(resolve, reject) {
        var results = [], remaining = promises.length, promise;
        if (remaining === 0) {
          resolve([]);
        }
        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }
        function resolveAll(index, value) {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        }
        for (var i = 0; i < promises.length; i++) {
          promise = promises[i];
          if (promise && isFunction(promise.then)) {
            promise.then(resolver(i), reject);
          } else {
            resolveAll(i, promise);
          }
        }
      });
    }
    __exports__.all = all;
  });
  define("promise/asap", [ "exports" ], function(__exports__) {
    "use strict";
    var browserGlobal = typeof window !== "undefined" ? window : {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var local = typeof global !== "undefined" ? global : this === undefined ? window : this;
    // node
    function useNextTick() {
      return function() {
        process.nextTick(flush);
      };
    }
    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode("");
      observer.observe(node, {
        characterData: true
      });
      return function() {
        node.data = iterations = ++iterations % 2;
      };
    }
    function useSetTimeout() {
      return function() {
        local.setTimeout(flush, 1);
      };
    }
    var queue = [];
    function flush() {
      for (var i = 0; i < queue.length; i++) {
        var tuple = queue[i];
        var callback = tuple[0], arg = tuple[1];
        callback(arg);
      }
      queue = [];
    }
    var scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else {
      scheduleFlush = useSetTimeout();
    }
    function asap(callback, arg) {
      var length = queue.push([ callback, arg ]);
      if (length === 1) {
        // If length is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        scheduleFlush();
      }
    }
    __exports__.asap = asap;
  });
  define("promise/config", [ "exports" ], function(__exports__) {
    "use strict";
    var config = {
      instrument: false
    };
    function configure(name, value) {
      if (arguments.length === 2) {
        config[name] = value;
      } else {
        return config[name];
      }
    }
    __exports__.config = config;
    __exports__.configure = configure;
  });
  define("promise/polyfill", [ "./promise", "./utils", "exports" ], function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*global self*/
    var RSVPPromise = __dependency1__.Promise;
    var isFunction = __dependency2__.isFunction;
    function polyfill() {
      var local;
      if (typeof global !== "undefined") {
        local = global;
      } else if (typeof window !== "undefined" && window.document) {
        local = window;
      } else {
        local = self;
      }
      var es6PromiseSupport = "Promise" in local && // Some of these methods are missing from
      // Firefox/Chrome experimental implementations
      "resolve" in local.Promise && "reject" in local.Promise && "all" in local.Promise && "race" in local.Promise && // Older version of the spec had a resolver object
      // as the arg rather than a function
      function() {
        var resolve;
        new local.Promise(function(r) {
          resolve = r;
        });
        return isFunction(resolve);
      }();
      if (!es6PromiseSupport) {
        local.Promise = RSVPPromise;
      }
    }
    __exports__.polyfill = polyfill;
  });
  define("promise/promise", [ "./config", "./utils", "./all", "./race", "./resolve", "./reject", "./asap", "exports" ], function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";
    var config = __dependency1__.config;
    var configure = __dependency1__.configure;
    var objectOrFunction = __dependency2__.objectOrFunction;
    var isFunction = __dependency2__.isFunction;
    var now = __dependency2__.now;
    var all = __dependency3__.all;
    var race = __dependency4__.race;
    var staticResolve = __dependency5__.resolve;
    var staticReject = __dependency6__.reject;
    var asap = __dependency7__.asap;
    var counter = 0;
    config.async = asap;
    // default async is asap;
    function Promise(resolver) {
      if (!isFunction(resolver)) {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
      }
      if (!(this instanceof Promise)) {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }
      this._subscribers = [];
      invokeResolver(resolver, this);
    }
    function invokeResolver(resolver, promise) {
      function resolvePromise(value) {
        resolve(promise, value);
      }
      function rejectPromise(reason) {
        reject(promise, reason);
      }
      try {
        resolver(resolvePromise, rejectPromise);
      } catch (e) {
        rejectPromise(e);
      }
    }
    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback), value, error, succeeded, failed;
      if (hasCallback) {
        try {
          value = callback(detail);
          succeeded = true;
        } catch (e) {
          failed = true;
          error = e;
        }
      } else {
        value = detail;
        succeeded = true;
      }
      if (handleThenable(promise, value)) {
        return;
      } else if (hasCallback && succeeded) {
        resolve(promise, value);
      } else if (failed) {
        reject(promise, error);
      } else if (settled === FULFILLED) {
        resolve(promise, value);
      } else if (settled === REJECTED) {
        reject(promise, value);
      }
    }
    var PENDING = void 0;
    var SEALED = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    function subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;
      subscribers[length] = child;
      subscribers[length + FULFILLED] = onFulfillment;
      subscribers[length + REJECTED] = onRejection;
    }
    function publish(promise, settled) {
      var child, callback, subscribers = promise._subscribers, detail = promise._detail;
      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];
        invokeCallback(settled, child, callback, detail);
      }
      promise._subscribers = null;
    }
    Promise.prototype = {
      constructor: Promise,
      _state: undefined,
      _detail: undefined,
      _subscribers: undefined,
      then: function(onFulfillment, onRejection) {
        var promise = this;
        var thenPromise = new this.constructor(function() {});
        if (this._state) {
          var callbacks = arguments;
          config.async(function invokePromiseCallback() {
            invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
          });
        } else {
          subscribe(this, thenPromise, onFulfillment, onRejection);
        }
        return thenPromise;
      },
      "catch": function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    Promise.all = all;
    Promise.race = race;
    Promise.resolve = staticResolve;
    Promise.reject = staticReject;
    function handleThenable(promise, value) {
      var then = null, resolved;
      try {
        if (promise === value) {
          throw new TypeError("A promises callback cannot return that same promise.");
        }
        if (objectOrFunction(value)) {
          then = value.then;
          if (isFunction(then)) {
            then.call(value, function(val) {
              if (resolved) {
                return true;
              }
              resolved = true;
              if (value !== val) {
                resolve(promise, val);
              } else {
                fulfill(promise, val);
              }
            }, function(val) {
              if (resolved) {
                return true;
              }
              resolved = true;
              reject(promise, val);
            });
            return true;
          }
        }
      } catch (error) {
        if (resolved) {
          return true;
        }
        reject(promise, error);
        return true;
      }
      return false;
    }
    function resolve(promise, value) {
      if (promise === value) {
        fulfill(promise, value);
      } else if (!handleThenable(promise, value)) {
        fulfill(promise, value);
      }
    }
    function fulfill(promise, value) {
      if (promise._state !== PENDING) {
        return;
      }
      promise._state = SEALED;
      promise._detail = value;
      config.async(publishFulfillment, promise);
    }
    function reject(promise, reason) {
      if (promise._state !== PENDING) {
        return;
      }
      promise._state = SEALED;
      promise._detail = reason;
      config.async(publishRejection, promise);
    }
    function publishFulfillment(promise) {
      publish(promise, promise._state = FULFILLED);
    }
    function publishRejection(promise) {
      publish(promise, promise._state = REJECTED);
    }
    __exports__.Promise = Promise;
  });
  define("promise/race", [ "./utils", "exports" ], function(__dependency1__, __exports__) {
    "use strict";
    /* global toString */
    var isArray = __dependency1__.isArray;
    /**
      `RSVP.race` allows you to watch a series of promises and act as soon as the
      first promise given to the `promises` argument fulfills or rejects.

      Example:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 2");
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // result === "promise 2" because it was resolved before promise1
        // was resolved.
      });
      ```

      `RSVP.race` is deterministic in that only the state of the first completed
      promise matters. For example, even if other promises given to the `promises`
      array argument are resolved, but the first completed promise has become
      rejected before the other promises became fulfilled, the returned promise
      will become rejected:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error("promise 2"));
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // Code here never runs because there are rejected promises!
      }, function(reason){
        // reason.message === "promise2" because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```

      @method race
      @for RSVP
      @param {Array} promises array of promises to observe
      @param {String} label optional string for describing the promise returned.
      Useful for tooling.
      @return {Promise} a promise that becomes fulfilled with the value the first
      completed promises is resolved with if the first completed promise was
      fulfilled, or rejected with the reason that the first completed promise
      was rejected with.
    */
    function race(promises) {
      /*jshint validthis:true */
      var Promise = this;
      if (!isArray(promises)) {
        throw new TypeError("You must pass an array to race.");
      }
      return new Promise(function(resolve, reject) {
        var results = [], promise;
        for (var i = 0; i < promises.length; i++) {
          promise = promises[i];
          if (promise && typeof promise.then === "function") {
            promise.then(resolve, reject);
          } else {
            resolve(promise);
          }
        }
      });
    }
    __exports__.race = race;
  });
  define("promise/reject", [ "exports" ], function(__exports__) {
    "use strict";
    /**
      `RSVP.reject` returns a promise that will become rejected with the passed
      `reason`. `RSVP.reject` is essentially shorthand for the following:

      ```javascript
      var promise = new RSVP.Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      Instead of writing the above, your code now simply becomes the following:

      ```javascript
      var promise = RSVP.reject(new Error('WHOOPS'));

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      @method reject
      @for RSVP
      @param {Any} reason value that the returned promise will be rejected with.
      @param {String} label optional string for identifying the returned promise.
      Useful for tooling.
      @return {Promise} a promise that will become rejected with the given
      `reason`.
    */
    function reject(reason) {
      /*jshint validthis:true */
      var Promise = this;
      return new Promise(function(resolve, reject) {
        reject(reason);
      });
    }
    __exports__.reject = reject;
  });
  define("promise/resolve", [ "exports" ], function(__exports__) {
    "use strict";
    function resolve(value) {
      /*jshint validthis:true */
      if (value && typeof value === "object" && value.constructor === this) {
        return value;
      }
      var Promise = this;
      return new Promise(function(resolve) {
        resolve(value);
      });
    }
    __exports__.resolve = resolve;
  });
  define("promise/utils", [ "exports" ], function(__exports__) {
    "use strict";
    function objectOrFunction(x) {
      return isFunction(x) || typeof x === "object" && x !== null;
    }
    function isFunction(x) {
      return typeof x === "function";
    }
    function isArray(x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    }
    // Date.now is not available in browsers < IE9
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
    var now = Date.now || function() {
      return new Date().getTime();
    };
    __exports__.objectOrFunction = objectOrFunction;
    __exports__.isFunction = isFunction;
    __exports__.isArray = isArray;
    __exports__.now = now;
  });
  requireModule("promise/polyfill").polyfill();
})();

(function() {
  "use strict";
  // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
  // it to Base64, so this is how we store it to prevent very strange errors with less
  // verbose ways of binary <-> string data storage.
  var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var SERIALIZED_MARKER = "__lfsc__:";
  var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
  // OMG the serializations!
  var TYPE_ARRAYBUFFER = "arbf";
  var TYPE_BLOB = "blob";
  var TYPE_INT8ARRAY = "si08";
  var TYPE_UINT8ARRAY = "ui08";
  var TYPE_UINT8CLAMPEDARRAY = "uic8";
  var TYPE_INT16ARRAY = "si16";
  var TYPE_INT32ARRAY = "si32";
  var TYPE_UINT16ARRAY = "ur16";
  var TYPE_UINT32ARRAY = "ui32";
  var TYPE_FLOAT32ARRAY = "fl32";
  var TYPE_FLOAT64ARRAY = "fl64";
  var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
  // Serialize a value, afterwards executing a callback (which usually
  // instructs the `setItem()` callback/promise to be executed). This is how
  // we store binary data with localStorage.
  function serialize(value, callback) {
    var valueString = "";
    if (value) {
      valueString = value.toString();
    }
    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (value.toString() === "[object ArrayBuffer]" || value.buffer && value.buffer.toString() === "[object ArrayBuffer]")) {
      // Convert binary arrays to a string and prefix the string with
      // a special marker.
      var buffer;
      var marker = SERIALIZED_MARKER;
      if (value instanceof ArrayBuffer) {
        buffer = value;
        marker += TYPE_ARRAYBUFFER;
      } else {
        buffer = value.buffer;
        if (valueString === "[object Int8Array]") {
          marker += TYPE_INT8ARRAY;
        } else if (valueString === "[object Uint8Array]") {
          marker += TYPE_UINT8ARRAY;
        } else if (valueString === "[object Uint8ClampedArray]") {
          marker += TYPE_UINT8CLAMPEDARRAY;
        } else if (valueString === "[object Int16Array]") {
          marker += TYPE_INT16ARRAY;
        } else if (valueString === "[object Uint16Array]") {
          marker += TYPE_UINT16ARRAY;
        } else if (valueString === "[object Int32Array]") {
          marker += TYPE_INT32ARRAY;
        } else if (valueString === "[object Uint32Array]") {
          marker += TYPE_UINT32ARRAY;
        } else if (valueString === "[object Float32Array]") {
          marker += TYPE_FLOAT32ARRAY;
        } else if (valueString === "[object Float64Array]") {
          marker += TYPE_FLOAT64ARRAY;
        } else {
          callback(new Error("Failed to get type for BinaryArray"));
        }
      }
      callback(marker + bufferToString(buffer));
    } else if (valueString === "[object Blob]") {
      // Conver the blob to a binaryArray and then to a string.
      var fileReader = new FileReader();
      fileReader.onload = function() {
        var str = bufferToString(this.result);
        callback(SERIALIZED_MARKER + TYPE_BLOB + str);
      };
      fileReader.readAsArrayBuffer(value);
    } else {
      try {
        callback(JSON.stringify(value));
      } catch (e) {
        window.console.error("Couldn't convert value into a JSON " + "string: ", value);
        callback(null, e);
      }
    }
  }
  // Deserialize data we've inserted into a value column/field. We place
  // special markers into our strings to mark them as encoded; this isn't
  // as nice as a meta field, but it's the only sane thing we can do whilst
  // keeping localStorage support intact.
  //
  // Oftentimes this will just deserialize JSON content, but if we have a
  // special marker (SERIALIZED_MARKER, defined above), we will extract
  // some kind of arraybuffer/binary data/typed array out of the string.
  function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
      return JSON.parse(value);
    }
    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
    var buffer = stringToBuffer(serializedString);
    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
     case TYPE_ARRAYBUFFER:
      return buffer;

     case TYPE_BLOB:
      return new Blob([ buffer ]);

     case TYPE_INT8ARRAY:
      return new Int8Array(buffer);

     case TYPE_UINT8ARRAY:
      return new Uint8Array(buffer);

     case TYPE_UINT8CLAMPEDARRAY:
      return new Uint8ClampedArray(buffer);

     case TYPE_INT16ARRAY:
      return new Int16Array(buffer);

     case TYPE_UINT16ARRAY:
      return new Uint16Array(buffer);

     case TYPE_INT32ARRAY:
      return new Int32Array(buffer);

     case TYPE_UINT32ARRAY:
      return new Uint32Array(buffer);

     case TYPE_FLOAT32ARRAY:
      return new Float32Array(buffer);

     case TYPE_FLOAT64ARRAY:
      return new Float64Array(buffer);

     default:
      throw new Error("Unkown type: " + type);
    }
  }
  function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * .75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;
    if (serializedString[serializedString.length - 1] === "=") {
      bufferLength--;
      if (serializedString[serializedString.length - 2] === "=") {
        bufferLength--;
      }
    }
    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = BASE_CHARS.indexOf(serializedString[i]);
      encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
      encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
      encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
      /*jslint bitwise: true */
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
  }
  // Converts a buffer to a string to store, serialized, in the backend
  // storage library.
  function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = "";
    var i;
    for (i = 0; i < bytes.length; i += 3) {
      /*jslint bitwise: true */
      base64String += BASE_CHARS[bytes[i] >> 2];
      base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64String += BASE_CHARS[bytes[i + 2] & 63];
    }
    if (bytes.length % 3 === 2) {
      base64String = base64String.substring(0, base64String.length - 1) + "=";
    } else if (bytes.length % 3 === 1) {
      base64String = base64String.substring(0, base64String.length - 2) + "==";
    }
    return base64String;
  }
  var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = localforageSerializer;
  } else if (typeof define === "function" && define.amd) {
    define("localforageSerializer", function() {
      return localforageSerializer;
    });
  } else {
    this.localforageSerializer = localforageSerializer;
  }
}).call(window);

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).
(function() {
  "use strict";
  // Originally found in https://github.com/mozilla-b2g/gaia/blob/e8f624e4cc9ea945727278039b3bc9bcb9f8667a/shared/js/async_storage.js
  // Promises!
  var Promise = typeof module !== "undefined" && module.exports ? require("promise") : this.Promise;
  // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.
  var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB || this.OIndexedDB || this.msIndexedDB;
  // If IndexedDB isn't available, we get outta here!
  if (!indexedDB) {
    return;
  }
  // Open the IndexedDB database (automatically creates one if one didn't
  // previously exist), using any options set in the config.
  function _initStorage(options) {
    var self = this;
    var dbInfo = {
      db: null
    };
    if (options) {
      for (var i in options) {
        dbInfo[i] = options[i];
      }
    }
    return new Promise(function(resolve, reject) {
      var openreq = indexedDB.open(dbInfo.name, dbInfo.version);
      openreq.onerror = function() {
        reject(openreq.error);
      };
      openreq.onupgradeneeded = function() {
        // First time setup: create an empty object store
        openreq.result.createObjectStore(dbInfo.storeName);
      };
      openreq.onsuccess = function() {
        dbInfo.db = openreq.result;
        self._dbInfo = dbInfo;
        resolve();
      };
    });
  }
  function getItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var store = dbInfo.db.transaction(dbInfo.storeName, "readonly").objectStore(dbInfo.storeName);
        var req = store.get(key);
        req.onsuccess = function() {
          var value = req.result;
          if (value === undefined) {
            value = null;
          }
          resolve(value);
        };
        req.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeDeferedCallback(promise, callback);
    return promise;
  }
  // Iterate over all items stored in database.
  function iterate(iterator, callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var store = dbInfo.db.transaction(dbInfo.storeName, "readonly").objectStore(dbInfo.storeName);
        var req = store.openCursor();
        var iterationNumber = 1;
        req.onsuccess = function() {
          var cursor = req.result;
          if (cursor) {
            var result = iterator(cursor.value, cursor.key, iterationNumber++);
            if (result !== void 0) {
              resolve(result);
            } else {
              cursor["continue"]();
            }
          } else {
            resolve();
          }
        };
        req.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeDeferedCallback(promise, callback);
    return promise;
  }
  function setItem(key, value, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var transaction = dbInfo.db.transaction(dbInfo.storeName, "readwrite");
        var store = transaction.objectStore(dbInfo.storeName);
        // The reason we don't _save_ null is because IE 10 does
        // not support saving the `null` type in IndexedDB. How
        // ironic, given the bug below!
        // See: https://github.com/mozilla/localForage/issues/161
        if (value === null) {
          value = undefined;
        }
        var req = store.put(value, key);
        transaction.oncomplete = function() {
          // Cast to undefined so the value passed to
          // callback/promise is the same as what one would get out
          // of `getItem()` later. This leads to some weirdness
          // (setItem('foo', undefined) will return `null`), but
          // it's not my fault localStorage is our baseline and that
          // it's weird.
          if (value === undefined) {
            value = null;
          }
          resolve(value);
        };
        transaction.onabort = transaction.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeDeferedCallback(promise, callback);
    return promise;
  }
  function removeItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var transaction = dbInfo.db.transaction(dbInfo.storeName, "readwrite");
        var store = transaction.objectStore(dbInfo.storeName);
        // We use a Grunt task to make this safe for IE and some
        // versions of Android (including those used by Cordova).
        // Normally IE won't like `.delete()` and will insist on
        // using `['delete']()`, but we have a build step that
        // fixes this for us now.
        var req = store["delete"](key);
        transaction.oncomplete = function() {
          resolve();
        };
        transaction.onerror = function() {
          reject(req.error);
        };
        // The request will be aborted if we've exceeded our storage
        // space. In this case, we will reject with a specific
        // "QuotaExceededError".
        transaction.onabort = function(event) {
          var error = event.target.error;
          if (error === "QuotaExceededError") {
            reject(error);
          }
        };
      })["catch"](reject);
    });
    executeDeferedCallback(promise, callback);
    return promise;
  }
  function clear(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var transaction = dbInfo.db.transaction(dbInfo.storeName, "readwrite");
        var store = transaction.objectStore(dbInfo.storeName);
        var req = store.clear();
        transaction.oncomplete = function() {
          resolve();
        };
        transaction.onabort = transaction.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeDeferedCallback(promise, callback);
    return promise;
  }
  function length(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var store = dbInfo.db.transaction(dbInfo.storeName, "readonly").objectStore(dbInfo.storeName);
        var req = store.count();
        req.onsuccess = function() {
          resolve(req.result);
        };
        req.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function key(n, callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      if (n < 0) {
        resolve(null);
        return;
      }
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var store = dbInfo.db.transaction(dbInfo.storeName, "readonly").objectStore(dbInfo.storeName);
        var advanced = false;
        var req = store.openCursor();
        req.onsuccess = function() {
          var cursor = req.result;
          if (!cursor) {
            // this means there weren't enough keys
            resolve(null);
            return;
          }
          if (n === 0) {
            // We have the first key, return it if that's what they
            // wanted.
            resolve(cursor.key);
          } else {
            if (!advanced) {
              // Otherwise, ask the cursor to skip ahead n
              // records.
              advanced = true;
              cursor.advance(n);
            } else {
              // When we get here, we've got the nth key.
              resolve(cursor.key);
            }
          }
        };
        req.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function keys(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        var store = dbInfo.db.transaction(dbInfo.storeName, "readonly").objectStore(dbInfo.storeName);
        var req = store.openCursor();
        var keys = [];
        req.onsuccess = function() {
          var cursor = req.result;
          if (!cursor) {
            resolve(keys);
            return;
          }
          keys.push(cursor.key);
          cursor["continue"]();
        };
        req.onerror = function() {
          reject(req.error);
        };
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }
  function executeDeferedCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        deferCallback(callback, result);
      }, function(error) {
        callback(error);
      });
    }
  }
  // Under Chrome the callback is called before the changes (save, clear)
  // are actually made. So we use a defer function which wait that the
  // call stack to be empty.
  // For more info : https://github.com/mozilla/localForage/issues/175
  // Pull request : https://github.com/mozilla/localForage/pull/178
  function deferCallback(callback, result) {
    if (callback) {
      return setTimeout(function() {
        return callback(null, result);
      }, 0);
    }
  }
  var asyncStorage = {
    _driver: "asyncStorage",
    _initStorage: _initStorage,
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = asyncStorage;
  } else if (typeof define === "function" && define.amd) {
    define("asyncStorage", function() {
      return asyncStorage;
    });
  } else {
    this.asyncStorage = asyncStorage;
  }
}).call(window);

// If IndexedDB isn't available, we'll fall back to localStorage.
// Note that this will have considerable performance and storage
// side-effects (all data will be serialized on save and only data that
// can be converted to a string via `JSON.stringify()` will be saved).
(function() {
  "use strict";
  // Promises!
  var Promise = typeof module !== "undefined" && module.exports ? require("promise") : this.Promise;
  var globalObject = this;
  var serializer = null;
  var localStorage = null;
  // If the app is running inside a Google Chrome packaged webapp, or some
  // other context where localStorage isn't available, we don't use
  // localStorage. This feature detection is preferred over the old
  // `if (window.chrome && window.chrome.runtime)` code.
  // See: https://github.com/mozilla/localForage/issues/68
  try {
    // If localStorage isn't available, we get outta here!
    // This should be inside a try catch
    if (!this.localStorage || !("setItem" in this.localStorage)) {
      return;
    }
    // Initialize localStorage and create a variable to use throughout
    // the code.
    localStorage = this.localStorage;
  } catch (e) {
    return;
  }
  var ModuleType = {
    DEFINE: 1,
    EXPORT: 2,
    WINDOW: 3
  };
  // Attaching to window (i.e. no module loader) is the assumed,
  // simple default.
  var moduleType = ModuleType.WINDOW;
  // Find out what kind of module setup we have; if none, we'll just attach
  // localForage to the main window.
  if (typeof module !== "undefined" && module.exports) {
    moduleType = ModuleType.EXPORT;
  } else if (typeof define === "function" && define.amd) {
    moduleType = ModuleType.DEFINE;
  }
  // Config the localStorage backend, using options set in the config.
  function _initStorage(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
      for (var i in options) {
        dbInfo[i] = options[i];
      }
    }
    dbInfo.keyPrefix = dbInfo.name + "/";
    self._dbInfo = dbInfo;
    var serializerPromise = new Promise(function(resolve) {
      // We allow localForage to be declared as a module or as a
      // library available without AMD/require.js.
      if (moduleType === ModuleType.DEFINE) {
        require([ "localforageSerializer" ], resolve);
      } else if (moduleType === ModuleType.EXPORT) {
        // Making it browserify friendly
        resolve(require("./../utils/serializer"));
      } else {
        resolve(globalObject.localforageSerializer);
      }
    });
    return serializerPromise.then(function(lib) {
      serializer = lib;
      return Promise.resolve();
    });
  }
  // Remove all keys from the datastore, effectively destroying all data in
  // the app's key/value store!
  function clear(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self._dbInfo.keyPrefix;
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var key = localStorage.key(i);
        if (key.indexOf(keyPrefix) === 0) {
          localStorage.removeItem(key);
        }
      }
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Retrieve an item from the store. Unlike the original async_storage
  // library in Gaia, we don't modify return values at all. If a key's value
  // is `undefined`, we pass that value to the callback function.
  function getItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = self.ready().then(function() {
      var dbInfo = self._dbInfo;
      var result = localStorage.getItem(dbInfo.keyPrefix + key);
      // If a result was found, parse it from the serialized
      // string into a JS object. If result isn't truthy, the key
      // is likely undefined and we'll pass it straight to the
      // callback.
      if (result) {
        result = serializer.deserialize(result);
      }
      return result;
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Iterate over all items in the store.
  function iterate(iterator, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self._dbInfo.keyPrefix;
      var keyPrefixLength = keyPrefix.length;
      var length = localStorage.length;
      for (var i = 0; i < length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the
        // key is likely undefined and we'll pass it straight
        // to the iterator.
        if (value) {
          value = serializer.deserialize(value);
        }
        value = iterator(value, key.substring(keyPrefixLength), i + 1);
        if (value !== void 0) {
          return value;
        }
      }
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Same as localStorage's key() method, except takes a callback.
  function key(n, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self._dbInfo;
      var result;
      try {
        result = localStorage.key(n);
      } catch (error) {
        result = null;
      }
      // Remove the prefix from the key, if a key is found.
      if (result) {
        result = result.substring(dbInfo.keyPrefix.length);
      }
      return result;
    });
    executeCallback(promise, callback);
    return promise;
  }
  function keys(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self._dbInfo;
      var length = localStorage.length;
      var keys = [];
      for (var i = 0; i < length; i++) {
        if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
          keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
        }
      }
      return keys;
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Supply the number of keys in the datastore to the callback function.
  function length(callback) {
    var self = this;
    var promise = self.keys().then(function(keys) {
      return keys.length;
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Remove an item from the store, nice and simple.
  function removeItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = self.ready().then(function() {
      var dbInfo = self._dbInfo;
      localStorage.removeItem(dbInfo.keyPrefix + key);
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Set a key's value and run an optional callback once the value is set.
  // Unlike Gaia's implementation, the callback function is passed the value,
  // in case you want to operate on that value only after you're sure it
  // saved, or something like that.
  function setItem(key, value, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = self.ready().then(function() {
      // Convert undefined values to null.
      // https://github.com/mozilla/localForage/pull/42
      if (value === undefined) {
        value = null;
      }
      // Save the original value to pass to the callback.
      var originalValue = value;
      return new Promise(function(resolve, reject) {
        serializer.serialize(value, function(value, error) {
          if (error) {
            reject(error);
          } else {
            try {
              var dbInfo = self._dbInfo;
              localStorage.setItem(dbInfo.keyPrefix + key, value);
              resolve(originalValue);
            } catch (e) {
              // localStorage capacity exceeded.
              // TODO: Make this a specific error/event.
              if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                reject(e);
              }
              reject(e);
            }
          }
        });
      });
    });
    executeCallback(promise, callback);
    return promise;
  }
  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }
  var localStorageWrapper = {
    _driver: "localStorageWrapper",
    _initStorage: _initStorage,
    // Default API, from Gaia/localStorage.
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
  };
  if (moduleType === ModuleType.EXPORT) {
    module.exports = localStorageWrapper;
  } else if (moduleType === ModuleType.DEFINE) {
    define("localStorageWrapper", function() {
      return localStorageWrapper;
    });
  } else {
    this.localStorageWrapper = localStorageWrapper;
  }
}).call(window);

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function() {
  "use strict";
  // Promises!
  var Promise = typeof module !== "undefined" && module.exports ? require("promise") : this.Promise;
  var globalObject = this;
  var serializer = null;
  var openDatabase = this.openDatabase;
  // If WebSQL methods aren't available, we can stop now.
  if (!openDatabase) {
    return;
  }
  var ModuleType = {
    DEFINE: 1,
    EXPORT: 2,
    WINDOW: 3
  };
  // Attaching to window (i.e. no module loader) is the assumed,
  // simple default.
  var moduleType = ModuleType.WINDOW;
  // Find out what kind of module setup we have; if none, we'll just attach
  // localForage to the main window.
  if (typeof module !== "undefined" && module.exports) {
    moduleType = ModuleType.EXPORT;
  } else if (typeof define === "function" && define.amd) {
    moduleType = ModuleType.DEFINE;
  }
  // Open the WebSQL database (automatically creates one if one didn't
  // previously exist), using any options set in the config.
  function _initStorage(options) {
    var self = this;
    var dbInfo = {
      db: null
    };
    if (options) {
      for (var i in options) {
        dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
      }
    }
    var serializerPromise = new Promise(function(resolve) {
      // We allow localForage to be declared as a module or as a
      // library available without AMD/require.js.
      if (moduleType === ModuleType.DEFINE) {
        require([ "localforageSerializer" ], resolve);
      } else if (moduleType === ModuleType.EXPORT) {
        // Making it browserify friendly
        resolve(require("./../utils/serializer"));
      } else {
        resolve(globalObject.localforageSerializer);
      }
    });
    var dbInfoPromise = new Promise(function(resolve, reject) {
      // Open the database; the openDatabase API will automatically
      // create it for us if it doesn't exist.
      try {
        dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
      } catch (e) {
        return self.setDriver(self.LOCALSTORAGE).then(function() {
          return self._initStorage(options);
        }).then(resolve)["catch"](reject);
      }
      // Create our key/value table if it doesn't exist.
      dbInfo.db.transaction(function(t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], function() {
          self._dbInfo = dbInfo;
          resolve();
        }, function(t, error) {
          reject(error);
        });
      });
    });
    return serializerPromise.then(function(lib) {
      serializer = lib;
      return dbInfoPromise;
    });
  }
  function getItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [ key ], function(t, results) {
            var result = results.rows.length ? results.rows.item(0).value : null;
            // Check to see if this is serialized content we need to
            // unpack.
            if (result) {
              result = serializer.deserialize(result);
            }
            resolve(result);
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function iterate(iterator, callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("SELECT * FROM " + dbInfo.storeName, [], function(t, results) {
            var rows = results.rows;
            var length = rows.length;
            for (var i = 0; i < length; i++) {
              var item = rows.item(i);
              var result = item.value;
              // Check to see if this is serialized content
              // we need to unpack.
              if (result) {
                result = serializer.deserialize(result);
              }
              result = iterator(result, item.key, i + 1);
              // void(0) prevents problems with redefinition
              // of `undefined`.
              if (result !== void 0) {
                resolve(result);
                return;
              }
            }
            resolve();
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function setItem(key, value, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        // The localStorage API doesn't return undefined values in an
        // "expected" way, so undefined is always cast to null in all
        // drivers. See: https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
          value = null;
        }
        // Save the original value to pass to the callback.
        var originalValue = value;
        serializer.serialize(value, function(value, error) {
          if (error) {
            reject(error);
          } else {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function(t) {
              t.executeSql("INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [ key, value ], function() {
                resolve(originalValue);
              }, function(t, error) {
                reject(error);
              });
            }, function(sqlError) {
              // The transaction failed; check
              // to see if it's a quota error.
              if (sqlError.code === sqlError.QUOTA_ERR) {
                // We reject the callback outright for now, but
                // it's worth trying to re-run the transaction.
                // Even if the user accepts the prompt to use
                // more storage on Safari, this error will
                // be called.
                //
                // TODO: Try to re-run the transaction.
                reject(sqlError);
              }
            });
          }
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function removeItem(key, callback) {
    var self = this;
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== "string") {
      window.console.warn(key + " used as a key, but it is not a string.");
      key = String(key);
    }
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [ key ], function() {
            resolve();
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Deletes every item in the table.
  // TODO: Find out if this resets the AUTO_INCREMENT number.
  function clear(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("DELETE FROM " + dbInfo.storeName, [], function() {
            resolve();
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Does a simple `COUNT(key)` to get the number of items stored in
  // localForage.
  function length(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          // Ahhh, SQL makes this one soooooo easy.
          t.executeSql("SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t, results) {
            var result = results.rows.item(0).c;
            resolve(result);
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  // Return the key located at key index X; essentially gets the key from a
  // `WHERE id = ?`. This is the most efficient way I can think to implement
  // this rarely-used (in my experience) part of the API, but it can seem
  // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
  // the ID of each key will change every time it's updated. Perhaps a stored
  // procedure for the `setItem()` SQL would solve this problem?
  // TODO: Don't change ID on `setItem()`.
  function key(n, callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [ n + 1 ], function(t, results) {
            var result = results.rows.length ? results.rows.item(0).key : null;
            resolve(result);
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function keys(callback) {
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      self.ready().then(function() {
        var dbInfo = self._dbInfo;
        dbInfo.db.transaction(function(t) {
          t.executeSql("SELECT key FROM " + dbInfo.storeName, [], function(t, results) {
            var keys = [];
            for (var i = 0; i < results.rows.length; i++) {
              keys.push(results.rows.item(i).key);
            }
            resolve(keys);
          }, function(t, error) {
            reject(error);
          });
        });
      })["catch"](reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }
  var webSQLStorage = {
    _driver: "webSQLStorage",
    _initStorage: _initStorage,
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
  };
  if (moduleType === ModuleType.DEFINE) {
    define("webSQLStorage", function() {
      return webSQLStorage;
    });
  } else if (moduleType === ModuleType.EXPORT) {
    module.exports = webSQLStorage;
  } else {
    this.webSQLStorage = webSQLStorage;
  }
}).call(window);

(function() {
  "use strict";
  // Promises!
  var Promise = typeof module !== "undefined" && module.exports ? require("promise") : this.Promise;
  // Custom drivers are stored here when `defineDriver()` is called.
  // They are shared across all instances of localForage.
  var CustomDrivers = {};
  var DriverType = {
    INDEXEDDB: "asyncStorage",
    LOCALSTORAGE: "localStorageWrapper",
    WEBSQL: "webSQLStorage"
  };
  var DefaultDriverOrder = [ DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE ];
  var LibraryMethods = [ "clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem" ];
  var ModuleType = {
    DEFINE: 1,
    EXPORT: 2,
    WINDOW: 3
  };
  var DefaultConfig = {
    description: "",
    driver: DefaultDriverOrder.slice(),
    name: "localforage",
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: "keyvaluepairs",
    version: 1
  };
  // Attaching to window (i.e. no module loader) is the assumed,
  // simple default.
  var moduleType = ModuleType.WINDOW;
  // Find out what kind of module setup we have; if none, we'll just attach
  // localForage to the main window.
  if (typeof module !== "undefined" && module.exports) {
    moduleType = ModuleType.EXPORT;
  } else if (typeof define === "function" && define.amd) {
    moduleType = ModuleType.DEFINE;
  }
  // Check to see if IndexedDB is available and if it is the latest
  // implementation; it's our preferred backend library. We use "_spec_test"
  // as the name of the database because it's not the one we'll operate on,
  // but it's useful to make sure its using the right spec.
  // See: https://github.com/mozilla/localForage/issues/128
  var driverSupport = function(self) {
    // Initialize IndexedDB; fall back to vendor-prefixed versions
    // if needed.
    var indexedDB = indexedDB || self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB;
    var result = {};
    result[DriverType.WEBSQL] = !!self.openDatabase;
    result[DriverType.INDEXEDDB] = !!function() {
      // We mimic PouchDB here; just UA test for Safari (which, as of
      // iOS 8/Yosemite, doesn't properly support IndexedDB).
      // IndexedDB support is broken and different from Blink's.
      // This is faster than the test case (and it's sync), so we just
      // do this. *SIGH*
      // http://bl.ocks.org/nolanlawson/raw/c83e9039edf2278047e9/
      //
      // We test for openDatabase because IE Mobile identifies itself
      // as Safari. Oh the lulz...
      if (typeof self.openDatabase !== "undefined" && self.navigator && self.navigator.userAgent && /Safari/.test(self.navigator.userAgent) && !/Chrome/.test(self.navigator.userAgent)) {
        return false;
      }
      try {
        // Some Samsung/HTC Android 4.0-4.3 devices
        // have older IndexedDB specs; if this isn't available
        // their IndexedDB is too old for us to use.
        // (Replaces the onupgradeneeded test.)
        return indexedDB && typeof indexedDB.open === "function" && typeof self.IDBKeyRange !== "undefined";
      } catch (e) {
        return false;
      }
    }();
    result[DriverType.LOCALSTORAGE] = !!function() {
      try {
        return self.localStorage && "setItem" in self.localStorage && self.localStorage.setItem;
      } catch (e) {
        return false;
      }
    }();
    return result;
  }(this);
  var isArray = Array.isArray || function(arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
  function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function() {
      var _args = arguments;
      return localForageInstance.ready().then(function() {
        return localForageInstance[libraryMethod].apply(localForageInstance, _args);
      });
    };
  }
  function extend() {
    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];
      if (arg) {
        for (var key in arg) {
          if (arg.hasOwnProperty(key)) {
            if (isArray(arg[key])) {
              arguments[0][key] = arg[key].slice();
            } else {
              arguments[0][key] = arg[key];
            }
          }
        }
      }
    }
    return arguments[0];
  }
  function isLibraryDriver(driverName) {
    for (var driver in DriverType) {
      if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {
        return true;
      }
    }
    return false;
  }
  var globalObject = this;
  function LocalForage(options) {
    this._config = extend({}, DefaultConfig, options);
    this._driverSet = null;
    this._ready = false;
    this._dbInfo = null;
    // Add a stub for each driver API method that delays the call to the
    // corresponding driver method until localForage is ready. These stubs
    // will be replaced by the driver methods as soon as the driver is
    // loaded, so there is no performance impact.
    for (var i = 0; i < LibraryMethods.length; i++) {
      callWhenReady(this, LibraryMethods[i]);
    }
    this.setDriver(this._config.driver);
  }
  LocalForage.prototype.INDEXEDDB = DriverType.INDEXEDDB;
  LocalForage.prototype.LOCALSTORAGE = DriverType.LOCALSTORAGE;
  LocalForage.prototype.WEBSQL = DriverType.WEBSQL;
  // Set any config values for localForage; can be called anytime before
  // the first API call (e.g. `getItem`, `setItem`).
  // We loop through options so we don't overwrite existing config
  // values.
  LocalForage.prototype.config = function(options) {
    // If the options argument is an object, we use it to set values.
    // Otherwise, we return either a specified config value or all
    // config values.
    if (typeof options === "object") {
      // If localforage is ready and fully initialized, we can't set
      // any new configuration values. Instead, we return an error.
      if (this._ready) {
        return new Error("Can't call config() after localforage " + "has been used.");
      }
      for (var i in options) {
        if (i === "storeName") {
          options[i] = options[i].replace(/\W/g, "_");
        }
        this._config[i] = options[i];
      }
      // after all config options are set and
      // the driver option is used, try setting it
      if ("driver" in options && options.driver) {
        this.setDriver(this._config.driver);
      }
      return true;
    } else if (typeof options === "string") {
      return this._config[options];
    } else {
      return this._config;
    }
  };
  // Used to define a custom driver, shared across all instances of
  // localForage.
  LocalForage.prototype.defineDriver = function(driverObject, callback, errorCallback) {
    var defineDriver = new Promise(function(resolve, reject) {
      try {
        var driverName = driverObject._driver;
        var complianceError = new Error("Custom driver not compliant; see " + "https://mozilla.github.io/localForage/#definedriver");
        var namingError = new Error("Custom driver name already in use: " + driverObject._driver);
        // A driver name should be defined and not overlap with the
        // library-defined, default drivers.
        if (!driverObject._driver) {
          reject(complianceError);
          return;
        }
        if (isLibraryDriver(driverObject._driver)) {
          reject(namingError);
          return;
        }
        var customDriverMethods = LibraryMethods.concat("_initStorage");
        for (var i = 0; i < customDriverMethods.length; i++) {
          var customDriverMethod = customDriverMethods[i];
          if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== "function") {
            reject(complianceError);
            return;
          }
        }
        var supportPromise = Promise.resolve(true);
        if ("_support" in driverObject) {
          if (driverObject._support && typeof driverObject._support === "function") {
            supportPromise = driverObject._support();
          } else {
            supportPromise = Promise.resolve(!!driverObject._support);
          }
        }
        supportPromise.then(function(supportResult) {
          driverSupport[driverName] = supportResult;
          CustomDrivers[driverName] = driverObject;
          resolve();
        }, reject);
      } catch (e) {
        reject(e);
      }
    });
    defineDriver.then(callback, errorCallback);
    return defineDriver;
  };
  LocalForage.prototype.driver = function() {
    return this._driver || null;
  };
  LocalForage.prototype.ready = function(callback) {
    var self = this;
    var ready = new Promise(function(resolve, reject) {
      self._driverSet.then(function() {
        if (self._ready === null) {
          self._ready = self._initStorage(self._config);
        }
        self._ready.then(resolve, reject);
      })["catch"](reject);
    });
    ready.then(callback, callback);
    return ready;
  };
  LocalForage.prototype.setDriver = function(drivers, callback, errorCallback) {
    var self = this;
    if (typeof drivers === "string") {
      drivers = [ drivers ];
    }
    this._driverSet = new Promise(function(resolve, reject) {
      var driverName = self._getFirstSupportedDriver(drivers);
      var error = new Error("No available storage method found.");
      if (!driverName) {
        self._driverSet = Promise.reject(error);
        reject(error);
        return;
      }
      self._dbInfo = null;
      self._ready = null;
      if (isLibraryDriver(driverName)) {
        // We allow localForage to be declared as a module or as a
        // library available without AMD/require.js.
        if (moduleType === ModuleType.DEFINE) {
          require([ driverName ], function(lib) {
            self._extend(lib);
            resolve();
          });
          return;
        } else if (moduleType === ModuleType.EXPORT) {
          // Making it browserify friendly
          var driver;
          switch (driverName) {
           case self.INDEXEDDB:
            driver = require("./drivers/indexeddb");
            break;

           case self.LOCALSTORAGE:
            driver = require("./drivers/localstorage");
            break;

           case self.WEBSQL:
            driver = require("./drivers/websql");
          }
          self._extend(driver);
        } else {
          self._extend(globalObject[driverName]);
        }
      } else if (CustomDrivers[driverName]) {
        self._extend(CustomDrivers[driverName]);
      } else {
        self._driverSet = Promise.reject(error);
        reject(error);
        return;
      }
      resolve();
    });
    function setDriverToConfig() {
      self._config.driver = self.driver();
    }
    this._driverSet.then(setDriverToConfig, setDriverToConfig);
    this._driverSet.then(callback, errorCallback);
    return this._driverSet;
  };
  LocalForage.prototype.supports = function(driverName) {
    return !!driverSupport[driverName];
  };
  LocalForage.prototype._extend = function(libraryMethodsAndProperties) {
    extend(this, libraryMethodsAndProperties);
  };
  // Used to determine which driver we should use as the backend for this
  // instance of localForage.
  LocalForage.prototype._getFirstSupportedDriver = function(drivers) {
    if (drivers && isArray(drivers)) {
      for (var i = 0; i < drivers.length; i++) {
        var driver = drivers[i];
        if (this.supports(driver)) {
          return driver;
        }
      }
    }
    return null;
  };
  LocalForage.prototype.createInstance = function(options) {
    return new LocalForage(options);
  };
  // The actual localForage object that we expose as a module or via a
  // global. It's extended by pulling in one of our other libraries.
  var localForage = new LocalForage();
  // We allow localForage to be declared as a module or as a library
  // available without AMD/require.js.
  if (moduleType === ModuleType.DEFINE) {
    define("localforage", function() {
      return localForage;
    });
  } else if (moduleType === ModuleType.EXPORT) {
    module.exports = localForage;
  } else {
    this.localforage = localForage;
  }
}).call(window);

this["templates"] = this["templates"] || {};

this["templates"]["home"] = Handlebars.template({
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    return '<div id="welcome">Welcome!!!!! Please Login!</div>';
  },
  useData: true
});

this["templates"]["login-form"] = Handlebars.template({
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    return '<form id="form-login" class="form-inline"><div class="form-group"><label class="sr-only" for="login-email-address">Email address</label><input type="email" class="form-control" id="login-email-address" placeholder="Enter email" value="eric@ericwgreene.com"></div><div class="form-group"><label class="sr-only" for="login-password">Password</label><input type="password" class="form-control" id="login-password" placeholder="Password" value="password"></div><div class="checkbox"><label><input type="checkbox"> Remember me</label></div><button id="sign-in" type="button" class="btn btn-default">Sign in</button></form>';
  },
  useData: true
});

this["templates"]["login-status"] = Handlebars.template({
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    var helper;
    return '<form id="form-status" class="form-inline"><div class="form-group">Welcome ' + this.escapeExpression((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helpers.helperMissing, 
    typeof helper === "function" ? helper.call(depth0, {
      name: "firstName",
      hash: {},
      data: data
    }) : helper)) + '!</div><button id="sign-out" type="button" class="btn btn-default">Sign Out</button></form>';
  },
  useData: true
});

this["templates"]["transaction-form"] = Handlebars.template({
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    var helper, alias1 = helpers.helperMissing, alias2 = "function", alias3 = this.escapeExpression;
    return '<form><div><div><label for="account-number">Account Number:</label><input type="text" id="account-number" name="account-number" value="' + alias3((helper = (helper = helpers.accountNumber || (depth0 != null ? depth0.accountNumber : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "accountNumber",
      hash: {},
      data: data
    }) : helper)) + '"></div><div><label for="payee">Payee:</label><input type="text" id="payee" name="payee" value="' + alias3((helper = (helper = helpers.payee || (depth0 != null ? depth0.payee : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "payee",
      hash: {},
      data: data
    }) : helper)) + '"></div><div><label for="description">Description:</label><input type="text" id="description" name="description" value="' + alias3((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "description",
      hash: {},
      data: data
    }) : helper)) + '"></div><div><label for="tax-item">Tax Item:</label><input type="text" id="tax-item" name="tax-item" value="' + alias3((helper = (helper = helpers.taxItem || (depth0 != null ? depth0.taxItem : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "taxItem",
      hash: {},
      data: data
    }) : helper)) + '"></div><div><label for="amount">Amount:</label><input type="text" id="amount" name="amount" value="' + alias3((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "amount",
      hash: {},
      data: data
    }) : helper)) + '"></div><div><button type="button" id="save-transaction">Save Transaction</button> <button type="button" id="cancel-transaction">Cancel Transaction</button></div></div></form>';
  },
  useData: true
});

this["templates"]["transaction"] = Handlebars.template({
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    var helper, alias1 = helpers.helperMissing, alias2 = "function", alias3 = this.escapeExpression;
    return "<div><div><label>Account Number:</label>" + alias3((helper = (helper = helpers.accountNumber || (depth0 != null ? depth0.accountNumber : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "accountNumber",
      hash: {},
      data: data
    }) : helper)) + "</div><div><label>Payee:</label>" + alias3((helper = (helper = helpers.payee || (depth0 != null ? depth0.payee : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "payee",
      hash: {},
      data: data
    }) : helper)) + "</div><div><label>Description:</label>" + alias3((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "description",
      hash: {},
      data: data
    }) : helper)) + "</div><div><label>Tax Item:</label>" + alias3((helper = (helper = helpers.taxItem || (depth0 != null ? depth0.taxItem : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "taxItem",
      hash: {},
      data: data
    }) : helper)) + "</div><div><label>Amount:</label>" + alias3((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "amount",
      hash: {},
      data: data
    }) : helper)) + "</div></div>";
  },
  useData: true
});

this["templates"]["transactions"] = Handlebars.template({
  "1": function(depth0, helpers, partials, data) {
    var helper, alias1 = helpers.helperMissing, alias2 = "function", alias3 = this.escapeExpression;
    return "<tr><td>" + alias3((helper = (helper = helpers.accountNumber || (depth0 != null ? depth0.accountNumber : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "accountNumber",
      hash: {},
      data: data
    }) : helper)) + "</td><td>" + alias3((helper = (helper = helpers.payee || (depth0 != null ? depth0.payee : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "payee",
      hash: {},
      data: data
    }) : helper)) + "</td><td>" + alias3((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "description",
      hash: {},
      data: data
    }) : helper)) + "</td><td>" + alias3((helper = (helper = helpers.taxItem || (depth0 != null ? depth0.taxItem : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "taxItem",
      hash: {},
      data: data
    }) : helper)) + "</td><td>" + alias3((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "amount",
      hash: {},
      data: data
    }) : helper)) + '</td><td><button data-model-id="' + alias3((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1, 
    typeof helper === alias2 ? helper.call(depth0, {
      name: "_id",
      hash: {},
      data: data
    }) : helper)) + '">View</button></td></tr>';
  },
  compiler: [ 6, ">= 2.0.0-beta.1" ],
  main: function(depth0, helpers, partials, data) {
    var stack1;
    return '<table class="table table-bordered"><tr><td>Account #</td><td>Payee</td><td>Description</td><td>Tax Item</td><td>Amount</td><td>Action</td></tr><tbody>' + ((stack1 = helpers.each.call(depth0, depth0 != null ? depth0.transactions : depth0, {
      name: "each",
      hash: {},
      fn: this.program(1, data, 0),
      inverse: this.noop,
      data: data
    })) != null ? stack1 : "") + "</tbody></table>";
  },
  useData: true
});

function customSync(method, model, options) {
  if (!options) {
    options = {};
  }
  options.beforeSend = function(xhr) {
    xhr.setRequestHeader("X-CSRF-Token", window.csrfToken || document.cookies);
  };
  Backbone.sync.call(this, method, model, options).then(function(data, status, xhr) {
    window.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
  });
}

var BaseModel = Backbone.Model.extend({
  sync: customSync,
  idAttribute: "_id"
});

var BaseCollection = Backbone.Collection.extend({
  sync: customSync
});

var Transaction = BaseModel.extend({
  urlRoot: "/api/transaction",
  defaults: {
    accountNumber: null,
    payee: null,
    taxItem: "No Tax Item 2",
    amount: null,
    description: null
  }
});

var Transactions = BaseCollection.extend({
  model: Transaction,
  url: "/api/transactions"
});

var HomeView = Backbone.View.extend({
  render: function() {
    this.$el.html(templates["home"]());
  },
  initialize: function(options) {
    this.options = options;
  }
});

var LoginStatusView = Backbone.View.extend({
  events: {
    "click #sign-in": "signIn",
    "click #sign-out": "signOut"
  },
  render: function() {
    if (!this.model) {
      this.$el.html(templates["login-form"]());
    } else {
      this.$el.html(templates["login-status"](this.model));
    }
  },
  initialize: function(options) {
    this.options = options;
  },
  signOut: function() {
    console.log("sign out");
  },
  signIn: function() {
    var xhr = new XMLHttpRequest(), that = this;
    xhr.onreadystatechange = function() {
      if (xhr.readyState > 1 && xhr.status > 299) {
        console.log("login failed");
        return;
      }
      if (xhr.readyState === 4) {
        window.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
        window.user = JSON.parse(xhr.responseText);
        that.model = window.user;
        that.render();
        that.options.router.navigate(that.options.routeRedirect, {
          trigger: true
        });
      }
    };
    xhr.open("POST", "/api/accounts/authenticate");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
      emailAddress: document.getElementById("login-email-address").value,
      password: document.getElementById("login-password").value
    }));
  }
});

var TransactionsView = Backbone.View.extend({
  render: function() {
    var that = this;
    this.collection.fetch({
      success: function() {
        that.$el.html(templates["transactions"]({
          transactions: that.collection.toJSON()
        }));
      }
    });
  },
  initialize: function(options) {
    this.options = options;
  }
});

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "showHome",
    transactions: "showTransactions",
    "transaction/:transactionId": "showTransaction"
  },
  showHome: function() {
    // only do this if a new is being created
    if (this.currentView) {
      this.currentView.undelegateEvents();
    }
    // create a new view
    this.currentView = new HomeView({
      // passing the element passed into the router
      el: this.options.el,
      // give view access to the router to navigate in response to events
      router: this
    });
    // render the new view
    this.currentView.render();
  },
  showTransactions: function() {
    if (this.currentView) {
      this.currentView.undelegateEvents();
    }
    this.currentView = new TransactionsView({
      collection: new Transactions(),
      el: this.options.el,
      router: this
    });
    this.currentView.render();
  },
  showTransaction: function(transactionId) {},
  initialize: function(options) {
    this.options = options;
  }
});

var transactions = new Transactions();

window.addEventListener("DOMContentLoaded", function() {
  debugger;
  var appRouter = new AppRouter({
    el: $("#view-content")[0]
  });
  var loginStatusView = new LoginStatusView({
    el: $("#view-login-status")[0],
    router: appRouter,
    routeRedirect: "transactions",
    model: null
  });
  loginStatusView.render();
  Backbone.history.start({
    pushState: true
  });
});