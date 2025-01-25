export async function SpceficMiddleware(req, res, next) {
  try {
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
