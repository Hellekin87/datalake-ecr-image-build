const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')
var fs = require('fs');

try {
    const username = core.getInput('username')
    const password = core.getInput('password')

    var tokenUrl = `https://api.datalake-dev.conti.de/token` 
    response = axios({
        method: 'post',
        url: tokenUrl,
        data: {
            user: username,
            password: password
          }
    })
    .then(function (response) {
        var token = response.data.token
        var credentialsUrl = `https://api.datalake-dev.conti.de/s3/credentials` 
        const request = axios.get(credentialsUrl,      
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token   
            }
        })
    
        request
        .then(result => {
            core.setOutput("AWS_ACCESS_KEY_ID", result.data.AccessKeyId)
            core.setOutput("AWS_SECRET_ACCESS_KEY", result.data.SecretAccessKey)
            core.setOutput("AWS_SESSION_TOKEN", result.data.SessionToken)
        })
        .catch(error => console.error(error))
     })
    .catch(errors => console.log(errors)); 

} catch (error) {
    core.setFailed(error.message)
}