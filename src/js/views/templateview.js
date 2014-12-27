var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.TemplateView = Backbone.View.extend({
    initialize: function(options) {
      options = options || {};
      this.setTemplate(options.template);
    },

    setTemplate: function(template) {
      this.template = this.resolveTemplate(template);
    },

    resolveTemplate: function(template) {
      if (_.isString(template)) {
        return Handlebars.Templates[template];
      } else if (_.isFunction(template)) {
        return template;
      } else {
        throw "template must be a template name or a function.";
      }
    },

    getTemplateData: function() {
      var data = {};
      return data;
    },

    renderTemplate: function(template) {
      var context, html;
      template = this.resolveTemplate(template);
      context = this.getTemplateData();
      html = template(context);
      return html;
    },

    render: function() {
      var html = this.renderTemplate(this.template);
      this.$el.html(html);
      return this;
    }
  });

})();