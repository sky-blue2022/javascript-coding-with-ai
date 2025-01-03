$(document).ready(function () {
  // Ensure modal is hidden when the page loads
  $("#modal").hide();

  // Show modal when the button is clicked
  $("#open-modal").click(function () {
    $("#modal").fadeIn();
  });

  // Hide modal when the close button is clicked
  $(".close").click(function () {
    $("#modal").fadeOut();
  });

  // Hide modal when clicking outside of the modal-content
  $(window).click(function (event) {
    if ($(event.target).is("#modal")) {
      $("#modal").fadeOut();
    }
  });
});
