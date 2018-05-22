RequestDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("requests");
  },
};

module.exports = RequestDAO;
