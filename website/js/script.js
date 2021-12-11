'use strict'

$(document).ready(function() {
    console.log("loaded");

    let currentCourseNum = 0;

    $("#add-course-button").click(function(e) {
        e.preventDefault();

        appendCourseInfoField();
    });

    $("#submit-button").click(function(e) {
        e.preventDefault();

        getInfo();
    });

    function appendCourseInfoField() {
        currentCourseNum += 1;

        $("#course-form").append(`
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                <div class="relative flex-grow w-full">
                    <label for="course-code" class="leading-7 text-sm text-gray-600">Subject</label>
                    <input
                        type="text"
                        id="course-code${currentCourseNum}"
                        name="course-code"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div class="relative flex-grow w-full">
                    <label for="mark" class="leading-7 text-sm text-gray-600">Final Mark</label>
                    <input
                        type="number"
                        id="mark${currentCourseNum}"
                        name="mark"
                        min="0"
                        max="100"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>
        `);
    }

    function getInfo() {
        let info = {};

        $("#course-form").children().each(function(index, value) {
            let field = $(this).find("input");
            console.log(`${field[0].value}, ${field[1].value}`);
        });
    }

    function getPrograms() {

    }

    function updatePrograms() {

    }
});
