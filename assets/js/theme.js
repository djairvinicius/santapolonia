const themeStorageKey = "santa-apolonia-theme";
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
let savedTheme;

try {
	savedTheme = window.localStorage.getItem(themeStorageKey);
} catch (error) {
	console.warn("Não foi possível ler a preferência de tema salva.", error);
}

document.documentElement.dataset.theme =
	savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme;

document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.querySelector("[data-theme-toggle]");
	if (!themeToggle) return;

	const updateThemeToggle = () => {
		const isDark = document.documentElement.dataset.theme === "dark";
		themeToggle.textContent = isDark ? "Ativar tema claro" : "Ativar tema escuro";
		themeToggle.setAttribute("aria-pressed", String(isDark));
	};

	updateThemeToggle();
	themeToggle.addEventListener("click", () => {
		const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = nextTheme;
		updateThemeToggle();

		try {
			window.localStorage.setItem(themeStorageKey, nextTheme);
		} catch (error) {
			console.warn("Não foi possível salvar a preferência de tema.", error);
		}
	});
});
