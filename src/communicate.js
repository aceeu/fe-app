
export function get(url) {
    return new Promise((resolves, rejects) => {
        let req = new XMLHttpRequest();

        req.onload = () => {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    resolves(JSON.parse(req.response))
                } else {
                  rejects('There was a problem with the request.');
                }
              }
        };
        req.open('GET', url);
        req.setRequestHeader('Content-Type', 'text/json');
        req.send();    
    });
}

export function post(url, data) {
    return new Promise((resolves, rejects) => {
        let req = new XMLHttpRequest();

        req.onload = () => {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    console.log(`result: ${req.response}`);
                    resolves(JSON.parse(req.response))
                } else {
                  rejects('There was a problem with the request.');
                }
              }
        };
        req.open('POST', url);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));    
    });
}