### Application Specific Notes

##### Requirements

* a Todo model to describe individual todo items
 * Since the model is a place where we keep our data. So, our ToDos will simply be models.
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
* We use templates to dynamically create HTML by injecting model data into their placeholders. One way of including templates in the page is by using custom script tags. These don’t get evaluated by the browser, which just interprets them as plain text. Underscore micro-templating can then access the templates, rendering fragments of HTML.
 * *item-template* to display individual todo items.
 * *stats-template* to populate the footer. Displays the number of remaining incomplete items and contains a list of hyperlinks which will be used to perform actions. It also contains a button which can be used to clear all of the completed items.

