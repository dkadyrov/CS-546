const fs = require('fs');

let exportedMethods = {
  getAbout() {
    return users().then(userCollection => {
      return userCollection.find({}).toArray();
    });
  },
}

module.exports = exportedMethods;
