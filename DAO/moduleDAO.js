ModuleDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("modules");
  },
};

module.exports = ModuleDAO;
