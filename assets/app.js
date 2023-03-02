var topics = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle",
  "sugar glider",
  "chincilla",
  "hedgehog",
];

function displayButton() {
  $("#animalButtons").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button class='btn mr-2 mb-2'>")
      .attr("data-animal", topics[i])
      .addClass("animalButton")
      .text(topics[i]);

    $("#animalButtons").append(button);
  }
}

$("#addAnimal").on("click", function (event) {
  event.preventDefault();
  var animal = $("#animal").val().trim().toLowerCase();
  topics.push(animal);
  displayButton();
});

function displayAnimalGIF() {
  var animal = $(this).attr("data-animal");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=nM33hY6owuDXKqa1jMH0g8lR05UiqbVL&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var GIF = $("<div class='card float-left my-3 mr-5'>");
      var pTag = $("<p class='my-2 pl-3'>").text(
        "Rating: " + results[i].rating
      );
      var animalImg = $("<img class='mx-3 mt-3'>").attr(
        "src",
        results[i].images.fixed_height.url
      );

      GIF.append(animalImg);
      GIF.append(pTag);
      $("#animalGIF").prepend(GIF);
    }
  });
}

$(document).on("click", ".animalButton", displayAnimalGIF);

displayButton();
