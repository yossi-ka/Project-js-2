"use strict";
const usersArr = JSON.parse(localStorage.getItem("users-fun"));
window.onload = () => {
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  if (currentUser.length === 0) window.location.replace("/index.html");
};
//  navigation
const user = document.querySelector(".user");
const score = document.querySelector(".score");
const currentUser = JSON.parse(localStorage.getItem("current-user"));
user.textContent = currentUser.name;
score.textContent += "  " + currentUser.score;
//  log out
const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", () => {
  localStorage.removeItem("current-user");
  window.location.replace("/index.html");
});

//  creating cells
const board = document.querySelector(".board");
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-row", i);
    cell.setAttribute("data-column", j);
    //  add color to the middle 4 squares
    if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
      cell.classList.add("red");
    } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
      cell.classList.add("yellow");
    }
    board.append(cell);
  }
}

const checkWinner = document.querySelector(".checkWinner");
const reset = document.querySelector(".reset");

//  i want to be:
let P = "red"; //  person's color
let C = "yellow"; //  computer's color
const howColor = document.querySelector(".how-color");
const redBtn = howColor.querySelectorAll("button")[0];
const yellowBtn = howColor.querySelectorAll("button")[1];
redBtn.addEventListener("click", () => {
  howColor.style.display = "none";
  board.style.display = "grid";
  checkWinner.style.display = "inline-block";
  reset.style.display = "inline-block";
  document.querySelector(".youre-color").style.display = "flex";
  document.querySelector(".hisColor").style.backgroundColor = "red";
});
yellowBtn.addEventListener("click", () => {
  P = "yellow";
  C = "red";
  howColor.style.display = "none";
  board.style.display = "grid";
  checkWinner.style.display = "inline-block";
  reset.style.display = "inline-block";
  document.querySelector(".youre-color").style.display = "flex";
  document.querySelector(".hisColor").style.backgroundColor = "yellow";
});

