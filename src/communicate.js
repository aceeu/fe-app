
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

// const getFakeMembers = count => new Promise((resolves, rejects) => {
//     const api = `https://api.randomuser.me/?nat=US&results=${count}`
//     const request = new XMLHttpRequest()
//     request.open('GET', api)
//     request.onload = () => (request.status == 200) ?
//       resolves(JSON.parse(request.response).results) :
//       reject(Error(request.statusText))
//     request.onerror = (err) => rejects(err)
//     request.send()
//   })