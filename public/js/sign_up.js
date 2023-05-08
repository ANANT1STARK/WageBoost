var popup = document.querySelector('.popup');

// Get the close button
var closeBtn = document.querySelector('.ok');

// When the user clicks the close button, hide the popup
closeBtn.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, hide it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }}