const UserSelector = ({ users, setSelectedUser }) => {
    return (
      <div className="user-selector">
        <label>Select a User:</label>
        <select onChange={(e) => setSelectedUser(users.find(user => user.id === e.target.value))}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default UserSelector;
  