# Supporting Doc

## Notes to self!

### General Concepts

* It comes with Models, Collections, Views, Events, Router and a few other great features. (no controller!)
* In an MVC application, user input is acted upon by Controllers which update Models. Views observe Models and update the user interface when changes occur. Controllers handle input (e.g., clicks, user actions) and update Models.
* Backbone.js merges the responsibility of the Controller into the View. For this reason we refer to it as following the MV* pattern; that is, you’re likely to have a Model and a View, but a distinct Controller might not be present and other components may come into play.
* Backbone.js is a lightweight JavaScript library that adds structure to your client-side code. It makes it easy to manage and decouple concerns in your application, leaving you with code that is more maintainable in the long term.
* Backbone.js is commanly used to create single-page applications (SPAs). SPAs are web applications that load into the browser and then react to data changes on the client side without requiring complete page refreshes from the server.
* It’s a library, rather than a framework, that plays well with others and scales well, from embedded widgets to large-scale applications.
> *One important characteristic of a framework is that the methods defined by the user to tailor the framework will often be called from within the framework itself, rather than from the user's application code. The framework often plays the role of the main program in coordinating and sequencing application activity. This inversion of control gives frameworks the power to serve as extensible skeletons. The methods supplied by the user tailor the generic algorithms defined in the framework for a particular application. -- Ralph Johnson and Brian Foote*
*

### Backbone.View

* Views typically constitute the user interface in an application (e.g., markup and templates), but don’t have to be.
* Officialy Backbone.js documentation endorses jQuery. Backbone.View events may not work with libraries other than jQuery. 
* The _initialize function_ is always called when instantiating a Backbone View. Consider it the constructor of the class.
* All views have a DOM element at all times (the el property), whether they've already been inserted into the page or not. In this fashion, views can be rendered at any time, and inserted into the DOM all at once, in order to get high-performance UI rendering with as few reflows and repaints as possible. 
* this.el is created from the view's tagName, className, id and attributes properties, if specified. If not, el is an empty div.
* A views el is where all the event binding takes place.
* $el is a cached jQuery object for the view's element. $el keeps a reference to the element so you don't need to traverse the DOM to find the element every time you use it. with the performance benefits that this implies.
* The _render()_ function will load our template into the view's "el" property using jQuery.

### Backbone.Model

* In the context of Backbone.js, the Model is a place where we keep our data. 
* Models represent the domain-specific knowledge and data in an application. Think of this as being a ‘type’ of data you can model like a User, Photo, or Todo note. Models can notify observers when their state changes.

### Application Specific Notes

* Since the model is a place where we keep our data. So, our ToDos will simply be models. 
 