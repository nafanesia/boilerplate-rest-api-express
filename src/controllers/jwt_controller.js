/* eslint-disable consistent-return */
import response from '../utils/response';
import jwtService from '../services/jwt.service';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authParts = authHeader && authHeader.split(' ');
  const bearer = authParts && authParts[0];
  if (bearer !== 'Bearer') {
    return response.unauthorized(res, { message: 'Authorization format is Bearer [token]' });
  }
  const token = authParts && authParts[1];
  if (!token) return response.unauthorized(res, { message: 'No authorization' });
  try {
    const user = await jwtService.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    response.forbidden(res, { message: 'Do not have access', data: err });
  }
};

export default authenticateToken;
