function health(req, res) {
  res.json({
    status: "ok",
    service: "karebraids-api",
    timestamp: new Date().toISOString()
  });
}

module.exports = { health };
