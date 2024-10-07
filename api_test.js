let submit = document.querySelector(".submit");
let email = document.querySelector(".mail-inp");
let pass = document.querySelector(".pass-inp");
let form = document.querySelector(".register");

import fetch from 'node-fetch'; // or require('node-fetch') for older versions of Node.js

const apirespone = async (mail,pass) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
        password: pass,
      }),
    });

    // Use text() since the server sends a plain text response
    const data = await response.text(); 
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// Run the function
// apirespone();

form.addEventListener("submit", () =>{
  apirespone(email.value, pass.value)
});