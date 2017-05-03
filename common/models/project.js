'use strict';

module.exports = function(Project) {

  Project.listProjects = function(cb) {
    Project.find({
      where: {
        state: 1
      }
    }, cb);
  };
  Project.remoteMethod('listProjects', {
    returns: {arg: 'projects', type: 'array'},
    http: {path:'/list-projects', verb: 'get'}
  });

  Project.listModProjects = function(cb) {
    Project.find({
      where: {
        state: 0
      }
    }, cb);
  };

  Project.remoteMethod('listModProjects', {
    returns: {arg: 'projects', type: 'array'},
    http: {path:'/list-mod-projects', verb: 'get'}
  });

  // donate
  Project.validate = function(id, cb) {
    Project.findById(id, function(err, project) {
      if (err) return cb(err);

      project.state = 1;
      project.save();

      cb(null, true);
    });
  };
  
  Project.remoteMethod('validate', {
    accepts: [
      {arg: 'id', type: 'number'},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {path:'/validate', verb: 'post'}
  });

};
