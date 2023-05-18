



// Open or create a new IndexedDB database
var request = indexedDB.open('BirdObservationsDB', 1);
var db;

// Handle database open/create success
request.onsuccess = function(event) {
    db = event.target.result;
};

// Handle database open/create error
request.onerror = function(event) {
    console.log('Error opening database:', event.target.error);
};

// Handle database upgrade (creating object store)
request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store (table) to store bird observations
    var objectStore = db.createObjectStore('birdObservations', { keyPath: 'id', autoIncrement: true });

    // Define the structure of the object store (table)
    objectStore.createIndex('userName', 'userName', { unique: false });
    objectStore.createIndex('birdName', 'birdName', { unique: false });
    objectStore.createIndex('photo', 'photo', { unique: false });
    objectStore.createIndex('observedAt', 'observedAt', { unique: false });
    objectStore.createIndex('description', 'description', { unique: false });
    objectStore.createIndex('address', 'address', { unique: false });
    objectStore.createIndex('latitude', 'latitude', { unique: false });
    objectStore.createIndex('longitude', 'longitude', { unique: false });
};

// Handle form submission
// document.getElementById('xForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission
//
//     var formData = new FormData(this);
//
//     // Extract form data
//     var userName = formData.get('userName');
//     var birdName = formData.get('birdName');
//     var photo = formData.get('myImg');
//     var observedAt = formData.get('observedAt');
//     var description = formData.get('description');
//     var address = formData.get('address');
//     var latitude = formData.get('latDisplay');
//     var longitude = formData.get('lngDisplay');
//
//     // Create a transaction and object store for writing to the database
//     var transaction = db.transaction(['birdObservations'], 'readwrite');
//     var objectStore = transaction.objectStore('birdObservations');
//
//     // Create an object (record) to store in the object store
//     var observation = {
//         userName: userName,
//         birdName: birdName,
//         photo: photo,
//         observedAt: observedAt,
//         description: description,
//         address: address,
//         latitude: latitude,
//         longitude: longitude
//     };
//
//     // Add the observation object to the object store
//     var request = objectStore.add(observation);
//
//     // Handle the success or error of adding the record
//     request.onsuccess = function(event) {
//         console.log('Observation added to IndexedDB');
//         // Clear the form after successful submission if needed
//         // document.getElementById('xForm').reset();
//     };
//
//     request.onerror = function(event) {
//         console.log('Error adding observation:', event.target.error);
//     };
// });
