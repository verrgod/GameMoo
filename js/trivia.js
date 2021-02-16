const mainButton = document.querySelector('.main-btn');

mainButton.addEventListener('click',function() {
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy')
        .then(function(response) {
            return response.json();
        })
        .then(function(results) {
            console.log(results);
            console.log(results[0].question)
        })
})



 