var language_selection = document.getElementById("language-selection");

language_selection.addEventListener("click", function() {
    var language_switcher = this.getElementsByClassName("language-switcher")[0];
    language_switcher.classList.toggle("language-hidden");
});
