function health(req, res) {
  res.json({
    status: "ok",
    service: "mern-boilerplate-api",
    timestamp: new Date().toISOString()
  });
}

module.exports = { health };
