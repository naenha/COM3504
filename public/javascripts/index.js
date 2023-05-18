var Bird = require('../models/birds');

        function updateName(id) {
            var newname = document.getElementById("birdName");
            Bird.findByIdAndUpdate(id, { birdName: newname },
                function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Updated User : ", docs);
                        document.getElementById("birdName").innerHTML = newname;
                    }
                });
        }
