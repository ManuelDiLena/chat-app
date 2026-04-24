const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!name || !room) {
    return { error: 'Username and room are required' };
  }
  const userExits = users.find(user => {
    return user.room === room && user.name === name;
  })
  if (userExits) {
    return { error: 'Username is taken' };
  }
  const user = { id, name, room }
  users.push(user);
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0]; 
  }
}

const getUser = (id) => {
  return users.find(user => user.id === id);
}

const getUserInRoom = (room) => {
  return users.filter(user => user.room === romm);
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom
};