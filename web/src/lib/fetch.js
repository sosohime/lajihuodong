import fetch from 'isomorphic-fetch';

const fetchDefaultOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
}

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default function request(url, options) {
    options = Object.assign(fetchDefaultOptions, options)
    options.body = options.body || {};
    options.body = JSON.stringify(options.body)
    
    return fetch(`${location.origin}${url}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({
            data
        }))
        .catch((err) => ({
            err
        }));
}