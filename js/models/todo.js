// Todo Model
// ----------
// The basic todo model has `title` and `completed` attributes.
// a title stores a todo item’s title and a completed status indicates if it’s complete. 
// These attributes are passed as defaults

var app = app || {}; //creating namespace

app.Todo = Backbone.Model.extend({

  // Default attributes ensure that each todo created has `title`, `order`, and `completed` keys.
  default: {
    title: 'title..',
    order: Todos.nextOrder(),
    completed: false
  }

  // Toggle the `completed` state of this todo item.
  // Through this method a Todo item’s completion status can be set and simultaneously persisted.

  toggle: function () {
    this.save({
      completed: !this.get('completed')
    });
  }

});