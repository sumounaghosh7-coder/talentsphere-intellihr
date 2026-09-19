/* =========================================================
   TalentSphere - Payroll Module
   File: js/payroll.js
   Responsibility: Payroll functionality and logic
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       STORAGE
       ===================================================== */

    const STORAGE_KEY = "talentSpherePayroll";

    let payrollRecords = [];
    let payrollChart = null;


    /* =====================================================
       DEFAULT PAYROLL DATA
       ===================================================== */

    const defaultPayroll = [
        {
            id: "PAY001",
            employeeId: "EMP001",
            employeeName: "Ananya Roy",
            department: "Engineering",
            month: "2026-09",
            basicSalary: 65000,
            allowance: 8500,
            deduction: 5200,
            status: "Processed"
        },

        {
            id: "PAY002",
            employeeId: "EMP002",
            employeeName: "Rahul Sen",
            department: "Engineering",
            month: "2026-09",
            basicSalary: 58000,
            allowance: 7000,
            deduction: 4600,
            status: "Processed"
        },

        {
            id: "PAY003",
            employeeId: "EMP003",
            employeeName: "Priya Das",
            department: "Human Resources",
            month: "2026-09",
            basicSalary: 52000,
            allowance: 6500,
            deduction: 4100,
            status: "Processed"
        },

        {
            id: "PAY004",
            employeeId: "EMP004",
            employeeName: "Arjun Mehta",
            department: "Marketing",
            month: "2026-09",
            basicSalary: 48000,
            allowance: 5500,
            deduction: 3500,
            status: "Pending"
        },

        {
            id: "PAY005",
            employeeId: "EMP005",
            employeeName: "Sneha Roy",
            department: "Finance",
            month: "2026-09",
            basicSalary: 61000,
            allowance: 8000,
            deduction: 4900,
            status: "Processed"
        },

        {
            id: "PAY006",
            employeeId: "EMP006",
            employeeName: "Rohan Gupta",
            department: "Sales",
            month: "2026-09",
            basicSalary: 45000,
            allowance: 6000,
            deduction: 3200,
            status: "Processed"
        },

        {
            id: "PAY007",
            employeeId: "EMP007",
            employeeName: "Ishita Das",
            department: "Design",
            month: "2026-09",
            basicSalary: 50000,
            allowance: 6500,
            deduction: 3900,
            status: "Pending"
        },

        {
            id: "PAY008",
            employeeId: "EMP008",
            employeeName: "Amit Ghosh",
            department: "Engineering",
            month: "2026-09",
            basicSalary: 72000,
            allowance: 9500,
            deduction: 6000,
            status: "Processed"
        }
    ];


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const tableBody =
        document.getElementById("payrollTableBody");

    const emptyState =
        document.getElementById("emptyState");

    const payrollSearch =
        document.getElementById("payrollSearch");

    const departmentFilter =
        document.getElementById("departmentFilter");

    const monthFilter =
        document.getElementById("monthFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const resultCount =
        document.getElementById("resultCount");

    const totalPayroll =
        document.getElementById("totalPayroll");

    const netPayroll =
        document.getElementById("netPayroll");

    const totalDeductions =
        document.getElementById("totalDeductions");

    const processedPayroll =
        document.getElementById("processedPayroll");

    const generatePayrollBtn =
        document.getElementById("generatePayrollBtn");

    const exportPayrollBtn =
        document.getElementById("exportPayrollBtn");

    const clearFiltersBtn =
        document.getElementById("clearFiltersBtn");

    const payrollModal =
        document.getElementById("payrollModal");

    const detailsModal =
        document.getElementById("detailsModal");

    const closePayrollModal =
        document.getElementById("closePayrollModal");

    const closeDetailsModal =
        document.getElementById("closeDetailsModal");

    const cancelPayrollBtn =
        document.getElementById("cancelPayrollBtn");

    const payrollForm =
        document.getElementById("payrollForm");

    const modalTitle =
        document.getElementById("modalTitle");

    const editPayrollId =
        document.getElementById("editPayrollId");

    const employeeName =
        document.getElementById("employeeName");

    const employeeId =
        document.getElementById("employeeId");

    const employeeDepartment =
        document.getElementById("employeeDepartment");

    const payrollMonth =
        document.getElementById("payrollMonth");

    const basicSalary =
        document.getElementById("basicSalary");

    const allowance =
        document.getElementById("allowance");

    const deduction =
        document.getElementById("deduction");

    const payrollStatus =
        document.getElementById("payrollStatus");

    const netSalaryPreview =
        document.getElementById("netSalaryPreview");

    const salaryDetails =
        document.getElementById("salaryDetails");


    /* =====================================================
       INITIALIZE
       ===================================================== */

    loadPayroll();

    setupDefaultMonth();

    renderPayroll();

    updateStatistics();

    updateSalaryPreview();

    createPayrollChart();

    initializeIcons();

    setupEvents();


    /* =====================================================
       LOAD PAYROLL
       ===================================================== */

    function loadPayroll() {

        try {

            const stored =
                localStorage.getItem(STORAGE_KEY);

            if (stored) {

                payrollRecords =
                    JSON.parse(stored);

            } else {

                payrollRecords =
                    [...defaultPayroll];

                savePayroll();

            }

        } catch (error) {

            console.error(
                "Failed to load payroll:",
                error
            );

            payrollRecords =
                [...defaultPayroll];

        }

    }


    /* =====================================================
       SAVE PAYROLL
       ===================================================== */

    function savePayroll() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(payrollRecords)
        );

    }


    /* =====================================================
       DEFAULT MONTH
       ===================================================== */

    function setupDefaultMonth() {

        if (!monthFilter.value) {

            monthFilter.value = "2026-09";

        }

        if (!payrollMonth.value) {

            payrollMonth.value = "2026-09";

        }

    }


    /* =====================================================
       CALCULATE NET SALARY
       ===================================================== */

    function calculateNetSalary(record) {

        const basic =
            Number(record.basicSalary) || 0;

        const allowanceValue =
            Number(record.allowance) || 0;

        const deductionValue =
            Number(record.deduction) || 0;

        return (
            basic +
            allowanceValue -
            deductionValue
        );

    }


    /* =====================================================
       GET FILTERED RECORDS
       ===================================================== */

    function getFilteredRecords() {

        const search =
            payrollSearch.value
                .trim()
                .toLowerCase();

        const department =
            departmentFilter.value;

        const month =
            monthFilter.value;

        const status =
            statusFilter.value;

        return payrollRecords.filter(record => {

            const matchesSearch =
                !search ||
                record.employeeName
                    .toLowerCase()
                    .includes(search) ||
                record.employeeId
                    .toLowerCase()
                    .includes(search);

            const matchesDepartment =
                department === "all" ||
                record.department === department;

            const matchesMonth =
                !month ||
                record.month === month;

            const matchesStatus =
                status === "all" ||
                record.status === status;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesMonth &&
                matchesStatus
            );

        });

    }


    /* =====================================================
       RENDER PAYROLL TABLE
       ===================================================== */

    function renderPayroll() {

        const records =
            getFilteredRecords();

        tableBody.innerHTML = "";

        if (records.length === 0) {

            emptyState.classList.remove("hidden");

        } else {

            emptyState.classList.add("hidden");

            records.forEach(record => {

                tableBody.appendChild(
                    createPayrollRow(record)
                );

            });

        }

        resultCount.textContent =
            `${records.length} record${records.length !== 1 ? "s" : ""}`;

        initializeIcons();

    }


    /* =====================================================
       CREATE TABLE ROW
       ===================================================== */

    function createPayrollRow(record) {

        const row =
            document.createElement("tr");

        row.className =
            "hover:bg-slate-50 dark:hover:bg-slate-800/50";


        const netSalary =
            calculateNetSalary(record);


        const statusClass =
            record.status === "Processed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";


        row.innerHTML = `

            <td class="px-5 py-4">

                <div class="flex items-center gap-3">

                    <div class="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">

                        <span class="text-sm font-semibold text-blue-600">
                            ${getInitials(record.employeeName)}
                        </span>

                    </div>

                    <div>

                        <p class="font-medium">
                            ${escapeHTML(record.employeeName)}
                        </p>

                        <p class="text-xs text-slate-500">
                            ${escapeHTML(record.employeeId)}
                        </p>

                    </div>

                </div>

            </td>


            <td class="px-5 py-4">
                ${escapeHTML(record.department)}
            </td>


            <td class="px-5 py-4">
                ${formatMonth(record.month)}
            </td>


            <td class="px-5 py-4 text-right">
                ${formatCurrency(record.basicSalary)}
            </td>


            <td class="px-5 py-4 text-right text-green-600">
                +${formatCurrency(record.allowance)}
            </td>


            <td class="px-5 py-4 text-right text-red-600">
                -${formatCurrency(record.deduction)}
            </td>


            <td class="px-5 py-4 text-right font-semibold">
                ${formatCurrency(netSalary)}
            </td>


            <td class="px-5 py-4 text-center">

                <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusClass}">

                    ${record.status}

                </span>

            </td>


            <td class="px-5 py-4">

                <div class="flex justify-center items-center gap-1">

                    <button
                        data-action="view"
                        data-id="${record.id}"
                        title="View"
                        class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">

                        <i data-lucide="eye"
                           class="w-4 h-4">
                        </i>

                    </button>


                    <button
                        data-action="edit"
                        data-id="${record.id}"
                        title="Edit"
                        class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">

                        <i data-lucide="pencil"
                           class="w-4 h-4">
                        </i>

                    </button>


                    <button
                        data-action="delete"
                        data-id="${record.id}"
                        title="Delete"
                        class="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">

                        <i data-lucide="trash-2"
                           class="w-4 h-4">
                        </i>

                    </button>

                </div>

            </td>

        `;


        return row;

    }


    /* =====================================================
       STATISTICS
       ===================================================== */

    function updateStatistics() {

        const month =
            monthFilter.value;

        const records =
            payrollRecords.filter(
                record => record.month === month
            );


        let gross = 0;
        let deductions = 0;
        let net = 0;
        let processed = 0;


        records.forEach(record => {

            const basic =
                Number(record.basicSalary) || 0;

            const allowanceValue =
                Number(record.allowance) || 0;

            const deductionValue =
                Number(record.deduction) || 0;

            gross +=
                basic +
                allowanceValue;

            deductions +=
                deductionValue;

            net +=
                calculateNetSalary(record);

            if (record.status === "Processed") {

                processed++;

            }

        });


        totalPayroll.textContent =
            formatCurrency(gross);

        netPayroll.textContent =
            formatCurrency(net);

        totalDeductions.textContent =
            formatCurrency(deductions);

        processedPayroll.textContent =
            processed;

        updateSummary(
            records
        );

    }


    /* =====================================================
       SUMMARY
       ===================================================== */

    function updateSummary(records) {

        let basic = 0;
        let allowances = 0;
        let deductions = 0;


        records.forEach(record => {

            basic +=
                Number(record.basicSalary) || 0;

            allowances +=
                Number(record.allowance) || 0;

            deductions +=
                Number(record.deduction) || 0;

        });


        const total =
            basic +
            allowances;


        document.getElementById(
            "summaryBasic"
        ).textContent =
            formatCurrency(basic);


        document.getElementById(
            "summaryAllowance"
        ).textContent =
            formatCurrency(allowances);


        document.getElementById(
            "summaryDeduction"
        ).textContent =
            formatCurrency(deductions);


        const basicPercent =
            total > 0
                ? (basic / total) * 100
                : 0;

        const allowancePercent =
            total > 0
                ? (allowances / total) * 100
                : 0;

        const deductionPercent =
            total > 0
                ? (deductions / total) * 100
                : 0;


        document.getElementById(
            "basicProgress"
        ).style.width =
            `${basicPercent}%`;


        document.getElementById(
            "allowanceProgress"
        ).style.width =
            `${allowancePercent}%`;


        document.getElementById(
            "deductionProgress"
        ).style.width =
            `${deductionPercent}%`;

    }


    /* =====================================================
       PAYROLL CHART
       ===================================================== */

    function createPayrollChart() {

        const canvas =
            document.getElementById(
                "payrollChart"
            );

        if (!canvas) return;


        const months = [
            "2026-04",
            "2026-05",
            "2026-06",
            "2026-07",
            "2026-08",
            "2026-09"
        ];


        const labels = [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
        ];


        const values =
            months.map(month => {

                return payrollRecords
                    .filter(
                        record =>
                            record.month === month
                    )
                    .reduce(
                        (total, record) =>
                            total +
                            calculateNetSalary(record),
                        0
                    );

            });


        if (typeof Chart === "undefined") {

            console.warn(
                "Chart.js is not available."
            );

            return;

        }


        if (payrollChart) {

            payrollChart.destroy();

        }


        const ctx =
            canvas.getContext("2d");


        payrollChart =
            new Chart(ctx, {

                type: "line",

                data: {

                    labels,

                    datasets: [

                        {

                            label:
                                "Net Payroll",

                            data:
                                values,

                            borderWidth: 3,

                            tension: 0.4,

                            fill: true,

                            backgroundColor:
                                "rgba(37, 99, 235, 0.10)",

                            borderColor:
                                "#2563eb",

                            pointRadius: 4,

                            pointHoverRadius: 6

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                callback: function(value) {

                                    return "₹" +
                                        Number(value)
                                            .toLocaleString("en-IN");

                                }

                            }

                        }

                    }

                }

            });

    }


    /* =====================================================
       OPEN ADD MODAL
       ===================================================== */

    function openAddModal() {

        payrollForm.reset();

        editPayrollId.value = "";

        modalTitle.textContent =
            "Generate Payroll";

        payrollStatus.value =
            "Processed";

        payrollMonth.value =
            monthFilter.value ||
            "2026-09";

        allowance.value = 0;

        deduction.value = 0;

        updateSalaryPreview();

        payrollModal.classList.remove(
            "hidden"
        );

        employeeName.focus();

    }


    /* =====================================================
       OPEN EDIT MODAL
       ===================================================== */

    function openEditModal(id) {

        const record =
            payrollRecords.find(
                item => item.id === id
            );

        if (!record) return;


        modalTitle.textContent =
            "Edit Payroll";


        editPayrollId.value =
            record.id;

        employeeName.value =
            record.employeeName;

        employeeId.value =
            record.employeeId;

        employeeDepartment.value =
            record.department;

        payrollMonth.value =
            record.month;

        basicSalary.value =
            record.basicSalary;

        allowance.value =
            record.allowance;

        deduction.value =
            record.deduction;

        payrollStatus.value =
            record.status;


        updateSalaryPreview();


        payrollModal.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       CLOSE PAYROLL MODAL
       ===================================================== */

    function closePayrollModalFunction() {

        payrollModal.classList.add(
            "hidden"
        );

        payrollForm.reset();

        editPayrollId.value = "";

    }


    /* =====================================================
       SAVE PAYROLL
       ===================================================== */

    function savePayrollRecord(event) {

        event.preventDefault();


        const name =
            employeeName.value.trim();

        const id =
            employeeId.value.trim();

        const department =
            employeeDepartment.value;

        const month =
            payrollMonth.value;

        const basic =
            Number(basicSalary.value) || 0;

        const allowanceValue =
            Number(allowance.value) || 0;

        const deductionValue =
            Number(deduction.value) || 0;

        const status =
            payrollStatus.value;


        if (!name || !id || !department || !month) {

            showNotification(
                "Error",
                "Please fill all required fields.",
                "error"
            );

            return;

        }


        if (basic <= 0) {

            showNotification(
                "Error",
                "Basic salary must be greater than zero.",
                "error"
            );

            return;

        }


        if (deductionValue > basic + allowanceValue) {

            showNotification(
                "Error",
                "Deduction cannot be greater than gross salary.",
                "error"
            );

            return;

        }


        const recordData = {

            employeeId: id,

            employeeName: name,

            department: department,

            month: month,

            basicSalary: basic,

            allowance: allowanceValue,

            deduction: deductionValue,

            status: status

        };


        const existingId =
            editPayrollId.value;


        if (existingId) {

            const index =
                payrollRecords.findIndex(
                    record =>
                        record.id === existingId
                );


            if (index !== -1) {

                payrollRecords[index] = {

                    ...payrollRecords[index],

                    ...recordData

                };

            }


            showNotification(
                "Updated",
                "Payroll record updated successfully.",
                "success"
            );

        } else {

            const newRecord = {

                id:
                    generatePayrollId(),

                ...recordData

            };


            payrollRecords.unshift(
                newRecord
            );


            showNotification(
                "Success",
                "Payroll generated successfully.",
                "success"
            );

        }


        savePayroll();

        closePayrollModalFunction();

        renderPayroll();

        updateStatistics();

        createPayrollChart();

    }


    /* =====================================================
       VIEW PAYROLL
       ===================================================== */

    function viewPayroll(id) {

        const record =
            payrollRecords.find(
                item => item.id === id
            );

        if (!record) return;


        const net =
            calculateNetSalary(record);


        salaryDetails.innerHTML = `

            <div class="space-y-5">

                <div class="flex items-center gap-4">

                    <div class="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">

                        <span class="text-lg font-bold text-blue-600">
                            ${getInitials(record.employeeName)}
                        </span>

                    </div>

                    <div>

                        <h3 class="text-lg font-bold">
                            ${escapeHTML(record.employeeName)}
                        </h3>

                        <p class="text-sm text-slate-500">
                            ${escapeHTML(record.employeeId)}
                        </p>

                    </div>

                </div>


                <div class="grid grid-cols-2 gap-4">

                    ${detailItem(
                        "Department",
                        record.department
                    )}

                    ${detailItem(
                        "Payroll Month",
                        formatMonth(record.month)
                    )}

                    ${detailItem(
                        "Basic Salary",
                        formatCurrency(record.basicSalary)
                    )}

                    ${detailItem(
                        "Allowance",
                        formatCurrency(record.allowance)
                    )}

                    ${detailItem(
                        "Deduction",
                        formatCurrency(record.deduction)
                    )}

                    ${detailItem(
                        "Status",
                        record.status
                    )}

                </div>


                <div class="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-5">

                    <div class="flex justify-between items-center">

                        <span class="text-sm text-slate-500">
                            Net Salary
                        </span>

                        <span class="text-2xl font-bold text-blue-600">
                            ${formatCurrency(net)}
                        </span>

                    </div>

                </div>


                <div class="flex justify-end">

                    <button
                        data-detail-edit="${record.id}"
                        class="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">

                        Edit Payroll

                    </button>

                </div>

            </div>

        `;


        detailsModal.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       DETAIL ITEM
       ===================================================== */

    function detailItem(label, value) {

        return `

            <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-950">

                <p class="text-xs text-slate-500">
                    ${label}
                </p>

                <p class="font-medium mt-1">
                    ${escapeHTML(String(value))}
                </p>

            </div>

        `;

    }


    /* =====================================================
       DELETE PAYROLL
       ===================================================== */

    function deletePayroll(id) {

        const record =
            payrollRecords.find(
                item => item.id === id
            );

        if (!record) return;


        const confirmed =
            window.confirm(
                `Delete payroll record for ${record.employeeName}?`
            );


        if (!confirmed) return;


        payrollRecords =
            payrollRecords.filter(
                item => item.id !== id
            );


        savePayroll();

        renderPayroll();

        updateStatistics();

        createPayrollChart();


        showNotification(
            "Deleted",
            "Payroll record deleted successfully.",
            "success"
        );

    }


    /* =====================================================
       EXPORT CSV
       ===================================================== */

    function exportCSV() {

        const records =
            getFilteredRecords();


        if (records.length === 0) {

            showNotification(
                "Export",
                "No payroll records available.",
                "error"
            );

            return;

        }


        const headers = [

            "Payroll ID",

            "Employee ID",

            "Employee Name",

            "Department",

            "Month",

            "Basic Salary",

            "Allowance",

            "Deduction",

            "Net Salary",

            "Status"

        ];


        const rows =
            records.map(record => [

                record.id,

                record.employeeId,

                record.employeeName,

                record.department,

                record.month,

                record.basicSalary,

                record.allowance,

                record.deduction,

                calculateNetSalary(record),

                record.status

            ]);


        const csvContent = [

            headers,

            ...rows

        ]

            .map(row =>
                row
                    .map(csvEscape)
                    .join(",")
            )

            .join("\n");


        const blob =
            new Blob(
                [csvContent],
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
            `talentsphere-payroll-${monthFilter.value || "all"}.csv`;


        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);


        showNotification(
            "Exported",
            "Payroll CSV downloaded successfully.",
            "success"
        );

    }


    /* =====================================================
       CLEAR FILTERS
       ===================================================== */

    function clearFilters() {

        payrollSearch.value = "";

        departmentFilter.value =
            "all";

        statusFilter.value =
            "all";

        monthFilter.value =
            "2026-09";


        renderPayroll();

        updateStatistics();

        createPayrollChart();

    }


    /* =====================================================
       SALARY PREVIEW
       ===================================================== */

    function updateSalaryPreview() {

        const basic =
            Number(basicSalary.value) || 0;

        const allowanceValue =
            Number(allowance.value) || 0;

        const deductionValue =
            Number(deduction.value) || 0;


        const net =
            basic +
            allowanceValue -
            deductionValue;


        netSalaryPreview.textContent =
            formatCurrency(
                Math.max(net, 0)
            );

    }


    /* =====================================================
       GENERATE PAYROLL ID
       ===================================================== */

    function generatePayrollId() {

        let number =
            payrollRecords.length + 1;

        let id =
            `PAY${String(number).padStart(3, "0")}`;


        while (
            payrollRecords.some(
                record => record.id === id
            )
        ) {

            number++;

            id =
                `PAY${String(number).padStart(3, "0")}`;

        }


        return id;

    }


    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    function setupEvents() {

        payrollSearch.addEventListener(
            "input",
            renderPayroll
        );


        departmentFilter.addEventListener(
            "change",
            () => {

                renderPayroll();

                updateStatistics();

            }
        );


        monthFilter.addEventListener(
            "change",
            () => {

                renderPayroll();

                updateStatistics();

                createPayrollChart();

            }
        );


        statusFilter.addEventListener(
            "change",
            renderPayroll
        );


        generatePayrollBtn.addEventListener(
            "click",
            openAddModal
        );


        exportPayrollBtn.addEventListener(
            "click",
            exportCSV
        );


        clearFiltersBtn.addEventListener(
            "click",
            clearFilters
        );


        closePayrollModal.addEventListener(
            "click",
            closePayrollModalFunction
        );


        cancelPayrollBtn.addEventListener(
            "click",
            closePayrollModalFunction
        );


        closeDetailsModal.addEventListener(
            "click",
            () => {

                detailsModal.classList.add(
                    "hidden"
                );

            }
        );


        payrollForm.addEventListener(
            "submit",
            savePayrollRecord
        );


        basicSalary.addEventListener(
            "input",
            updateSalaryPreview
        );


        allowance.addEventListener(
            "input",
            updateSalaryPreview
        );


        deduction.addEventListener(
            "input",
            updateSalaryPreview
        );


        tableBody.addEventListener(
            "click",
            handleTableAction
        );


        salaryDetails.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-detail-edit]"
                    );

                if (!button) return;


                const id =
                    button.dataset.detailEdit;


                detailsModal.classList.add(
                    "hidden"
                );


                openEditModal(id);

            }
        );


        payrollModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    payrollModal
                ) {

                    closePayrollModalFunction();

                }

            }
        );


        detailsModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    detailsModal
                ) {

                    detailsModal.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    /* =====================================================
       TABLE ACTIONS
       ===================================================== */

    function handleTableAction(event) {

        const button =
            event.target.closest(
                "[data-action]"
            );

        if (!button) return;


        const action =
            button.dataset.action;

        const id =
            button.dataset.id;


        if (action === "view") {

            viewPayroll(id);

        }


        if (action === "edit") {

            openEditModal(id);

        }


        if (action === "delete") {

            deletePayroll(id);

        }

    }


    /* =====================================================
       UTILITY FUNCTIONS
       ===================================================== */

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(
            Number(value) || 0
        );

    }


    function formatMonth(value) {

        if (!value) return "-";


        const date =
            new Date(
                `${value}-01T00:00:00`
            );


        if (Number.isNaN(date.getTime())) {

            return value;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                month: "short",
                year: "numeric"
            }
        );

    }


    function getInitials(name) {

        return String(name)
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                word =>
                    word.charAt(0)
                        .toUpperCase()
            )
            .join("");

    }


    function escapeHTML(value) {

        return String(value)
            .replace(
                /[&<>"']/g,
                char => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                })[char]
            );

    }


    function csvEscape(value) {

        const text =
            String(value ?? "");

        if (
            text.includes(",") ||
            text.includes('"') ||
            text.includes("\n")
        ) {

            return `"${text.replace(
                /"/g,
                '""'
            )}"`;

        }

        return text;

    }


    /* =====================================================
       NOTIFICATION
       ===================================================== */

    function showNotification(
        title,
        message,
        type = "success"
    ) {

        const toast =
            document.getElementById("toast");

        const toastTitle =
            document.getElementById(
                "toastTitle"
            );

        const toastMessage =
            document.getElementById(
                "toastMessage"
            );

        const toastIcon =
            document.getElementById(
                "toastIcon"
            );


        if (!toast) return;


        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;


        toastIcon.innerHTML =
            type === "error"
                ? `<i data-lucide="circle-alert" class="w-5 h-5 text-red-500"></i>`
                : `<i data-lucide="circle-check" class="w-5 h-5 text-green-500"></i>`;


        toast.classList.remove(
            "hidden"
        );


        initializeIcons();


        setTimeout(() => {

            toast.classList.add(
                "hidden"
            );

        }, 3000);

    }


    /* =====================================================
       LUCIDE
       ===================================================== */

    function initializeIcons() {

        if (
            window.lucide &&
            typeof lucide.createIcons ===
                "function"
        ) {

            lucide.createIcons();

        }

    }

});