/**
 * Created by XZH-CD on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
router.get('/',checkLogin);
router.get('/', function(req, res, next) {
    req.session.user = null;
    req.flash('µÇ³ö³É¹¦');
    res.redirect('/');
});
function checkLogin(req, res,next){
    if(!req.session.user){
        req.flash('error','Î´µÇÂ¼');
        res.redirect('/login');
    }
    next();
}
module.exports = router;