//  checks if his action is legal
function isLegal(i, j, color) {
  let control = [0, 0, 0, 0, 0, 0, 0, 0]; // controls the data of all directions

  let otherColor = () => {
    return color === "red" ? "yellow" : "red";
  };
  let k = 0;
  for (k = 0; k < 64; k++) {
    if (
      cells[k].getAttribute("data-row") === i &&
      cells[k].getAttribute("data-column") === j
    ) {
      break;
    }
  }
  //  After the loop, i = row, j = column

  //  direction 0 = right.
  if (j <= "5") {
    let next0 = cells[k].nextElementSibling;
    if (next0.classList.value.includes(otherColor()) && j <= "5") {
      for (let l = Number(j) + 1; l <= 7; l++) {
        if (next0.classList.value.includes(color)) {
          break;
        } else if (next0.classList.value.includes(otherColor())) {
          if (l === 7) control[0] = 0;
          else control[0]++;
        } else {
          control[0] = 0;
          break;
        }
        next0 = next0.nextElementSibling;
      }
    }
  }
  //  direction 1 = left.
  if (j >= "2") {
    let next1 = cells[k].previousElementSibling;
    if (next1.classList.value.includes(otherColor()) && j >= "2") {
      for (let l = Number(j) - 1; l >= 0; l--) {
        if (next1.classList.value.includes(color)) {
          break;
        } else if (next1.classList.value.includes(otherColor())) {
          if (l === 0) {
            control[1] = 0;
            break;
          } else control[1]++;
        } else {
          control[1] = 0;
          break;
        }
        next1 = next1.previousElementSibling;
      }
    }
  }
  //  direction 2 = top.
  if (i >= "2") {
    let next2 = cells[k - 8];
    if (next2.classList.value.includes(otherColor())) {
      for (let l = Number(i) - 1; l >= 0; l--) {
        if (next2.classList.value.includes(color)) {
          break;
        } else if (next2.classList.value.includes(otherColor())) {
          if (l === 0) {
            control[2] = 0;
            break;
          } else control[2]++;
        } else {
          control[2] = 0;
          break;
        }
        next2 = cells[Array.from(cells).indexOf(next2) - 8];
      }
    }
  }
  //  direction 3 = bottom.
  if (i <= "5") {
    let next3 = cells[k + 8];
    if (next3.classList.value.includes(otherColor())) {
      for (let l = Number(i) + 1; l <= 7; l++) {
        if (next3.classList.value.includes(color)) {
          break;
        } else if (next3.classList.value.includes(otherColor())) {
          if (l === 7) {
            control[3] = 0;
            break;
          } else control[3]++;
        } else {
          control[3] = 0;
          break;
        }
        next3 = cells[Array.from(cells).indexOf(next3) + 8];
      }
    }
  }
  //  direction 4 = right-bottom.
  if (i <= "5" && j <= "5") {
    let next4 = cells[k + 9];
    if (next4.classList.value.includes(otherColor())) {
      let m = Number(j);
      for (let l = Number(i) + 1; l <= 7; l++) {
        m++;
        if (next4.classList.value.includes(color)) {
          break;
        } else if (next4.classList.value.includes(otherColor())) {
          if (l === 7 || m === 7) {
            control[4] = 0;
            break;
          } else control[4]++;
        } else {
          control[4] = 0;
          break;
        }
        next4 = cells[Array.from(cells).indexOf(next4) + 9];
      }
    }
  }
  //  direction 5 = right-top.
  if (i >= "2" && j <= "5") {
    let next5 = cells[k - 7];
    if (next5.classList.value.includes(otherColor())) {
      let m = Number(j);
      for (let l = Number(i) - 1; l >= 0; l--) {
        m++;
        if (next5.classList.value.includes(color)) {
          break;
        } else if (next5.classList.value.includes(otherColor())) {
          if (l === 0 || m === 7) {
            control[5] = 0;
            break;
          } else control[5]++;
        } else {
          control[5] = 0;
          break;
        }
        next5 = cells[Array.from(cells).indexOf(next5) - 7];
      }
    }
  }
  //  direction 6 = left-bottom.
  if (i <= "5" && j >= "2") {
    let next6 = cells[k + 7];
    if (next6.classList.value.includes(otherColor())) {
      let m = Number(j);
      for (let l = Number(i) + 1; l <= 7; l++) {
        m--;
        if (next6.classList.value.includes(color)) {
          break;
        } else if (next6.classList.value.includes(otherColor())) {
          if (l === 7 || m === 0) {
            control[6] = 0;
            break;
          } else control[6]++;
        } else {
          control[6] = 0;
          break;
        }
        next6 = cells[Array.from(cells).indexOf(next6) + 7];
      }
    }
  }
  //  direction 7 = left-top.
  if (i >= "2" && j >= "2") {
    let next7 = cells[k - 9];
    if (next7.classList.value.includes(otherColor())) {
      let m = Number(j);
      for (let l = Number(i) - 1; l >= 0; l--) {
        m--;
        if (next7.classList.value.includes(color)) {
          break;
        } else if (next7.classList.value.includes(otherColor())) {
          if (l === 0 || m === 0) {
            control[7] = 0;
            break;
          } else control[7]++;
        } else {
          control[7] = 0;
          break;
        }
        next7 = cells[Array.from(cells).indexOf(next7) - 9];
      }
    }
  }

  let sum = control.reduce((total, value) => {
    return total + value;
  });
  control.push(sum);
  return control; //  returns an array with 9 places, the last place is the "sum" of the array
}

