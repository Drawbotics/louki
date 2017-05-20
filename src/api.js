import rq from 'request';


const localeapp = 'https://api.localeapp.com';


function request(method, url, key, data) {
  return new Promise((resolve, reject) => {
    console.log(url);
    const fullUrl = `${localeapp}/v1/projects/${key}/${url.replace(/^\//, '')}`;
    console.log('fullurl', fullUrl);

    rq({
      method,
      url: fullUrl,
      formData: data ? {
        file: data,
      } : null,
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else {
        resolve({ response, body });
      }
    });
  });
}


export function localeappPull(key) {
  return request('GET', '/translations/all.yml', key);
};


export function localeappPush(key, file) {
  return request('POST', '/import', key, file);
};
