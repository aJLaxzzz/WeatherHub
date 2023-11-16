document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {
        var navIcon = link.querySelector(".nav-icon");
        var imageName = link.getAttribute("data-image");

        link.addEventListener("mouseover", function () {
            navIcon.src = "images/menu icons/" + imageName + "-cover.png";
        });

        link.addEventListener("mouseout", function () {
            navIcon.src = "images/menu icons/" + imageName + ".png";
        });
    });
});