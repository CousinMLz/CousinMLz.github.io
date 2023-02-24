let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
      setUserName();
    } else {
      localStorage.setItem("name", myName);
      myHeading.textContent = `Try the games out, ${myName}!`;
    }
  }
  
myButton.onclick = () => {
    setUserName();
  };
  