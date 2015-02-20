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

`_.template('<p><%= text %></p>', {text: 'o hai!'});`
Translates to: `<p>o hai!</p>`



