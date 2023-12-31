const router = require("express").Router();
const userController = require("../controllers/AuthController");
const { userVerification } = require("../middleware/AuthMiddleware");
const upload = require("../middleware/handleImage");

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.patch("/updateuser/:id", upload.single('image'), userController.updateUser);
router.get("/getusers", userController.getAllUsers);
router.get("/getuser/:id", userController.getUser);
router.put("/deleteuser/:id", userController.deleteUser);
router.post("/", userVerification);

module.exports = router;
