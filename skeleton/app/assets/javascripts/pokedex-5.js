Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li" : "selectPokemonFromList",
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var pokeList = JST["pokemonListItem"]({ pokemon: pokemon });
    this.$el.append(pokeList);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: (function () {
        this.render();
        options.success && options.success();
      }).bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokeId = $target.data('id');
    Backbone.history.navigate( "/pokemon/" + pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li" : "selectToyFromList"
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: (function () {
        this.render();
        options.success && options.success();
      }).bind(this)
    });
  },

  render: function () {
    this.$el.html(JST["pokemonDetail"]({ pokemon: this.model }));

    var $toys = this.$el.find(".toys");
    this.model.toys().each((function (toy) {
      $toys.append(JST["toyListItem"]({ toy: toy }));
    }).bind(this));

  },

  selectToyFromList: function (event) {

    var $target = $(event.target);
    var toyId = $target.data('id');
    var pokemonId = $target.data('pokemonId');
    Backbone.history.navigate(
      "/pokemon/" + pokemonId + "/toys/" + toyId, { trigger: true });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    this.$el.html(JST["toyDetail"]({ toy: this.model, pokes: [] }))
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

