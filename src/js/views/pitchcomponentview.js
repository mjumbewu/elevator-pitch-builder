var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchComponentView = Pitch.TemplateView.extend({
    initialize: function(options) {
      options = options || {};
      this.pitchcomponentdata = options.component;
      this.setTemplate(options.template);
    },

    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    },
  });

})();