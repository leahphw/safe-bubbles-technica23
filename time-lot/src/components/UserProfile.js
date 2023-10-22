import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      assistanceOffered: {
        food: false,
        water: false,
        shelter: false,
        transportation: false,
        medicalAid: false,
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prevState) => ({
      [name]: type === 'checkbox' ? { ...prevState[name], [value]: checked } : value,
    }));
  };

  handleProfileSubmit = () => {
    const { firstName, lastName, username, assistanceOffered } = this.state;

    // Create user data object
    const userData = {
      firstName,
      lastName,
      username,
      assistanceOffered,
    };

    // Call the sendUserData function passed as a prop
    this.props.sendUserData(userData);
  };

  render() {
    const { firstName, lastName, username, assistanceOffered } = this.state;

    return (
      <div>
        <h2>User Profile</h2>
        <form onSubmit={this.handleProfileSubmit}>
          {/* ... (your input fields) */}
          <button onClick={this.handleProfileSubmit}>Save Profile</button>
        </form>
      </div>
    );
  }
}

export default UserProfile;