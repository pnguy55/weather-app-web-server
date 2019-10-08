//imports
let fs = require('fs')
//function that pulls the JSON file and parse the JSON data
let api_key_getter = () => {
    let api_key_buffer = fs.readFileSync('src/api-keys/api-keys.json')
    let api_key_string = api_key_buffer.toString()
    let api_key_JSON = JSON.parse(api_key_string)
    return api_key_JSON
}
//exports
module.exports = api_key_getter