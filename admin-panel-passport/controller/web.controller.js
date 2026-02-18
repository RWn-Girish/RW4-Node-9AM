exports.webPage = async(req, res) => {
    try {
        return res.render('web/homepage');
    } catch (error) {
        console.log(error)
        return res.redirect("/web");
    }
}