// Pegando ano dinâmicamente 
const navElement = document.querySelector('header nav');
const currentYear = new Date().getFullYear();
navElement.innerHTML = `&copy; Copyright - Smile Saúde - ${currentYear}`;