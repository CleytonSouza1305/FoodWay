import { createNewUser } from "./funcoes.js";
import { 
  validateAddress,
  validateHouseNumber,
  validatelEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateVisualAddress,
  validateVisualConfirmPassword,
  validateVisualEmail,
  validateVisualHouseNumber,
  validateVisualName, 
  validateVisualPassword,
  validateVisualPhone
} from "./regexs.js";

async function validateForm() {
  const dataUser = await fetch(`http://localhost:3000/users`).then((r) => r.json());
  validateVisualName();
  validateVisualEmail();
  validateVisualPassword();
  validateVisualConfirmPassword();
  validateVisualPhone();
  validateVisualAddress();
  validateVisualHouseNumber();

  try { 
    const form = document.querySelector('form');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const btn = document.getElementById('submit-btn');

      if (btn.textContent === 'Entrar') {
        const nameInput = document.getElementById('name').value.toLowerCase()
        const emailInput = document.getElementById('email').value
        const passwordInput = document.getElementById('password').value;
        
        let userFounded = false;
        dataUser.forEach((u) => {
          if (u.name === nameInput && u.email === emailInput && u.password === passwordInput) {
            localStorage.setItem('id', u.id);
            userFounded = true;
          }
        });

        const loader = document.querySelector('.content-loader');
        loader.classList.remove('display');

        if (userFounded) {
          setTimeout(() => {
            loader.classList.add('display');
            location.href = 'src/pages/home.html';
          }, 3000);
        } else {
          setTimeout(() => {
            loader.classList.add('display');
          }, 3000);
          
          setTimeout(() => {
            const infoDiv = document.querySelector('.infos-validate');
            infoDiv.classList.remove('display');

            const txt = document.querySelector('.info-p');
            txt.innerHTML = `O usuário <strong>"${nameInput}"</strong> não foi encontrado, <br> por favor <span class="have-account">Criar conta<span>`;
            txt.classList.add('color-erro');

            setTimeout(() => {
              txt.classList.remove('color-erro');
            }, 3000);
          }, 3000);
        }
      } else {
        // Lógica para criar conta
      }
    });

    const createAccountBtn = document.querySelectorAll('.have-account');
    createAccountBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        
        const confirmPassDiv = document.querySelector('.c-pass');
        confirmPassDiv.classList.add('display');

        const phoneDiv = document.querySelector('.phoneDiv');
        phoneDiv.classList.remove('display');

        const addressDiv = document.querySelector('.addressDiv');
        addressDiv.classList.remove('display');

        const houseNumberDiv = document.querySelector('.houseNumberDiv');
        houseNumberDiv.classList.remove('display');

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.textContent = 'Criar conta';

        const haveAccountDiv = document.querySelector('.have-account-div');
        haveAccountDiv.classList.add('display');

        submitBtn.style.margin = `${1}rem ${0}rem ${0}rem`; 

        submitBtn.addEventListener('click', () => {
          const name = validateName();
          const email = validatelEmail();
          const password = validatePassword();
          const phone = validatePhone();
          const address = validateAddress();
          const houseNumber = validateHouseNumber();

          const loader = document.querySelector('.content-loader');
          loader.classList.remove('display');

          if (name && email && password && phone && address && houseNumber) {
            const nameInput = document.getElementById('name').value.toLowerCase(); // toLowerCase aqui
            const emailInput = document.getElementById('email').value.toLowerCase(); // toLowerCase aqui
            const passwordInput = document.getElementById('password').value;
            const phoneInput = document.getElementById('phone').value;
            const addressInput = document.getElementById('address').value;
            const houseNumberInput = document.getElementById('address-number').value;

            const userExists = dataUser.some(u => u.email === emailInput || u.name === nameInput);
            if (userExists) {
              setTimeout(() => {
                const infoDiv = document.querySelector('.infos-validate');
                infoDiv.classList.remove('display');

                const txt = document.querySelector('.info-p');
                txt.classList.add('color-erro');

                txt.innerHTML = `Erro ao criar conta, usuário "<strong>${nameInput}</strong>" <br> existente ou email existente "<strong>${emailInput}</strong>"`;

                setTimeout(() => {
                  txt.classList.remove('color-erro');
                }, 3000);
              }, 3000);
            } else {
              createNewUser(nameInput, emailInput, passwordInput, phoneInput, addressInput, houseNumberInput);
            }

            setTimeout(() => {
              loader.classList.add('display');
            }, 3000);
          } else {
            setTimeout(() => {
              loader.classList.add('display');

              const infoDiv = document.querySelector('.infos-validate');
              infoDiv.classList.remove('display');

              const txt = document.querySelector('.info-p');
              txt.classList.add('color-erro');

              setTimeout(() => {
                txt.classList.remove('color-erro');
              }, 3000);
            }, 3000);
          }
        });
      });
    });
  } catch (e) {
    console.error(`Erro ao executar programa. ${e}`);
  }
}

validateForm();


