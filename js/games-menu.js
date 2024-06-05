const current = JSON.parse(localStorage.getItem("current-user"));
if (current[0] === null) window.location.replace("/index.html");
const h1 = document.querySelector("h1");
const user = document.querySelector(".user");
const score = document.querySelector(".score");
const cuurentUser = JSON.parse(localStorage.getItem("current-user"));
h1.textContent += " " + cuurentUser.name;
user.textContent = cuurentUser.name;
score.textContent += "  " + cuurentUser.score;
//  log out
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", () => {
  localStorage.removeItem("current-user");
  window.location.replace("/index.html");
});