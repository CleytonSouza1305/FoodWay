const userId = localStorage.getItem('id')

async function userData(id) {
  const url = `http://localhost:3000/users/${id}`

  try {
    const data = await fetch(url).then((r) => r.json())

    const addressEl = document.getElementById('address-for-delivery')
    data.address.forEach((ad) => {

      if (ad.isDefault) {
        addressEl.textContent = ad.street
        const currentyLabel = document.querySelector('.label-address')
        currentyLabel.textContent = ad.label + ':'

        const currentStreet = document.querySelector('.street')
        const components = ad.street.split(',')
        console.log(components);
        
        const shortAddress = components.slice(0, 2).map(part => part.trim()).join(', ');
        currentStreet.textContent = shortAddress
      }  
    });

    const avatar = document.getElementById('avatar')
    if (data.profilePicture !== "") {
      avatar.src = data.profilePicture
    }

    console.log(data);
  } catch (e) {
    console.error(`Erro ao executar função: ${e}`);
    
  }
}

userData(userId)

function switchAddress (addressArr) {
  const modal = document.querySelector('.modal')
}