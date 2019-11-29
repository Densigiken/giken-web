document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
});
window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
});