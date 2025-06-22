import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log({ ttttt: token,cook:req.cookies });

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token' });  // ✅ Send 401
    }

    const isCustomAuth = token.length < 500;
    let decodedData;

    if (isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();  // ✅ Proceed if auth is valid
  } catch (error) {
    console.trace('Error in middleware: ', error);
    return res.status(401).json({ message: 'Authentication failed' });  // ✅ Respond and stop
  }
};

export default auth;
