$(document).ready(function() {
  $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json'
    }).done(function(data){
      // Find out how to pull data you require
      // console.log(data);
      // console.log(data.candidates);

      // Iterate over your array of candidates and do following code.
      $.each(data.candidates, function(){
        var candidate = document.createElement('li');
        //Set-up form
        var f = document.createElement('form');
        f.setAttribute( 'method', "post" );
        f.setAttribute( 'action', 'https://bb-election-api.herokuapp.com/vote' );
        //Set-up button
        var button = document.createElement('button');
        button.setAttribute('name', this.name);
        button.setAttribute('class', 'vote');
        button.setAttribute('id', this.name);
        button.innerHTML = "Vote | " + this.name;
        $(button).appendTo(f);
        //Set-up input with type = hidden (use hidden for anything other than a post....)
        $('<input>').attr({
                            type: 'hidden',
                            id: this.name,
                            name: this.name,
                            value: this.name
                          }).appendTo(f);  // append to form
        // Append candidates name & votes to list-item. Then attach <li> to <ul>
        $(candidate).append(this.name + " | votes: " + this.votes).append(f).appendTo('#election-list');
      });
      // Create a click even on each individual button with a class = 'vote'.
    $('.vote').on('click', function(){
      event.preventDefault();
      $.ajax({
        url: 'https://bb-election-api.herokuapp.com/vote?name='+this.name,
        method: 'POST'
      }).done(function(){
        //Disable buttons after clicked.
        $(' .vote').attr("disabled",true);
      }).fail(function(){
        // Error message.
        console.log("Lalalalala lala la la hum dooo deee doo da la la la");
      });
    });
    // Refresh window when clicked.
    $('.refresh').on('click' ,function(){
      window.location.reload(true);
    });

  });
});
