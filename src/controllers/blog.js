const { validationResult } = require('express-validator')

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title
  const body = req.body.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const err = new Error('Validation failed, entered data is incorrect.')
    err.statusCode = 400
    err.data = errors.array()
    throw err;
  }
  const result = {
    message: 'Create blog post Successfully',
    data: {
      post_id: 1,
      title: title,
      image: "imagefile.png",
      body: body,
      created_at: "12/06/2020",
      author: {
        uid: 1,
        name: "John Doe"
      }
    }
  }
  res.status(201).json(result)
}