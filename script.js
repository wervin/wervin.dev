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

  // Replace inline onclick handlers with event listeners
  const downloadBtn = document.getElementById("download-cv-btn");
  const contactBtn = document.getElementById("contact-info-btn");
  const linkedinIcon = document.getElementById("linkedin-icon");
  const githubIcon = document.getElementById("github-icon");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function() {
      window.open('./assets/cv.pdf');
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", function() {
      location.href = './#contact';
    });
  }

  if (linkedinIcon) {
    linkedinIcon.addEventListener("click", function() {
      location.href = 'https://www.linkedin.com/in/vincent-werner-b067002a4';
    });
  }

  if (githubIcon) {
    githubIcon.addEventListener("click", function() {
      location.href = 'https://github.com/wervin';
    });
  }
});
