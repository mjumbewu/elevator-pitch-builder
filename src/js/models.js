var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.localStorageSupport = function() {
    return (typeof(Storage) !== "undefined");
  };

  Pitch.PitchModel = Backbone.Model.extend({
    set: function(key, val, options) {
      Backbone.Model.prototype.set.call(this, key, val, options);
      this.storeLocally();
    },
    storeLocally: _.debounce(function() {
      if (Pitch.localStorageSupport()) {
        localStorage.setItem('pitch', JSON.stringify(this.toJSON()));
      }
    }, 300)
  });

})();