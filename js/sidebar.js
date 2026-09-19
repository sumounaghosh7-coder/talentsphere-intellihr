/* =========================================================
   TalentSphere - Sidebar
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const sidebar =
            document.querySelector(".sidebar");

        const menuButton =
            document.querySelector(
                "[data-mobile-menu]"
            );

        const closeButton =
            document.querySelector(
                "[data-close-sidebar]"
            );


        /* Mobile menu */

        if (menuButton && sidebar) {

            menuButton.addEventListener(
                "click",
                function () {

                    sidebar.classList.toggle(
                        "mobile-open"
                    );

                }
            );

        }


        /* Close mobile sidebar */

        if (closeButton && sidebar) {

            closeButton.addEventListener(
                "click",
                function () {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }
            );

        }


        /* Close sidebar after navigation */

        document
            .querySelectorAll(".sidebar a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 768 &&
                            sidebar
                        ) {

                            sidebar.classList.remove(
                                "mobile-open"
                            );

                        }

                    }
                );

            });

    }
);