let myImage = document.querySelector("img");

myImage.onclick = () => {
    let mySrc = myImage.getAttribute("src");
    if (mySrc === "../imgs/fox-sleep.jpg") {
        myImage.setAttribute("src", "../imgs/fox-awake.jpg");
    } else {
        myImage.setAttribute("src", "../imgs/fox-sleep.jpg");
    }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
      setUserName();
    } else {
      localStorage.setItem("name", myName);
      myHeading.textContent = `Don't wake the Fox, ${myName}`;
    }
  }
  
myButton.onclick = () => {
    setUserName();
  };
  