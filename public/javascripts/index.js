var Bird = require('../models/birds');


function updateBirdName(id) {
    const filter = {_id: id};
    var newBirdName = document.getElementById("name").value;
    const update = {birdName : newBirdName};
    Bird.findOneAndUpdate(filter, update, {
        new: true
    });
}
