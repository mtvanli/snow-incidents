$(function(){

    ChartIt();


    async function ChartIt() {
        const chart_data = await getData();
    }


    async function getData() {

        var numbers = [];

        $.ajax({
            "url": "https://console.cloud-elements.com/elements/api-v2/hubs/helpdesk/incidents",
            "dataType": 'json',
            "dataSrc": "",
            "type": "GET",
            "beforeSend": function (xhr) {
                xhr.setRequestHeader("Authorization",
                    "User SpwmQ9LVDL7jjjrgEkHiLdOwk3/EijcVqGvnJ6ghe6E=, Organization df260e48fdce2bf2b9d5c878e95bcd1f, Element rqG5hemniBK3wdIp9UmvEvxqv7APNIlflRsvmoRmJQc=");

                $("#loader").show();
                $("#loader2").show();
                $("#loader3").show();
                $("#loader4").show();
            },


            complete: function () {
                $("#loader").hide();
                $("#loader2").hide();
                $("#loader3").hide();
                $("#loader4").hide();
            },

            success: function (data) {
                Obj = data;

                let HighCount = 0;
                let MediumCount = 0;
                let LowCount = 0;

                let ClosedCount = 0;
                let InProgressCount = 0;
                let OnHoldCount = 0;
                let NewCount = 0;

                let PriorityCriticalCount = 0;
                let PriorityHighCount = 0;
                let PriorityModerateCount = 0;
                let PriorityLowCount = 0;
                let PriorityPlanningCount = 0;

                /* impact graph */

                for (i in Obj) {
                    if (Obj[i].impact == "1 - High") { HighCount += 1 }
                    else if (Obj[i].impact == "2 - Medium") { MediumCount += 1; }
                    else if (Obj[i].impact == "3 - Low") { LowCount += 1; }
                }

                var numbers = [LowCount, MediumCount, HighCount];

                var cty = document.getElementById('Impact');
                var myChart = new Chart(cty, {
                    type: 'doughnut',
                    data: {
                        labels: ['Low', 'Medium', 'High'],
                        datasets: [{

                            data: numbers,
                            backgroundColor: [
                                'rgb(93, 93, 93,0.3)',
                                'rgb(93, 93, 93,0.6)',
                                'rgb(81, 45, 168 , 0.95)'
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        cutoutPercentage: 50,
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 10
                            },
                        },

                        plugins: {
                            datalabels: {
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                }

                            }
                        }
                    }

                })

                /* Incident_State graph */

                for (i in Obj) {
                    if (Obj[i].incident_state == "Closed") { ClosedCount += 1; }
                    else if (Obj[i].incident_state == "In Progress") { InProgressCount += 1; }
                    else if (Obj[i].incident_state == "On Hold") { OnHoldCount += 1; }
                    else if (Obj[i].incident_state == "New") { NewCount += 1; }
                }

                var StateNumbers = [NewCount, InProgressCount, OnHoldCount, ClosedCount];
                var StateLabels = ["New", "In Progress", "On Hold", "Closed"];

                var cty = document.getElementById('Status');
                var myChart = new Chart(cty, {
                    type: 'bar',
                    data: {
                        labels: StateLabels,
                        datasets: [{

                            data: StateNumbers,
                            backgroundColor: [
                                'rgb(81, 45, 168 , 0.95)',
                                'rgb(93, 93, 93,0.3)',
                                'rgb(93, 93, 93,0.3)',
                                'rgb(93, 93, 93,0.3)'
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        layout: {
                            padding: {
                                top: 25
                            }
                        },
                        plugins: {
                            datalabels: {
                                color: 'black',
                                font: {
                                    weight: 'bold'
                                },
                                anchor: 'end',
                                align: 'end',
                                offset: -5

                            }
                        },
                        scales: {
                            xAxes: [{
                                barPercentage: 0.8,
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }

                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    display: false,
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        }
                    }

                });

                /* priority graph */
                for (i in Obj) {
                    if (Obj[i].priority == "1 - Critical") { PriorityCriticalCount += 1; }
                    else if (Obj[i].priority == "2 - High") { PriorityHighCount += 1; }
                    else if (Obj[i].priority == "3 - Moderate") { PriorityModerateCount += 1; }
                    else if (Obj[i].priority == "4 - Low") { PriorityLowCount += 1; }
                    else if (Obj[i].priority == "5 - Planning") { PriorityPlanningCount += 1; }
                }

                var PriorityNumbers = [PriorityCriticalCount, PriorityHighCount, PriorityModerateCount, PriorityLowCount, PriorityPlanningCount];
                var PriorityLabels = ['Critical', 'High', 'Moderate', 'Low', 'Planning'];

                /* sort start */
                arrayOfObj = PriorityLabels.map(function (d, i, c) {
                    return {
                        label: d,
                        data: PriorityNumbers[i] || 0,
                        color: "rgb(93, 93, 93,0.4)"
                    };
                });

                sortedArrayOfObj = arrayOfObj.sort(function (a, b) { return b.data - a.data; });

                for (i in sortedArrayOfObj) {
                    if (sortedArrayOfObj[i].label == "Critical" || sortedArrayOfObj[i].label == "High") sortedArrayOfObj[i].color = "rgb(81, 45, 168 , 0.95)"
                }

                console.log(sortedArrayOfObj[0].data);

                PrioritySortedLabel = [];
                PrioritySortedData = [];
                PrioritySortedColor = [];
                sortedArrayOfObj.forEach(function (d) {
                    PrioritySortedLabel.push(d.label);
                    PrioritySortedData.push(d.data);
                    PrioritySortedColor.push(d.color)
                });

                /* sort finish */



                var cty = document.getElementById('Priority');
                var myChart = new Chart(cty, {
                    type: 'horizontalBar',
                    data: {
                        labels: PrioritySortedLabel,
                        datasets: [{
                            data: PrioritySortedData,
                            backgroundColor: PrioritySortedColor
                        }]
                    },

                    options: {
                        responsive: false,
                        layout: {
                            padding: {
                                left: 25
                            }
                        },
                        plugins: {
                            datalabels: {
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                },
                                align: 'center'
                            }
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    display: false,
                                    beginAtZero: true
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        }
                    }

                })

                var table = new Tabulator("#project-resultstable", {
                    height: 700, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
                    data: Obj, //assign data to table
                    responsiveLayout: "hide",
                    layout: "fitColumns", //fit columns to width of table (optional)
                    placeholder: "No PM",
                    pagination: "local", //enable local pagination.
                    paginationSize: 22, // this option can take any positive integer value (default = 10)
                    ajaxLoaderLoading: "<span>Loading Data..</span>",
                    columns: [ //Define Table Columns
                        { title: "IncidentNo", field: "number", width: 120, resizable: false },
                        { title: "AssignedTo", field: "assigned_to.display_value", width: 130, formatter: "textarea" },
                        { title: "Description", field: "description", formatter: "textarea", responsive: 2 },
                        { title: "Impact", field: "impact", width: 95, resizable: false },
                        { title: "Status", field: "incident_state", width: 90, resizable: false },
                        { title: "Priority", field: "priority", width: 105 },
                        //{title:"Comments", field:"comments", width:300,formatter:"textarea"},
                        { title: "sys id", field: "sys_id", visible: false }
                    ],




                    rowClick: function (e, row) {
                        //alert("Row " + row.getData().sys_id + " Clicked!!!!");
                        window.open('https://dev67782.service-now.com/nav_to.do?uri=incident.do?sys_id=' + row.getData().sys_id, '_blank');
                    },
                });
                var input = document.getElementById("filter");
                var clearFilter = document.getElementById("clearFilter");

                input.addEventListener("keyup", function () {
                    var filters = [];
                    var columns = table.getColumns();
                    var search = input.value;

                    columns.forEach(function (column) {
                        filters.push({
                            field: column.getField(),
                            type: "like",
                            value: search,
                        });
                    });

                    table.setFilter([filters]);
                });



            }
        });

    }



});


