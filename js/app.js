/* =========================================================
   TalentSphere - Core Application
   ========================================================= */

window.showToast = function (message, type = "success") {

    const oldToast = document.querySelector(".ts-toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    let icon = "check-circle";

    if (type === "error") {
        icon = "alert-circle";
    } else if (type === "warning") {
        icon = "alert-triangle";
    }

    toast.className =
        "ts-toast fixed bottom-5 right-5 z-[9999] " +
        "flex items-center gap-3 rounded-xl px-5 py-3 " +
        "bg-slate-900 text-white shadow-xl";

    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    if (window.lucide) {
        lucide.createIcons();
    }

    setTimeout(() => {
        toast.remove();
    }, 3000);
};


/* =========================================================
   Local Storage
   ========================================================= */

window.TalentSphereStorage = {

    get(key, defaultValue = null) {

        try {

            const value = localStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : defaultValue;

        } catch (error) {

            console.error("Storage read error:", error);

            return defaultValue;
        }
    },


    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error("Storage write error:", error);

            return false;
        }
    },


    remove(key) {

        localStorage.removeItem(key);
    }

};


/* =========================================================
   Modal Functions
   ========================================================= */

window.openModal = function (id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("hidden");

    document.body.classList.add("overflow-hidden");
};


window.closeModal = function (id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("hidden");

    document.body.classList.remove("overflow-hidden");
};


/* =========================================================
   Format Currency
   ========================================================= */

window.formatCurrency = function (amount) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(amount);

};


/* =========================================================
   Format Date
   ========================================================= */

window.formatDate = function (date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
};


/* =========================================================
   Confirm Action
   ========================================================= */

window.confirmAction = function (
    message,
    callback
) {

    if (confirm(message)) {

        callback();

    }

};


/* =========================================================
   Initialize Icons
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (window.lucide) {

            lucide.createIcons();

        }

    }
);