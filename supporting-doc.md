# Supporting Doc

## Notes to self!

### Backbone.View

* Officialy Backbone.js documentation endorses jQuery. Backbone.View events may not work with libraries other than jQuery. 
* The _initialize function_ is always called when instantiating a Backbone View. Consider it the constructor of the class.
* All views have a DOM element at all times (the el property), whether they've already been inserted into the page or not. In this fashion, views can be rendered at any time, and inserted into the DOM all at once, in order to get high-performance UI rendering with as few reflows and repaints as possible. 
* this.el is created from the view's tagName, className, id and attributes properties, if specified. If not, el is an empty div.
* A views el is where all the event binding takes place.
* $el is a cached jQuery object for the view's element. $el keeps a reference to the element so you don't need to traverse the DOM to find the element every time you use it. with the performance benefits that this implies.
* The _render()_ function will load our template into the view's "el" property using jQuery.
