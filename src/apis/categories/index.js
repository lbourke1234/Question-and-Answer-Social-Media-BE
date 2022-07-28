import express from 'express'
import createHttpError from 'http-errors'
import CategoriesModel from './model.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const categories = await CategoriesModel.find()
    res.send(categories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/:name', async (req, res, next) => {
  try {
    const category = await CategoriesModel.findOne({ name: req.params.name })
    if (!category) {
      next(createHttpError(404, 'Category not found!'))
    } else {
      res.send(category)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCategory = new CategoriesModel(req.body)
    const savedCategory = await newCategory.save()
    res.send(savedCategory)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await CategoriesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedCategory) {
      next(createHttpError(404, 'Category not found!'))
    } else {
      res.send(updatedCategory)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
