//Função que calcula a distância baseado na longitude e latitude, do ponto 'A' ao ponto 'B'
export async function calculateDistance() {
  const origin = '22.5726,88.3639'; 
  const destination = '28.7041,77.1025'; 

  const url = `http://router.project-osrm.org/route/v1/driving/${origin};${destination}?overview=false`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
          const distance = data.routes[0].distance; 
          const duration = data.routes[0].duration; 
          console.log(`Distância: ${(distance / 1000).toFixed(2)} km`);
          console.log(`Tempo estimado de viagem: ${(duration / 60).toFixed(2)} minutos`);
      } else {
          console.log('Nenhuma rota encontrada');
      }
  } catch (error) {
      console.error("Erro ao calcular a distância:", error);
  }
}

// Função que formata um formato de texto retornado de uma api, deixando-o simplificado
export function simplifyAddress(address) {
  const components = address.split(',');
  const shortAddress = components.slice(0, 3).map(part => part.trim()).join(', ');
  return shortAddress;
}

// Função que cria um novo usuário no banco de dados
export async function createNewUser(nameInput, emailInput, passwordInput, phoneInput, addressInput, houseNumberInput) {
  try {
    const data = await fetch(`http://localhost:3000/users`).then((r) => r.json());
    let lastId = 1
    if (data.length >= 1) {
      lastId = parseFloat(data[data.length - 1].id) + 1
    }

    const addressApi = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${addressInput}, ${houseNumberInput}`).then((r) => r.json())

    const shortAddress = simplifyAddress(addressApi[0].display_name)

    const user = {
    id: lastId,
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    phone: phoneInput,
    cpf: "",
    profilePicture: "",
    address: [
      { id: 1,
        label: "Outros",
        latitude: addressApi[0].lat,
        longitude: addressApi[0].lon,
        street: shortAddress,
        house_Number: houseNumberInput,
        isDefault: true 
      }
    ],
    paymentMethods: [],
    favorites: [],
    orderHistory: []
  };

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const loader = document.querySelector('.content-loader');
    loader.classList.remove('display');

    if (response.ok) {
      loader.classList.add('display');
      localStorage.setItem('id', lastId + 1)
      location.href = 'src/pages/home.html';
    }
    
  } catch (e) {
    console.error(e);
  }
}

// FUNÇÃO QUE CRIA UM NOVO ENDEREÇO
export async function createNewAddress(street, houseNumber, label, isDefault, userId) {
  const url = `http://localhost:3000/users/${userId}`
  const userData = await fetch(url).then((r) => r.json())
  const addressData = userData.address

  let lastId = 1
  if (addressData.length >= 1) {
    lastId = addressData[addressData.length - 1].id + 1
  }

  addressData.forEach((ad) => {
    if (isDefault) {
      ad.isDefault = false
    }
  })

  const addressApi = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${street}, ${houseNumber}`).then((r) => r.json())

  const shortAddress = simplifyAddress(addressApi[0].display_name)

  const novoAddress = {
      id: lastId,
      label: label,
      latitude: addressApi[0].lat,
      longitude: addressApi[0].lon,
      street: shortAddress,
      house_Number: houseNumber,
      isDefault: isDefault
    }

  addressData.push(novoAddress)

  const response = await fetch('http://localhost:3000/users/' + userId, {
    method: 'PATCH',
    body: JSON.stringify({ address: addressData }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const loader = document.querySelector('.content-loader');
  loader.classList.remove('display');

  if (response.ok) {
    loader.classList.add('display');
  }
}

// FUNÇÃO QUE DELETA ENDEREÇOS
export async function deleteAddress(userId) {
  const content = document.querySelector('.modal');
  content.classList.add('delete');
  const textTop = document.querySelector('.delivery-address');
  const boxes = document.querySelectorAll('.box');

  if (content.classList.contains('delete')) {
    textTop.innerHTML = 'Selecione o endereço <br> que deseja remover';

    boxes.forEach((box) => {
      box.classList.add('delete-box');
    });
  }

  content.addEventListener('click', (ev) => {
    const container = ev.target
    
    if (container === content) {
      content.classList.remove('delete');
      boxes.forEach((box) => {
      box.classList.remove('delete-box');
      textTop.innerHTML = 'Endereço de entrega';
    });
    }
  })

  const closebtn = document.querySelector('.close-btn');
  closebtn.addEventListener('click', () => {
    content.classList.remove('delete');
    boxes.forEach((box) => {
      box.classList.remove('delete-box');
      textTop.innerHTML = 'Endereço de entrega';
    });
  });

  const url = `http://localhost:3000/users/${userId}`
  const userData = await fetch(url).then((r) => r.json()) 
  const address = userData.address

  if (address.length > 1) {
    boxes.forEach((box) => {
      box.addEventListener('click', async (el) => {
        const click = el.currentTarget.id
        const index = address.findIndex((i) => i.id === parseFloat(click))
        
        if (index !== -1) {
          address.splice(index, 1)
  
          const response = await fetch('http://localhost:3000/users/' + userId, {
            method: 'PATCH',
            body: JSON.stringify({ address }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          const loader = document.querySelector('.content-loader');
          loader.classList.remove('display');
      
          if (response.ok) {
            loader.classList.add('display');
            localStorage.setItem('id', lastId + 1)
            location.href = 'src/pages/home.html';
          }
        }
      })
    })
  } else {
    textTop.innerHTML = `Você tem somente ${address.length} endereço, <br> é necessário ter mais de um para remover`
  }
}

export async function openUserModal() {
  const modal = document.querySelector('.modal-profile')
  modal.classList.toggle('display')
  modal.classList.toggle('modal-open')

  const data = await fetch(`http://localhost:3000/users/${localStorage.getItem('id')}`)
  const user = await data.json()

  const nomeDeUser = user.name.split("")
  const newName = nomeDeUser[0].toUpperCase() + nomeDeUser.slice(1).join("")
  const userName = document.getElementById('user-name')
  userName.textContent = newName

  const paymentMethods = user.paymentMethods
  
  const profileButtonPayment = document.getElementById('current-payment')
  const icon = document.querySelector('.method-icon')
  const morePayment = document.querySelector('.more-payment')
  if (paymentMethods.length === 0) {
    profileButtonPayment.textContent = 'Adicionar Método de Pagamento'
    icon.classList.add('fa-solid', 'fa-plus')
      alert('chamar a função para criar um método')
  } else if (paymentMethods.length >= 1) {
    profileButtonPayment.textContent = 'Alterar Método de Pagamento'
    icon.classList.add('fa-solid', 'fa-pencil')
    morePayment.addEventListener('click', () => {
      const modal = document.querySelector('.switch-method-modal')
      modal.classList.remove('display')
      if (modal) {
        const modalProfile = document.querySelector('.modal-profile')
        modalProfile.classList.toggle('display')
        modalProfile.classList.toggle('modal-open')
        const closeBtn = document.querySelector('.back-btn')
        closeBtn.addEventListener('click', () => {
          modal.classList.add('display')
        })
        modal.addEventListener('click', (el) => {
          if (el.target === modal) {
            modal.classList.add('display')
          }
        })
      }

      renderPaymentMethods()
    })
  }
}

async function renderPaymentMethods() {
  const data = await fetch(`http://localhost:3000/users/${localStorage.getItem('id')}`).then((r) => r.json())

  const userPayment = data.paymentMethods

  const modalContent = document.querySelector('.content-methods')
  userPayment.forEach((pay) => {
    const addressBox = document.createElement('div')
    addressBox.classList.add('box', 'address-box')

    if (pay.isDefault) {
      addressBox.classList.remove('address-box')
      addressBox.classList.add('actual-address')
    }

    const divLabel = document.createElement('div')
    divLabel.classList.add('label-icon')
    const icon = document.createElement('i')
    icon.classList.add('icon')
    divLabel.append(icon)
    let payType = pay.type

    const card = document.createElement('span')
    const cardName = document.createElement('span')
    const expiryDate = document.createElement('span')

    payType = payType.charAt(0).toUpperCase() + payType.slice(1);
    if (payType === 'Cartão de crédito') {
      icon.classList.add('fa-solid', 'fa-credit-card'); 
      card.classList.add('street')
      card.textContent = pay.cardNumber

      cardName.classList.add('number-house')
      cardName.textContent = pay.cardName  

      expiryDate.classList.add('city')
      expiryDate.textContent = pay.expiryDate
    } else if (payType === 'Pix') {
      icon.classList.add('fa-brands', 'fa-pix'); 

      card.classList.add('street')
      card.textContent = pay.pixKey
    } else if (payType === 'Cartão de débito') {
      icon.classList.add('fa-regular', 'fa-credit-card');

      card.classList.add('street')
      card.textContent = pay.cardNumber 

      cardName.classList.add('number-house')
      cardName.textContent = pay.cardName 
      
      expiryDate.classList.add('city')
      expiryDate.textContent = pay.expiryDate
    } else if (payType === 'Dinheiro') {
      icon.classList.add('fa-solid', 'fa-sack-dollar'); 

      card.classList.add('street')
      card.textContent = 'Pagar na entrega' 
    } else {
      icon.classList.add('fa-solid', 'fa-coins'); 
      
      card.classList.add('street')
      card.textContent = 'Pagar na entrega' 
    }

    const restInfoDiv = document.createElement('div')
    restInfoDiv.classList.add('rest-infos')

    const labelPayment = document.createElement('span')
    labelPayment.classList.add('label-address')
    const labelToUpper = pay.type.charAt(0).toUpperCase() + pay.type.slice(1).toLowerCase();
    labelPayment.textContent = labelToUpper + ':'

    restInfoDiv.append(payType, card, cardName, expiryDate)
    
    const editAddress = document.createElement('div')
    editAddress.classList.add('edit-address')
    editAddress.id = pay.id
    const circleUm = document.createElement('i')
    circleUm.classList.add('fas', 'fa-circle')
    const circleDois = document.createElement('i')
    circleDois.classList.add('fas', 'fa-circle')
    const circleTres = document.createElement('i')
    circleTres.classList.add('fas', 'fa-circle')
    const pointsDiv = document.createElement('div')
    pointsDiv.classList.add('pontinhos')
    pointsDiv.id = pay.id
    circleUm.id = pay.id
    circleDois.id = pay.id
    circleTres.id = pay.id
    pointsDiv.append(circleUm, circleDois, circleTres)
    editAddress.append(pointsDiv)

    addressBox.id = pay.id
    addressBox.append(divLabel, restInfoDiv, editAddress)
    modalContent.append(addressBox, moreAddressDiv, deleteAddressDiv)
  });

  console.log(userPayment);
}