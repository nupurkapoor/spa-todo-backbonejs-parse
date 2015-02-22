/*
  A TodoList collection is used to group the models. 
  The collection uses parse to override Backbone’s default sync() operation 
  with one that will persist the Todo records to Parse.com 
  Through this, they’re saved between page requests.

  The collection’s completed() and remaining() methods return an array of finished and 
  unfinished todos, respectively.

  The nextOrder() method implements a sequence generator while a comparator() sorts items 
  by their insertion order.
*/

var app = app || {};

console.log('Initializing collection');

app.TodoList = Backbone.Collection.extend({

  // Reference to this collection's model, the type of model that this collection will contain
  model: app.Todo,

  // The collection of todos is backed by localStorage instead of a remote
  // server. Also save all of the todo items under the "todos-backbone" namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Filter down the list of all todo items that are finished.
  // `filter` is a Underscore utility function to filter a collection (data)
  // `this` is referring to the collection
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished.
  // Here we are using a proxy to an underscore method - `_.without`
  // `this` is referring to the collection
  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  /* Alternate approach
    remaining: function () {
      return this.filter(function (todo) {
          return !todo.get('completed');
      });
    }
  */

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: function( todo ) {
    return todo.get('order');
  }

});

// Create our global collection of **Todos**.
app.Todos = new TodoList();

