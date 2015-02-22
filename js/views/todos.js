var app = app || {};

console.log("----------------------- TodoView -----------------------");

console.log(app);

// The DOM element for a todo item

app.TodoView = Backbone.View.extend({

  // list tag
  tagName: 'li',

  //Cache th etemplate function for a single item.
  // Syntax: _.template(templateString, data?, settings?)
  template: _template($('#item-template').html()),

  // The DOM events specific to an item.
  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .toggle': 'togglecompleted',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);        
    this.listenTo(this.model, 'visible', this.toggleVisible); 
  },

});