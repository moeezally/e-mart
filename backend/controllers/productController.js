import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const category = req.query.category;

    if(category){
        const products = await Product.find({category: category})
        return res.json(products)
    }

    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('user', '_id name');
        const data =products.map((product) => {
            return {
                ...product._doc, 'replies': [], 'replies_count': product['replies'].length
            }
        })

    res.json({products:data, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        const {
            user
        } = req.body;
      
        let product = await Product.findById(req.params.id)
            .populate('user', '_id name')
            .populate('replies.user', '_id name');
      
        let data = {...product._doc}
      
        data.replies = data.replies.map((r) => {
            let reply = {...r._doc};
            if (user) {
                let is_liked = reply.likes.filter((like) => like.user == user);
                reply['liked_by_me'] = is_liked.length > 0;
            }
            reply['total_likes'] = reply.likes.length;
            delete reply['likes'];
            return reply;
        })
      
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Garden Mart',
        category: 'Plants/Seeds/Fertilizers/Tools',
        countInStock: 0,
        numReviews: 0,
        care: "Sample",
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        care,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.care = care
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)
})


const addReply = asyncHandler(async (req, res) => {
    const {text} = req.body;
  
    const updated = await Forum.findByIdAndUpdate(req.params.id, {
        $push: {
            'replies': {
                user: req.user._id, text
            }
        }
    }, {new: true},);
  
    res.json(updated);
  });
  
   const addLike = asyncHandler(async (req, res) => {
  
    let product = await Renting.findById(req.params.id);
    let reply = product._doc.replies.find((reply) => reply._id == req.params.rid);
    let liked = reply.likes.find(like => String(like.user) == req.user._id);
  
    let update_data = liked ? {$pull: {'replies.$.likes': {user: req.user._id}}} : {$push: {'replies.$.likes': {user: req.user._id}}}
  
    const updated = await Forum.findOneAndUpdate({
        _id: req.params.id, 'replies._id': req.params.rid
    }, update_data, {new: true})
  
    res.json(updated);
  });
  

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    addLike,
    addReply
}
