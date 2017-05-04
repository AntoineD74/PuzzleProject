module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var assusers = app.models.assusers;

    Role.registerResolver('assoMember', function(role,context,cb) {
      if (context.modelName !== 'project' && context.modelName !== 'association') {
        // A: No. This role is only for projects: callback with FALSE
        return process.nextTick(() => cb(null, false));
      }

      var userId = context.accessToken.userId;
      if (!userId) {
        //A: No, user is NOT logged in: callback with FALSE
        return process.nextTick(() => cb(null, false));
      }

      if(context.modelName == 'project'){
        assusers.count({
          userId: userId
        }, function(err, count){

          if (err) return cb(err);

          if(count > 0){
            // A: YES. At least one Team associated with this User AND Project
            // callback with TRUE, user is role:`teamMember`
            return cb(null, true);
          }else{
            return cb(null, false);
          }
        });
      }else{
        context.model.findById(context.modelId, function(err, asso){
          if(err || !asso){
            return process.nextTick(() => cb(null, false));
          }
          assusers.count({
            userId: userId,
            assoId: asso.id
          }, function(err, count){

            if (err) return cb(err);

            if(count > 0){
              // A: YES. At least one Team associated with this User AND Project
              // callback with TRUE, user is role:`teamMember`
              return cb(null, true);
            }else{
              return cb(null, false);
            }
          });
        });
      }
    });

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
