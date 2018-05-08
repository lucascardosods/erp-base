TimeTrackDAO = {
  connection : function() {
    return global._connection.db(global.__CONFIG.COLLECTION_NAME).collection("timetracks");
  },
};

module.exports = TimeTrackDAO;
