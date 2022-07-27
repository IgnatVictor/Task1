function index() {

    userApi = 'https://jsonplaceholder.typicode.com/users/'
    photosApi = "https://jsonplaceholder.typicode.com/photos/"

    const getUsersPhotos = async (id) => {
        let response = await fetch(photosApi + id);
        return await response.json();
    }

    const getUsers = async () => {
        const response = await fetch(userApi);
        return await response.json();
    }

    getUsers().then((data) => {
        let users = [];
        data.map(item => {
            users.push(item)
        });

        document.querySelector('#sort').addEventListener("change", function () {

            switch (this.value) {
                case "ascending": {
                    users.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
                    break;
                };
                case "descending": {
                    users.sort(function (a, b) { return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0); });
                    break;
                }

                case "default": {
                    users.sort(function (a, b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
                    break;
                }

            }

            displayUsers(users);
            displayImages();
        })

        let card = document.createElement('div')
        card.classList.add('main')
        function displayUsers(users) {
            card.innerHTML = '<ul  class="cards">' + users.map(user => {
                return ('<li class="cards_item">' +
                    '<div class="card">' +
                    '<div class="card_image"><img src=""  id="' + user.id + '"/>' +
                    '<div class="card_content">' +
                    '<h2 class="card_title">' + "Name: " + user.name + '</h2>' +
                    '<p class="card_text">' + "City: " + user.address.city + '</p>' +
                    '<p class="card_text">' + "geo Lat: " + user.address.geo.lat + " Lng: " + user.address.geo.lat + '</p>' +
                    '<p class="card_text">' + "Street: " + user.address.street + '</p>' +
                    '<p class="card_text">' + "Suite: " + user.address.suite + '</p>' +
                    '<p class="card_text">' + "Zipcode: " + user.address.zipcode + '</p>' +
                    '<p class="card_text">' + "Company Bs: " + user.company.bs + '</p>' +
                    '<p class="card_text">' + "Company catchPhrase: " + user.company.catchPhrase + '</p>' +
                    '<p class="card_text">' + "Company name: " + user.company.name + '</p>' +
                    '<p class="card_text">' + "Email: " + user.email + '</p>' +
                    '<p class="card_text">' + "Phone: " + user.phone + '</p>' +
                    '<p class="card_text">' + "Username: " + user.username + '</p>' +
                    '<a href="' + 'http://' + user.website + '"class="btn card_btn" data-id="' + user.id + '";>' + "Website" + '</a>' +
                    '</div>' +
                    '</div>' +
                    '</li>')
            }).join('') + '</ul>';
            document.body.append(card)
        }
        displayUsers(users);

        
        

        function displayImages() {
            var images = document.querySelectorAll('img');
            Array.prototype.forEach.call(images, function (image) {
                getUsersPhotos(image.id).then(data => {
                    return image.src = data.thumbnailUrl
                })
            })
        }

        displayImages();
      
    })
}


index();