/* =========================================================
   TALENTSPHERE - EMPLOYEE DETAILS
   File: js/employee-details.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DEFAULT EMPLOYEE
       ===================================================== */

    const defaultEmployee = {
        id: "EMP001",
        name: "Ananya Roy",
        department: "Engineering",
        designation: "Software Engineer",
        role: "Software Engineer",
        joiningDate: "2025-01-12",
        status: "Active",
        email: "ananya.roy@talentsphere.com",
        phone: "+91 98765 43210",
        location: "Kolkata, India"
    };


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const employeeName = document.getElementById("employeeName");
    const employeeStatus = document.getElementById("employeeStatus");
    const employeeRole = document.getElementById("employeeRole");
    const employeeDepartment = document.getElementById("employeeDepartment");
    const employeeId = document.getElementById("employeeId");

    const profileAvatar = document.getElementById("profileAvatar");
    const employeeTenure = document.getElementById("employeeTenure");

    const infoEmployeeId = document.getElementById("infoEmployeeId");
    const infoDepartment = document.getElementById("infoDepartment");
    const infoDesignation = document.getElementById("infoDesignation");
    const infoJoiningDate = document.getElementById("infoJoiningDate");

    const attendanceCanvas = document.getElementById("attendanceChart");


    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    function getEmployees() {
        try {
            const storedEmployees =
                localStorage.getItem("talentSphereEmployees");

            if (!storedEmployees) {
                return [];
            }

            const employees = JSON.parse(storedEmployees);

            return Array.isArray(employees) ? employees : [];

        } catch (error) {
            console.error(
                "Error loading employees from LocalStorage:",
                error
            );

            return [];
        }
    }


    function getSelectedEmployee() {

        const employees = getEmployees();

        /* ---------------------------------------------
           Get employee ID from URL
           Example:
           employee-details.html?id=EMP001
           --------------------------------------------- */

        const params = new URLSearchParams(window.location.search);

        const requestedId = params.get("id");

        if (requestedId) {

            const employee = employees.find(
                emp =>
                    String(emp.id).toLowerCase() ===
                    String(requestedId).toLowerCase()
            );

            if (employee) {
                return employee;
            }
        }


        /* ---------------------------------------------
           If no URL ID, use first stored employee
           --------------------------------------------- */

        if (employees.length > 0) {
            return employees[0];
        }


        /* ---------------------------------------------
           Otherwise use default demo employee
           --------------------------------------------- */

        return defaultEmployee;
    }


    function getEmployeeDesignation(employee) {

        return (
            employee.designation ||
            employee.role ||
            employee.position ||
            "Employee"
        );
    }


    function getInitials(name) {

        if (!name) {
            return "EM";
        }

        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    }


    function formatJoiningDate(dateString) {

        if (!dateString) {
            return "Not Available";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }


    function calculateTenure(joiningDate) {

        if (!joiningDate) {
            return "0 Years";
        }

        const joining = new Date(joiningDate);
        const today = new Date();

        if (Number.isNaN(joining.getTime())) {
            return "0 Years";
        }

        if (joining > today) {
            return "0 Years";
        }

        let years = today.getFullYear() - joining.getFullYear();
        let months = today.getMonth() - joining.getMonth();

        if (
            months < 0 ||
            (
                months === 0 &&
                today.getDate() < joining.getDate()
            )
        ) {
            years--;
            months += 12;
        }

        if (years < 0) {
            years = 0;
        }

        if (years === 0) {

            if (months <= 0) {
                return "Less than 1 Month";
            }

            return `${months} Month${months > 1 ? "s" : ""}`;
        }

        if (months === 0) {
            return `${years} Year${years > 1 ? "s" : ""}`;
        }

        return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""}`;
    }


    /* =====================================================
       UPDATE PROFILE
       ===================================================== */

    function loadEmployee() {

        const employee = getSelectedEmployee();

        if (!employee) {
            console.warn("No employee found.");
            return;
        }

        const name =
            employee.name ||
            "Employee";

        const department =
            employee.department ||
            "Not Assigned";

        const designation =
            getEmployeeDesignation(employee);

        const id =
            employee.id ||
            "N/A";

        const status =
            employee.status ||
            "Active";

        const joiningDate =
            employee.joiningDate ||
            "";


        /* ---------------------------------------------
           Profile Hero
           --------------------------------------------- */

        if (employeeName) {
            employeeName.textContent = name;
        }

        if (employeeRole) {
            employeeRole.textContent = designation;
        }

        if (employeeDepartment) {
            employeeDepartment.textContent = department;
        }

        if (employeeId) {
            employeeId.textContent = id;
        }


        /* ---------------------------------------------
           Avatar
           --------------------------------------------- */

        if (profileAvatar) {
            profileAvatar.textContent = getInitials(name);
        }


        /* ---------------------------------------------
           Status
           --------------------------------------------- */

        if (employeeStatus) {

            employeeStatus.textContent = status;

            employeeStatus.className =
                "px-3 py-1 text-xs font-semibold rounded-full";

            const normalizedStatus =
                String(status).toLowerCase();

            if (normalizedStatus === "active") {

                employeeStatus.classList.add(
                    "bg-emerald-100",
                    "text-emerald-700",
                    "dark:bg-emerald-900/40",
                    "dark:text-emerald-400"
                );

            } else if (
                normalizedStatus === "on leave" ||
                normalizedStatus === "leave"
            ) {

                employeeStatus.classList.add(
                    "bg-orange-100",
                    "text-orange-700",
                    "dark:bg-orange-900/40",
                    "dark:text-orange-400"
                );

            } else if (
                normalizedStatus === "inactive" ||
                normalizedStatus === "terminated"
            ) {

                employeeStatus.classList.add(
                    "bg-red-100",
                    "text-red-700",
                    "dark:bg-red-900/40",
                    "dark:text-red-400"
                );

            } else {

                employeeStatus.classList.add(
                    "bg-slate-100",
                    "text-slate-700",
                    "dark:bg-slate-800",
                    "dark:text-slate-300"
                );
            }
        }


        /* ---------------------------------------------
           Employment Information
           --------------------------------------------- */

        if (infoEmployeeId) {
            infoEmployeeId.textContent = id;
        }

        if (infoDepartment) {
            infoDepartment.textContent = department;
        }

        if (infoDesignation) {
            infoDesignation.textContent = designation;
        }

        if (infoJoiningDate) {
            infoJoiningDate.textContent =
                formatJoiningDate(joiningDate);
        }


        /* ---------------------------------------------
           Tenure
           --------------------------------------------- */

        if (employeeTenure) {

            employeeTenure.textContent =
                calculateTenure(joiningDate);
        }
    }


    /* =====================================================
       ATTENDANCE CHART
       ===================================================== */

    let attendanceChart = null;


    function getChartTextColor() {

        return document.documentElement.classList.contains("dark")
            ? "#e2e8f0"
            : "#334155";
    }


    function getChartGridColor() {

        return document.documentElement.classList.contains("dark")
            ? "rgba(148, 163, 184, 0.15)"
            : "rgba(148, 163, 184, 0.20)";
    }


    function createAttendanceChart() {

        if (!attendanceCanvas) {
            return;
        }

        /* Destroy previous chart */

        if (attendanceChart) {
            attendanceChart.destroy();
            attendanceChart = null;
        }


        /* Check Chart.js */

        if (typeof Chart === "undefined") {

            console.error(
                "Chart.js is not loaded."
            );

            return;
        }


        const ctx =
            attendanceCanvas.getContext("2d");


        attendanceChart = new Chart(ctx, {

            type: "line",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],

                datasets: [

                    {
                        label: "Attendance Rate",

                        data: [
                            94,
                            96,
                            95,
                            98,
                            97,
                            95,
                            96,
                            98,
                            96
                        ],

                        borderColor: "#2563eb",

                        backgroundColor:
                            "rgba(37, 99, 235, 0.10)",

                        borderWidth: 3,

                        pointRadius: 4,

                        pointHoverRadius: 6,

                        pointBackgroundColor:
                            "#2563eb",

                        pointBorderColor:
                            "#ffffff",

                        pointBorderWidth: 2,

                        tension: 0.35,

                        fill: true
                    }

                ]
            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: "index"
                },

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                return (
                                    " Attendance: " +
                                    context.parsed.y +
                                    "%"
                                );
                            }
                        }
                    }
                },


                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: getChartTextColor()
                        }
                    },


                    y: {

                        min: 80,

                        max: 100,

                        ticks: {

                            stepSize: 5,

                            color: getChartTextColor(),

                            callback: function(value) {
                                return value + "%";
                            }
                        },

                        grid: {
                            color: getChartGridColor()
                        }
                    }
                }
            }
        });
    }


    /* =====================================================
       UPDATE CHART WHEN DARK MODE CHANGES
       ===================================================== */

    function updateChartTheme() {

        if (!attendanceChart) {
            return;
        }

        attendanceChart.options.scales.x.ticks.color =
            getChartTextColor();

        attendanceChart.options.scales.y.ticks.color =
            getChartTextColor();

        attendanceChart.options.scales.y.grid.color =
            getChartGridColor();

        attendanceChart.update();
    }


    /* =====================================================
       OBSERVE DARK MODE
       theme.js handles the actual theme toggle.
       We only update the chart here.
       ===================================================== */

    const themeObserver = new MutationObserver(() => {

        updateChartTheme();

        initializeIcons();

    });


    themeObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    /* =====================================================
       LUCIDE ICONS
       ===================================================== */

    function initializeIcons() {

        if (
            typeof lucide !== "undefined" &&
            typeof lucide.createIcons === "function"
        ) {

            lucide.createIcons();
        }
    }


    /* =====================================================
       EDIT EMPLOYEE
       ===================================================== */

    window.editEmployee = function () {

        const employee = getSelectedEmployee();

        if (!employee || !employee.id) {

            if (typeof showToast === "function") {

                showToast(
                    "Unable to edit employee.",
                    "Employee information was not found.",
                    "error"
                );

            } else {

                alert(
                    "Employee information was not found."
                );
            }

            return;
        }


        /*
         * Redirect to Employees page.
         *
         * The employees.js file should read:
         * ?edit=EMPLOYEE_ID
         *
         * Example:
         * employees.html?edit=EMP001
         */

        window.location.href =
            `employees.html?edit=${encodeURIComponent(employee.id)}`;
    };


    /* =====================================================
       DOWNLOAD EMPLOYEE REPORT
       ===================================================== */

    window.downloadReport = function () {

        const employee = getSelectedEmployee();

        if (!employee) {
            return;
        }


        const name =
            employee.name || "Employee";

        const id =
            employee.id || "N/A";

        const department =
            employee.department || "Not Assigned";

        const designation =
            getEmployeeDesignation(employee);

        const joiningDate =
            formatJoiningDate(employee.joiningDate);

        const status =
            employee.status || "Active";

        const tenure =
            calculateTenure(employee.joiningDate);


        const report = `
TALENTSPHERE
EMPLOYEE REPORT
========================================

Employee Name     : ${name}
Employee ID       : ${id}
Department        : ${department}
Designation       : ${designation}
Joining Date      : ${joiningDate}
Employment Status : ${status}
Tenure            : ${tenure}

----------------------------------------
Attendance Rate   : 96%
Performance       : 90%

----------------------------------------
Generated by TalentSphere
Smart Human Resource Management Platform
========================================
`.trim();


        const blob =
            new Blob(
                [report],
                {
                    type: "text/plain;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${id}-employee-report.txt`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        URL.revokeObjectURL(url);


        if (typeof showToast === "function") {

            showToast(
                "Report Downloaded",
                `${name}'s employee report has been downloaded.`,
                "success"
            );
        }
    };


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    function handleResize() {

        if (attendanceChart) {
            attendanceChart.resize();
        }
    }


    window.addEventListener(
        "resize",
        handleResize
    );


    /* =====================================================
       INITIALIZE EVERYTHING
       ===================================================== */

    loadEmployee();

    createAttendanceChart();

    initializeIcons();

    handleResize();

});