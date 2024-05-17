function getNewRoomId(rooms)
{
    let roomId;
    do {
        roomId = generateRoomId();
    } while (roomId in rooms)
    return roomId
}

function generateRoomId() {
    return 9999;
    //return Math.floor(Math.random() * 9000) + 1000;
}

module.exports = {
    getNewRoomId,
};