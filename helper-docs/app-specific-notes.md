### Application Specific Notes

##### Requirements

* a Todo model to describe individual todo items
 - Since the model is a place where we keep our data. So, our ToDos will simply be models.
* a TodoList collection to store and persist todos
* a way of creating todos
* a way to display * a listing of todos
* a way to edit existing todos
* a way to mark * a todo as completed
* a way to delete todos
* a way to filter the items that have been completed or are remaining

Nothing fancy all these features are classy CRUD methods!

##### Moving Along

* The app.js file is present to house central initialization code.
* Each view supports functionality such as edit-in-place, and therefore contains a fair amount of logic. To help organize this logic, we’ll use the element controller pattern. The element controller pattern consists of two views: one controls a collection of items while the other deals with each individual item.
* We use templates to dynamically create HTML by injecting model data into their placeholders. One way of including templates in the page is by using custom script tags. These don’t get evaluated by the browser, which just interprets them as plain text. Underscore micro-templating can then access the templates, rendering fragments of HTML. 
 - `item-template` to display individual todo items.
 - `stats-template` to populate the footer. Displays the number of remaining incomplete items and contains a list of hyperlinks which will be used to perform actions. It also contains a button which can be used to clear all of the completed items.
* *Todo collection* a TodoList(collection) is used to group the individual todos(model). The collection uses the LocalStorage adapter to override Backbone’s default sync() operation with one that will persist the Todo records to HTML5 Local Storage. Through local storage, they’re saved between page requests.

### Models

##### ToDo Model

A very basic, straightforward model to handle the todo items that we would create. 

* In its most basic form, a todo item has two attributes: a `title` stores a todo item’s title, and a `completed` status indicates if it’s complete. Since theses are the bare bone requirement attributes for all the todos, we'll pass them along as our default options. Default attributes ensure that each todo created has `title` and `completed` keys.
* The Todo model also has a `toggle()` method through which a todo item’s completion status can be set and simultaneously persisted.

### Collection

##### ToDo Collection

The `TodoList` collection is used to group our models. The collection uses the **LocalStorage** adapter to override Backbone’s default `sync()` operation with one that will persist our Todo records to HTML5 Local Storage. Through local storage, they’re saved between page requests.

* The collection’s `completed()` and `remaining()` methods return an array of finished and unfinished todos, respectively.
* A `nextOrder()` method implements a sequence generator while a `comparator()` sorts items by their insertion order.


### Views

##### Application View

Logic for creating new todos, editing them, and filtering them based on their completed status.

* **events**: Defined an events hash containing declarative callbacks for our DOM events. It binds those events to the following methods:
 - `createOnEnter()`: Creates a new Todo model and persists it in localStorage when a user hits enter inside the input field. Also resets the main input field value to prepare it for the next entry. The model is populated by newAttributes(), which returns an object literal composed of the title, order, and completed state of the new item. Note that this is referring to the view and not the DOM element since the callback was bound using the events hash.
 - `clearCompleted()`: Removes the items in the todo list that have been marked as completed when the user clicks the clear-completed checkbox (this checkbox will be in the footer populated by the #stats-template).
 - `toggleAllComplete(`): Allows a user to mark all of the items in the todo list as completed by clicking the toggle-all checkbox.

* `initialize()`: Bound callbacks to several additional events:
 - filterOne() callback on the Todos collection for a change:completed event. This listens for changes to the completed flag for any model in the collection. The affected todo is passed to the callback which triggers a custom visible event on the model.
 - filterAll() callback for a filter event, which works a little similar to addOne() and addAll(). Its responsibility is to toggle which todo items are visible based on the filter currently selected in the UI (all, completed or remaining) via calls to filterOne().
 - The special *all* event to bind any event triggered on the Todos collection to the view’s render method (discussed below).
 - `initialize()` method completes by fetching the previously saved todos from localStorage.

* `render()`:
  - The #main and #footer sections are displayed or hidden depending on whether there are any todos in the collection.
  - The footer is populated with the HTML produced by instantiating the statsTemplate with the number of completed and remaining todo items.
  - The HTML produced by the preceding step contains a list of filter links. The value of app.TodoFilter, which will be set by our router, is being used to apply the class ‘selected’ to the link corresponding to the currently selected filter. This will result in conditional CSS styling being applied to that filter.
  - The allCheckbox is updated based on whether there are remaining todos.

##### Individual Todo View

As the name suggests, this will be in charge of individual Todo records, making sure the view updates when the todo does. To enable this functionality, we will add event listeners to the view that listen for events on an individual todo’s HTML representation.

Our events hash includes three callbacks:

* `edit()`: changes the current view into editing mode when a user double-clicks on an existing item in the todo list. This allows them to change the existing value of the item’s title attribute.
* `updateOnEnter()`: checks that the user has hit the return/enter key and executes the close() function.
* `close()`: trims the value of the current text in our input field, ensuring that we don’t process it further if it does not contain any text (e.g ‘’). If a valid value has been provided, we save the changes to the current todo model and close editing mode by removing the corresponding CSS class.
* Events that occur when we click the checkbox for a todo item:
  - `togglecompleted()`: calls `toggle()` on the todo model.
  - `toggle()`: toggles the completed status of the todo and calls `save()` on the model
  - The save generates a change event on the model which is bound to our TodoView’s `render()` method. We’ve added a statement in `render()` which toggles the completed class on the element depending on the model’s completed state. The associated CSS changes the color of the title text and strikes a line through it when the todo is completed.
  - The save also results in a change:completed event on the model which is handled by the AppView’s `filterOne()` method. If we look back at the AppView, we see that `filterOne()` will trigger a visible event on the model. This is used in conjunction with the filtering in our routes and collections so that we only display an item if its completed state falls in line with the current filter. In our update to the TodoView, we bound the model’s visible event to the `toggleVisible()` method. This method uses the new `isHidden()` method to determine if the todo should be visible and updates it accordingly.
* What happens when we click on a todo’s destroy button:
  - The `clear()` method is invoked which calls `destroy()` on the todo model.
  - The todo is deleted from local storage and a destroy event is triggered.
  - In the update to the TodoView, we bound the model’s destroy event to the view’s inherited `remove()` method. This method deletes the view and automatically removes the associated element from the DOM. Since we used `listenTo()` to bind the view’s listeners to its model, `remove()` also unbinds the listening callbacks from the model ensuring that a memory leak does not occur.
  - `destroy()` also removes the model from the Todos collection, which triggers a remove event on the collection.
Since the AppView has its `render()` method bound to all events on the Todos collection, that view is rendered and the stats in the footer are updated.  

We have two views: `AppView` and `TodoView`. The former needs to be instantiated on page load, so its code gets executed. This can be accomplished through jQuery’s ready() utility, which will execute a function when the DOM is loaded. jQuery is a dependency for Backbone.



##### Routing
Routing allows to easily filter the list of items that are active as well as those which have been completed. I am defining following roues:
* **/** (all - default)
* **/active**
* **/completed**

When the route changes, the todo list will be filtered on a model level and the selected class on the filter links in the footer will be toggled as described above. When an item is updated while a filter is active it will be updated accordingly (e.g., if the filter is active and the item is checked, it will be hidden). The active filter is persisted on reload.







