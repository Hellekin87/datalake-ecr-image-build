const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')
var fs = require('fs');
var FormData = require('form-data');

try {
    const username = core.getInput('username')
    const password = core.getInput('password')


    console.log("Username: " + username)
    console.log("Password: " + password)
 

    const params = new URLSearchParams({
        "name": "piplineName",
        "description": "Pipeline create by github action" 
    }).toString();

    var url = `${piplineServiceEndpoint}/apis/v1beta1/pipelines/upload?` + params
    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` } };

    response = axios.post(url, formData, config)
    .then(response => {
        console.log("response", response)
    })
    .catch(errors => console.log(errors)); 

    core.setOutput("AWS_ACCESS_KEY_ID", response['AWS_ACCESS_KEY_ID'])
    core.setOutput("AWS_SECRET_KEY_ID", response['AWS_SECRET_KEY_ID'])

} catch (error) {
    core.setFailed(error.message)
}