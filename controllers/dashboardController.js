module.exports.home = (req,res)=>{
    res.render('dashboard', {
        title: 'Dashboard'
    })
}