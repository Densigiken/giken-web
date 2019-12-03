function layout() {
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
    const cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
    const content = Array.prototype.slice.call(document.getElementsByClassName("card_layout"));
    const button = document.getElementsByClassName("card_button")[0];
    let buttonHeight = parseFloat(getComputedStyle(button).height);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.height = `${parseFloat(getComputedStyle(content[i]).height) + buttonHeight}px`
    }
}
document.addEventListener("DOMContentLoaded", () => { layout() });
window.addEventListener("resize", () => { layout() });