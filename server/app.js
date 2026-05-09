const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { clientOrigin, nodeEnv } = require("./config/env");
const { errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: clientOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

if (nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
});

app.use(errorHandler);

module.exports = { app };
