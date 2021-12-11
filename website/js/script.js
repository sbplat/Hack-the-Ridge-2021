'use strict'

$(document).ready(function() {
    console.log("loaded");

    const getURL = "";

    let info = {};
    let university = false;
    let tags = [];
    let courseInfo = {};

    $("#select-all-tags").click(function(e) {
        let isSelected = $("#select-all-tags").is(":checked");

        $("#program-tags-div").find(":checkbox").each(function() {
            this.checked = isSelected;
        });
    });

    $("#add-course-button").click(function(e) {
        e.preventDefault();

        appendCourseInfoField();
    });

    $("#submit-button").click(function(e) {
        e.preventDefault();

        getInfo();
        getPrograms();
    });

    function appendCourseInfoField() {
        $("#course-form").append(`
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div class="relative flex-grow w-full">
                    <label for="course-code" class="leading-7 text-sm text-gray-600">Course Code</label>
                    <input
                        type="text"
                        name="course-code"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="MCV4U1"
                    />
                </div>
                <div class="relative flex-grow w-full">
                    <label for="mark" class="leading-7 text-sm text-gray-600">Final Mark</label>
                    <input
                        type="number"
                        name="mark"
                        min="0"
                        max="100"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="${Math.floor(Math.random() * 101)}"
                    />
                </div>
            </div>
        `);
    }

    function getInfo() {
        info = {};
        university = false;
        tags = [];
        courseInfo = {};

        university = $("#university-option").val();

        let checkboxDiv = document.getElementsByName("checkbox-tag");
        for (let i = 0; i < checkboxDiv.length; ++i) {
            let tagsList = checkboxDiv[i].getElementsByTagName("*");

            if (tagsList[0].checked) {
                tags.push(tagsList[1].innerHTML);
            }
        }

        $("#course-form").children().each(function(index, value) {
            let field = $(this).find("input");
            //console.log(`${field[0].value}, ${field[1].value}`);
            let grade = parseInt(field[1].value);

            if (grade > 100) {
                grade = 100;
            } else if (grade < 0) {
                grade = 0;
            }

            if (field[0].value.length > 0) {
                courseInfo[field[0].value] = grade;
            }
        });

        info = {
            "university": university,
            "tags": tags,
            "courses": courseInfo
        };

        console.log(JSON.stringify(info));
    }

    function getPrograms() {
        $.get(getURL, info).done(function(data) {
            console.log(data);
        });

        updatePrograms();
    }

    function updatePrograms() {
    }
});
