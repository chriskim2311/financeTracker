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
// var deleteRowNumber = 0;
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
function initializeApp() {
    disclaimerModal()
    getData()
    addClickHandlersToElements()
    $("#amount").on("change", amountValidation);
    $("#store_name").on("change", storeNameValidation)
    // $("#category").on("change", categoryValidation)
    // $("#date").on("change", categoryValidation)

}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements() {
    $(".addButton").click(handleAddClicked)
    $(".clearButton").click(handleCancelClick)

}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked() {

    addReceipt()


}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick() {
    clearAddReceiptsFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addReceipt() {

    var receiptDataObject = {};
    receiptDataObject.store_name = $("#store_name").val();
    receiptDataObject.category = $("#category").val();
    receiptDataObject.amount = $("#amount").val();
    receiptDataObject.date = $("#date").val();


    let storeNameFeedback = $("<div class='storeNameFeedback'>").addClass("invalid-feedback").text("Store name blank!");
    let amountFeedback = $("<div class='amountFeedback'>").addClass("invalid-feedback").text("Amount blank!");
    if ($("#store_name").val() == '' && $("#amount").val() == '') {
        if ($("#storeNameDiv").hasClass("has-error") && $("#amountDiv").hasClass("has-error")) {
            return
        }
        if(($("#storeNameDiv").hasClass("has-error") || $("#amountDiv").hasClass("has-error"))) {
            return
        }


        $("#storeNameDiv").addClass('has-error');
        $("#storeNameDiv").append(storeNameFeedback);
        $("#amountDiv").addClass('has-error');
        $("#amountDiv").append(amountFeedback);
        return;

    }
    if ($("#store_name").val() == '') {
        if ($("#storeNameDiv").hasClass("has-error")) {
            return
        }
        $("#storeNameDiv").addClass('has-error');
        $("#storeNameDiv").append(storeNameFeedback);


    }
    if ($("#amount").val() == '') {
        if ($("#amountDiv").hasClass("has-error")) {
            return
        }
        $("#amountDiv").addClass('has-error');
        $("#amountDiv").append(amountFeedback);

    }
    if ($("#storeNameDiv").hasClass('has-error') || $("#amountDiv").hasClass('has-error')) {
        return
    }



    addNewData(receiptDataObject);
    receiptDataArray.push(receiptDataObject);
    clearAddReceiptsFormInputs();

}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddReceiptsFormInputs() {
    $("#storeNameDiv").removeClass('has-error');
    $("#amountDiv").removeClass('has-error');
    $("#storeNameDiv").removeClass('has-success');
    $("#amountDiv").removeClass('has-success');
    $(".amountFeedback").remove();
    $(".storeNameFeedback").remove();
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

function renderReceiptsOnDom(receiptDataArray) {
    $(".receiptTable").empty()
    var deleteRowNumber = 0

    for (var i = 0; i < receiptDataArray.length; i++) {
        var receiptPosition = receiptDataArray[i];
        var addRow = $("<tr>").addClass('tableRow');
        var store_name = $('<td>').append(receiptPosition.store_name);
        var category = $("<td>").append(receiptPosition.category);
        var amount = $("<td>").append("$" + parseFloat(receiptPosition.amount).toFixed(2));
        var date = $("<td>").append(receiptPosition.date);
        var receiptID = receiptPosition.ID;

        var ID = receiptPosition.ID


        var buttonDiv = $('<td>');

        var deleteButton = $('<button>').addClass('deleteButton btn btn-danger btn-sm glyphicon glyphicon-trash').attr('data-delete-row', deleteRowNumber);
        var updateButton = $("<button>", {
            class: "btn btn-warning btn-sm glyphicon glyphicon-edit",


        }).attr('data-delete-row', deleteRowNumber).css({ "margin-right": "10px" });
        updateButton.on("click", function () {
            updateReceiptModal()
        });

        var buttonContainer = buttonDiv.append(updateButton, deleteButton);
        deleteRowNumber++;

        deleteButton.on('click', function () {
            deleteReceiptModal(addRow)
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
function updateReceiptList(receiptDataArray) {

    renderReceiptsOnDom(receiptDataArray);
    calculateTotalSpent(receiptDataArray);
    // renderTotalSpent(totalSpent);

}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateTotalSpent(receiptDataArray) {
    var totalSpent = 0;

    console.log("DATTTAAA:", receiptDataArray)
    for (var i = 0; i < receiptDataArray.length; i++) {

        totalSpent += parseFloat(receiptDataArray[i].amount);
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
function renderTotalSpent(totalSpent) {
    $('.totalSpent').text("$" + totalSpent.toFixed(2));
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
    };
    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url: "api/finance.php",
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
        'action': 'insert',
        store_name: receiptDataObject.store_name,
        category: receiptDataObject.category,
        amount: receiptDataObject.amount,
        date: receiptDataObject.date
    };

    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url: "api/finance.php",
        success: function (response) {
            console.log(response);
            getData()
        }

    }
    $.ajax(ajaxConfig)
}



function deleteData(ID) {
    var receiptData = {
        'action': 'delete',
        ID: ID,

    };

    var ajaxConfig = {
        data: receiptData,
        method: "POST",
        dataType: 'json',
        url: "api/finance.php",
        success: function (response) {
            getData();
            console.log(response)
        }
    }
    $.ajax(ajaxConfig)
}


function updateReceiptData(updatedReceipt) {

    var ajaxConfig = {
        url: "api/finance.php",
        method: "POST",
        dataType: "json",
        action: "update",
        data: updatedReceipt,

        success: function (response) {
            console.log(response);
            getData()
            return (response);
        },
        error: function (response) {
            console.log("error message: ", response);
        }
    };
    $.ajax(ajaxConfig);
}




function deleteReceiptModal(addRow) {

    var thisRowIndex = $(event.currentTarget).attr("data-delete-row")
    var ID = receiptDataArray[thisRowIndex].ID;


    // Modal
    var modalFade = $("<div class='modal fade' id='editStudentModal' tabindex='-1' role='dialog' aria-labelledby='editStudentModalLabel' aria-hidden='true' data-backdrop='static' data-keyboard='false'>");
    var modalDialog = $("<div class='modal-dialog' role='document'>");
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalTitle = $("<div>").addClass("modal-title").text("Are you sure you want to remove this receipt?");

    modalHeader.append(modalTitle);
    modalContent.append(modalHeader);


    var modalFooter = $("<div>").addClass("modal-footer");
    var cancelDeleteButton = $("<button class='btn btn-secondary' data-dismiss='modal'>");
    cancelDeleteButton.text("Cancel");
    var confirmDeleteButton = $("<button class='btn btn-danger' data-dismiss='modal'>");

    confirmDeleteButton.on("click", () => {
        deleteData(ID);
        deleteReceiptRow(thisRowIndex)

    });
    confirmDeleteButton.text("DELETE");
    modalFooter.append(cancelDeleteButton);
    modalFooter.append(confirmDeleteButton);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modalFade.append(modalDialog);

    $(modalFade).modal("show");
    $(modalFade).on('hidden.bs.modal', () => {
        $(modalFade).remove();
    });
}


function updateReceiptModal() {
    var thisRowIndex = $(event.currentTarget).attr("data-delete-row")
    var receiptData = receiptDataArray[thisRowIndex]
    var ID = receiptDataArray[thisRowIndex].ID;


    // Modal
    var modalFade = $("<div class='modal fade' id='editStudentModal' tabindex='-1' role='dialog' aria-labelledby='editStudentModalLabel' aria-hidden='true'  data-backdrop='static' data-keyboard='false'>");
    var modalDialog = $("<div class='modal-dialog' role='document'>");
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalTitle = $("<div>").addClass("modal-title").text("Edit Receipt");

    modalHeader.append(modalTitle);
    modalContent.append(modalHeader);


    var modalBody = $("<form>").addClass("modal-body");

    var modalBodyContentStore = $("<div class='form-group' id='editStoreNameDiv'>");
    var modalBodyContentStoreNameLabel = $("<label for='store_name' class='form-control-label'>").text("Store Name");
    var modalBodyContentStoreName = $("<input type='text' id='editStoreName' class='form-control' onChange='storeNameValidation()'>").text(receiptData.store_name);
    modalBodyContentStoreName.val(receiptData.store_name);
    modalBodyContentStore.append(modalBodyContentStoreNameLabel);
    modalBodyContentStore.append(modalBodyContentStoreName);


    var modalBodyContentCategory = $("<div class='form-group' id='editCategoryDiv'>");
    var modalBodyContentCategoryLabel = $("<label for='category' class='form-control-label'>").text("Category");
    var modalBodyContentCategoryValue = $("<input type='text' id='editCategory' class='form-control'>").text(receiptData.category);
    modalBodyContentCategoryValue.val(receiptData.category);
    modalBodyContentCategory.append(modalBodyContentCategoryLabel);
    modalBodyContentCategory.append(modalBodyContentCategoryValue);


    var modalBodyContentAmount = $("<div class='form-group' id='editAmountDiv'>");
    var modalBodyContentAmountLabel = $("<label for='amount' class='form-control-label'>").text("Amount");
    var modalBodyContentAmountValue = $("<input type='text' id='editAmount' class='form-control' onChange='amountValidation()'> ").text(receiptData.amount);
    modalBodyContentAmountValue.val(receiptData.amount);
    modalBodyContentAmount.append(modalBodyContentAmountLabel);
    modalBodyContentAmount.append(modalBodyContentAmountValue);

    var modalBodyContentDate = $("<div class='form-group' id='editDateDiv'>");
    var modalBodyContentDateLabel = $("<label for='date' class='form-control-label'>").text("Amount");
    var modalBodyContentDateValue = $("<input type='Date' id='editDate' class='form-control'>").text(receiptData.date);
    modalBodyContentDateValue.val(receiptData.date);
    modalBodyContentDate.append(modalBodyContentDateLabel);
    modalBodyContentDate.append(modalBodyContentDateValue);


    modalBody.append(modalBodyContentStore);
    modalBody.append(modalBodyContentAmount);
    modalBody.append(modalBodyContentCategory);
    modalBody.append(modalBodyContentDate);
    modalContent.append(modalBody);


    let modalFooter = $("<div>").addClass("modal-footer");
    let cancelEditButton = $("<button class='btn btn-secondary' data-dismiss='modal'>");
    cancelEditButton.text("Cancel");

    let confirmEditButton = $("<button  class='btn btn-primary' data-dismiss='modal'>");
    confirmEditButton.on("click", () => {
        updateReceiptObject(ID);
    });
    confirmEditButton.text("Confirm Edit");
    modalFooter.append(cancelEditButton);
    modalFooter.append(confirmEditButton);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modalFade.append(modalDialog);

    $(modalFade).modal("show");
    $(modalFade).on('hidden.bs.modal', () => {
        $(modalFade).remove();
    });



}


function updateReceiptObject(ID) {

    var updatedReceipt = {
        action: "update",
        ID: ID,
        store_name: $("#editStoreName").val(),
        category: $("#editCategory").val(),
        amount: $("#editAmount").val(),
        date: $("#editDate").val()
    };

    updateReceiptData(updatedReceipt)


}



function amountValidation() {
    let inputFeedback = $("<div class='amountFeedback'>").addClass("invalid-feedback");

    const amountRegex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    const amount = $("#amount").val();
    const editAmount = $("#editAmount").val();

    if (amount) {
        if ((!amountRegex.test(amount) && amount !== '') || parseInt(amount) < 0 || amount == '') {
            if ($("#amountDiv").hasClass("has-error")) {
                return
            }
            $("#amountDiv").append(inputFeedback.text("Not a Valid Number"));
            $("#amountDiv").addClass("has-error");
            return;
        } else {
            $(".amountFeedback").remove();
            $("#amountDiv").removeClass("has-error");
            $("#amountDiv").removeClass("has-warning");
            $("#amountDiv").addClass("has-success");
        }
    }

    if (editAmount) {
        if ((!amountRegex.test(editAmount) && editAmount !== '') || parseInt(editAmount) < 0 || editAmount == '') {
            if ($("#editAmountDiv").hasClass("has-error")) {
                return
            }
            $("#editAmountDiv").append(inputFeedback.text("Not a Valid Number"));
            $("#editAmountDiv").addClass("has-error");
            return
        } else {
            $(".amountFeedback").remove();
            $("#editAmountDiv").removeClass("has-error");
            $("#editAmountDiv").removeClass("has-warning");
            $("#editAmountDiv").addClass("has-success");
        }
    }
}




function storeNameValidation() {
    let inputFeedback2 = $("<div class='storeNameFeedback'>").addClass("invalid-feedback");

    const storeNameRegex = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/;
    const storeName = $("#store_name").val();
    const editName = $("#editStoreName").val();
    if (storeName) {
        if ((!storeNameRegex.test(storeName) && storeName !== '' || storeName == '')) {
            if ($("#storeNameDiv").hasClass("has-error")) {
                return
            }
            $("#storeNameDiv").addClass("has-error");
            $("#storeNameDiv").append(inputFeedback2.text("Invalid Store Name"));
            return;
        } else {
            $(".storeNameFeedback").remove();
            $("#storeNameDiv").removeClass("has-error");
            $("#storeNameDiv").removeClass("has-warning");
            $("#storeNameDiv").addClass("has-success");

        }
    }
    if (editName) {
        if (!storeNameRegex.test(editName) && editName !== '' || editName.length < 50 || storeName == '') {
            if ($("#editStoreNameDiv").hasClass("has-error")) {
                return
            }
            $("#editStoreNameDiv").addClass("has-error");
            $("#editStoreNameDiv").append(inputFeedback2.text("Invalid Store Name"));
            return
        } else {
            $(".storeNameFeedback").remove();
            $("#editStoreNameDiv").removeClass("has-error");
            $("#editStoreNameDiv").removeClass("has-warning");
            $("#editStoreNameDiv").addClass("has-success");
            return
        }
    }
}

function disclaimerModal() {



    // Modal
    var modalFade = $("<div class='modal fade' id='editStudentModal' tabindex='-1' role='dialog' aria-labelledby='editStudentModalLabel' aria-hidden='true'>");
    var modalDialog = $("<div class='modal-dialog' role='document'>");
    var modalContent = $("<div>").addClass("modal-content");
    var modalHeader = $("<div>").addClass("modal-header");
    var modalTitle = $("<div>").addClass("modal-title").text("Disclaimer: This is a public application please do not add any sensitive or private information.");

    modalHeader.append(modalTitle);

    modalContent.append(modalHeader);


    var modalFooter = $("<div>").addClass("modal-footer");
    var cancelDeleteButton = $("<button class='btn btn-secondary' data-dismiss='modal'>");
    cancelDeleteButton.text("Cancel");
    modalFooter.append(cancelDeleteButton);
    modalContent.append(modalFooter);
    modalDialog.append(modalContent);
    modalFade.append(modalDialog);

    $(modalFade).modal("show");
    $(modalFade).on('hidden.bs.modal', () => {
        $(modalFade).remove();
    });
}


