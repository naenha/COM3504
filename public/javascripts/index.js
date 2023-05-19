
let socket = io();
let db;

/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
function init() {
    if ('indexedDB' in window) {
        initIndexedDB();

    } else {
        console.log("This browser doesn't support IndexedDB");
    }
    window.addEventListener('online', function() {
        console.log('Online');
        // Send stored messages to MongoDB when it is online
        sendOfflineMessage();
    });

    window.addEventListener('offline', function() {
        console.log('Offline');
    });

    socket.on('chat', function (userId, chatText) {
        writeOnHistory('<b>' + userId + ':</b> ' + chatText);
    });

}
function initIndexedDB(){
    let request = indexedDB.open('chat',1);
    request.onerror = function (ev){
        console.log('fail to open indexedDB:',ev.request.error);
    }
    request.onsuccess = function (ev){
        console.log('open indexedDB');
        sendOfflineMessage();
    }
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        let objectStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('userId', 'userId');
        objectStore.createIndex('birdId', 'birdId');
        objectStore.createIndex('message', 'message');
    };
}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText(birdId) {
    let chatText = document.getElementById('chat_input').value;
    let name = document.getElementById('userID').value;

    if (navigator.onLine) {
        socket.emit('chat', name, birdId, chatText);
    } else {
        // it will save to IndexedDB when offline
        saveOfflineMessage(name, birdId, chatText);
    }

    document.getElementById('chat_input').value = '';
}


/**
 * it appends the given html text to the history div
 * @param text: teh text to append
 */
function writeOnHistory(text) {
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
}

//save messages to indexedDB
function saveOfflineMessage(userID,birdId,message){

    let transaction = db.transaction('messages', 'readwrite');
    let objectStore = transaction.objectStore('messages');
    let request = objectStore.add({userID: userID, birdId: birdId, message: message});
    request.onsuccess = function (ev){
        console.log('offline: save success');
    }
    request.onerror = function (ev){
        console.log('offline: failed to save', ev.request.error);
    }
}
//send the offline message to mongodb
function sendOfflineMessage(){
    if(navigator.onLine){
        let transaction = db.transaction('messages', 'readwrite');
        let objectStore = transaction.objectStore('messages');
        let request = objectStore.openCursor();
        request.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                let message = cursor.value;
                socket.emit('chat', message.userID, message.birdId, message.message);
                cursor.delete();
                cursor.continue();
            }
        };

        request.onerror = function(event) {
            console.log('Failed to send offline messages:', event.target.error);
        };
    }
}











