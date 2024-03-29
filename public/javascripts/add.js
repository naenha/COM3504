// Ajax Query is used to collect data from the form

function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            // document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}

function onSubmit() {

    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('xForm');
    var formData = new FormData(myForm);
    console.log(formData);
    sendAjaxQuery('/add', formData);
    return false;
}


