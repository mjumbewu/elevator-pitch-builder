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

    wordCount: function(s) {
      if (!s) {
        return 0;
      }

      return s.split(' ').length;
    },

    getTemplateData: function() {
      if (this.templateData && !this.modelChanged) {
        return this.templateData;
      } else {
        this.modelChanged = false;

        var data = {},
            wordcount = this.wordCount(this.model.get('who')) +
                        this.wordCount(this.model.get('what')) +
                        this.wordCount(this.model.get('why')) +
                        this.wordCount(this.model.get('goal')),
            estseconds = Math.round(wordcount / 4);

        data.pitch = this.model.toJSON();
        data.component = this.pitchcomponentdata;
        data.analysis = { wordcount: wordcount, estseconds: estseconds };

        this.templateData = data;
        return data;
      }
    },

    handleModelChange: function() {
      var editableReviewHtml, pitchAnalysisHtml, pitchEmailHtml;
      this.modelChanged = true;

      if (this.focusCount === 0) {
        editableReviewHtml = this.renderTemplate('editable-review-tpl');
        this.$('.pitch-review').html(editableReviewHtml);
      }

      pitchAnalysisHtml = this.renderTemplate('pitch-analysis-tpl');
      this.$('.pitch-analysis').html(pitchAnalysisHtml);

      pitchEmailHtml = this.renderTemplate('pitch-mailto-tpl');
      this.$('.pitch-email').html(pitchEmailHtml);
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