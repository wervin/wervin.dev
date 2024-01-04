document.getElementById('currentYear').innerHTML = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  const icon = document.getElementById("menu-icon");
  const wervin = document.getElementById("wervin-icon");
  const container = document.querySelector(".header-container");
  const menu = document.querySelector(".menu-links");

  icon.addEventListener("click", function () {
    container.classList.toggle("open");
    menu.classList.toggle("open");
  });

  wervin.addEventListener("click", function () {
    container.classList.remove("open");
    menu.classList.remove("open");
    document.documentElement.scrollTop = 0;
});

  menu.addEventListener("click", function () {
    container.classList.toggle("open");
    menu.classList.toggle("open");
  });
});
