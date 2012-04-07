if (typeof GitHUD === 'undefined') GitHUD = {};

$(function() {
  GitHUD.Repo = Backbone.Model.extend({
    initialize: function(handle) {
      var parts = [];
      if (typeof handle === 'string') {
        parts = handle.split('/');
        if (parts.length < 2)
          throw new Error('Repo must be referenced as "user/name"');
        this.set('user', parts[0]);
        this.set('name', parts[1]);
      }
    },
    handle: function() {
      return this.get('user') + '/' + this.get('name');
    },
    url: function() {
      return GitHUD.Util.url('repos/' + this.handle());
    }
  });

  GitHUD.Issue = Backbone.Model.extend({
    idAttribute: 'number',
    initialize: function(options) {
      GitHUD.Util.initRepo(this, options);
    },
    url: function() {
      return GitHUD.Util.url(
        this.get('url') ||
        ('repos/' + this.get('repo').handle() + '/issues/' + this.get('number'))
      );
    }
  });

  GitHUD.Issues = Backbone.Collection.extend({
    model: GitHUD.Issue,
    initialize: function(models, options) {
      GitHUD.Util.initRepo(this, options);
    },
    url: function() {
      return GitHUD.Util.url('repos/' + this.repo.handle() + '/issues');
    }
  });

  GitHUD.Label = Backbone.Model.extend({
    initialize: function(options) {
      GitHUD.Util.initRepo(this, options);
    },
    url: function() {
      return GitHUD.Util.url('repos/' + this.get('repo').handle() +
                             '/labels/' + this.get('name'));
    }
  });

  GitHUD.Labels = Backbone.Collection.extend({
    model: GitHUD.Label,
    initialize: function(models, options) {
      GitHUD.Util.initRepo(this, options);
    },
    url: function() {
      return GitHUD.Util.url('repos/' + this.repo.handle() + '/labels');
    }
  });
});
