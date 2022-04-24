exports.createProduct = (req, res, next) => {
  const name = req.body.name
  const price = req.body.price
  res.json(
    {
      message: 'Create product Successfully',
      data: {
        id: 1,
        name: name,
        price: price,
      }
    }
  )
  next()
}

exports.getAllProducts = (req, res, next) => {
  res.json(
    {
      message: 'Get all products Successfully',
      data: {
        id: 1,
        name: 'Product 1',
        price: 100,
      }
    }
  )
  next()
}