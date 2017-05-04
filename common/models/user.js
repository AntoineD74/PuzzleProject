'use strict';

module.exports = function(User) {


  User.profile = function(id,cb){
    User.findById(id, {
      fields: {
        email: false,
        phone: false,
        realm: false,
        emailVerified: false
      },
      include: ['roles', 'associations']
    }, cb);
  };

  User.remoteMethod('profile', {
    accepts: [
      {arg: 'id', type: 'number'}
    ],
    returns: {arg: 'user', type: 'object'},
    http: {path:'/profile', verb: 'get'}
  });

  User.setrole = function(userId, roleId, cb) {
    User.findById(userId, function(err, user) {
      if (err) {
        return cb(err);
      }
      user.roleMappings.destroyAll(function(err) {
        if(err) {
          return cb(err);
        }
        if (roleId !== 3) {
          user.roleMappings.create({
            principalType: "USER",
            principalId: userId,
            roleId: roleId
          }, function(err, roleMap) {
            if (err) {
              return cb(err);
            }
            return cb(null, true);
          });
        }else{
          return cb(null,true);
        }
      });
    });
  }

  User.remoteMethod('setrole', {
    accepts: [
      {arg: 'userId', type: 'number'},
      {arg: 'roleId', type: 'number'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {path:'/setrole', verb: 'post'}
  });

};
