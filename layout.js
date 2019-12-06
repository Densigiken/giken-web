function layout() {
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
}
document.addEventListener("DOMContentLoaded", () => { layout() });
window.addEventListener("resize", () => { layout() });