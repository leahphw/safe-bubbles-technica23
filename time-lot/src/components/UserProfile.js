import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      location: '',
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
    // Handle the submission of the user profile data
    // You can access the data in this.state to send it to your backend
    const { firstName, lastName, username, location, assistanceOffered } = this.state;
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Location:', location);
    console.log('Assistance Offered:', assistanceOffered);
  };

  render() {
    const { firstName, lastName, username, location, assistanceOffered } = this.state;

    return (
      <div>
        <h2>User Profile</h2>
        <form onSubmit={this.handleProfileSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Assistance Offered:
            <div>
              <label>
                <input
                  type="checkbox"
                  name="assistanceOffered"
                  value="food"
                  checked={assistanceOffered.food}
                  onChange={this.handleInputChange}
                />
                Food
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="assistanceOffered"
                  value="water"
                  checked={assistanceOffered.water}
                  onChange={this.handleInputChange}
                />
                Water
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="assistanceOffered"
                  value="shelter"
                  checked={assistanceOffered.shelter}
                  onChange={this.handleInputChange}
                />
                Shelter
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="assistanceOffered"
                  value="transportation"
                  checked={assistanceOffered.transportation}
                  onChange={this.handleInputChange}
                />
                Transportation
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="assistanceOffered"
                  value="medicalAid"
                  checked={assistanceOffered.medicalAid}
                  onChange={this.handleInputChange}
                />
                Medical Aid
              </label>
            </div>
          </label>
          <br />
          <button type="submit">Save Profile</button>
        </form>
      </div>
    );
  }
}

export default UserProfile;