var viewModel = {
    students: ko.observableArray(),
    displayIndex: ko.observable(true),
    editor: {
        id: ko.observable(0),
        firstName: ko.observable(""),
        lastName: ko.observable(""),
        enrollmentDate: ko.observable(""),
        mode: ko.observable(""),
        reset: function () {
            this.id(0);
            this.firstName("");
            this.lastName("");
            this.enrollmentDate("");
            this.mode("");
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

function handleEditAndCreate(data) {
    if (data) {
        viewModel.editor.id(data.StudentID);
        viewModel.editor.firstName(data.FirstName);
        viewModel.editor.lastName(data.LastName);
        viewModel.editor.enrollmentDate(moment(data.EnrollmentDate).format('L'));
        viewModel.editor.mode("Edit Student Information");
    }
    else {
        viewModel.editor.mode("Create a Student");
    }

    viewModel.displayIndex(false);
    return;
}

function deleteItem(data) {
    if (data && data.StudentID > 0) {
        ajaxCall(data.StudentID, "DELETE", null, function () {
            getAllItems();
        });
    }
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
});