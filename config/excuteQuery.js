const { conn } = require("./database");

module.exports = async function excuteQuery(query) {
  const pool = await conn;
  return new Promise(function (resolve, reject) {
    pool.request().query(query, (err, data) => {
        if (data?.recordset.length > 0) {
            resolve(data.recordset);
        }
        else {
            reject("Couldn't find recordset");
        }
    });
  })
}
