const aws = require('../controllers/aws')


module.exports = (app) => {

    app.get('/describeInstances', async (req, res) => {
        const instanses = await aws.describeInstances()
        res.send(instanses)
    })

    app.post('/startInstances', async (req, res) => {
        const instances = req.body.instances;
        aws.startInstances(instances, function (err, result) {
            if (!err) {
                res.send(result)
            } else {
                res.sendStatus(500)
            }
        })
    })

    app.post('/stopInstances', async (req, res) => {
        const instances = req.body.instances;
        aws.stopInstances(instances, function (err, result) {
            if (!err) {
                res.send(result)
            } else {
                res.sendStatus(500)
            }
        })
    })
}