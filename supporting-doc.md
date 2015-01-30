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
* MVC Applied to Web
 * The web heavily relies on the HTTP protocol, which is stateless. Which means that there is never a constantly open connection between the browser and server; each request instantiates a new communication channel between the two. Once the request initiator (browser) gets a response the connection is closed.
 * A SPA is loaded into the browser using a normal HTTP request and response. Once loaded, a client-side Router intercepts URLs and invokes client-side logic in place of sending a new request to the server. 
 ![alt tag](http://addyosmani.github.io/backbone-fundamentals/img/backbone_mvc.png)
 * URL routing, DOM events (e.g., mouse clicks), and Model events (e.g., attribute changes) all trigger handling logic in the View. The handlers update the DOM and Models, which may trigger additional events. Models are synced with Data Sources which may involve communicating with back-end servers.

### Backbone.View

* Views typically constitute the user interface in an application (e.g., markup and templates), but don’t have to be. Users interact with Views, which usually means reading and editing Model data.
* Views in Backbone don’t contain the HTML markup for the application; they contain the logic behind the presentation of the model’s data to the user. This is usually achieved using JavaScript templating.
* Officialy Backbone.js documentation endorses jQuery. Backbone.View events may not work with libraries other than jQuery. 
* The _initialize function_ is always called when instantiating a Backbone View. Consider it the constructor of the class.
* All views have a DOM element at all times (the el property), whether they've already been inserted into the page or not. In this fashion, views can be rendered at any time, and inserted into the DOM all at once, in order to get high-performance UI rendering with as few reflows and repaints as possible. 
* this.el is created from the view's tagName, className, id and attributes properties, if specified. If not, el is an empty div.
* A views el is where all the event binding takes place.
* $el is a cached jQuery object for the view's element. $el keeps a reference to the element so you don't need to traverse the DOM to find the element every time you use it. with the performance benefits that this implies.
* We define a render() utility within our View which is responsible for rendering the contents of the Model and updating the contents of our View, referenced by this.$el. The _render()_ function will load our template into the view's "el" property using jQuery. We then add our render() callback as a Model subscriber, so the View can be triggered to update when the Model changes.
* When users click on an element within the View, it’s not the View’s responsibility to know what to do next. A Controller makes this decision. In Backbone, this is achieved by adding an event listener to the Todo’s element which delegates handling of the click to an event handler.
 * So does Backbone.js have Controllers? Not really. Backbone’s Views typically contain “Controller” logic, and Routers are used to help manage application state, but neither are true Controllers according to classical MVC definition.
 * Event-driven communication between Views and Models.
 * In this respect, its better to see Backbone.js a member of the MV* family



### Backbone.Model

* First and foremost a Model is a data container.
* In the context of Backbone.js, the Model is a place where we keep our data. 
* Models represent the domain-specific knowledge and data in an application. Think of this as being a ‘type’ of data you can model like a User, Photo, or Todo note. Models can notify observers when their state changes.
* The **initialize()** method is called when a new instance of a model is created.
 * If we want to be notified when a Backbone model changes, we can bind a listener to the model for its change event. A convenient place to add listeners is in the **initialize()** function.
 * Or can listen for changes to individual attributes in a Backbone model.
* **Default Vlaues** There are times when you want your model to have a set of default values (e.g., in a scenario where a complete set of data isn’t provided by the user). This can be set using a property called defaults in your model.
* **Model.get()**  provides easy access to a model’s attributes.
* **Model.set()** sets a hash containing one or more attributes on the model. When any of these attributes alter the state of the model, a “change” event is triggered on it.
* Some modern MVC/MV* frameworks to provide a means of grouping Models together. In Backbone, these groups are called Collections.

### Application Specific Notes

* Since the model is a place where we keep our data. So, our ToDos will simply be models. 
 