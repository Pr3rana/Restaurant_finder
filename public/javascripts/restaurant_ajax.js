// var reviewForm = $('#reviewContent');
// reviewForm.submit(getInput);
  function getInput(e) {
    //console.log(e.currentTarget.attr('method'),"e");
    e.preventDefault();
    $.ajax({
        type: $(e.target).attr('method'),
        url: $(e.target).attr('action'),
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({data: 'test'}),
        success: function (data) {
            console.log('Submission was successful.');
            console.log(data);
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}

