import axios from "axios";

export default ({ url, data }) => {
  return new Promise((resolve, reject) => {
    let form = new FormData();
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    for (let key in data) {
      form.append(key, data[key]);
    }
    axios.post(url, form, config)
      .then(res => {
        resolve(res)
      })
    // ajax.open('POST', url);
    // ajax.setRequestHeader('Content-Type', 'multipart/form-data,boundary=---------------------------7d4a6d158c9')
    // ajax.send(form);
    // ajax.onreadystatechange = function () {
    //   if (ajax.readyState == 4 && ajax.status == 200) {
    //     resolve(ajax.responseText);
    //   } else {
    //     reject()
    //   }
    // };
  })

}