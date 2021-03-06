import { Router } from 'express'

import * as productController from '../controllers/productController'

const router = Router()

router.get('/', productController.getAllProducts)
router.post('/', productController.createProduct)
router.get('/:id', productController.getProductById)

router.patch('/:id', productController.patchProduct)
router.get('/:id/ingredients', productController.getIngredientsByProduct)

router.delete('/:id', (req, res) => res.json({ name: 'test', id: req.params.id }))

export default router
