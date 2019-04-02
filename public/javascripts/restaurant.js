

// jQuery(document).ready(function($){
	    
// 	$(".btnrating").on('click',(function(e) {
	
// 	var previous_value = $("#selected_rating").val();
	
// 	var selected_value = $(this).attr("data-attr");
// 	$("#selected_rating").val(selected_value);
	
// 	$(".selected-rating").empty();
// 	$(".selected-rating").html(selected_value);
	
// 	for (i = 1; i <= selected_value; ++i) {
// 	$("#rating-star-"+i).toggleClass('btn-warning');
// 	$("#rating-star-"+i).toggleClass('btn-default');
// 	}
	
// 	for (ix = 1; ix <= previous_value; ++ix) {
// 	$("#rating-star-"+ix).toggleClass('btn-warning');
// 	$("#rating-star-"+ix).toggleClass('btn-default');
// 	}
	
// 	}));
	
		
// });
var uNmae = userInfo.FirstName;
//check in jade
document.getElementById('userName').innerHTML = "Welcome "+ uNmae;

renderDetails(myVar);
function renderDetails(data) {
    var listContainer = document.getElementById('restaurentDetails');
    var imgContainer = document.getElementById('1stImage');
    var rName = document.getElementById('shopName');
    let reviewForm = document.getElementById('reviewContent');
    listContainer.innerHTML = "";
    let name = data.name;
    let url = data.url;
    let img = data.featured_image;
    let avgCost = data.average_cost_for_two;
    let cuisines = data.cuisines;
    let rating = data.user_rating.aggregate_rating;
    let altUrl = 'https://b.zmtcdn.com/data/pictures/chains/8/54148/a2bff39a00aaaa5a111012ba90d69331.jpg?output-format=webp';
    let id = data.id;
    imgContainer.setAttribute("src",img);
    rName.innerHTML = name;
    // console.log("img",img);
    var item = '<div class="col-lg col-md mb details">'+
    '            <div class="card">'+
    '              <div class="card-body">'+
    '                <h4 class="card-title">'+
    '                  <a class="redirect" href="'+url+'">'+name+'</a>'+
    '                </h4>'+
    '                <p>Price for two: Rs.' +avgCost+'/-'+'</p>'+
    '                <p class="card-text">'+ cuisines +'</p>'+
    '<a href="'+url+'">Open in Zomato</a>'+
    '              </div>'+
    '              <div class="card-footer">'+
    '                <small class="text-muted">Ratings: '+rating+'</small>'+
    '              </div>'+
    '            </div>'+
    '          </div>';
    
    listContainer.insertAdjacentHTML('afterbegin',item);
}

let restaurantId = myVar.id;
var comment = $('#reviewContent').val();
// reviewContent.submit(submitReview);
var dataContent = {}
dataContent[restaurantId] = {[uNmae]: comment}

// var reviewForm = $('#reviewContent');
// reviewForm.submit(getInput);
  function getInput() {
    $.ajax({
        type: 'post',
        url: '/users/reviews',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(dataContent),
        success: function (data) {
            console.log('Submission was successful.');
            // console.log(data);
            appendReviewCard(data);
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}

function appendReviewCard(data) {
  console.log("review", data);
  // var item = '<div class="col-lg-4 col-md-6 mb-4">'+
  //       ' <div class="card">'+
  //       ' <a class="redirect" href="/users/restaurant?id='+id+'">' +
  //       ' <img class="card-img-top" width="252" height="156" src="' + img + '" alt="http://placehold.it/900x350"></a>'+
  //       ' <div class="card-body">'+
  //       ' <h4 class="card-title">'+
  //       ' <a class="redirect" href="/users/restaurant?id='+id+'">'+rName+'</a>'+
  //       ' </h4>'+
  //       ' <p>Price for two: Rs.' +avgCost+'/-'+'</p>'+
  //       '<div class="cusineWrapper">'+
  //       ' <p class="cuisinesList" class="card-text">'+ cuisines +'</p></div>'+
  //       '<a href="'+url+'">Open in Zomato</a>'+
  //       ' </div>'+
  //       ' <div class="card-footer">'+
  //       ' <small class="text-muted">Ratings: '+rating+'</small>'+
  //       ' </div>'+
  //       ' </div>'+
  //       ' </div>';
}
