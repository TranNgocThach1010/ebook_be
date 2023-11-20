const jwt = require("jsonwebtoken");
const excuteQuery = require("../config/excuteQuery");

class LoginController {
  // [POST] /login
  async login(req, res) {
    const { username, password } = req.body;
    const sqlquery = `SELECT * FROM account WHERE username = '${username}' AND password = '${password}'`;
    return excuteQuery(sqlquery)
      .then((data) => {
        const { id, username, role } = data[0];
        if (data.length > 0) {
          const accessToken = jwt.sign(
            {
              id,
              username,
              role,
            },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: "1h" }
          );
          res.json({ accessToken });
        } else {
          res.sendStatus(400);
        }
      })
      .catch(() => res.sendStatus(401));
  }

  // [GET] /user
  getUser(req, res) {
    res.json(req.user);
  };
}

module.exports = new LoginController; 
