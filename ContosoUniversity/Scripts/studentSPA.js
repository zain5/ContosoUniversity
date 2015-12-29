var viewModel = {
    students: ko.observableArray(),
    displayIndex: ko.observable(true),
    editor: {
        id: ko.observable(0),
        firstName: ko.observable(""),
        lastName: ko.observable(""),
        enrollmentDate: ko.observable(""),
        reset: function () {
            this.id(0);
            this.firstName("");
            this.lastName("");
            this.enrollmentDate("");
        }
    }
}

function ajaxCall(urlAppend, httpMethod, reqData, callBack) {
    $.ajax({
        url: "/api/StudentWeb" + (urlAppend ? "/" + urlAppend : ""),
        type: httpMethod,
        data: reqData,
        success: callBack
    });
}

function getAllItems() {
    ajaxCall(null, "GET", null, function (data) {
        viewModel.students.removeAll();
        for (var i = 0; i < data.length; i++) {
            viewModel.students.push(data[i]);
        }
    });
}

function deleteItem() {

}

function handleEditAndCreate() {
    if ($(this).val() === 'Create') {

    }
    else if ($(this).val() === 'Edit') {
        var item = ko.dataFor(this);
        viewModel.editor.id(item.StudentID);
        viewModel.editor.firstName(item.FirstName);
        viewModel.editor.lastName(item.LastName);
        viewModel.editor.enrollmentDate(moment(item.EnrollmentDate).format('L'));
    }

    viewModel.displayIndex(false);
    return;
}

function saveItem() {
    ajaxCall(viewModel.editor.id(), (viewModel.editor.id() > 0 ? "PUT" : "POST"),
             {
                 StudentID: viewModel.editor.id(),
                 FirstName: viewModel.editor.firstName(),
                 LastName: viewModel.editor.lastName(),
                 EnrollmentDate: moment(viewModel.editor.enrollmentDate()).format("MM/DD/YYYY HH:mm:ss")
             },
             function () {
                 viewModel.displayIndex(true);
                 viewModel.editor.reset();
                 getAllItems();
             });
}

$(function () {
    getAllItems();
    ko.applyBindings(viewModel);

    $('.createBtn').on('click', handleEditAndCreate);
    $('table').on('click', 'input:button(.editBtn)', handleEditAndCreate);
    //$('.saveBtn').on('click', saveItem);
});