$('#_uploadImages').click(function() {
    $('#_imagesInput').click();
  });
  
  $('#_imagesInput').on('change', function() {
    handleFileSelect();
  });
  
  function handleFileSelect() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
  
      var files = event.target.files; //FileList object
      var output = document.getElementById("frames");
      var dots = $('.nav-dots');
      var arrFilesCount = [];
      var start = $(output).find('li').length;
      var end = start + files.length;
      var nonImgCount = 0;
      for (var i = start; i < end; i++) {
        arrFilesCount.push(i);
      }
  
      if (start !== 0) {
        $(output).find('li > nav > a.prev').first().attr('href', '#slide-' + (end - 1));
        $(output).find('li > nav > a.next').last().attr('href', '#slide-' + start);
      }
  
      for (var i = 0; i < files.length; i++) {
  
        var file = files[i];
  
        //Only pics
        if (!file.type.match('image')) {
          nonImgCount++;
          continue;
        }
  
        var picReader = new FileReader();
        picReader.addEventListener("load", function(event) {
          var picFile = event.target;
  
          current_i = arrFilesCount.shift();
          if (current_i === 0) {
            prev_i = files.length - 1;
          } else {
            prev_i = current_i - 1;
          }
          if (arrFilesCount.length - nonImgCount === 0) {
            next_i = 0;
          } else {
            next_i = current_i + 1;
          }
  
          output.innerHTML = output.innerHTML + '<li id="slide-' + current_i + '" class="slide">' + "<img src='" + picFile.result + "'" + "title=''/>" + '<nav>' + '<a class="prev" href="#slide-' + prev_i + '">&larr;</a>' + '<a class="next" href="#slide-' + next_i + '">&rarr;</a>' + '</nav>' + '</li>'; // TODO: Enter Title
  
          $(dots).append('<a class="dot" href="#slide-' + current_i + '" />');
  
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
    } else {
      console.log("Your browser does not support File API");
    }
  }
  