    var albumIMG;
    function go_image(){
      $("#imageInput")[0].click();
    }
    $(".ps-image .icon-close").on("click",function(){
      $(".ps-image").hide();
      $(".zp").hide();
    });
    window.onload = function() {
      window.workArea = document.querySelector('#workArea');
      window.avatorImg = document.querySelector('#avatorImg');
      window.imageShow = document.querySelector('#imageShow');
      window.mouseStartX = 0;
      window.mouseStartY = 0;
      window.initLength = {
        width: 0,
        height: 0
      };
      window.primitiveLength = {
        width: 0,
        height: 0
      };
      window.resizeValue = 0;
      window.showSide = document.querySelector('#overlayInner').clientWidth;
      window.croppedImageType = 'image/jpge';
      $(".ps-image").hide();
      $(".ps-image").attr("style","display: none;transition: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);");
    }
    function crop() {
      TMES('正在加载请求...');
      if (!avatorImg.src) return;
      let _cropCanvas = document.createElement('canvas');
      let _side = (showSide / avatorImg.offsetWidth) * primitiveLength.width;
      _cropCanvas.width = _side;
      _cropCanvas.height = _side;
      let _sy = (100 - avatorImg.offsetTop) / avatorImg.offsetHeight * primitiveLength.height;
      let _sx = (100 - avatorImg.offsetLeft) / avatorImg.offsetWidth * primitiveLength.width;
      _cropCanvas.getContext('2d').drawImage(avatorImg, _sx, _sy, _side, _side, 0, 0, _side, _side);
      let _lastImageData = _cropCanvas.toDataURL(croppedImageType);
     // $(".imageShow").attr("style","background: url("+_lastImageData+");background-size: 100%;");
      albumIMG = _lastImageData;
      $.post("/WeApi/Album/uploadIMG",{base64:_lastImageData, type: 'headiamge'},function(r){
        $(".TMES").remove();
        if(r.code==0){
            $(".ps-image").hide();
            $(".zp").hide();
            $(".user-info img").attr("src", "https://old.lianhe.art"+r.url);
            $(".ui-cover-head img").attr("src", "https://old.lianhe.art"+r.url);
        	TME.tips('替换成功');
        }else{
        	TME.warn(r.msg);
        }
      });
    }
    function ImageInputChanged(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        avatorImg.src = event.target.result;
        avatorImg.style.width = 'auto';
        avatorImg.style.height = 'auto';
        avatorImg.style.top = 'auto';
        avatorImg.style.left = 'auto';
      }
      reader.readAsDataURL(file);
      if(file!=null){
        $(".ps-image").show();
        $(".zp").show();
        file = null;
      }
    }
    function avatorImgChanged() {
      if (avatorImg.offsetWidth >= avatorImg.offsetHeight) {
        avatorImg.style.top = '100px';
        initLength.width = showSide * avatorImg.offsetWidth / avatorImg.offsetHeight;
        initLength.height = showSide;
      } else {
        avatorImg.style.left = '100px';
        initLength.height = showSide * avatorImg.offsetHeight / avatorImg.offsetWidth;
        initLength.width = showSide;
      }
      primitiveLength = {
        width: avatorImg.offsetWidth,
        height: avatorImg.offsetHeight
      };
      avatorImg.style.width = initLength.width + 'px';
      avatorImg.style.height = initLength.height + 'px';
    }
    function startDrag(e) {
      e.preventDefault();
      if (avatorImg.src) {
        window.mouseStartX = e.clientX;
        window.mouseStartY = e.clientY;
        workArea.addEventListener('mousemove', window.dragging, false);
        workArea.addEventListener('mouseup', window.clearDragEvent, false);
      }
    }
    function dragging(e) {
      if (!avatorImg.src) return;
      let _moveX = avatorImg.offsetLeft + e.clientX - mouseStartX;
      if (_moveX >= 100) {
        avatorImg.style.left = '100px';
        mouseStartX = e.clientX;
        return;
      } else if (_moveX <= 400 - avatorImg.offsetWidth) {
        _moveX = 400 - avatorImg.offsetWidth;
      }
      avatorImg.style.left = _moveX + 'px';
      mouseStartX = e.clientX;
      let _moveY = avatorImg.offsetTop + e.clientY - mouseStartY;
      if (_moveY >= 100) {
        avatorImg.style.top = '100px';
        mouseStartY = e.clientY;
        return;
      } else if (_moveY <= 400 - avatorImg.offsetHeight) {
        _moveY = 400 - avatorImg.offsetHeight;
      }
      avatorImg.style.top = _moveY + 'px';
      mouseStartY = e.clientY;
    }
    function resizeUp() {
      resizeValue += 10;
      resize();
    }
    function resizeDown() {
      resizeValue -= 10;
      resize();
    }
    function resize() {
      avatorImg.style.width = (resizeValue + 100) / 100 * initLength.width + 'px';
      avatorImg.style.height = (resizeValue + 100) / 100 * initLength.height + 'px';
    }
    function clearDragEvent() {
      workArea.removeEventListener('mousemove', window.dragging, false);
      workArea.removeEventListener('mouseup', window.clearDragEvent, false);
    }