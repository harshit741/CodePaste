//Changes when save button is clicked
$(document).ready(function () {
  $('#save-button').click(function (e) {
    e.preventDefault();
    submit()
  });
});

submit = () => {
  $.ajax({
    url: '/',
    type: 'POST',
    data: {
      code: $('#code-area').val(),
      snippetName: $('#snippetName').val()
    },
    success: function (result) {
      console.log(result)
      if (result.StatusCode == 200) {
        //Success
        const copyText = document.getElementById("snippetName").value;
        $("#copy-button").removeClass("hidden");
        $("#snippetName").val("url/" + copyText);
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
    error: function (err) {
      iziToast.error({
        title: 'Error',
        message: err.StatusMessage,
        position: 'topRight'
      });
    }
  });
}
//Copy input field when copy url is pressed
function copyLink() {
  var shareLink = document.getElementById("snippetName");
  shareLink.select();
  shareLink.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

//Reset form when reloaded
$(document).ready(function () {
  resetForms();
});
function resetForms() {
  document.getElementById('snippet').reset();
}

//CodeMirror
  $(document).ready(() => {
    var code = $('textarea')[0];
    var edtior = CodeMirror.fromTextArea(code, {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'my-theme',
    })
  })
