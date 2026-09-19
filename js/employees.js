/* =====================================================
   TALENTSPHERE - EMPLOYEES MODULE
===================================================== */


/* =====================================================
   DATA
===================================================== */

const STORAGE_KEY = "talentSphereEmployees";

const defaultEmployees = [
    {
        id: "EMP001",
        name: "Ananya Roy",
        department: "Engineering",
        designation: "Software Engineer",
        joiningDate: "2025-01-12",
        status: "Active"
    },
    {
        id: "EMP002",
        name: "Rahul Das",
        department: "Human Resources",
        designation: "HR Executive",
        joiningDate: "2024-08-15",
        status: "Active"
    },
    {
        id: "EMP003",
        name: "Priya Sen",
        department: "Marketing",
        designation: "Marketing Analyst",
        joiningDate: "2025-03-20",
        status: "Active"
    },
    {
        id: "EMP004",
        name: "Arjun Mehta",
        department: "Engineering",
        designation: "Frontend Developer",
        joiningDate: "2025-05-10",
        status: "On Leave"
    },
    {
        id: "EMP005",
        name: "Sneha Roy",
        department: "Finance",
        designation: "Financial Analyst",
        joiningDate: "2023-11-08",
        status: "Active"
    },
    {
        id: "EMP006",
        name: "Kunal Bose",
        department: "Engineering",
        designation: "Backend Developer",
        joiningDate: "2024-02-18",
        status: "Active"
    },
    {
        id: "EMP007",
        name: "Riya Das",
        department: "Marketing",
        designation: "Content Strategist",
        joiningDate: "2025-06-02",
        status: "Active"
    },
    {
        id: "EMP008",
        name: "Amit Sen",
        department: "Finance",
        designation: "Accountant",
        joiningDate: "2022-09-25",
        status: "Active"
    },
    {
        id: "EMP009",
        name: "Nisha Roy",
        department: "Human Resources",
        designation: "Talent Acquisition Specialist",
        joiningDate: "2024-11-14",
        status: "Active"
    },
    {
        id: "EMP010",
        name: "Aditya Sharma",
        department: "Engineering",
        designation: "ML Engineer",
        joiningDate: "2025-07-01",
        status: "Active"
    }
];

let employees = [];
let toastTimer;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const tableBody =
    document.getElementById("employeeTableBody");

const emptyState =
    document.getElementById("emptyState");

const employeeSearch =
    document.getElementById("employeeSearch");

const departmentFilter =
    document.getElementById("departmentFilter");

const statusFilter =
    document.getElementById("statusFilter");

const employeeModal =
    document.getElementById("employeeModal");

const employeeForm =
    document.getElementById("employeeForm");


/* =====================================================
   INITIALIZE
===================================================== */

function initializeApp() {

    loadEmployees();

    renderEmployees();

    updateStats();

    applySavedTheme();

    lucide.createIcons();
}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function loadEmployees() {

    const storedEmployees =
        localStorage.getItem(STORAGE_KEY);

    if (storedEmployees) {

        try {

            employees =
                JSON.parse(storedEmployees);

        } catch (error) {

            employees =
                [...defaultEmployees];

            saveEmployees();
        }

    } else {

        employees =
            [...defaultEmployees];

        saveEmployees();
    }
}


function saveEmployees() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(employees)
    );
}


/* =====================================================
   RENDER EMPLOYEES
===================================================== */

