var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.TemplateView = Backbone.View.extend({
    initialize: function(options) {
      options = options || {};
      this.setTemplate(options.template);
    },

    setTemplate: function(template) {
      if (_.isString(template)) {
        this.template = Handlebars.Templates[template];
      } else if (_.isFunction(template)) {
        this.template = template;
      } else {
        throw "template must be a template name or a function.";
      }
    },

    getTemplateData: function() {
      var data = {};
      return data;
    },

    render: function() {
      var context = this.getTemplateData(),
          html = this.template(context);
      this.$el.html(html);
      return this;
    }
  });

})();