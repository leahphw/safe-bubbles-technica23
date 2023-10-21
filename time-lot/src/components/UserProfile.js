import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      location: '',
      assistanceList: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Send this.state data to your backend for user registration or update
    // You can use Axios or Fetch for this purpose
  }

  render() {
    return (
      <div>
        <h2>User Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Assistance List (comma-separated):</label>
            <input
              type="text"
              name="assistanceList"
              value={this.state.assistanceList}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Save Profile</button>
        </form>
      </div>
    );
  }
}

export default UserProfile;
