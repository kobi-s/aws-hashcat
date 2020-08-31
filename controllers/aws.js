const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.aws_region,
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
})

var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });


async function describeInstances() {

    const instances = await ec2.describeInstances().promise()
    
    if(instances) {
        return instances
    } else {
        throw new Error()
    }
}

function startInstances(InstanceIds, callback) {
    if(!InstanceIds) {
        throw new Error("InstanceIds not found")
    }
    var params = {
        InstanceIds: InstanceIds,
        DryRun: true
    };
    ec2.startInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.startInstances(params, function (err, data) {
                if (err) {
                    callback(err)

                } else if (data) {

                    callback(null, data.StartingInstances)
                }
            });
        } else {
            console.log("You don't have permission to start instances.");
        }
    })
}

function stopInstances(InstanceIds, callback) {
    var params = {
        InstanceIds: InstanceIds,
        DryRun: true
    };
    ec2.stopInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.stopInstances(params, function (err, data) {
                if (err) {
                    callback(err)

                } else if (data) {

                    callback(null, data.StoppingInstances)
                }
            });
        } else {
            console.log("You don't have permission to start instances.");
        }
    })
}

function rebootInstances(InstanceIds) {
    var params = {
        InstanceIds: InstanceIds,
        DryRun: true
    };
    ec2.rebootInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.stopInstances(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    console.log("Success", data);
                }
            });
        } else {
            console.log("You don't have permission to start instances.");
        }
    })
}

function monitorInstances(InstanceIds) {
    var params = {
        InstanceIds: InstanceIds,
        DryRun: true
    };

    ec2.monitorInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.monitorInstances(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    console.log("Success", data.InstanceMonitorings);
                }
            });
        } else {
            console.log("You don't have permission to change instance monitoring.");
        }
    });
}

function unmonitorInstances(InstanceIds) {
    var params = {
        InstanceIds: InstanceIds,
        DryRun: true
    };

    ec2.unmonitorInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.unmonitorInstances(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    console.log("Success", data.InstanceMonitorings);
                }
            });
        } else {
            console.log("You don't have permission to change instance monitoring.");
        }
    });
}


module.exports = {
    describeInstances,
    monitorInstances,
    unmonitorInstances,
    startInstances,
    stopInstances,
    rebootInstances
}