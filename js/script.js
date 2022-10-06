//Global Scoped Variables 
const gallery = document.querySelector('div#gallery'); 
const body = document.querySelector('body'); 

const searchContainer = document.querySelector('div.search-container'); 
const apiUrl = 'https://randomuser.me/api/?nat=us&?inc=picture,name,email,location,cell,dob&results=12'; 

const createdUser = []; 
const createdCards = []; 
const createdModal = []; 

//Retrieves and gathers user information and pushes and/or places that information into arrays and functions 
fetchUserInfo(apiUrl)
.then(data => {
    const userdata = data.results; 
    createdUser.push(userdata); 
    createCreateUserCard(userdata);
})
.then(() => 
createModalWindow(createdUser)); 


//Helper functions for the program
function fetchUserInfo(url){
    return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error=> console.log('looks like there was a problem: ', error))
}
function checkStatus(response){
    if(response.ok){
      return Promise.resolve(response); 
    } else {
      return Promise.reject(new Error(response.statusText)); 
    }
  }; 

function createCreateUserCard(employeeInfo){
    employeeInfo.map((user, index) => {
        var newCard = `<div class="card" data-index="${index}">
            <div class="card-img-container">
            <img  src="${user.picture.large}"class="card-img"  alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
        </div>`
        createdCards.push(newCard); 
    })
    displayCard(); 
};

function displayCard(){
    createdCards.forEach(card => {
        gallery.insertAdjacentHTML('beforeend', card); 
    })
    modalOpens(); 
}

function formatDate(date){
    const dob = new Date(date); 

    var yyyy = dob.getFullYear(); 

    var mm = dob.getMonth() + 1; 
    if (mm < 10)
        mm = '0' + mm; 
    
    var dd = dob.getDate(); 
    if (dd < 10){
        dd = '0' + dd; 
    }

    const newDate = `${mm}/${dd}/${yyyy}`; 
    return newDate; 
}

function createModalWindow(employeeInfo){ 
    employeeInfo.forEach(employee => employee.map(info => {
        const newModal = ` 
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${info.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${info.name.first} ${info.name.last}</h3>
                <p class="modal-text">${info.email}</p>
                <p class="modal-text cap">${info.location.city}</p>
                <hr>
                <p class="modal-text"> ${info.cell}</p>
                <p class="modal-text"> ${info.location.street.number} ${info.location.street.name}, ${info.location.city} ${info.location.state}, ${info.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDate(info.dob.date)}</p>
            </div>
        </div>`; 
        createdModal.push(newModal);
    }) 
)}

//Card event listener for opening matching modal 
const modalOpens = () =>{
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
        let index = card.getAttribute('data-index'); 
        body.insertAdjacentHTML('beforeend', createdModal[index]); 
        //along with attachement of the modal created, there will also be the modal closes function waiting to be selected
        modalCloses(); 
    })
})
}; 

//close button event listener for closing the modal 
const modalCloses = () => {
    let container = document.querySelector('.modal-container'); 
    let closerBtn = document.querySelector('#modal-close-btn'); 
    closerBtn.addEventListener('click', (e) =>{
        container.remove(); 
    })
}
