var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchReviewView = Pitch.TemplateView.extend({
    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    }
  });

})();