function reverse(ev, arr, clr) {
  ev.classList.add(clr);
  let otherColor = () => {
    if (clr === "red") return "yellow";
    return "red";
  };
  //  direction 0 = right.
  if (arr[0] > 0) {
    let next0 = ev.nextElementSibling;
    for (let i = 0; i < arr[0]; i++) {
      next0.classList.remove(otherColor());
      next0.classList.add(clr);
      next0 = next0.nextElementSibling;
    }
  }
  //  direction 1 = left.
  if (arr[1] > 0) {
    let next1 = ev.previousElementSibling;
    for (let i = 0; i < arr[1]; i++) {
      next1.classList.remove(otherColor());
      next1.classList.add(clr);
      next1 = next1.previousElementSibling;
    }
  }
  //  direction 2 = top.
  if (arr[2] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next2 = cells[current - 8];
    for (let i = 0; i < arr[2]; i++) {
      next2.classList.remove(otherColor());
      next2.classList.add(clr);
      current -= 8;
      next2 = cells[current - 8];
    }
  }
  //  direction 3 = bottom.
  if (arr[3] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next3 = cells[current + 8];
    for (let i = 0; i < arr[3]; i++) {
      next3.classList.remove(otherColor());
      next3.classList.add(clr);
      current += 8;
      next3 = cells[current + 8];
    }
  }

  //  direction 4 = right-bottom.
  if (arr[4] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next4 = cells[current + 9];
    for (let i = 0; i < arr[4]; i++) {
      next4.classList.remove(otherColor());
      next4.classList.add(clr);
      current += 9;
      next4 = cells[current + 9];
    }
  }
  //  direction 5 = right-top.
  if (arr[5] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next5 = cells[current - 7];
    for (let i = 0; i < arr[5]; i++) {
      next5.classList.remove(otherColor());
      next5.classList.add(clr);
      current -= 7;
      next5 = cells[current - 7];
    }
  }
  //  direction 6 = left-bottom.
  if (arr[6] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next6 = cells[current + 7];
    for (let i = 0; i < arr[6]; i++) {
      next6.classList.remove(otherColor());
      next6.classList.add(clr);
      current += 7;
      next6 = cells[current + 7];
    }
  }
  //  direction 7 = left-top.
  if (arr[7] > 0) {
    let current = Array.from(cells).indexOf(ev);
    let next7 = cells[current - 9];
    for (let i = 0; i < arr[7]; i++) {
      next7.classList.remove(otherColor());
      next7.classList.add(clr);
      current -= 9;
      next7 = cells[current - 9];
    }
  }
}

// checks who won
function whoWon() {
  let painted = 0;
  let red = 0;
  let yellow = 0;
  for (let slot of cells) {
    if (slot.classList.value.includes("red")) {
      painted++;
      red++;
    } else if (slot.classList.value.includes("yellow")) {
      painted++;
      yellow++;
    }
  }
  if ((red > yellow && P === "red") || (yellow > red && P === "yellow")) {
    document.querySelector(".youWin").style.display = "block";
    for (let i = 0; i < usersArr.length; i++) {
      if (currentUser.email === usersArr[i].email) {
        currentUser.score += 7;
        usersArr[i].score += 7;
        score.textContent = currentUser.score;
        localStorage.setItem("users-fun", JSON.stringify(usersArr));
        localStorage.setItem("current-user", JSON.stringify(currentUser));
      }
    }
  } else if (
    (red < yellow && P === "red") ||
    (yellow < red && P === "yellow")
  ) {
    document.querySelector(".youFailed").style.display = "block";
  } else {
    console.log("draw!");
  }
}

//  game loop
const cells = board.querySelectorAll(".cell");
let counter = 0;
board.addEventListener("click", put);
function put(event) {
  if (event.target.classList.value.includes("cell") && counter % 2 === 0) {
    const ev = event.target;
    let canPut = true;
    if (!ev.classList.value.includes("cell")) canPut = false; //  makes sure the user puts on a cell
    if (
      //  makes sure the user doesn't click on a painted square
      ev.classList.value.includes("red") ||
      ev.classList.value.includes("yellow")
    )
      canPut = false;
    let sumLegal = isLegal(
      ev.getAttribute("data-row"),
      ev.getAttribute("data-column"),
      P
    );
    if (sumLegal[8] === 0) {
      canPut = false;
    }
    if (canPut) {
      counter++;
      reverse(ev, sumLegal.slice(0, 8), P);
    }
    if (counter % 2 === 1) {
      //  computer's turn.
      setTimeout(computer, 2200);

      function computer() {
        let max = [0];
        let maxIndex = -1;
        for (let i = 0; i < 64; i++) {
          if (
            !(
              cells[i].classList.value.includes("red") ||
              cells[i].classList.value.includes("yellow")
            )
          ) {
            let lgl = isLegal(
              cells[i].getAttribute("data-row"),
              cells[i].getAttribute("data-column"),
              C
            );
            if (max[max.length - 1] < lgl[8]) {
              max = lgl;
              maxIndex = i;
            }
          }
        }
        if (max[max.length - 1] === 0) {
          whoWon();
          return;
        }
        counter++;
        reverse(cells[maxIndex], max.slice(0, 8), C);
      }
    }
  }
}

//  reset
document.querySelector(".reset").addEventListener("click", () => {
  location.reload();
});

//  Check who won
checkWinner.addEventListener("click", () => {
  whoWon();
});

//  play again
document.querySelectorAll(".again")[0].addEventListener("click", () => {
  location.reload();
});
document.querySelectorAll(".again")[1].addEventListener("click", () => {
  location.reload();
});
