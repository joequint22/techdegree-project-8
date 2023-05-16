//animation on scroll 

   
    
    
    

        window.addEventListener('scroll', checkCards);
        checkCards()

        function checkCards(){
                const triggerBottom = window.innerHeight / 5 * 4;
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    const cardTop = card.getBoundingClientRect().top
                    if(cardTop < triggerBottom){
                        card.classList.add('show')
                    } else {
                        card.classList.remove('show')
                    }

                })
        }

        
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
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        </div>
    `
    });

    gridContainer.innerHTML = employeeHTML;
    console.log("hello world")

}


function displayModal(index){

    //use object destructuring make out template literal cleaner
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar-modal" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name-modal">${name.first} ${name.last}</h2>
            <p class="email-modal">${email}</p>
            <p class="city-modal">${city}</p>
            <hr />
            <div class="modal-info">
                <p>${phone}</p>
                <p class="address-modal">${street}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}</p>
            </div>
        </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
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





