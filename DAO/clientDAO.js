ClientDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("clients");
  },
};

module.exports = ClientDAO;
