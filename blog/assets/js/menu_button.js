function menu(){
  var menu = document.querySelector(".menu_button");
  var nav = document.querySelector(".nav");

  menu.addEventListener("click", function(e){
    e.preventDefault();
    if (!(this.classList.contains('active'))) {
      this.classList.toggle("active");
      nav.classList.add("active");
    } else {
      this.classList.remove("active");
      nav.classList.remove("active");
    }
  });
}
menu();