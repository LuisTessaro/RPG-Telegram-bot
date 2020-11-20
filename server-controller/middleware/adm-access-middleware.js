module.exports = (req, res, next) => {
  const { token } = req.headers
  
  if (process.env.ADM_ACCESS_TOKEN !== token || !token)
    return res.status(401).send({ message: 'Unauthorized' })

  return next()
}