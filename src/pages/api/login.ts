import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ERROR_MESSAGES = {
  invalidCredentials: "Invalid credentials",
  internalServerError: "Internal server error",
  databaseError: "Database error",
};

const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

const authenticateUser = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }

  return null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);

    if (user) {
      if (!process.env.JWT_SECRET) {
        return sendErrorResponse(res, 500, ERROR_MESSAGES.internalServerError);
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } else {
      return sendErrorResponse(res, 401, ERROR_MESSAGES.invalidCredentials);
    }
  } catch (error) {
    return sendErrorResponse(res, 500, ERROR_MESSAGES.databaseError);
  }
}
