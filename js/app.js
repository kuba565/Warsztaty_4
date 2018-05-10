$(document).ready(function(){
    var text1 = $("div#text1").find("p");
    var textDiv = text1.find("div");
    
    loadBooks();
    function click (id) {
            $.ajax({
            url: "http://localhost:8080/book-repository/books/"+id,
            type: "GET",
            dataType : "json",
            success: function( json ) {
                var divKid = $('p[data-id='+id+']').next();
                divKid.text("id: " +json.id +", author: "+ json.author +", isbn: "+ json.isbn+", publisher: "+ json.publisher+", type: "+ json.type);
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ){}
        });
        
        
        
    }
    
    function loadBooks() {
        $.ajax({
            url: "http://localhost:8080/book-repository/books/",
            type: "GET",
            dataType : "json",
            success: function( json ) {
                var bookId = 0;
                for (var i = 0; i < json.length; i++) { 
                    var button = $("<button class='delete' data-id="+json[i].id+" >delete</button>")
                    var emptyDiv = $("<div class='list'></div>");
                    var para = $("<p class='list' data-id="+json[i].id+'></p>').append(json[i].title);
                    text1.append(para).append(emptyDiv);
                    text1.append(button)
                    bookId = this.id;
                    para.on("click", function() {
                        click($(this).data("id"));
                    });
                }
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ){}
        });
        
    }
    
    
    $("#add").click(function(e) {
        e.preventDefault();
        var book = {};
        book.title = $("input[name='title']").val();
        book.author = $("input[name='author']").val();
        book.isbn = $("input[name='isbn']").val();
        book.type = $("input[name='type']").val();
        book.publisher = $("input[name='publisher']").val();
        
        if (book.title != "" && book.author != "" && book.isbn != "" && book.type != "" && book.publisher != "") {
            $.ajax({
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },  
                type: "POST",
                url: 'http://localhost:8080/book-repository/books/',
                dataType: 'json',
                async: false,
                data: JSON.stringify(book),
                success: function () {
                    alert("book added!"); 
                    $(".list").remove();
                    
                $(".delete").remove();
                    loadBooks();
                }
            })
        }
    });
    
    
    $("div#text1").on("click", "button.delete", function(){
        var delId = $(this).data("id");
        console.log(delId);
        $.ajax({
            url: "http://localhost:8080/book-repository/books/"+delId,
            type: "DELETE",
            dataType : "json",
            success: function( json ) {
                alert(" deleted");
                $(".list").remove();
                $(".delete").remove();
                    loadBooks();
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ){}
        });
    });
    
    
    
});