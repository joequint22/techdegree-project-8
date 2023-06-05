//animation on scroll 


 //   function checkCards(){
 //   const triggerBottom = window.innerHeight / 5 * 4;
 //   const cards = document.querySelectorAll('.card');
 //       cards.forEach(card => {
 //           const cardTop = card.getBoundingClientRect().top
 //           if(cardTop < triggerBottom){
  //              card.classList.add('show')
  //          } else {
   //             card.classList.remove('show')
   //         }
//
//})
   // }



    //checkCards() 
  //  window.addEventListener('scroll', checkCards);


        
        
//Will hold the values from API
let employees = [];

//string literal that stores the url of the API
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';

//grid container stores the DOM element that is the container for the employees
const gridContainer = document.querySelector('.grid-container')

//overlay stores the DOM element that acts as an overlay for the modal
const overlay = document.querySelector('.overlay')

//modal container stores the DOM element that is a container for the modal information
const modalContainer = document.querySelector('.modal-content')

//modalClose stores the DOM element that is the modal's close button
const modalClose = document.querySelector('.modal-close')

//MODAL CONTROLS



//fetch data from API
fetch(urlAPI)
        .then(res => res.json())
        .then(res => res.results)
        .then(displayEmployees)
        .catch(err => console.log(err))



function displayEmployees(employeeData){
    employees = employeeData;
    

    //store the employee HTML as we create it
    let employeeHTML = '';
    
    // loop through each employee and crete HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

    //template literals make this so much cleaner
    employeeHTML += `
        <div class="card" data-index="${index}">
            <div class="card-container">
                <img class="avatar" src="${picture.large}"/>
                <div class="text-container">
                    <h2 class="name">${name.first} <hr class="hr-name"> ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        </div>
    `
    });

    gridContainer.innerHTML = employeeHTML;
}


function displayModal(index){



    //use object destructuring make out template literal cleaner
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `
        <button class="arrows left-arrow">${"<"}</button>
        <img class="avatar-modal" src="${picture.large}" />
        <button class="arrows right-arrow">${">"}</button>
        <div class="text-container-modal" data-index="${index}">
            <h2 class="name-modal">${name.first} ${name.last}
            <p class="email-modal">${email}</p>
            <p class="city-modal">${city}</p>
            <hr />
            <div class="modal-info">
                <p>${phone}</p>
                <p class="address-modal">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}</p>
            </div>
            
        </div>
    `




    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;      
    
    const rightArrow = document.querySelector(".right-arrow");
    const leftArrow = document.querySelector(".left-arrow");
    
    rightArrow.addEventListener("click", () => {
    const overlayCard = document.querySelector(".text-container-modal");
    let index = parseInt(overlayCard.getAttribute("data-index"))
        if (index !== employees.length - 1){
            index += 1;
            displayModal(index);
        }
        else {
            index -= 11;
            displayModal(index);

        }
    })

    leftArrow.addEventListener("click", () => {
    const overlayCard = document.querySelector(".text-container-modal");
    let index = parseInt(overlayCard.getAttribute('data-index'))
        if (index !== 0){
            index -= 1;
            displayModal(index);
        } else {
            index += 11;
            displayModal(index);

        }
    })                             
}


gridContainer.addEventListener('click', e => {
    //make sure the click is not on the gridContainer itself
    if(e.target !== gridContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }
});




modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});





// FILTER
const input = document.querySelector('.search-input');

input.addEventListener('keyup', e => {
    let userInput= e.target.value.toLowerCase();
    let names= document.querySelectorAll("h2");
    names.forEach(name => {
        if (name.textContent.toLowerCase().includes(userInput)) {
            name.closest('.card').style.display = 'grid';
        }else {
            name.closest('.card').style.display = 'none';
        }
    });
});
