// $(window).on('load', (function() {
//   if (sessionStorage.getItem('status') == null){
//     window.location.href = "/";
//   } //redirect to page
// }));
$(document).on('load', (function() {
  if (sessionStorage.getItem('status') != 'loggedIn'){
    //redirect to page  
    window.location.href = "/";
  }
  else{
      return;
  }
}));

jQuery(document).ready(function($){
	    
	$(".btnrating").on('click',(function(e) {
	
	var previous_value = $("#selected_rating").val();
	
	var selected_value = $(this).attr("data-attr");
	$("#selected_rating").val(selected_value);
	
	$(".selected-rating").empty();
	$(".selected-rating").html(selected_value);
	
	for (i = 1; i <= selected_value; ++i) {
	$("#rating-star-"+i).toggleClass('btn-warning');
	$("#rating-star-"+i).toggleClass('btn-default');
	}
	
	for (ix = 1; ix <= previous_value; ++ix) {
	$("#rating-star-"+ix).toggleClass('btn-warning');
	$("#rating-star-"+ix).toggleClass('btn-default');
	}
	
	}));	
});
var uName = userInfo.FirstName;
//check in jade
document.getElementById('userName').innerHTML = "Welcome "+ uName;

renderDetails(restaurantDetails);
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



// var reviewForm = $('#reviewContent');
// reviewForm.submit(getInput);
  function getInput() {
    let formData =  JSON.parse(JSON.stringify($('form').serializeArray()));
    let restaurantId = restaurantDetails.id;
    let comment = formData[0].value;
    let ratings = formData[1].value;
    let review = {};
    review.comment = comment;
    review.rating = ratings;
    let dataContent = {}, ratingDetails = {};
    ratingDetails.userNmae  = uName;
    ratingDetails.comment = comment;
    ratingDetails.rating = ratings;
    dataContent.key = restaurantId;
    dataContent.value = [ratingDetails];
    $.ajax({
        type: 'post',
        url: '/users/reviews',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(dataContent),
        success: function (data) {
            console.log('Submission was successful.');
            $('form').trigger("reset");
            appendReviewCard(data);
            
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}
if( reviewsInfo && reviewsInfo.value){
  appendReviewCard(reviewsInfo);
}
function appendReviewCard(data) {
  console.log("newdata: ",data);
  let id = data.key;
  let value = data.value, len = value.length;
  let reviewContainer = document.getElementById('reviewContainer');
  if(reviewsInfo && reviewsInfo.value){
    reviewContainer.innerHTML = "";
  }
  
  for(let i=0; i< len; i++){
  let uName = value[i].userNmae;
  let comment = value[i].comment;
  let rating = value[i].rating;
  var item = '<div class="col-lg-4 col-md-6 mb-4">'+
        ' <div class="card">'+
        ' <a class="redirect" href="/users/restaurant?id='+id+'">' +
        ' <div class="card-body">'+
        ' <h4 class="card-title">'+
        ' <a class="redirect" href="/users/restaurant?id='+id+'">'+uName+'</a>'+
        ' </h4>'+
        ' <p class="cuisinesList" class="card-text">'+ comment +'</p></div>'+
        ' </div>'+
        ' <div class="card-footer">'+
        ' <small class="text-muted">Ratings: '+rating+'</small>'+
        ' </div>'+
        ' </div>'+
        ' </div>';
  reviewContainer.insertAdjacentHTML('afterbegin',item);
  }
}
function signoutUser() {
    sessionStorage.clear();
    
}