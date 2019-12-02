const layout = function layout(inp) {
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
    const cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
    const content = Array.prototype.slice.call(document.getElementsByClassName("card_layout"));
    const button = document.getElementsByClassName("card_button")[0];
    let buttonHeight = parseFloat(getComputedStyle(button).height);
    for (let i = 0; i < cards.length; i++) {
        console.log(parseFloat(getComputedStyle(content[i]).height)+"+"+buttonHeight+"=")
        cards[i].style.height = `${parseFloat(getComputedStyle(content[i]).height) + buttonHeight}px`
        console.log(cards[i].style.height);
        // card.style.height = "0px";
    };
    console.log(inp);
}
document.addEventListener("DOMContentLoaded", layout("load"));
window.addEventListener("resize", layout("resize"));