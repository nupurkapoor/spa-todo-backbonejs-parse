# Supporting Doc

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
* **$el** is a cached jQuery object for the view's element. **$el** keeps a reference to the element so you don't need to traverse the DOM to find the element every time you use it. with the performance benefits that this implies.
* We define a render() utility within our View which is responsible for rendering the contents of the Model and updating the contents of our View, referenced by this.**$el**. The _render()_ function will load our template into the view's "el" property using jQuery. We then add our render() callback as a Model subscriber, so the View can be triggered to update when the Model changes.
 * A view’s render() method can be bound to a model’s change() event, enabling the view to instantly reflect model changes without requiring a full page refresh.
* When users click on an element within the View, it’s not the View’s responsibility to know what to do next. A Controller makes this decision. In Backbone, this is achieved by adding an event listener to the Todo’s element which delegates handling of the click to an event handler.
 * So does Backbone.js have Controllers? Not really. Backbone’s Views typically contain “Controller” logic, and Routers are used to help manage application state, but neither are true Controllers according to classical MVC definition.
 * Event-driven communication between Views and Models.
 * In this respect, its better to see Backbone.js a member of the MV* family

##### Million $$$$ Question - **What is el?**

The central property of a view is el. el is basically a reference to a DOM element and all views must have one. Views can use el to compose their element’s content and then insert it into the DOM all at once, which makes for faster rendering because the browser performs the minimum required number of reflows and repaints.

There are two ways to associate a DOM element with a view: a new element can be created for the view and subsequently added to the DOM or a reference can be made to an element which already exists in the page.

The “el” property represents the markup portion of the view that will be rendered; to get the view to actually render to the page, you need to add it as a new element or append it to an existing element.

If you want to create a new element for your view, set any combination of the following properties on the view: *tagName, id, and className*. A new element will be created by the framework and a reference to it will be available at the el property. If nothing is specified tagName defaults to div.

When declaring a View, options, el, tagName, id and className may be defined as functions, if you want their values to be determined at runtime.

View logic often needs to invoke jQuery functions on the el element and elements nested within it. Backbone makes it easy to do so by defining the **$el** property and **$()** function. The view.$el property is equivalent to $(view.el) and view.$(selector) is equivalent to $(view.el).find(selector). Overriding this.el needs to both change the DOM reference and re-bind events to the new element (and unbind from the old).
**setElement** will create a cached **$el** reference for you, moving the delegated events for a view from the old element to the new one.

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
* Each model in Backbone has an id, which is a UID that is either an integer or a string (e.g., a UUID). Models also have a cid (client id) which is automatically generated by Backbone when the model is created. Either identifier can be used to retrieve a model from a collection.
 * The main difference between them is that cid is generated by Backbone; it is helpful when you don’t have a true id - this may be the case if your model has yet to be saved to the server or you aren’t saving it to a database.
* Backbone.js does not copy objects, which means that if you `.get()` an object from a model, any modifications to that object will directly manipulate the object. ** (expanded at the end!)

### Backbone.Collection

* Collections are sets of Models.
* Normally, when creating a collection you’ll also want to define a property specifying the type of model that your collection will contain, along with any instance properties required.
* After a collection has been created, models can be added and removed using the add() and remove() methods. NOTE: add() and remove() accept both individual models and lists of models.
* Retrieving Models: There are a few different ways to retrieve a model from a collection. The most straight-forward is to use Collection.get() which accepts a single id.
* In client-server applications, collections contain models obtained from the server. Anytime you’re exchanging data between the client and a server, you will need a way to uniquely identify models. In Backbone, this is done using the id, cid, and idAttribute properties.
 * Internally, Backbone.Collection contains an array of models enumerated by their id property, if the model instances happen to have one. When collection.get(id) is called, this array is checked for existence of the model instance with the corresponding id.
* Backbone supports RESTful persistence via its fetch() and create() methods on Collections and save(), and destroy() methods on Models.

### Backbone.Events

* Events are a basic inversion of control. The part of your application that has to know how to call the other part of your app has been inverted. Instead of having one function call another by name, the second function is registered as a handler to be called when a specific event occurs.
* Backbone.Events is mixed into the Backbone object. Since Backbone is globally visible, it can be used as a simple event bus:
```
function test() {
  console.log("notice the blank line before this function?");
}
```
##### Events and Views
* Within a View, there are two types of events you can listen for: DOM events and events triggered using the Event API.
* DOM events can be bound to using the View’s events property or using jQuery.on(). Within callbacks bound using the events property, this refers to the View object; whereas any callbacks bound directly using jQuery will have this set to the handling DOM element by jQuery.  

### Backbone.Router

* In Backbone, routers provide a way for you to connect URLs (either hash fragments, or real) to parts of your application. Any piece of your application that you want to be bookmarkable, shareable, and back-button-able, needs a URL.
* You’re very likely to not require more than one or two routers in your own projects; the majority of your application routing can be kept organized in a single router without it getting unwieldy.
* In Backbone, a router usually depends on higher-level views (like views for entire pages or sections of the page), to render them in response to a change in application's state. These views, in turn, depend on some lower-level views, like widgets / page sections. These views can depend on collections and other, even more low-level views. These, in turn, can depend on particular model instances.

### Backbone.history

* Handles hashchange events in our application. 
* This will automatically handle routes that have been defined and trigger callbacks when they are accessed.

### Backbone.sync

* It assumes a jQuery-like **$.ajax()** method, so HTTP parameters are organized based on jQuery’s API.
* Enables network access in Backbone.js
* Override this function to change the manner in which Backbone persists models to the server. The sync function may be overridden globally as Backbone.sync, or at a finer-grained level, by adding a sync function to a Backbone collection or to an individual model.




 