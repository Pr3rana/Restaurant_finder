
$(window).on('load', function(){
  sessionStorage.clear();
});

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

var signupForm = $('#signupform');
  signupForm.submit(getInput);
var signinForm = $('#signinform');
  signinForm.submit(getInput);
var logintab = $('#logintab');

function getInput(e) {
    let url = $(e.target).attr('action');
    e.preventDefault();
    $.ajax({
        type: $(e.target).attr('method'),
        url: url,
        data: $(e.target).serialize(),
        success: function (data) {
            console.log('Submission was successful.');
            logintab.trigger( "click" );
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}