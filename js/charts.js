/* =========================================================
   TalentSphere - Chart Utilities
   ========================================================= */

window.TalentSphereCharts = {

    colors: [
        "#2563eb",
        "#7c3aed",
        "#06b6d4",
        "#10b981",
        "#f59e0b",
        "#ef4444"
    ],


    /* -----------------------------------------------------
       Line Chart
       ----------------------------------------------------- */

    createLineChart(
        canvas,
        labels,
        datasets,
        options = {}
    ) {

        if (!canvas || typeof Chart === "undefined") {
            return null;
        }

        return new Chart(canvas, {

            type: "line",

            data: {
                labels: labels,
                datasets: datasets
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                },

                ...options

            }

        });

    },


    /* -----------------------------------------------------
       Doughnut Chart
       ----------------------------------------------------- */

    createDoughnutChart(
        canvas,
        labels,
        data,
        options = {}
    ) {

        if (!canvas || typeof Chart === "undefined") {
            return null;
        }

        return new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: labels,

                datasets: [{

                    data: data,

                    backgroundColor: this.colors,

                    borderWidth: 0

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                },

                ...options

            }

        });

    },


    /* -----------------------------------------------------
       Bar Chart
       ----------------------------------------------------- */

    createBarChart(
        canvas,
        labels,
        data,
        label = "Data",
        options = {}
    ) {

        if (!canvas || typeof Chart === "undefined") {
            return null;
        }

        return new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [{

                    label: label,

                    data: data,

                    backgroundColor: "#2563eb",

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {
                        beginAtZero: true
                    }

                },

                ...options

            }

        });

    },


    /* -----------------------------------------------------
       Destroy Chart
       ----------------------------------------------------- */

    destroyChart(chart) {

        if (chart) {
            chart.destroy();
        }

    }

};