const form = Document.getElementById('uploadForm')
console.log(input.target)

form.on("file", (evt)=> {
    const file = evt.files[0]
    console.log(file)
    //if (file.size <= 10485760) {
        /*console.log('Sending audio to server')
        const formData = new FormData();
        formData.append('audioupload', file);
        console.log('filesize is ', file.size)
        $.ajax({
            xhr: function () {
                const xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        const percentComplete = evt.loaded / evt.total;
                        //cidInfo.textContent = "Uploading " + Math.trunc(percentComplete * 100);
                    }
                }, false);
                //Download progress
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        const percentComplete = evt.loaded / evt.total;
                        //Do something with download progress
                        //console.log(percentComplete);
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: 'audioupload',
            processData: false, // important
            contentType: false, // important
            dataType: 'audioupload',
            data: formData,
            success: function (data) {
            }
        });}
    else{
        //file is too big, do you need a bigger file size cidreader upload? contact ciddistanceinteraction@gmail.com

        $.alert({
            title: 'File size exceeded',
            content: 'File size exceedes allowed max dimension. Document loaded ONLY locally. Do you need a custom CidReader solution? Feel free to contact <a href="mailto: ciddistanceinteraction@gmail.com">ciddistanceinteraction@gmail.com</a>',
            //columnClass: 'small',
            boxWidth: '30%',
            useBootstrap: false,
            buttons: {
                confirm: function () {
                }
            }
        });

    }
    */

});