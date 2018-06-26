module.exports = function () {

  const clientDAO = require('../DAO/ClientDAO');
  const trackTimeDAO = require('../DAO/TimeTrackDAO');
  const contractDAO = require('../DAO/contractDAO');
  const exec = require('child_process').exec;
  const mongoose = require('mongoose');

  return {


    listClients: async function () {
      try {
        return await clientDAO.connection().find().toArray();
      } catch(er){
        return (new Error('connection-error'));
      }
    },

    find: async function (condition) {
      try {
        let res = await clientDAO.connection().find(condition, {'password': 0}).toArray();
        if(res.length === 1){
          return res[0];
        } else {
          return res
        }
      } catch(er){
        return (new Error('connection-error'));
      }
    },

    createClient: async function (client) {
      try {
        clientDAO.connection().insert(client, function (res) {
          return res;
        })
      } catch(er){
        return er;
      }
    },


    createSystemFolder: function (images, client, mod, menu, callback) {
      console.log('Start creating system folder');
      console.log(images);
      var yourscript = exec('sh scripts/new_client.sh '+client.systemName+' '+client.port+ ' '+mod+' '+client._id+' '+images["small_image"]+' '+images["login_image"], { detached: true},
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log('Creating system 2....');
          var yourscript = exec('sh scripts/new_client2.sh '+client.systemName+' \"' +menu+ '\" '+mod, { detached: true},
            (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);

              if (error !== null) {
                return callback(new Error('folder'));
              } else {
                return callback()
              }
            });
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
    },

    registerClientActivation : async function(systemName, callback){
      try {
        console.log(systemName);
        let user = await clientDAO.connection().findOne({'systemName': systemName});
        console.log(user);
        let track = new mongoose.models.TimeTrack();
        track.modules = user.modules;
        track.client = user._id;
        console.log(track);
        trackTimeDAO.connection().insert(track,function(e){
          if(e){
            callback(new Error('registerClientActivation.fail'))
          } else {
            callback();
          }
        });
      } catch(e){
        console.log(e);
        callback(new Error('registerClientActivation.fail'))
      }
    },

    registerClientDeactivation : async function(systemName, callback){
      try {
        let user = await clientDAO.connection().findOne({'systemName': systemName});
        if(!user){
          callback(new Error('registerClientDeactivation.fail'))
        }
        let res = await trackTimeDAO.connection().find({'client' : user._id}).sort({'started' : -1}).toArray();
        const track = res[0];
        if(!track){
          callback(new Error('registerClientDeactivation.fail'))
        }
        trackTimeDAO.connection().update({_id : track._id},{ $set: {'stopped' : new Date()} },function(e, res) {
          if(e || res.result.nModified == 0) {
            callback(new Error('registerClientActivation.fail'))
          } else {
            callback();
          }
        })
      } catch(e){
        callback(new Error('registerClientActivation.fail'))
      }
    },

    activateCientBySystemFolder: function(systemName, callback){
      console.log('Start activating '+systemName);
      let script = exec('sh scripts/activate.sh '+systemName, { detached: true},
        (error, stdout, stderr) => {
          console.log(stderr);
          if (error !== null) {
            return callback(new Error('activateCientBySystemFolder.fail'));
          } else {
            return this.registerClientActivation(systemName,callback)
          }
        });
    },

    stopCientBySystemFolder: function(systemName, callback){
      console.log("deactivating: "+systemName);
      let script = exec('sh scripts/stop.sh '+systemName, { detached: true},
        (error, stdout, stderr) => {
          console.log(stderr);
          if (error !== null) {
            return callback(new Error('fail'));
          } else {
            return this.registerClientDeactivation(systemName,callback);
          }
        });

    }

  }

};
