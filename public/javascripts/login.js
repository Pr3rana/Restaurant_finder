var data;
fetch('/users/signin.json').then(function(response) {
    response.text().then(function(text) {
        data = JSON.parse(text)
        renderList(data);
    });
  });
// console.log(data);
function renderList(data){
    console.log(data.restaurants[0].restaurant)
    
    var listContainer = document.getElementById('restaurentList');
    for (let i = 0; i < 9; i++) {
        let name = data.restaurants[i].restaurant.name;
        let url = data.restaurants[i].restaurant.url;
        let img = data.restaurants[i].restaurant.featured_image;
        let avgCost = data.restaurants[i].restaurant.average_cost_for_two;
        let cuisines = data.restaurants[i].restaurant.cuisines;
        let rating = data.restaurants[i].restaurant.user_rating.aggregate_rating;
        let altUrl = 'https://b.zmtcdn.com/data/pictures/chains/8/54148/a2bff39a00aaaa5a111012ba90d69331.jpg?output-format=webp';
        // console.log("img",img);
        var item = '<div class="col-lg-4 col-md-6 mb-4">'+
        '            <div class="card h-100">'+
        '              <a class="redirect" href="'+url+'"><img class="card-img-top" src="'+img+'"></a>'+
        '              <div class="card-body">'+
        '                <h4 class="card-title">'+
        '                  <a class="redirect" href="'+url+'">'+name+'</a>'+
        '                </h4>'+
        '<p>Ratings: '+rating+ '</p>'+
        '                <p>Price for two: Rs.' +avgCost+'/-'+'</p>'+
        '                <p class="card-text">'+ cuisines +'</p>'+
        '<a href="'+url+'">Open in Zomato</a>'+
        '              </div>'+
        '              <div class="card-footer">'+
        '                <small class="text-muted">★ ★ ★ ★ ☆</small>'+
        '              </div>'+
        '            </div>'+
        '          </div>';
        
        listContainer.insertAdjacentHTML('afterbegin',item);
        
    }
}
var a = document.getElementsByClassName("redirect");
// var input = document.getElementsByClassName('search_input');
// input.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       // Cancel the default action, if needed
//         event.preventDefault();
//         let params = input.value.toLowerCase();
//         $.ajax({
//             type: 'GET',
//             url: '/users/search',
//             data: params,
//             success: function (data) {
//                 console.log('Submission was successful.');
//                 console.log(data);
//             },
//             error: function (data) {
//                 console.log('An error occurred.');
//                 console.log(data);
//             },
//         });
//     }
// });