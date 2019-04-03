renderList(restaurantDetails);
var uNmae = userInfo.FirstName;
// console.log(data);
//check in jade
document.getElementById('userName').innerHTML = "Welcome "+uNmae;
function renderList(data){
    // console.log(data.restaurants[0].restaurant)
    
    var listContainer = document.getElementById('restaurentList');
    listContainer.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        let rName = data.restaurants[i].restaurant.name;
        let url = data.restaurants[i].restaurant.url;
        let img = data.restaurants[i].restaurant.featured_image;
        let avgCost = data.restaurants[i].restaurant.average_cost_for_two;
        let cuisines = data.restaurants[i].restaurant.cuisines;
        let rating = data.restaurants[i].restaurant.user_rating.aggregate_rating;
        let altUrl = 'https://b.zmtcdn.com/data/pictures/chains/8/54148/a2bff39a00aaaa5a111012ba90d69331.jpg?output-format=webp';
        let id = data.restaurants[i].restaurant.id;
        // console.log("img",img);
        var item = '<div class="col-lg-4 col-md-6 mb-4">'+
        ' <div class="card">'+
        ' <a class="redirect" href="/users/restaurant?id='+id+'">' +
        ' <img class="card-img-top" width="252" height="156" src="' + img + '" alt="http://placehold.it/900x350"></a>'+
        ' <div class="card-body">'+
        ' <h4 class="card-title">'+
        ' <a class="redirect" href="/users/restaurant?id='+id+'">'+rName+'</a>'+
        ' </h4>'+
        ' <p>Price for two: Rs.' +avgCost+'/-'+'</p>'+
        '<div class="cusineWrapper">'+
        ' <p class="cuisinesList" class="card-text">'+ cuisines +'</p></div>'+
        '<a href="'+url+'">Open in Zomato</a>'+
        ' </div>'+
        ' <div class="card-footer">'+
        ' <small class="text-muted">Ratings: '+rating+'</small>'+
        ' </div>'+
        ' </div>'+
        ' </div>';
        
        listContainer.insertAdjacentHTML('afterbegin',item);
        
    }
}
var search = document.getElementsByClassName("searchbar");
var input = document.getElementsByClassName('search_input');
search[0].addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
        event.preventDefault();
        let params =input[0].value.toLowerCase();
        $.ajax({
            type: 'GET',
            url: '/users/search',
            data: {"val":params},
            success: function (data) {
                console.log('Submission was successful.');
                renderList(data);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    }
});
function signoutUser() {
    sessionStorage.clear();
    
}