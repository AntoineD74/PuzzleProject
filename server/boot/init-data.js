module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


    User.create([
        {
          username: 'admin',
          email: 'admin@projectpuzzle.com',
          password: 'admin',
          lastname: 'Project',
          firstname: 'Puzzle',
          phone: '666666666'
        },
        {
          username: 'moderator',
          email: 'moderator@projectpuzzle.com',
          password: 'moderator',
          lastname: 'Project',
          firstname: 'Puzzle',
          phone: '666666666'
        },
        {
          username: 'user',
          email: 'user@projectpuzzle.com',
          password: 'user',
          lastname: 'Project',
          firstname: 'Puzzle',
          phone: '666666666'
        }
    ], function(err, users) {
        // Create the admin role
      Role.create([
        {
          name: 'admin'
        },
        {
          name: 'moderator'
        }
      ], function(err, roles) {
        //if (err) return debug(err);
        //debug(role);
        // Make Bob an admin
        roles[0].principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          //if (err) return debug(err);
          //debug(principal);
        });
        roles[1].principals.create({
          principalType: RoleMapping.USER,
          principalId: users[1].id
        }, function(err, principal) {
          //if (err) return debug(err);
          //debug(principal);
        });
      });
    });








};
