let name = null;
let roomNo = null;
let socket = io();


/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
function init() {

    // // called when someone joins the room. If it is someone else it notifies the joining of the room
    // socket.on('joined', function (room, userId) {
    //     if (userId === name) {
    //         // it enters the chat
    //         hideLoginInterface(room, userId);
    //     } else {
    //         // notifies that someone has joined the room
    //         writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room);
    //     }
    // });
    // called when a message is received
    socket.on('chat', function (userId, chatText) {
        let who = userId
        writeOnHistory('<b>' + who + ':</b> ' + chatText);
    });

}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText(birdId) {
    let chatText = document.getElementById('chat_input').value;
    let name = document.getElementById('userID').value;
    socket.emit('chat', name,birdId, chatText);
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