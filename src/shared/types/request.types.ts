export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    name: string;
  };
}

export interface RefreshRequest extends Request {
  user: {
    sub(sub: any, refreshToken: string): unknown;
    userId: string;
    name: string;
    refreshToken: string;
  };
}
