const CONFIGURATION = {
  // API_URL: 'https://testmaker.api.westerops.com/',
  API_URL: 'http://localhost:8000/',
  WITH_CREDENTIALS: false,
  TOKEN_TYPE: 'JWT',
  // TIMEOUT: 10000,
};

function xmlFetch(config) {
  const URL = CONFIGURATION.API_URL + config.path;

  return new Promise((resolve, reject) => {
    const xmlHttpRequest = new XMLHttpRequest();
    // xmlHttpRequest.timeout = CONFIGURATION.TIMEOUT;

    xmlHttpRequest.ontimeout = () => reject('Timeout reached!');
    xmlHttpRequest.onload = () => {
      const { status, response } = xmlHttpRequest;

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        parsedResponse = response;
      }

      switch (parseInt(status / 100, 10)) {
        case 2: // Success
          resolve(parsedResponse);
          break;
        case 4: // Client Erro
          reject(parsedResponse);
          break;
        case 5: // Server Error
          reject(`Status: ${status}, Please contact with the backend system`);
          break;
        default:
          reject(`Unknown status! Status:${status}`);
      }
    };

    xmlHttpRequest.open(config.method, URL);
    xmlHttpRequest.withCredentials = CONFIGURATION.WITH_CREDENTIALS;

    if (config.sendToken) {
      xmlHttpRequest.setRequestHeader(
        'Authorization',
        `${CONFIGURATION.TOKEN_TYPE} ${window.localStorage.getItem('tokenTestMaker')}`,
      );
    }

    if (config.body) {
      const { body } = config;
      if (body instanceof FormData) {
        xmlHttpRequest.send(body);
      } else if (body instanceof Object) {
        xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(body));
      }
    } else xmlHttpRequest.send();
  });
}

export default xmlFetch;
