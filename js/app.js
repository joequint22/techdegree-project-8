//animation on scroll 

   

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    const cards = document.querySelectorAll('.card');
    

        window.addEventListener('scroll', checkCards);
        checkCards()

        function checkCards(){
                const triggerBottom = window.innerHeight / 5 * 4;
                cards.forEach(card => {
                    const cardTop = card.getBoundingClientRect().top
                    if(cardTop < triggerBottom){
                        card.classList.add('show')
                    } else {
                        card.classList.remove('show')
                    }

                })
        }

        
    