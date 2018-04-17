const settings = Meteor.settings.google;

if (settings) {
  ServiceConfiguration.configurations.remove({
    service: 'google'
  });

  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: settings.client_id,
    secret: settings.client_secret,
    validClientIds: Meteor.settings.google.validClientIds
  });
}
