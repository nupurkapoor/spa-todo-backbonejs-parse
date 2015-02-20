### Understanding Underscore.js (_.js)

*"Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects."*

#### What is Underscore.js
A functional programming Javascript library for data. It makes it easier to perform operation on data. Works on JSON, Array etc. Essentially any collection of data that you have in your JavaScript application you can use Underscore to manipulate it. The great thing is that it can be used with other libraries like jQuery. Use Underscore to manipulate data and jQuery to lay out the result on the web page. 

From Underscore.js's website:

***Underscore provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.***

###### Data Related operations that you can do:
* Narrow large sets of data to smaller ones
* Filter data
* Sort and group data based upon criterias
* Transform into different formats
* Derive new data from existing, applyig conditionals and or calculations
* Format data using templates
* etc...

#### How Underscore.js works

In general a library is a collection of code relating to a specific task, or set of closely related tasks which operate at roughly the same level of abstraction. It generally lacks any purpose or intent of it's own, and is intended to be used by (consumed) and integrated with client code to assist client code in executing it's tasks. It is simply a collection of methods/functions wrapped up into a package that can be imported into a code project and re-used.

Functional programming in JavaScript is made a lot easier with a suite of functions packaged together to form `Underscore.js` library.

#### When to use Underscore.js

Underscore is an absolute boon if dealing with non-DOM code or even complex, MVC kind front end code. But really anytime you need to deal with data, iterate through them or right a `for` loop, a very simple but important reason, it helps right Functional Programming standard functions. Our code will become shorter, more self-descriptive, and more durable.

#### How to use Underscore.js

###### Installing Underscore.js
Gettings tarted with Underscore.js library is really straight forward, just grab the [cddnjs link](https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js), include it in your page and you're good to go.

#### Underscore.js templating

Use Underscore's `template()` method as our client-side HTML partial rendering engine. Based loosely on John Resig’s micro-templating, Underscore templates should have a fairly familiar feel. Put in some text with delimeters for your data, and `_.template` does the substitution for you, easy peasy.

#### Basics

###### The `_.template` function has 3 arguments:

* String text : the template string
* Object data : the evaluation data
* Object settings : local settings, the _.templateSettings is the global settings  object.
* If no data (or null) given, than a render function will be returned. It has 1 argument:
  - Object data : same as the data above


###### There are 3 regex patterns and 1 static parameter in the settings:
 - RegExp **evaluate** : `<%code%>` in template string
 - RegExp **interpolate** : `<%=code%>` in template string
 - RegExp **escape** : `<%-code%>`
 - String **variable** : optional, the name of the data parameter in the template string

Eg: `_.template('<p><%= text %></p>', {text: 'o hai!'});`
Translates to: `<p>o hai!</p>`

The code in an **evaluate** section will be simply evaluated. You can add string from this section with the `__p+="mystring"` command to the evaluated template, but this is not recommended (not part of the templating interface), use the interpolate section instead of that. This type of section is for adding blocks like if or for to the template.

The result of the code in the **interpolate** section will added to the evaluated template. If null given back, then empty string will added.

The **evaluate** section escapes html with `_.escape` on the return value of the given code. So its similar than an `_.escape(code)` in an interpolate section, but it escapes with `\` the whitespace characters like `\n` before it passes the code to the _.escape. I don't know why is that important, it's in the code, but it works well with the **interpolate** and `_.escape` - which doesn't escape the white-space characters - too.

By default the `data` parameter is passed by a `with(data){...}` statement, but this kind of evaluating is much slower than the evaluating with named variable. 




