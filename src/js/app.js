var Pitch = Pitch || {};

(function() {
  'use strict';

  Pitch.App = function(selector) {
    this.$baseEl = $(selector);

    this.router = new Pitch.Router();
    this.router.on('route:introRoute', _.bind(this.handleIntroRoute, this));
    this.router.on('route:pitchComponentRoute', _.bind(this.handleComponentRoute, this));
    this.router.on('route:pitchReviewRoute', _.bind(this.handleReviewRoute, this));
    this.router.on('route', _.bind(this.handleRoute, this));

    this.$('.intro-section').html(Handlebars.Templates['intro-tpl']());

    this.pitch = this.initializePitchModel();
    this.whoView = this.buildPitchComponentView('who').render();
    this.whatView = this.buildPitchComponentView('what').render();
    this.whyView = this.buildPitchComponentView('why').render();
    this.goalView = this.buildPitchComponentView('goal').render();
    this.reviewView = this.buildPitchReviewView().render();

    $(document).on('click', 'a', _.bind(this.handleLinkClick, this));
  };

  Pitch.App.prototype = {
    $: function(selector) {
      return this.$baseEl.find(selector);
    },

    initializeSectionAnimations: function() {
      this.$('section').addClass('animated');
      this.animationsInitialized = true;
    },

    initializePitchModel: function() {
      var pitchData;

      if (Pitch.localStorageSupport()) {
        try {
          pitchData = JSON.parse(localStorage.getItem('pitch') || '{}');
        } catch (e) {
          pitchData = {};
        }
      } else {
        pitchData = {};
      }

      return new Pitch.PitchModel(pitchData);
    },

    buildPitchComponentView: function(component) {
      var view, $section;

      $section = $('.' + component + '-section');
      view = new Pitch.PitchComponentView({
        el: $section,
        model: this.pitch,
        // Use the generic component template if no
        // specific template is provided.
        template: Handlebars.Templates[component + '-tpl'] || Handlebars.Templates['component-tpl'],
        component: {
          name: $section.attr('data-name'),
          label: $section.attr('data-label'),
          help: $section.attr('data-help')
        }
      });
      return view;
    },

    buildPitchReviewView: function() {
      var view, $section;

      $section = $('.review-section');
      view = new Pitch.PitchReviewView({
        el: $section,
        model: this.pitch,
        template: Handlebars.Templates['review-tpl']
      });
      return view;
    },

    showIntroSection: function() {
      this.$('.intro-section').removeClass('offscreen').addClass('onscreen');
    },
    hideIntroSection: function() {
      this.$('.intro-section').removeClass('onscreen').addClass('offscreen');
    },

    hideAllPitchSections: function() {
      this.$('.pitch-container section').removeClass('expanded').addClass('collapsed');
    },
    showPitchSection: function(paneName) {
      this.$('.' + paneName + '-section').removeClass('collapsed').addClass('expanded');
    },

    handleRoute: function() {
      if (!this.animationsInitialized) {
        // Wait a little while before enabling animations for the first time,
        // so that the initial route doesn't trigger animations.
        _.delay(_.bind(this.initializeSectionAnimations, this), 300);
      }
    },
    handleIntroRoute: function() {
      this.showIntroSection();
    },
    handleComponentRoute: function(component) {
      this.hideIntroSection();
      this.hideAllPitchSections();
      this.showPitchSection(component);
    },
    handleReviewRoute: function() {
      this.hideIntroSection();
      this.hideAllPitchSections();
      this.showPitchSection('review');
    },
    handleLinkClick: function(evt) {
      var $target = $(evt.currentTarget);
      if (window.ga) {
        ga('send', 'event', 'link:' + ($target.text() || '').toLowerCase(), 'click');
      }
    }
  };

})();