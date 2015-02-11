// The Application definition, creating namespace
var app = app | {}

app.AppView = Backbone.View.extend({
  el: '#todoapp', //instead of creating a new element, bind to the existing element.

  
  statsTemplate: _.template($('#stats-template').html()),
  
  // Delegate events for creating new items, clearing completed ones, and toggle list.
  events: {
    'keypress #new-todo' : 'createOnEnter',
    'click #clear-completed' : 'clearCompleted',
    'click #toggle-all' : 'toggleAllComplete'
  },

  // At initialization we bind to the relevant events on the `Todos` collection, 
  // when items are added or changed. Kick things off by loading any
  // preexisting todos that might be saved in *localStorage*.
  initialize: function() {
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');
    this.allCheckbox = this.$('#toggle-all')[0];

    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);

    this.listenTo(app.Todos, 'change:completed', this.filterOne);
    this.listenTo(app.Todos,'filter', this.filterAll);
    this.listenTo(app.Todos, 'all', this.render);

    app.Todos.fetch();
  },

  // Re-rendering the App just means refreshing the statistics -- the rest of the app doesn't change.
  render: function() {
    var completed = app.Todos.completed().length;
    var remianing = app.Todos.remianing().length;

    if (app.Todos.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne: function(){
    var view = app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },

  // Add all items in the **Todos** collection at once.
  addAll: function(){
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this);
  },



});

