const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

router.get('/',function(req,res){
    res.render('login')
})

module.exports = router;