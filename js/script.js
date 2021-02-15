const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click',function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

//Check page name
var path = window.location.pathname;
var page = path.split("/").pop();
// if(page == "games.html"){
//     $('.main').css("height",`${$(window).height()}`);
// }