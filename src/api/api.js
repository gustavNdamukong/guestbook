
function fetchCollection(path) {
    // path is something like 'api/conferences'
    // ENV_API_ENDPOINT (defined in webpack.config.js) contains the URL of your local host name & port 
    // this code here below strips that of any trailing slash and path of any leading slash 
    const url = `${ENV_API_ENDPOINT.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    return fetch(url)
        .then(resp => resp.json())
        .then(json => {
            // view the returned raw data for debugging
            console.log("API REQUEST URL:", url);   
            console.log("FULL API RESPONSE:", json);   
            return json.member || json['hydra:member']; 
    });
}

export function findConferences() {
    return fetchCollection('api/conferences');
}

export function findComments(conference) {
    return fetchCollection('api/comments?conference='+conference.id);
}