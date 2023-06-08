module.exports.home = (req,res)=>{
    res.render('home',{
        title: 'Placement Cell',
        user: req.user,
    })
}