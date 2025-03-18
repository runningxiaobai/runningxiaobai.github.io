function checkWebp(callback) {
    var img = new Image();
    img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      callback(result);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  }

  function showImage(useWebp){
    var imgs = Array.from(document.querySelectorAll('img'));
  
    imgs.forEach(function(i){
      var src = i.attributes['data-src'].value;
  
      if (useWebp){
        src = src.replace(/\.png$/, '.webp');
      }
  
      i.src = src;
    });
  }
  
  checkWebp(showImage);