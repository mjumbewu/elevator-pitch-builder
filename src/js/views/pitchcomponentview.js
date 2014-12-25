var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchComponentView = Pitch.TemplateView.extend({
    initialize: function(options) {
      options = options || {};
      this.pitchcomponentdata = options.component;
      this.setTemplate(options.template);

      this.$el.on('click', '.help', _.bind(this.handleHelpClick, this));
    },

    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    },

    handleHelpClick: function() {
      this.$('.help').toggleClass('expanded collapsed');
    }
  });

})();