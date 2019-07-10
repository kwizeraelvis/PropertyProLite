export default (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).send('Access denied, you are not an Admin');

  next();
};
