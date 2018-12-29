/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

var receiptDataArray = [];
var gradeAverage = 0;
var deleteRowNumber = 0;
/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    getData()
    addClickHandlersToElements()
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $(".addButton").click(handleAddClicked)
    $(".clearButton").click(handleCancelClick)

}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
addStudent()

}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){

    var receiptDataObject = {};

    var store_name = $("#store_name");
    var category = $("#category");
    var amount = $("#amount");
    var date = $("#date");

    $("#userDataForms").find(":input").each(function() {
        receiptDataObject = {
            store_name: store_name,
            category: category,
            amount: amount, 
            date: date
        }
    });
    addNewData(store_name, category, amount, date);
    receiptDataArray.push(receiptDataObject);
    clearAddStudentFormInputs();
    updateStudentList();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $('#studentName').val("");
    $('#course').val("");
    $('#studentGrade').val("");

}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(){
    for (var i = 0; i < studentArray.length; i++) {
        var studentPosition = studentArray[i];
        var addRow = $("<tr>").addClass('tableRow');
        var studentName = $('<td>').append(studentPosition.name);
        var studentCourse = $("<td>").append(studentPosition.course);
        var studentGrade = $("<td>").append(studentPosition.grade);


        var buttonDiv = $('<td>');
        var deleteButton = $('<button>').addClass('deleteButton btn btn-danger btn-sm').text('Delete').attr('data-delete-row', deleteRowNumber).click(deleteStudentRow);
        var buttonContainer = buttonDiv.append(deleteButton);
        deleteRowNumber++;

        deleteButton.on('click', function() {
            var studentID = studentPosition.id;
            deleteData(studentID);
        })




        $(".student-list tbody").append(addRow);
        addRow.append(studentName, studentCourse, studentGrade, buttonContainer)
    }
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(){

    renderStudentOnDom();
    calculateGradeAverage();
    renderGradeAverage();
  
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
    var gradesArray = null;
    for(var i = 0; i < studentArray.length; i++) {
        gradesArray = gradesArray + parseFloat(studentArray[i].grade);

        gradeAverage = Math.round(gradesArray / studentArray.length-1)

    }
    return gradeAverage;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(){
    $('.avgGrade').text(gradeAverage);
}


function deleteStudentRow() {
    var thisRowID = $(event.currentTarget).attr("data-delete-row");
    var rowToDelete = studentArray.splice(thisRowID, 1);
    studentArray = studentArray.concat(rowToDelete);
    $(event.currentTarget).parents('tr').first().remove();

}

function getData() {

    var studentData = {
        api_key: "RBu6Wfy1bo"
    };
    var ajaxConfig = {
        data: studentData,
        method: "POST",
        dataType: 'json',
        url: "http://s-apis.learningfuze.com/sgt/get",
        success: function (response) {
            studentArray = response.data;
            console.log(response);
                updateStudentList(studentArray);
            }
        }
    $.ajax(ajaxConfig)

}


function addNewData(id, store_name, category, amount, date) {
    var receiptData = {
        // api_key: "RBu6Wfy1bo",
        store_name: store_name,
        category: category,
        amount: amount, 
        date: date, 
        'action': 'create'
    };

    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url: "api/finance.php",
        success: function (response) {
            console.log(response);
            // getData()
        }
    }
        $.ajax(ajaxConfig)
}



function deleteData(studentId) {
    var studentData = {
        api_key: "RBu6Wfy1bo",
        student_id: studentId,
    };

    var ajaxConfig = {
        data: studentData,
        method: "POST",
        dataType: 'json',
        url: "http://s-apis.learningfuze.com/sgt/delete",
        success: function (response) {
            console.log(response)
        }
    }
    $.ajax(ajaxConfig)
}
