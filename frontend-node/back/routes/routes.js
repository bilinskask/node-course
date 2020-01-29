const router = require("express").Router();
const userController = require("../user/userController");
const todoController = require("../todo/todoController");
const middleware = require("../middleware/middleware");

router.get("/", (req, res) => {
  res.json("Api is working!");
});

// user routes
router.post("/user/register", userController.register);
router.get("/user/getAllUsers", userController.getAll);
router.get("/user/getSingleUser/:id", userController.getSingleUser);
router.post("/user/login", userController.login);

// todo routes
router.post("/todo/create", middleware.authenticate, todoController.createItem);
router.get("/todo/getAllItems", middleware.authenticate, todoController.getAll);
router.delete("/todo/deleteOneItem/:id", todoController.deleteItem);
router.patch("/todo/updateOneItem/:id", todoController.updateItem);

module.exports = router;
