
export function MakeGetRequest(url, data, handler) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', handler);
    oReq.open('GET', url);
    oReq.send();
}

  
