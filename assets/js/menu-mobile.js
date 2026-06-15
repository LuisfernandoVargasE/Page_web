//Seleccionar mis dos elementos principales

let mobile_btn = document.querySelector(".navbar__mobile-btn");
let mobile_menu = document.querySelector(".menu-mobile");

//Funcion mostrar y ocultar menu para no repetir codigo

const showHiddenMenu = () => {
  let show = document.querySelector(".menu-mobile--show");

  if (show) {
    mobile_menu.classList.remove("menu-mobile--show");
  } else {
    mobile_menu.classList.add("menu-mobile--show");
  }
};

//Al dar click al boton del menu mostrar el memu de navegacion responsive

mobile_btn.addEventListener("click", showHiddenMenu);

// Al redimensionar la pantalla ocultar el menu si es necesario

window.addEventListener("resize", () => {
  let window_wi = document.body.clientWidth;

  if (window_wi >= "1000") {
    mobile_menu.classList.remove("menu-mobile--show");
  }
});

// Poder cerrar el menu con el boton X

let btn_close = document.querySelector(".menu-mobile__close");

btn_close.addEventListener("click", showHiddenMenu);

// Desplegar submenus

let menu_item = document.querySelectorAll(".menu-mobile__item");

menu_item.forEach((item) => {
  item.addEventListener("click", (event) => {
    let submenu = item.lastElementChild;

    if (submenu.className === "menu-mobile__submenu-mobile") {
      if (submenu.style.display === "block") {
        submenu.style.display = "none";
      } else {
        submenu.style.display = "block";
      }
    }
  });
});
