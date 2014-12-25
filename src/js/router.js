var Pitch = Pitch || {};

(function() {

  Pitch.Router = Backbone.Router.extend({
    routes: {
      '': 'introRoute',
      'review': 'pitchReviewRoute',
      ':component': 'pitchComponentRoute'
    }
  });

})();