"use strict";
exports.urlTOBlob = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    xhr.send();
  });
}
exports.blobTOBase64 = function (blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    };
  });
}
exports.blobToFile = function (blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
}
exports.fileTOBase64 = function (file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    };
  });
}
exports.fileTOBlob = function (file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async function () {
      if (reader.result) {
        resolve(await base64TOBlob(reader.result));
      } else {
        reject(reader.error);
      }
    };
  });
}
exports.base64TOBlob = function (base64, MIMEtypes) {
  return new Promise(function (resolve, reject) {
    var binary = atob(base64.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    resolve(new Blob([new Uint8Array(array)], {
      type: MIMEtypes
    }));
  });
}

exports.elementTOImage = function (ele) {
  return new Promise(function (resolve, reject) {
    if (!ele) return reject('element is null');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = ele.offsetWidth;
    var height = ele.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(ele, 0, 0, width, height);
    var img = canvas.toDataURL('image/png');
    resolve(img);
  });
}