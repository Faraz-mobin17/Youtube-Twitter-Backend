import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiError } from "../utils/ApiHandler.utils.js";
const userRegisterValidator = (req, _, next) => {
  const { username, email, firstname, lastname, avatar, coverImage, password } =
    req.body;

  if (
    [username, email, password, firstname, lastname, avatar, coverImage].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "All fields are required");
  }
  req.username = username;
  req.email = email;
  req.firstname = firstname;
  req.lastname = lastname;
  req.avatar = avatar;
  req.coverImage = coverImage;
  req.password = password;
  next();
};

const userLoginValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "User name or password required"
    );
  }

  req.email = email;
  req.password = password;
  next();
};

export { userRegisterValidator, userLoginValidator };
