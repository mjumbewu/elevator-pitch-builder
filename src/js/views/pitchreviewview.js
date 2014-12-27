var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchReviewView = Pitch.TemplateView.extend({
    initialize: function(options) {
      options = options || {};
      this.setTemplate(options.template);

      this.$el.on('focus', '.pitch-component', _.bind(this.handleTextFocus, this));
      this.$el.on('input', '.pitch-component', _.bind(this.handleTextInput, this));
      this.$el.on('blur', '.pitch-component', _.bind(this.handleTextBlur, this));

      this.model.on('change', _.bind(this.handleModelChange, this));

      this.focusCount = 0;
    },

    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    },

    handleModelChange: function() {
      if (this.focusCount === 0) {
        var editableReviewHtml = this.renderTemplate('editable-review-tpl');
        this.$('.pitch-review').html(editableReviewHtml);
      }
    },

    handleTextFocus: function() {
      ++this.focusCount;
    },

    handleTextInput: function(evt) {
      var $component = $(evt.currentTarget),
          componentName = $component.attr('data-name');
      this.model.set(componentName, $component.text());
    },

    handleTextBlur: function(evt) {
      --this.focusCount;
    }
  });

})();