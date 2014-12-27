var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.PitchComponentView = Pitch.TemplateView.extend({
    initialize: function(options) {
      options = options || {};
      this.componentName = options.component.name;
      this.pitchcomponentdata = options.component;
      this.setTemplate(options.template);

      this.$el.on('click', '.help', _.bind(this.handleHelpClick, this));
      this.$el.on('swiperight', '.help', _.bind(this.handleHelpSwipeRight, this));
      this.$el.on('swipeleft', '.help', _.bind(this.handleHelpSwipeLeft, this));
      this.$el.on('focus', '.component-text', _.bind(this.handleTextFocus, this));
      this.$el.on('input', '.component-text', _.bind(this.handleTextInput, this));
      this.$el.on('blur', '.component-text', _.bind(this.handleTextBlur, this));

      this.model.on('change:' + this.componentName, _.bind(this.handleModelChange, this));
    },

    getTemplateData: function() {
      var data = {};
      data.pitch = this.model.toJSON();
      data.component = this.pitchcomponentdata;
      return data;
    },

    updateText: function() {
      var value;

      if (!this.isFocussed) {
        value = this.model.get(this.componentName);
        this.$('.component-text').val(value);
      }
    },

    handleHelpClick: function() {
      this.$('.help').toggleClass('expanded collapsed');

      if (this.$('.help').hasClass('collapsed')) {
        _.delay(_.bind(function() { this.$('.component-text').focus(); }, this), 400);
      }
    },

    handleHelpSwipeRight: function() {
      this.$('.help').addClass('collapsed').removeClass('expanded');
    },

    handleHelpSwipeLeft: function() {
      this.$('.help').removeClass('collapsed').addClass('expanded');
    },

    handleTextInput: function() {
      var value = this.$('.component-text').val();
      this.model.set(this.componentName, value);
    },

    handleModelChange: function() {
      this.updateText();
    },

    handleTextFocus: function() {
      this.isFocussed = true;
    },

    handleTextBlur: function() {
      this.isFocussed = false;
    }
  });

})();