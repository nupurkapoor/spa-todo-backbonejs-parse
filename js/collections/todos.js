/*
  A TodoList collection is used to group our models. 
  The collection uses the LocalStorage adapter to override Backbone’s default sync() operation 
  with one that will persist our Todo records to HTML5 Local Storage. 
  Through local storage, they’re saved between page requests.

  The collection’s completed() and remaining() methods return an array of finished and 
  unfinished todos, respectively.

  The nextOrder() method implements a sequence generator while a comparator() sorts items 
  by their insertion order.
*/

  var app = app || {};

  // Todo Collection
  // ---------------

  console.log('Initializing collection');
  
  // debugger;
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model, the type of model that this collection will contain
    model: app.Todo,

    // The collection of todos is backed by localStorage instead of a remote
    // server. Also save all of the todo items under the "todos-backbone" namespace.
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished.
    completed: function() {
      return this.filter(function( todo ) {
        return todo.get('completed');
      });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply( this, this.completed() );
    },

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