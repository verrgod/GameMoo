const mainButton = document.querySelector('.main-btn');

mainButton.addEventListener('click',function() {
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy')
    .then(response => {
        return response.json();
    })
    .then(results => {
        console.log(results);
    })
})

 