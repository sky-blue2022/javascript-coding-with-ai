$(document).ready(function () {
  const mockApi = "https://jsonplaceholder.typicode.com/photos?_limit=5";

  // Fetch images from JSONPlaceholder API
  $.getJSON(mockApi, function (data) {
    const slides = $(".slides");
    const slider = $("#slider");
    const loading = $("#loading");

    // Check if data is returned
    if (data && data.length) {
      // Populate slider with images
      data.forEach(function (item) {
        slides.append(`<img src="${item.url}" alt="${item.title}" />`);
      });

      // Hide loading indicator and show slider
      loading.hide();
      slider.show();

      // Slider functionality
      let currentIndex = 0;

      function showSlide(index) {
        slides.css("transform", `translateX(-${index * 100}%)`);
      }

      $(".prev").click(function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : data.length - 1;
        showSlide(currentIndex);
      });

      $(".next").click(function () {
        currentIndex = (currentIndex < data.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
      });
    } else {
      // Handle case where no data is returned
      loading.text("No images available.");
    }
  }).fail(function () {
    // Handle API errors
    $("#loading").text("Failed to load images.");
  });
});
