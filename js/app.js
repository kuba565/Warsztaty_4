$(document).ready(function(){
    var text1 = $("div#text1").find("p");
    var textDiv = text1.find("div");
    
    
    function click (id) {
            $.ajax({
            url: "http://localhost:8282/books/"+id,
            type: "GET",
            dataType : "json",
            success: function( json ) {
                var divKid = $('p[data-id='+id+']').next();
                divKid.text("id= " +json.id +" author= "+ json.author +" isbn= "+ json.isbn);
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ){}
        });
    }
    $.ajax({
        url: "http://localhost:8282/books/",
        type: "GET",
        dataType : "json",
        success: function( json ) {
            var bookId = 0;
            for (var i = 0; i < json.length; i++) { 
                
                var emptyDiv = $("<div></div>");
                var para = $("<p class='list' data-id="+json[i].id+'></p>').append(json[i].title);
                text1.append(para).append(emptyDiv);
                bookId = this.id;
                para.on("click", function() {
                    click($(this).data("id"));
                });
            }
            
        },
        error: function( xhr, status, errorThrown ) {},
        complete: function( xhr, status ){}
    });
    
    

    
});