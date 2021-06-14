function readGroupDataFile(file, callback) {
    var urlString = file;
    jQuery.ajax({
      type:'GET',
      url: urlString,
      processData:false,
      contentType: false,
      success: function(msg) {			// 성공시
        callback(msg)
      },error: function(msg) {			// 실패시
        console.log(msg)
      }
    });
  }