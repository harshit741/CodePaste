//Changes when save button is clicked
$(document).ready(function () {
  $('#save-button').click(function (e) {
    e.preventDefault();
    submit()
  });
});

//Copy input field when copy url is pressed
function copyLink() {
  var shareLink = document.getElementById("snippetName");
  shareLink.select();
  shareLink.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

//Reset form when reloaded
$(document).ready(() => { document.getElementById('snippet').reset()});


//CodeMirror
$(document).ready(() => {
  var code = $('#code-area')[0];
  var editor = CodeMirror.fromTextArea(code, {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'my-theme',
  })

  //Sumit function
  submit = () => {
    $.ajax({
      url: '/',
      type: 'POST',
      data: {
        code: editor.getValue(),
        snippetName: $('#snippetName').val()
      },
      success: (result) => {
        console.log(result)
        if (result.StatusCode == 200) {
          //Success
          const copyText = document.getElementById("snippetName").value;
          $("#copy-button").removeClass("hidden");
          $("#snippetName").val("localhost:3000/" + copyText);
          $("#save-button").text("Saved");
          $("#saving-snippet").text("Snippet Saved!");
          $("#save-button").attr('disabled', 'disabled');
          iziToast.success({
            title: 'Success',
            message: result.StatusMessage,
            position: 'topRight'
          });
        } else {
          iziToast.error({
            title: 'Error',
            message: result.StatusMessage,
            position: 'topRight'
          });
        }
      },
      error: (err) => {
        iziToast.error({
          title: 'Error',
          message: err.StatusMessage,
          position: 'topRight'
        });
      }
    });
  }
})
