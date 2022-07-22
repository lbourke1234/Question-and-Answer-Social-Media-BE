import express from 'express'
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

export default router
