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
    $(".tableRow").empty()
    for (var i = 0; i < receiptDataArray.length; i++) {
        var receiptPosition = receiptDataArray[i];
        var addRow = $("<tr>").addClass('tableRow');
        var store_name = $('<td>').append(receiptPosition.store_name);
        var category = $("<td>").append(receiptPosition.category);
        var amount = $("<td>").append(receiptPosition.amount);
        var date = $("<td>").append(receiptPosition.date);
        var receiptID = receiptPosition.ID;


        var buttonDiv = $('<td>');
        var deleteButton = $('<button>').addClass('deleteButton btn btn-danger btn-sm').text('Delete').attr('data-delete-row', deleteRowNumber);
        var updateButton = $("<button>", {
            class: "btn btn-warning btn-sm",
            text: 'Update'
      }).css({"margin-right":"10px"});

    //   deleteButton.on("click", (receiptID)=>{ deleteReceiptModal(receiptID)});
      updateButton.on("click", updateReceiptModal(receiptID));
        var buttonContainer = buttonDiv.append(updateButton, deleteButton );
        deleteRowNumber++;

        deleteButton.on('click', function() {
            // var receiptID = receiptPosition.ID;
            deleteReceiptModal(addRow)
            // deleteData(receiptID);
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


function deleteReceiptRow() {
    var thisRowID = $(event.currentTarget).attr("data-delete-row");
    var rowToDelete = receiptDataArray.splice(thisRowID, 1);
    receiptDataArray = receiptDataArray.concat(rowToDelete);
    $(event.currentTarget).parents('tr').first().remove();
    getData()

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



function deleteData(ID) {
    var receiptData = {
        // api_key: "RBu6Wfy1bo",
        'action': 'delete',
        ID: ID,
        
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


function updateReceiptData(product) {
    var ajaxConfig = {
          url: "api/access.php",
          method: "POST",
          dataType: "json",
          data: {
            action: "update",
            store_name: receiptDataObject.store_name,
            category: receiptDataObject.category,
            amount: receiptDataObject.amount, 
            date: receiptDataObject.date,
            id: product.id
          },
          success: function(response) {
            receiptDataArray = response.clients;
            console.log(response);
            updateReceiptList(receiptDataArray);
            return(response);
          },
          error: function(response) {
                console.log("error message: ",response);
          }
    };
    $.ajax(ajaxConfig);
  }



 function deleteReceiptModal(addRow) {
    
    // var thisRowIndex = $(addRow).closest("tr").index();
    // var thisRowIndex = $(this).closest("tr").index()
    var thisRowIndex = $(event.currentTarget).attr("data-delete-row")
    var ID = receiptDataArray[thisRowIndex].ID;
    // var index = receiptDataArray.indexOf();
    // var indexReceiptArray = $(this).parent().parent().index(); 
    // var indexReceiptArray = receiptID; 

    // Modal
    var modalFade = $("<div class='modal fade' id='editStudentModal' tabindex='-1' role='dialog' aria-labelledby='editStudentModalLabel' aria-hidden='true'>");
    var modalDialog = $("<div class='modal-dialog' role='document'>");
    var modalContent = $("<div>").addClass("modal-content"); 
    var modalHeader = $("<div>").addClass("modal-header"); 
    var modalTitle = $("<div>").addClass("modal-title").text("Are you sure you want to remove this receipt?");
    var closeModalButton = $("<button type='button' class='close' data-dismiss='modal' aria-label='Close'>");
    var closeModalButtonSymbol = $("<span aria-hidden='true'>").text("x");
    closeModalButton.append(closeModalButtonSymbol);

    modalHeader.append(modalTitle);
    modalHeader.append(closeModalButton);
    modalContent.append(modalHeader);


    var modalFooter = $("<div>").addClass("modal-footer");
    var cancelDeleteButton = $("<button class='btn btn-secondary' data-dismiss='modal'>");
    cancelDeleteButton.text("Cancel");
    var confirmDeleteButton= $("<button class='btn btn-danger' data-dismiss='modal'>");

    confirmDeleteButton.on("click", () => {
        deleteData(ID);
        deleteReceiptRow(thisRowIndex)
        
    }); // Anonymous function to avoid firing as soon as modal loads
    confirmDeleteButton.text("DELETE");
    modalFooter.append(cancelDeleteButton);
    modalFooter.append(confirmDeleteButton);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modalFade.append(modalDialog);

    $(modalFade).modal("show");
    // When the modal hides, call the remove method to remove the modal from the DOM
    $(modalFade).on('hidden.bs.modal',() => {
        $(modalFade).remove();
    });
}
  

function updateReceiptModal() {

}