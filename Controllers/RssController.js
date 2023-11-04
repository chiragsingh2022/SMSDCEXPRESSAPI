const Rss = require("../Models/Rss");

const GetRss = async (req, res) => {
    try {
        const getRss = await Rss.find(req.query);
        if (getRss) {
            res.status(200).send(getRss)
        }
        else {
            res.status(400).send(getRss)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

module.exports = { GetRss };