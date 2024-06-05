import jwt from 'jsonwebtoken';

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

export function getDataOfUser(req, res) {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        // Assuming userData contains the user's data
        res.status(200).json(userData);
      }
    });
  }