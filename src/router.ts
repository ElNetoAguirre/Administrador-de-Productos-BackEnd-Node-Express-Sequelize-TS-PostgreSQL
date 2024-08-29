import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The Product Name
 *          example: Monitor Curvo de 49 Pulgadas
 *        price:
 *          type: number
 *          description: The Product Price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The Product Availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get a list of Products
 *   tags:
 *    - Products
 *   description: Return a list of Products
 *   responses:
 *    200:
 *      description: Successful Response
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/components/schemas/Product"
 */

// Routing
router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a Product by ID
 *    tags:
 *      - Products
 *    description: Return a Product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the Product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      404:
 *        description: Product Not Found
 *      400:
 *        description: Bad Request - Invalid ID
 */

router.get("/:id",
  param("id"). isInt().withMessage("ID No Válido"),
  handleInputErrors,
  getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new Product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *    responses:
 *      201:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid Input Data
 */

router.post("/",
  // Validación
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric().withMessage("Valor No Válido")
    .notEmpty().withMessage("El precio del producto no puede ir vacio")
    .custom(value => value > 0).withMessage("Precio No Válido"),
  handleInputErrors,
  createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a Product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated Product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the Product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid ID or Invalid Input Data
 *      404:
 *        description: Product Not Found
 */

router.put("/:id",
  param("id"). isInt().withMessage("ID No Válido"),
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric().withMessage("Valor No Válido")
    .notEmpty().withMessage("El precio del producto no puede ir vacio")
    .custom(value => value > 0).withMessage("Precio No Válido"),
  body ("availability").isBoolean().withMessage("Valor de Disponibilidad No Válido"),
  handleInputErrors,
  updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the Product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

router.patch("/:id",
  param("id"). isInt().withMessage("ID No Válido"),
  handleInputErrors,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a Product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the Product to delete
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Producto Eliminado"
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

router.delete("/:id",
  param("id"). isInt().withMessage("ID No Válido"),
  handleInputErrors,
  deleteProduct
)

export default router