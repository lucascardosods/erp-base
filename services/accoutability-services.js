module.exports = function () {

  const contractDAO = require('../DAO/contractDAO');
  const timetrackDAO = require('../DAO/timeTrackDAO');
  const requestDAO = require('../DAO/requestDAO');
  const types = require("../helpers/types.js");
  let mongoose = require("mongoose");

  const PRICE_PER_MINUTE = 0.002166666667;

  function millisToMinutesAndSeconds(millis) {
    // var seconds = ((millis % 60000) / 1000).toFixed(0);
    return Math.floor(millis / 60000);
  }
  return {

    checkAccountability: async function (contract) {
      switch (contract.type) {
        case types.Contract.REQUEST._id:
          console.log('request');
          return await this.calculateByRequests(contract);
        case types.Contract.TIME_MANUAL._id:
          console.log('time_manual');
          return await this.calculateByTime(contract, PRICE_PER_MINUTE);
        // return await this.calculateByRequests(contract);
        case types.Contract.TIME_AUTOMATIC._id:
          console.log('time_automatic');
          return await this.calculateByTime(contract, 2 * PRICE_PER_MINUTE);
      }
    },

    findContractByUserId : async function(clientId) {
      try {
        let contract = await contractDAO.connection().findOne({client: mongoose.Types.ObjectId(clientId)});
        return contract
      }
      catch(e){
        throw new Error(e)
      }
    },

    calculateByRequests: async function(contract) {
      let requests = await requestDAO.connection().count({client : contract.client});
      const value = contract.modules.length * requests * Number(contract.pricePerRequest);
      return {
        total : value,
        numberOfRequests : requests
      }
    },

    calculateByTime: async function(contract, pricePerMinute){
      let tracks = await timetrackDAO.connection().find({client : contract.client, paid: false}).toArray();
      let totalMinutes = 0;
      let totalPrice = 0;
      tracks.forEach(function(track){
        if(!track.stopped){
          track.stopped = new Date()
        }
        let time = track.stopped - track.started;
        time = millisToMinutesAndSeconds(time);
        track._minutes = time;
        totalMinutes += time;
        track._price = pricePerMinute * time;
        totalPrice += track._price;
      });
      totalPrice = totalPrice.toFixed(2);
      console.log(totalMinutes);
      console.log(totalPrice);
      console.log(tracks);

      return {
        tracks: tracks,
        total : totalPrice,
        totalMinutes: totalMinutes
      }
    },

    registerClientContract: function (body, modules, clientId) {
      let contract = new mongoose.models.Contract();
      contract.client = mongoose.Types.ObjectId(clientId);
      if(body.charge === 'time'){
        if(body.timetype === 'automatic'){
          contract.pricePerRequest = "0.03";
          contract.type = types.Contract.TIME_AUTOMATIC;
        } else if(body.timetype === 'manual') {
          contract.pricePerRequest = "0.02";
          contract.type = types.Contract.TIME_MANUAL;
        }
      } else if(body.charge === 'requests'){
        contract.pricePerRequest = "0.01";
        contract.type = types.Contract.REQUEST._id;
      }
      contract.modules = modules;
      contractDAO.connection().insert(contract)
    },


  }
};
