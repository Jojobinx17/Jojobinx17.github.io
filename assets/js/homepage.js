document.addEventListener("DOMContentLoaded", function () {
  // Event listeners for homepage effects

  document.getElementById("secret").addEventListener("click", function () {
    document.getElementById("little-monkey").style.display = "block";

    var squeak = new Audio("assets/sound/squeak.mp3");
    squeak.play();

    setTimeout(function () {
      document.getElementById("little-monkey").style.display = "none";
    }, 500);
  });

  let mouseoldx = 0;
  let mousedir = false;

  document.addEventListener("mousemove", function (mouseEvent) {
    // title effect
    const x = mouseEvent.clientX;
    const y = mouseEvent.clientY;

    var e = document.getElementById("title");

    var offsetx = ((window.innerWidth - x) / window.innerWidth) * 0.5 + -0.25;
    var offsety = ((window.innerHeight - y) / window.innerHeight) * 0.5 + -0.25;

    e.style.textShadow = "" + offsetx + "vw " + offsety + "vw 0.15vw black";

    // link effect
    const links = document.querySelectorAll(".colored-link");

    mousedir = mouseoldx > x ? true : false;
    mouseoldx = x;

    links.forEach(function (link) {
      const linkleft = link.getBoundingClientRect().left;
      const linkright = link.getBoundingClientRect().right;
      const linktop = link.getBoundingClientRect().top;
      const linkbottom = link.getBoundingClientRect().bottom;

      if (x > linkleft && x < linkright && y > linktop && y < linkbottom) {
        if (!link.classList.contains("mouse-over")) {
          link.classList.add("mouse-over");
          link.classList.add("mid-transition");
          if (mousedir == true) {
            link.classList.replace("colored-link-right", "colored-link-left");
          } else {
            link.classList.replace("colored-link-left", "colored-link-right");
          }
        }
      } else {
        if (link.classList.contains("mouse-over")) {
          link.classList.remove("mouse-over");
          link.classList.add("mid-transition");
          if (mousedir == true) {
            link.classList.replace("colored-link-right", "colored-link-left");
          } else {
            link.classList.replace("colored-link-left", "colored-link-right");
          }
        }
      }
    });
  });

  const links = document.querySelectorAll(".colored-link");
  links.forEach(function (link) {
    link.addEventListener("transitionend", function () {
      link.classList.remove("mid-transition");
    });
  });
});
