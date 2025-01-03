$(document).ready(function () {
  const mockApi = "https://jsonplaceholder.typicode.com/users";

  // Fetch data from API
  $.getJSON(mockApi, function (data) {
    const dropdown = $("#dropdown");
    const loading = $("#loading");

    // Populate dropdown
    data.forEach(function (item) {
      dropdown.append(`<option value="${item.id}">${item.name}</option>`);
    });

    // Hide loading indicator and show dropdown
    loading.hide();
    dropdown.show();
  });
});
