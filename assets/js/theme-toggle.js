const btn = document.getElementById("display-theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = localStorage.getItem("theme");
if( currentTheme !== "dark" && currentTheme !== "light" ){
    currentTheme = prefersDarkScheme ? "dark" : "light";
}
document.body.classList.add(currentTheme + "-theme");

btn.addEventListener("click", function () {
    
    // invert the selection
    currentTheme = currentTheme === "light"
        ? "dark"
        : "light";

    // "reset" the theme class
    document.body.classList.remove("light-theme");
    document.body.classList.remove("dark-theme");
    // add new current
    document.body.classList.add(currentTheme + "-theme");

    localStorage.setItem("theme", currentTheme);
});