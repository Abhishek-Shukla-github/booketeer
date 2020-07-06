let movieSelect = document.querySelector("#movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const total = document.querySelector("#total");
const seatCount = document.querySelector("#count");
const container = document.querySelector(".container");
let selectedSeats;
let ticketPrice = parseInt(movieSelect.value);

populateUI();

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("MovieName", movieIndex);
  localStorage.setItem("MoviePrice", moviePrice);
}

const updateCount = () => {
  selectedSeats = document.querySelectorAll(".row .seat.selected");
  seatCount.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("SelectedSeats", JSON.stringify(seatsIndex));
  console.log(seatsIndex);
};

//Movie Select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
});

//Retrieving data from local storage and populating it on UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("SelectedSeats"));
  if (selectedSeats.length > 0 && selectedSeats !== null) {
    selectedSeats.forEach((seat) => {
      seats[seat].classList.toggle("selected");
    });
  }
  const selectedMovieIndex = localStorage.getItem("MovieName");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  console.log("Populated" + selectedSeats);
}

//Seat Select
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCount();
  }
});

updateCount();
