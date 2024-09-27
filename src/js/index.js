// import { 
//   validateAddress, 
//   validateConfirmPassword,
//   validateEmail, 
//   validateHouseNumber, 
//   validateName, 
//   validatePassword, 
//   reformatPhone, 
//   validateNumber

//    } from "./regexs.js";

// async function callApiUsers() {
//   return await fetch(`http://localhost:3000/users`).then((r) => r.json())
// }

// async function validateForm() {
//   const users = await callApiUsers()

//   const name = validateName('name')
//   const email = validateEmail('email')
//   const password = validatePassword('password')
//   const confirmPassword = validateConfirmPassword('password' ,'confirm-password')

//   const nameInput = document.getElementById('name')
//   const emailInput = document.getElementById('email')
//   const passwordInput = document.getElementById('password')

//   const infoValidateDiv = document.querySelector('.infos-validate')
  
//   const loader = document.querySelector('.content-loader');

// loader.classList.remove('display');

// setTimeout(() => {
//   loader.classList.add('display');

//   if (name && email && password && confirmPassword) {
//     let userFounded = false;

//     users.forEach((u) => {
//       if (u.name === nameInput.value && u.email === emailInput.value && u.password === passwordInput.value) {
//         console.log(u);
//         userFounded = true;
//       }
//     });

//     if (userFounded) {
//       location.href = '../src/pages/home.html'; 
//     } else {
//       infoValidateDiv.classList.remove('display')
//       const text = document.querySelector('.info-p')
//       text.textContent = 'Usuário não encontrado, por favor, cadastre-se!'

//       text.classList.add('color-erro')

//       setTimeout(() => {
//         text.classList.remove('color-erro')
//       }, 2 * 1000);
//     }

//   } else {
//     infoValidateDiv.classList.remove('display')
//     const text = document.querySelector('.info-p')
//     text.classList.add('color-erro')

//     setTimeout(() => {
//       text.classList.remove('color-erro')
//     }, 2 * 1000);
//   }
// }, 1000 * 2)
// }

// // const form = document.querySelector('form')
// // form.addEventListener('submit', (ev) => {
// //   ev.preventDefault()

// //   validateForm()
// // })

// // addEventListener('keypress', (event) => {
// //   const key = event.key

// //   if (key === 'Enter') {
// //     validateForm()
// //   }
// // })

// async function createAccount() {
//   const infoValidateDiv = document.querySelector('.infos-validate')
//   infoValidateDiv.classList.add('display')

//   const nameInput = document.getElementById('name')
//   const emailInput = document.getElementById('email')
//   const passwordnput = document.getElementById('password')
//   const phoneinput = document.getElementById('phone')
//   const addressInput = document.getElementById('address')
//   const numberInput = document.getElementById('address-number')

//   const confirmDiv = document.querySelector('.c-pass')
//   const addressNumberDiv = document.querySelector('.houseNumberDiv')
//   const phoneDiv = document.querySelector('.phoneDiv')
//   const addressDiv = document.querySelector('.addressDiv')

//   confirmDiv.classList.add('display')
//   phoneDiv.classList.remove('display')
//   addressDiv.classList.remove('display')
//   addressNumberDiv.classList.remove('display')

//   const users = await callApiUsers()
//   const lastUser = users[users.lenght - 1]

//   const name = validateName('name')
//   const email = validateEmail('email')
//   const password = validatePassword('password')

//   reformatPhone()
//   const phone = validateNumber('phone')

//   const address = validateAddress('address')
//   const houseNumber = validateHouseNumber('address-number')

//   console.log({ name, email, password, phone, address, houseNumber });
  


//   const sbmButton = document.getElementById('submit-btn')
//   sbmButton.textContent = 'Criar conta'

//   sbmButton.addEventListener('click', (ev) => {
//     ev.preventDefault()

//     if (name && email && password && phone && address && houseNumber) {
//       console.log(name);
//       console.log(email);
//       console.log(password);
//       console.log(phone);
//       console.log(address);
//       console.log(houseNumber);
      
//       console.log('criar conta e redirecionar');
//     } else {
//       console.log('erro');
//       console.log(name);
//       console.log(email);
//       console.log(password);
//       console.log(phone);
//       console.log(address);
//       console.log(houseNumber);
//     }

//     const newUser = {
//       id: lastUser + 1,
//       name: nameInput.value,
//       email: emailInput.value,
//       password: passwordnput.value,
//       phone: phoneinput.value,
//       cpf: "",
//       profilePicture: "",
//       address: [{ street: addressInput.value, houseNumber: numberInput.value }],
//       paymentMethods: [],
//       favorites: [],
//       orderHistory: []
//     }

//     console.log(newUser);
//   })
// }

// const createAccountBtn = document.getElementById('have-account')
// createAccountBtn.addEventListener('click', createAccount)
