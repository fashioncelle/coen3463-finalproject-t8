function getnewSearch() {
	localStorage.setItem("search", document.getElementById('search').value);
}

if (window.location.pathname === '/userprofile') {
	if (req.user._id === userID) {
		if (localStorage.getItem("search") === 'null' || localStorage.getItem("search") === null) {
			fetch('api/v1/books?sort=created').then(function(res) {
					res.json().then(function(books) {
						console.log('books', books);
						books.forEach(function(books){
						var tbody = document.getElementById('newentry');
							tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/book/' + books._id + '", class="red-text", style="font-size: 15px">' + books.title + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + books.uploader_name + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + books.views + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + books.created + '</td></tr>');
						});
			      		});
			    	});

			fetch('api/v1/books/count').then(function(res){
					res.json().then(function(count){
						console.log('count', count)
						var books = document.getElementById('totalBookcount');
						books.innerHTML = 'There are ' + count.count + ' Engineering Books';
					});
				});
		}

		else {
			fetch('api/v1/books?query={"title":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
				res.json().then(function(result) {

					if (newresult.length === 0) {
						document.getElementById('totalBookcount').innerHTML = "No book/s found related to " + 
						localStorage.getItem("search");

						document.getElementById('newresult').style.display = "none";

						document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/tedtalkslist"' +
						'>Back to the List of Engineering Books</a>')

					}
					else if (newresult.length === 1) {
						document.getElementById('totalBookcount').innerHTML = "Found " + newresult.length +
						" book/s related to " + localStorage.getItem("search");

						document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/tedtalkslist"' +
						'>Back to the List of Engineering Books</a>')
					}
					else {
						document.getElementById('totalBookcount').innerHTML = "Found " + newresult.length +
						" book/s related to " + localStorage.getItem("search");

						document.getElementById('allBooks').insertAdjacentHTML('beforeend', '<a href="/tedtalkslist"' +
						'>Back to the List of Engineering Books</a>')
					}
					
					var tbody = document.getElementById('newentry');
					result.forEach(function(result) {
							tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/list/' + result._id + '", class="red-text", style="font-size: 15px">' + result.title + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + result.uploader_name + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + result.views + '</td><td>' 
							+ '<a class="grey-text", style="font-size: 15px">' + result.created + '</td></tr>');
					});
					localStorage.setItem("search", null);
				});
			});
		}
	}
}

