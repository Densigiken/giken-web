document.addEventListener("DOMContentLoaded",v=>{
    onscroll = function () {
        dev.innerHTML = `scroll = ${pageYOffset}`;
    }
    onscroll();
})