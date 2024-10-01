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
  console.log(user);

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
    
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}