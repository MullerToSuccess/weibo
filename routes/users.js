var express = require('express');
var router = express.Router();

/* GET users listing. */
var users = {
  'jk':{
    name: 'jk',
    host: '0.0.0.0'
  }
};
router.get('/:username',function(req,res,next){
  if(users[req.params.username]){//�ж��û��Ѿ�����Ϊ����
    next();//�м��
  }else{
    next(new Error(req.params.username + ' is not exist'));
  }
});
router.get('/:username', function(req, res){
  res.send(JSON.stringify(users[req.params.username]));
});
router.put('/:username', function(req,res){
  res.send('Done');
});
module.exports = router;
