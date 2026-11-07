// File input and Drop zone
const fileInput = document.getElementById("file-input");
const dropText = document.querySelector("#drop-zone");

function clickConverter() {
  document.getElementById("file-input").click();
}

function dragoverHandler(event) {
  event.preventDefault();
}

function dropHandler(event) {
  event.preventDefault();
  document.getElementById("file-input").files = event.dataTransfer.files;
  showName();
  saveImage();
}

function inputHandler(event) {
  showName();
  saveImage();
}

// Save uploaded image
function saveImage() {

  const file = fileInput.files[0];

  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = function () 
  
  {
    try {
      sessionStorage.setItem("ticketImage", reader.result);
    } 
    
    catch (error) {
      console.log("Image could not be saved");
    }
  };

  reader.readAsDataURL(file);
}

// PNG and jpeg only, Max size 500kb
function showName() {
  var x = document.getElementById("file-input");
  var text = document.querySelector("#drop-zone p");
  var file = x.files[0];

  if (!file) {
    text.textContent = "Drag and drop or click to upload";
    return;
  }

  if (file.type != "image/jpeg" && file.type != "image/png") {
    alert("Only JPG or PNG files are allowed.");
    x.value = "";
    text.textContent = "Drag and drop or click to upload";
    return;
  }

  if (file.size > 500 * 1024) {
    alert("File is too big. Max size is 500KB.");
    x.value = "";
    text.textContent = "Drag and drop or click to upload";
    return;
  }

  text.textContent = file.name;
}

//Login in, stored data, savedetails
let form = document.forms["login"];

function saveDetails() {
    let users = [
        {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            username: document.getElementById("user").value,
            ticketNumber: String(Math.floor(100000 + Math.random() * 900000))
            .replaceAll("1", "A")
            .replaceAll("2", "B")
            .replaceAll("3", "C")
            .replaceAll("4", "D")
        }
    ];

    localStorage.setItem("users", JSON.stringify(users));
}

//Validate Github Username
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = form.elements["username_field"].value.trim();

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    try {
        let response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username.replace(/^@/, ""))}`
        );
        if (response.status === 200) {
            saveDetails();
            window.location.href = "ticket.html";
        } 
        
        else if (response.status === 404) {
            alert("GitHub username does not exist!");
        } 
        
        else {
            alert("Unable to verify username. Please try again.");
        }
        
    } catch (error) {
        alert("Network error. Please check your internet and try again.");
        console.error(error);
    }
});