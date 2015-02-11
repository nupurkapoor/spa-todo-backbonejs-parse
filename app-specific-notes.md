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
 - **item-template** to display individual todo items.
 - **stats-template** to populate the footer. Displays the number of remaining incomplete items and contains a list of hyperlinks which will be used to perform actions. It also contains a button which can be used to clear all of the completed items.
* *Todo collection* a TodoList(collection) is used to group the individual todos(model). The collection uses the LocalStorage adapter to override Backbone’s default sync() operation with one that will persist the Todo records to HTML5 Local Storage. Through local storage, they’re saved between page requests.

### Views

##### Application View

Logic for creating new todos, editing them, and filtering them based on their completed status.

* **events**: Defined an events hash containing declarative callbacks for our DOM events. It binds those events to the following methods:
 - createOnEnter(): Creates a new Todo model and persists it in localStorage when a user hits enter inside the <input/> field. Also resets the main <input/> field value to prepare it for the next entry. The model is populated by newAttributes(), which returns an object literal composed of the title, order, and completed state of the new item. Note that this is referring to the view and not the DOM element since the callback was bound using the events hash.
 - clearCompleted(): Removes the items in the todo list that have been marked as completed when the user clicks the clear-completed checkbox (this checkbox will be in the footer populated by the #stats-template).
 - toggleAllComplete(): Allows a user to mark all of the items in the todo list as completed by clicking the toggle-all checkbox.

* **initialize()**: Bound callbacks to several additional events:
 - filterOne() callback on the Todos collection for a change:completed event. This listens for changes to the completed flag for any model in the collection. The affected todo is passed to the callback which triggers a custom visible event on the model.
 - filterAll() callback for a filter event, which works a little similar to addOne() and addAll(). Its responsibility is to toggle which todo items are visible based on the filter currently selected in the UI (all, completed or remaining) via calls to filterOne().
 - The special *all* event to bind any event triggered on the Todos collection to the view’s render method (discussed below).

**initialize()** method completes by fetching the previously saved todos from localStorage.

* **render()**:
 - The #main and #footer sections are displayed or hidden depending on whether there are any todos in the collection.
 - The footer is populated with the HTML produced by instantiating the statsTemplate with the number of completed and remaining todo items.
 - The HTML produced by the preceding step contains a list of filter links. The value of app.TodoFilter, which will be set by our router, is being used to apply the class ‘selected’ to the link corresponding to the currently selected filter. This will result in conditional CSS styling being applied to that filter.
 - The allCheckbox is updated based on whether there are remaining todos.

##### Individual Todo View







