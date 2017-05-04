import rq from 'request';


const localeapp = 'https://api.localeapp.com';


function request(type, url, key, data={}) {
  return new Promise((resolve, reject) => {
    console.log(url);
    const fullUrl = `${localeapp}/v1/projects/${key}/${url.replace(/^\//, '')}`;
    console.log(fullUrl);

    rq.get(fullUrl, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else {
        resolve({ response, body });
      }
    });

    // jquery.ajax({
    //   url: fullUrl,
    //   type,
    //   data: JSON.stringify(data),
    //   dataType: 'json',
    //   contentType: 'application/json',
    //   beforeSend(request) {
    //     // request.setRequestHeader(
    //     //   'Authorization',
    //     //   'Token token=' + window.gon.current_user.authentication_token
    //     // );
    //   }
    // }).then(resolve, reject).fail(reject);
  });
};


export function localeappPull(key) {
  return request('GET', '/translations/all.yml', key);
};


export function localeappPush(key, file) {

};
