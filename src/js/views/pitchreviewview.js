var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchReviewView = Pitch.TemplateView.extend({
    initialize: function(options) {
      options = options || {};
      this.setTemplate(options.template);

      this.model.on('change', _.bind(this.handleModelChange, this));
    },

    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    },

    handleModelChange: function() {
      this.render();
    }
  });

})();