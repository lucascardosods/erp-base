ContractDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("contracts");
  },
};

module.exports = ContractDAO;
