// roleMiddleware.js
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };
  
  export const doctor = (req, res, next) => {
    if (req.user && req.user.role === 'Doctor') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Doctors only.' });
    }
  };
  