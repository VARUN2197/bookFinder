function searchBook() {
    var input = document.getElementById('userSearch').value;
    var searchQuery = document.getElementById('searchQuery');
    if(input)
        searchQuery.innerHTML = "Search results for " + input;
    else
        searchQuery.innerHTML = "Please enter book's name";
    var bookResult = document.getElementById('result');
    bookResult.innerHTML = "";
    
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + input,
        dataType: "JSON",
        success: function(books) {
            for(var i=0;i<books.items.length;i++){
                var book = books.items[i];
                var wrapperDiv = document.createElement('div');
                wrapperDiv.className="media";

                var image = document.createElement('img');
                image.className = "mr-3";
                image.src = book.volumeInfo.imageLinks.thumbnail;
                wrapperDiv.appendChild(image);

                var mediaBody = document.createElement('div');
                mediaBody.className = "media-body";
                var title = document.createElement('h5');
                title.className = "mt-0";
                title.innerHTML = book.volumeInfo.title;
                mediaBody.appendChild(title);
                var author = document.createElement('h6');
                for(var j=0;j<book.volumeInfo.authors.length;j++){
                    author.innerHTML += book.volumeInfo.authors[j];
                    if(j!=book.volumeInfo.authors.length-1){
                        author.innerHTML+=", ";
                    }
                        
                }
                mediaBody.appendChild(author);
                var publisher = document.createElement('p');
                publisher.innerHTML = '<b>Publisher:</b>' + " " + book.volumeInfo.publisher;
                mediaBody.appendChild(publisher);
                var desc = document.createElement('p');
                desc.innerHTML = book.volumeInfo.description;
                mediaBody.appendChild(desc)
                var booklink = document.createElement('a');
                booklink.innerHTML = "View More";
                booklink.href = book.volumeInfo.previewLink;
                mediaBody.appendChild(booklink);
                wrapperDiv.appendChild(mediaBody);

                bookResult.appendChild(wrapperDiv);
                var line = document.createElement('hr');
                bookResult.appendChild(line);
            }

        }
    });
}
