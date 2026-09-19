/* =========================================================
   TalentSphere - Theme Manager
   ========================================================= */

(function () {

    const THEME_KEY = "talentSphereTheme";


    function getTheme() {

        return localStorage.getItem(THEME_KEY) || "light";

    }


    function applyTheme(theme) {

        if (theme === "dark") {

            document.documentElement.classList.add("dark");

        } else {

            document.documentElement.classList.remove("dark");

        }

        localStorage.setItem(
            THEME_KEY,
            theme
        );

    }


    function toggleTheme() {

        const currentTheme = getTheme();

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme(newTheme);

        if (typeof window.showToast === "function") {

            window.showToast(
                newTheme === "dark"
                    ? "Dark mode enabled"
                    : "Light mode enabled"
            );

        }

    }


    // Apply saved theme
    applyTheme(getTheme());


    window.TalentSphereTheme = {

        getTheme,

        applyTheme,

        toggleTheme

    };

})();