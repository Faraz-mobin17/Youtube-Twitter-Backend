import { ApiResponse } from "../utils/ApiHandler.utils";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils";

const verifyPremiumUser = (req, res, next) => {
  if (req.user && req.user.is_premium) {
    next();
  } else {
    return res
      .status(HttpStatusCodes.FORBIDDEN_ACCESS)
      .json(
        new ApiResponse(
          HttpStatusCodes.FORBIDDEN_ACCESS,
          null,
          "Premium membership required"
        )
      );
  }
};
export { verifyPremiumUser };
