var router = require('express').Router();
var controller = require('./userController.js');

router.param("id",controller.param)

router.route("/")
    .get(controller.get)
    .post(controller.post)


router.route("/:id")
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

router.route("/addContact/:id")
    .post(controller.addContact);

router.route("/removeContact/:id")
    .post(controller.removeContact);


module.exports = router;
