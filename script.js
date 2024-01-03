document.getElementById('currentYear').innerHTML = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  const icon = document.getElementById("mobile-menu");
  const menu = document.querySelector(".menu-links");

  icon.addEventListener("click", function () {
      menu.classList.toggle("open");
      icon.classList.toggle("open");
  });
});
