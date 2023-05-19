// collection in IndexedDB is created

// Open / create a new IndexedDB database
var request = indexedDB.open('BirdObservationsDB', 1);
var db;

// Handle database open status
request.onsuccess = function(event) {
    db = event.target.result;
};
request.onerror = function(event) {
    console.log('Error opening database:', event.target.error);
};

// Handle database upgrade (creating object store)
request.onupgradeneeded = function(event) {
    db = event.target.result;

    var objectStore = db.createObjectStore('birdObservations', { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('userName', 'userName', { unique: false });
    objectStore.createIndex('birdName', 'birdName', { unique: false });
    objectStore.createIndex('photo', 'photo', { unique: false });
    objectStore.createIndex('observedAt', 'observedAt', { unique: false });
    objectStore.createIndex('description', 'description', { unique: false });
    objectStore.createIndex('address', 'address', { unique: false });
    objectStore.createIndex('latitude', 'latitude', { unique: false });
    objectStore.createIndex('longitude', 'longitude', { unique: false });
};
