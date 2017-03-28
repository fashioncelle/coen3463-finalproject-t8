function getSearch() {
	localStorage.setItem("search", document.getElementById('search').value);
}

if (window.location.pathname === '/bookslist') {
	if (localStorage.getItem("search") === 'null' || localStorage.getItem("search") === null) {
		fetch('api/v1/books?sort=created').then(function(res) {
				res.json().then(function(books) {
					console.log('books', books);
					books.forEach(function(books){
					var tbody = document.getElementById('entry');
						tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/list/' + books._id + '", class="red-text", style="font-size: 15px">' + books.title + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + books.author + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + books.uploader_name + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + books.price + '</td></tr>');
					});
		      		});
		    	});

		fetch('api/v1/books/count').then(function(res){
				res.json().then(function(count){
					console.log('count', count)
					var list = document.getElementById('totalCount');
					list.innerHTML = 'There are ' + count.count + ' Engineering Book/s Available';
				});
			});
	}

	else {
		fetch('api/v1/books?query={"title":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
			res.json().then(function(result) {

				if (result.length === 0) {
					document.getElementById('totalCount').innerHTML = "No book/s found related to " + 
					localStorage.getItem("search");

					document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/bookslist"' +
					'>Back to the List of Engineering Books</a>')

				}
				else if (result.length === 1) {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
					" book/s related to " + localStorage.getItem("search");

					document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/bookslist"' +
					'>Back to the List of Engineering Books</a>')
				}
				else {
					document.getElementById('totalCount').innerHTML = "Found " + result.length +
					" book/s related to " + localStorage.getItem("search");

					document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/bookslist"' +
					'>Back to the List of Engineering Books</a>')
				}
				
				var tbody = document.getElementById('entry');
				result.forEach(function(result) {
						tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/list/' + result._id + '", class="red-text", style="font-size: 15px">' + result.title + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + result.author + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + result.uploader_name + '</td><td>' 
						+ '<a class="white-text", style="font-size: 15px">' + result.price + '</td></tr>');
				});
				localStorage.setItem("search", null);
			});
		});
	}
}

if (window.location.pathname === '/userprofile') {
			var user = document.getElementById("user").value;
			  fetch('/api/v1/books?query={"user":"~('+ user +')"}').then(function(res) {
			    res.json().then(function(books) {	
			    	console.log('books', books);
			     	books.forEach(function(books) {
			    	var tbody = document.getElementById('uentry');
			    		tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/list/' + books._id + '", class="red-text", style="font-size: 15px">' + books.title + '</td><td>' 
						+ '<a class="grey-text", style="font-size: 15px">' + books.author + '</td><td>'  
						+ '<a class="grey-text", style="font-size: 15px">' + books.created + '<td><td><a href="/books/' 
			         	+ books._id + '/edit">' + 'Edit' + '</td><td><a href="/books/' 
			         	+ books._id + '/delete">' + 'Delete' + '</td></tr>');
			      });
			    })
			  });
};
