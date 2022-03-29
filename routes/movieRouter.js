const router=require("express").Router();
const movieCtrl=require("../controllers/movieCtrl");
const auth=require("../middleware/auth")
const authAdmin=require("../middleware/authAdmin");


router.route("/movies")
.get(movieCtrl.getmovies)
.post(auth,authAdmin,movieCtrl.createmovies)


router.route("/movies/:id")
.put(auth,authAdmin,movieCtrl.updatemovies)
.delete(auth,authAdmin,movieCtrl.deletemovies)

module.exports=router;