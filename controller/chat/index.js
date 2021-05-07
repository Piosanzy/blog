const Chatting = require('../../models/chatting/chat');
const Room = require('../../models/chatting/room');
const UserSession = require('../../models/chatting/userSession');

const chattingApi = () => {
    const createRoom = async (room_name, room_user) => {
        try {
            return await Room.create(room_name, room_user);
        } catch (e) {
            console.log(e);
            return {error: e.message};
        }
    }
    const joinRoom = async (_id, room_user) => {
        try {
            return await Room.joinRoom(_id, room_user)
        } catch (e) {
            console.log(e)
        }
    }

    const getRoomList = async () => {
        try {
            return await Room.getRoomList();
        } catch (e) {
            console.log(e)
        }
    }

    const getRoom = async (_id) => {
        try {
            return await Room.getRoomInfo(_id);
        } catch (e) {
            console.log(e)
        }
    }

    const createUserSession = async (user_id, name, email) => {
        try {
            const data = await _check(user_id)
            if (data.length > 0) {
                return await UserSession.lastConnect(data[0]._id)
            } else {
                return await UserSession.create(user_id, name, email);

            }
        } catch (e) {
            console.log(e);
            return {error: e.message};
        }
    }

    const getSessionList = async () => {
        try {
            return await UserSession.find();
        } catch (e) {
            console.log(e)
        }
    }

    const createRoomChat = async (room_id, user_id, user_name, answer) => {
        try {
            return await Chatting.create(room_id, user_id, user_name, answer);
        } catch (e) {
            console.log(e);
            return {error: e.message};
        }
    }

    const getChattingLog = async (room_id) => {
        try {
            return await Chatting.findRoomChat(room_id);
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSessionDisconnect = async (user_id) => {
        try {
            return await UserSession.disconnect(user_id);
        } catch (e) {
            console.log(e)
        }
    }

    const _check = async (user_id) => {
        return await UserSession.findOneByUserId(user_id)
    }

    return {
        createRoom: createRoom,
        joinRoom: joinRoom,
        getRoomList: getRoomList,
        createUserSession: createUserSession,
        getSessionList: getSessionList,
        deleteSessionDisconnect: deleteSessionDisconnect,
        getRoom: getRoom,
        createRoomChat: createRoomChat,
        getChattingLog: getChattingLog
    }
}

module.exports = chattingApi();