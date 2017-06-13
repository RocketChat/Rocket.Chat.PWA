export class AuthorizationMiddleware {
  static token;

  static setToken(token) {
    AuthorizationMiddleware.token = token;
  }

  applyMiddleware(req, next) {
    req.options.headers = {
      ...req.options.headers,
      Authorization: AuthorizationMiddleware.token || '',
    };

    next();
  }
}
