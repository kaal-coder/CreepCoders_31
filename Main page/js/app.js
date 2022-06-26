const header= document.querySelector("header");


/* -----------------Sticky Navbars--------------------------- */
 function stickyNavbar(){
     header.classList.toggle("Scrolled",window.pageYOffset > 0);
 }


window.addEventListener("scroll",stickyNavbar);


var select = document.getElementById('category');

document.getElementById("button").onclick = function(){
    var value = select.value
    if (value == "Handloom")
    {
        window.location.href = "Handloom.html";
    }
    else if (value == "Handicraft")
    {
        window.location.href = "Handicrafts.html";
    }
};

