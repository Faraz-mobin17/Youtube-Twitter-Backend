type User = {
  id: number;
  email: string;
  username: string;
};

type DecodedToken = {
  id: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
};

export { User, DecodedToken };
