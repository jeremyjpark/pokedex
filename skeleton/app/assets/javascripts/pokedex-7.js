Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    this.$el.html(JST["pokemonForm"]({ pokemon: this.model }));
    return this;
  },
//In savePokemon update the model with our serialized data and save. You'll want to use the pokemon property of the serialized data. On successful save of the pokemon, add the model to this.collection and navigate to the pokemon detail page using Backbone.history.navigate.
  savePokemon: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var data = $form.serializeJSON().pokemon;
    this.model.save(data, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate(
          '/pokemon/' + this.model.id, { trigger: true 
        });
      }.bind(this)
    });
  }
});
