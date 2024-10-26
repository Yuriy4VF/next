import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const verifyToken = async (token) => {
  const tokenEntry = await prisma.token.findUnique({
    where: { token },
  });

  if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }
  return tokenEntry;
};

const revokeToken = async (token) => {
  await prisma.token.delete({
    where: { token },
  });
};

const createTokenEntry = async (userId, token) => {
  return await prisma.token.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 час
    },
  });
};

const ERROR_MESSAGES = {
  invalidInput: "Invalid input",
  internalServerError: "Internal server error",
  databaseError: "Database error",
};

const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;

  if (!username || !password || password.length < 6) {
    return sendErrorResponse(res, 400, ERROR_MESSAGES.invalidInput);
  }

  try {
    const user = await createUser(username, password);

    if (!process.env.JWT_SECRET) {
      return sendErrorResponse(res, 500, ERROR_MESSAGES.internalServerError);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await createTokenEntry(user.id, token);
    console.log(token, user.id);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, ERROR_MESSAGES.databaseError);
  }
}
