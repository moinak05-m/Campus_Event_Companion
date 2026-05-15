/**
 * @desc    Check server health
 * @route   GET /api/health
 * @access  Public
 */
const checkHealth = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is running smoothly!',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkHealth
};
