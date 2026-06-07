// Admin controller
const getAdminData = async (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
};

// Protected controller
const getProtectedData = async (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
};

// JWT controller (e.g., verify token)
const verifyToken = async (req, res) => {
  res.json({ valid: true, user: req.user });
};

module.exports = {
  getAdminData,
  getProtectedData,
  verifyToken
};
