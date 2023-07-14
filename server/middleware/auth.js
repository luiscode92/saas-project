const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    req.userId = user._id;

    return next();
  });
};