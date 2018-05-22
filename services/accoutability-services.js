module.exports = function () {

  const contractDAO = require('../DAO/contractDAO');
  const requestDAO = require('../DAO/requestDAO');
  const types = require("../helpers/types.js");
  let mongoose = require("mongoose");

  return {


     checkAccountability: async function (contract) {
      switch (contract.type) {
        case types.Contract.REQUEST._id:
          console.log('request');
          return await this.calculateByRequests(contract);
        case types.Contract.TIME_MANUAL._id:
          console.log('time_manual');
          // return await this.calculateByTimeManual(contract);
          return await this.calculateByRequests(contract);
        case types.Contract.TIME_AUTOMATIC._id:
          console.log('time_automatic');
          return await this.calculateByTimeAutomatic(contract);


          break;
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

    calculateByTimeManual: async function(contract){

    },

    calculateByTimeAutomatic: async function(contract){

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
