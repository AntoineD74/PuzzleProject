var server = require('./server');
var ds = server.dataSources.db;
var lbTables = [
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'user',
  'association',
  'assuser',
  'project',
  'projectuser'
];

ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] updated in ', ds.adapter.name);
  ds.disconnect();
});
