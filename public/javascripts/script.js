//Changes when save button is clicked
$(document).ready(function () {
  $("#save-button").click(function () {
    const copyText = document.getElementById("snippetName").value;
    $("#copy-button").removeClass("hidden");
    $("#snippetName").val("url/" + copyText);
    $("#save-button").text("Saved");
    $("#saving-snippet").text("Snippet Saved!");
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
$(document).ready(function () {
  resetForms();
});
function resetForms() {
  document.getElementById('snippet').reset();
}
