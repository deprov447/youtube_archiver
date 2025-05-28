function search(req, res){
    console.log(req)
    const query = req.query.q;
    res.send(query)
}

module.exports = search