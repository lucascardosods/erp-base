UserDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("users");
  },
};

module.exports = UserDAO;
