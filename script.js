/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

var receiptDataArray = [];
var totalSpent = 0;
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
addReceipt()

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
function addReceipt(){

    var receiptDataObject = {};

    receiptDataObject.store_name = $("#store_name").val();
    receiptDataObject.category = $("#category").val();
    receiptDataObject.amount = $("#amount").val();
    receiptDataObject.date = $("#date").val();

    // $("#userDataForms").find(":input").each(function() {
    //     receiptDataObject = {
    //         store_name: store_name,
    //         category: category,
    //         amount: amount, 
    //         date: date
    //     }
    // });
    addNewData(receiptDataObject);
    receiptDataArray.push(receiptDataObject);
    clearAddReceiptsFormInputs();
   
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddReceiptsFormInputs(){
    $('#store_name').val("");
    $('#category').val("");
    $('#amount').val("");
    $('#date').val("");

}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderReceiptsOnDom(receiptDataArray){
    for (var i = 0; i < receiptDataArray.length; i++) {
        var receiptPosition = receiptDataArray[i];
        var addRow = $("<tr>").addClass('tableRow');
        var store_name = $('<td>').append(receiptPosition.store_name);
        var category = $("<td>").append(receiptPosition.category);
        var amount = $("<td>").append(receiptPosition.amount);
        var date = $("<td>").append(receiptPosition.date);


        var buttonDiv = $('<td>');
        var deleteButton = $('<button>').addClass('deleteButton btn btn-danger btn-sm').text('Delete').attr('data-delete-row', deleteRowNumber).click(deleteStudentRow);
        var buttonContainer = buttonDiv.append(deleteButton);
        deleteRowNumber++;

        deleteButton.on('click', function() {
            var receiptID = receiptPosition.id;
            deleteData(receiptID);
        })

        $(".student-list tbody").append(addRow);
        addRow.append(store_name, category, amount, date, buttonContainer)
    }
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateReceiptList(receiptDataArray){

    renderReceiptsOnDom(receiptDataArray);
    calculateTotalSpent(receiptDataArray);
    // renderTotalSpent(totalSpent);
  
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateTotalSpent(receiptDataArray){
    var totalSpent = null;

    console.log("DATTTAAA:", receiptDataArray)
    for(var i = 0; i < receiptDataArray.length; i++) {
        totalSpent +=  parseFloat(receiptDataArray[i].amount);
        console.log(totalSpent)
    }
    console.log(totalSpent)
   renderTotalSpent(totalSpent);
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderTotalSpent(totalSpent){
    $('.totalSpent').text("$"+totalSpent);
}


function deleteStudentRow() {
    var thisRowID = $(event.currentTarget).attr("data-delete-row");
    var rowToDelete = studentArray.splice(thisRowID, 1);
    studentArray = studentArray.concat(rowToDelete);
    $(event.currentTarget).parents('tr').first().remove();

}

function getData() {

    var receiptData = {
        'action': 'read'
        // api_key: "RBu6Wfy1bo"
    };
    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url:  "api/finance.php",
        success: function (response) {
            receiptDataArray = response.clients;
            console.log(response);
                updateReceiptList(receiptDataArray);
            }
        }
    $.ajax(ajaxConfig)

}


function addNewData(receiptDataObject) {
    var receiptData = {
        // api_key: "RBu6Wfy1bo",
        'action': 'insert',
        store_name: receiptDataObject.store_name,
        category: receiptDataObject.category,
        amount: receiptDataObject.amount, 
        date: receiptDataObject.date
    };

    console.log("receipt", receiptData)

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



function deleteData(receiptId) {
    var receiptData = {
        // api_key: "RBu6Wfy1bo",
        receiptId: receiptId,
        'action': 'delete'
    };

    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url: "api/finance.php",
        success: function (response) {
            console.log(response)
        }
    }
    $.ajax(ajaxConfig)
}