function renderEmployees() {

    const searchValue =
        employeeSearch.value.trim().toLowerCase();

    const departmentValue =
        departmentFilter.value;

    const statusValue =
        statusFilter.value;


    const filteredEmployees =
        employees.filter(employee => {

            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(searchValue) ||

                employee.id
                    .toLowerCase()
                    .includes(searchValue) ||

                employee.designation
                    .toLowerCase()
                    .includes(searchValue);


            const matchesDepartment =
                departmentValue === "all" ||
                employee.department === departmentValue;


            const matchesStatus =
                statusValue === "all" ||
                employee.status === statusValue;


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        });


    tableBody.innerHTML = "";


    if (filteredEmployees.length === 0) {

        emptyState.classList.remove("hidden");

    } else {

        emptyState.classList.add("hidden");


        filteredEmployees.forEach(employee => {

            const row =
                document.createElement("tr");

            row.className =
                "table-row";


            const initials =
                employee.name
                    .split(" ")
                    .map(word => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();


            const statusClass =
                getStatusClass(employee.status);


            row.innerHTML = `

                <td class="px-5 py-4">

                    <div class="flex items-center gap-3">

                        <div class="flex h-10 w-10 shrink-0
                                    items-center justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-blue-500 to-cyan-500
                                    text-xs font-bold text-white">

                            ${initials}

                        </div>


                        <div>

                            <p class="font-semibold
                                      text-slate-800
                                      dark:text-white">

                                ${escapeHTML(employee.name)}

                            </p>

                            <p class="text-xs text-slate-500">

                                ${escapeHTML(employee.id)}

                            </p>

                        </div>

                    </div>

                </td>


                <td class="px-5 py-4">

                    <span class="text-sm font-medium">

                        ${escapeHTML(employee.department)}

                    </span>

                </td>


                <td class="px-5 py-4">

                    <span class="text-sm
                                 text-slate-600
                                 dark:text-slate-300">

                        ${escapeHTML(employee.designation)}

                    </span>

                </td>


                <td class="px-5 py-4">

                    <span class="text-sm
                                 text-slate-600
                                 dark:text-slate-300">

                        ${formatDate(employee.joiningDate)}

                    </span>

                </td>


                <td class="px-5 py-4">

                    <span class="inline-flex items-center gap-1.5
                                 rounded-full px-3 py-1
                                 text-xs font-semibold
                                 ${statusClass}">

                        <span class="h-1.5 w-1.5
                                     rounded-full
                                     bg-current">
                        </span>

                        ${escapeHTML(employee.status)}

                    </span>

                </td>


                <td class="px-5 py-4">

                    <div class="flex justify-end gap-1">

                        <button
                            onclick="viewEmployee('${employee.id}')"
                            title="View"
                            class="rounded-lg p-2
                                   text-slate-500
                                   hover:bg-blue-50
                                   hover:text-blue-600
                                   dark:hover:bg-blue-500/10">

                            <i data-lucide="eye"
                               class="h-4 w-4"></i>

                        </button>


                        <button
                            onclick="editEmployee('${employee.id}')"
                            title="Edit"
                            class="rounded-lg p-2
                                   text-slate-500
                                   hover:bg-amber-50
                                   hover:text-amber-600
                                   dark:hover:bg-amber-500/10">

                            <i data-lucide="pencil"
                               class="h-4 w-4"></i>

                        </button>


                        <button
                            onclick="deleteEmployee('${employee.id}')"
                            title="Delete"
                            class="rounded-lg p-2
                                   text-slate-500
                                   hover:bg-red-50
                                   hover:text-red-600
                                   dark:hover:bg-red-500/10">

                            <i data-lucide="trash-2"
                               class="h-4 w-4"></i>

                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        });
    }


    document.getElementById("resultCount").textContent =
        `Showing ${filteredEmployees.length} employee${filteredEmployees.length !== 1 ? "s" : ""}`;


    lucide.createIcons();
}


/* =====================================================
   STATUS STYLE
===================================================== */

function getStatusClass(status) {

    if (status === "Active") {

        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

    }

    if (status === "On Leave") {

        return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";

    }

    return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
}


/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStats() {

    const total =
        employees.length;


    const active =
        employees.filter(
            employee => employee.status === "Active"
        ).length;


    const onLeave =
        employees.filter(
            employee => employee.status === "On Leave"
        ).length;


    const departments =
        new Set(
            employees.map(
                employee => employee.department
            )
        ).size;


    document.getElementById("totalEmployees")
        .textContent = total;

    document.getElementById("activeEmployees")
        .textContent = active;

    document.getElementById("leaveEmployees")
        .textContent = onLeave;

    document.getElementById("departmentCount")
        .textContent = departments;
}


/* =====================================================
   MODAL
===================================================== */

function openEmployeeModal(employee = null) {

    employeeModal.classList.remove("hidden");
    employeeModal.classList.add("flex");


    if (employee) {

        document.getElementById("modalTitle")
            .textContent = "Edit Employee";

        document.getElementById("saveButtonText")
            .textContent = "Update Employee";

        document.getElementById("editEmployeeId")
            .value = employee.id;

        document.getElementById("employeeName")
            .value = employee.name;

        document.getElementById("employeeId")
            .value = employee.id;

        document.getElementById("employeeId")
            .readOnly = true;

        document.getElementById("employeeDepartment")
            .value = employee.department;

        document.getElementById("employeeDesignation")
            .value = employee.designation;

        document.getElementById("employeeJoiningDate")
            .value = employee.joiningDate;

        document.getElementById("employeeStatus")
            .value = employee.status;

    } else {

        document.getElementById("modalTitle")
            .textContent = "Add Employee";

        document.getElementById("saveButtonText")
            .textContent = "Add Employee";

        document.getElementById("editEmployeeId")
            .value = "";

        employeeForm.reset();

        document.getElementById("employeeId")
            .readOnly = false;
    }


    document.body.classList.add("overflow-hidden");

    lucide.createIcons();
}


function closeEmployeeModal() {

    employeeModal.classList.add("hidden");
    employeeModal.classList.remove("flex");

    employeeForm.reset();

    document.getElementById("editEmployeeId")
        .value = "";

    document.getElementById("employeeId")
        .readOnly = false;

    document.getElementById("modalTitle")
        .textContent = "Add Employee";

    document.getElementById("saveButtonText")
        .textContent = "Add Employee";

    document.body.classList.remove("overflow-hidden");
}


/* =====================================================
   ADD / UPDATE EMPLOYEE
===================================================== */

employeeForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const editingId =
            document.getElementById("editEmployeeId")
                .value;


        const employeeId =
            document.getElementById("employeeId")
                .value
                .trim()
                .toUpperCase();


        const name =
            document.getElementById("employeeName")
                .value
                .trim();


        const department =
            document.getElementById("employeeDepartment")
                .value;


        const designation =
            document.getElementById("employeeDesignation")
                .value
                .trim();


        const joiningDate =
            document.getElementById("employeeJoiningDate")
                .value;


        const status =
            document.getElementById("employeeStatus")
                .value;


        if (!editingId) {

            const duplicate =
                employees.some(
                    employee =>
                        employee.id.toUpperCase() ===
                        employeeId
                );


            if (duplicate) {

                showToast(
                    "Duplicate ID",
                    "This employee ID already exists.",
                    "error"
                );

                return;
            }


            employees.push({

                id: employeeId,
                name,
                department,
                designation,
                joiningDate,
                status

            });


            showToast(
                "Employee Added",
                `${name} has been added successfully.`
            );

        } else {

            const index =
                employees.findIndex(
                    employee =>
                        employee.id === editingId
                );


            if (index !== -1) {

                employees[index] = {

                    id: editingId,
                    name,
                    department,
                    designation,
                    joiningDate,
                    status

                };
            }


            showToast(
                "Employee Updated",
                `${name}'s information has been updated.`
            );
        }


        saveEmployees();

        renderEmployees();

        updateStats();

        closeEmployeeModal();

    }
);


/* =====================================================
   EDIT EMPLOYEE
===================================================== */

function editEmployee(id) {

    const employee =
        employees.find(
            item => item.id === id
        );

    if (!employee) return;

    openEmployeeModal(employee);
}


/* =====================================================
   VIEW EMPLOYEE
   UPDATED: Opens Employee Details page
===================================================== */

function viewEmployee(id) {

    const employee =
        employees.find(
            item => item.id === id
        );

    if (!employee) {

        console.error(
            "Employee not found:",
            id
        );

        return;
    }


    /*
       employees.html and employee-details.html
       are both inside the pages folder.

       Therefore this relative path is correct:
       employee-details.html?id=EMP001
    */

    window.location.href =
        `employee-details.html?id=${encodeURIComponent(employee.id)}`;
}


/* =====================================================
   DELETE EMPLOYEE
===================================================== */

function deleteEmployee(id) {

    const employee =
        employees.find(
            item => item.id === id
        );

    if (!employee) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete ${employee.name}?`
        );


    if (!confirmed) return;


    employees =
        employees.filter(
            item => item.id !== id
        );


    saveEmployees();

    renderEmployees();

    updateStats();


    showToast(
        "Employee Deleted",
        `${employee.name} has been removed.`
    );
}


/* =====================================================
   FILTERS
===================================================== */

employeeSearch.addEventListener(
    "input",
    renderEmployees
);

departmentFilter.addEventListener(
    "change",
    renderEmployees
);

statusFilter.addEventListener(
    "change",
    renderEmployees
);


function clearFilters() {

    employeeSearch.value = "";

    departmentFilter.value = "all";

    statusFilter.value = "all";

    renderEmployees();
}


/* =====================================================
   GLOBAL SEARCH
===================================================== */

document.getElementById("globalSearch")
    .addEventListener(
        "input",
        function() {

            employeeSearch.value =
                this.value;

            renderEmployees();
        }
    );


/* =====================================================
   EXPORT CSV
===================================================== */

function exportEmployees() {

    if (employees.length === 0) {

        showToast(
            "No Data",
            "There are no employees to export.",
            "error"
        );

        return;
    }


    const headers = [

        "Employee ID",
        "Name",
        "Department",
        "Designation",
        "Joining Date",
        "Status"

    ];


    const rows =
        employees.map(employee => [

            employee.id,
            employee.name,
            employee.department,
            employee.designation,
            employee.joiningDate,
            employee.status

        ]);


    const csv =
        [
            headers,
            ...rows
        ]

        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )

        .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "TalentSphere_Employees.csv";

    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Export Complete",
        "Employee data has been downloaded as CSV."
    );
}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(dateString) {

    if (!dateString) return "-";


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   TOAST
===================================================== */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const icon =
        document.getElementById("toastIcon");


    document.getElementById("toastTitle")
        .textContent = title;

    document.getElementById("toastMessage")
        .textContent = message;


    if (type === "error") {

        icon.className =
            "flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400";

        icon.innerHTML =
            '<i data-lucide="circle-alert" class="h-5 w-5"></i>';

    } else {

        icon.className =
            "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";

        icon.innerHTML =
            '<i data-lucide="check" class="h-5 w-5"></i>';
    }


    toast.classList.remove("hidden");

    lucide.createIcons();


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.add("hidden");

            },
            3000
        );
}


/* =====================================================
   DARK MODE
===================================================== */

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "talentSphereTheme"
        );


    if (
        savedTheme === "dark" ||
        (
            !savedTheme &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        )
    ) {

        document.documentElement
            .classList.add("dark");

    } else {

        document.documentElement
            .classList.remove("dark");
    }


    updateThemeIcon();
}


function toggleTheme() {

    const isDark =
        document.documentElement
            .classList.toggle("dark");


    localStorage.setItem(
        "talentSphereTheme",
        isDark ? "dark" : "light"
    );


    updateThemeIcon();
}


function updateThemeIcon() {

    const icon =
        document.getElementById("themeIcon");

    if (!icon) return;


    icon.setAttribute(
        "data-lucide",
        document.documentElement
            .classList.contains("dark")
            ? "sun"
            : "moon"
    );


    lucide.createIcons();
}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function openSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");


    sidebar.classList.remove(
        "-translate-x-full"
    );

    overlay.classList.remove("hidden");
}


function closeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");


    sidebar.classList.add(
        "-translate-x-full"
    );

    overlay.classList.add("hidden");
}


/* =====================================================
   MODAL OUTSIDE CLICK
===================================================== */

employeeModal.addEventListener(
    "click",
    function(event) {

        if (event.target === employeeModal) {

            closeEmployeeModal();
        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            if (
                !employeeModal
                    .classList
                    .contains("hidden")
            ) {

                closeEmployeeModal();
            }
        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

initializeApp();