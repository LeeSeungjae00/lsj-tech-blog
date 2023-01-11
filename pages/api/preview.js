export default function handler(req, res) {
  if (req.query.token !== 'sjsj' || !req.query.post) {
    return res.status(401).json({ message: 'Invailed token' })
  }

  res.setPreviewData({})
  res.redirect(`/post/${req.query.post}`)
}