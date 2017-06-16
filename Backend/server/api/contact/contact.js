var router = require('express').Router();
var controller = require('./contactController.js');

router.param("id",controller.param);

router.route("/")
    .get(controller.get)
    .post(controller.post);


router.route("/:id")
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);

router.route("/addCategory/:id")
    .post(controller.addCategory);

router.route("/removeCategory/:id")
    .post(controller.removeCategory);

module.exports = router;
