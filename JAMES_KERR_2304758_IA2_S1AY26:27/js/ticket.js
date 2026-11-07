let fullname = localStorage.getItem("Full Name");
let email = localStorage.getItem("Email Address");
let user = localStorage.getItem("GitHub Username");
let ticketNumber = localStorage.getItem("ticketNumber");

let data = JSON.parse(localStorage.getItem("users"));

document.getElementById("ticketName").textContent = data[0].fullname;
document.getElementById("ticketUser").textContent = data[0].username;
document.getElementById("ticketNumber").textContent = "#" + data[0].ticketNumber;

document.getElementById("displayName").textContent = data[0].fullname;
document.getElementById("displayEmail").textContent = data[0].email;

const savedImage = sessionStorage.getItem("ticketImage");
if (savedImage) {
  document.getElementById("ticket-image").src = savedImage;
}

const d = new Date();
document.getElementById("date").innerHTML = d;