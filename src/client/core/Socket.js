import io from 'socket.io-client';

class Socket {
  constructor({ state }) {
    this.io = null;
    this.state = state;
  }

  login = ({ nickname, avatarUrl }) => {
    return new Promise((resolve, reject) => {

      // connect to ws server
      console.log('login')
      this.io = io(window.location.origin, {
        query: { nickname, avatarUrl },
      });

      // wait logined event
      this.io.once('logined', (userData) => {
        console.log('logined', userData);
        this.state.setUser(userData);
        resolve();
      })
    })
  }

  fetchRooms = () => {
    return new Promise((resolve, reject) => {
      console.log('fetchRooms')
      this.io.emit('fetchRooms');

      this.io.once('rooms', (roomsData) => {
        console.log('rooms', roomsData);
        this.state.setRooms(roomsData);
        resolve();
      })
    })
  }
}

export default Socket;
