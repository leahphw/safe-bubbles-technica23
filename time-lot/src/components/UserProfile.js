import React, { useState } from 'react';
import { useUserContext } from './UserContext';

const initialFormState = {
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

const fieldStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px 10px',
  border: 'none',
  borderRadius: '5px',
  fontFamily: 'Space Mono',
  fontWeight: 700,
  margin: '10px',
};

const boxStyle = {
  border: "none",
  margin: "10px",
}

function UserProfile() {
  const [state, setState] = useState(initialFormState);
  const { addUserProfile } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? { ...prevState[name], [value]: checked } : value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const userProfile = {
      firstName: state.firstName,
      lastName: state.lastName,
      username: state.username,
      assistanceOffered: state.assistanceOffered,
    };

    addUserProfile(userProfile);
    setState(initialFormState);
    console.log('Profile after saving:', userProfile);
  };

  const { firstName, lastName, username, assistanceOffered } = state;

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            style={fieldStyle}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            style={fieldStyle}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            style={fieldStyle}
          />
        </label>

        <div>
          <h3>Assistance Offered:</h3>
          <label>
            Food
            <input
              type="checkbox"
              name="assistanceOffered"
              value="food"
              checked={assistanceOffered.food}
              onChange={handleInputChange}
              style={boxStyle}
            />
          </label>
          <label>
            Water
            <input
              type="checkbox"
              name="assistanceOffered"
              value="water"
              checked={assistanceOffered.water}
              onChange={handleInputChange}
              style={boxStyle}
            />
          </label>
          <label>
            Shelter
            <input
              type="checkbox"
              name="assistanceOffered"
              value="shelter"
              checked={assistanceOffered.shelter}
              onChange={handleInputChange}
              style={boxStyle}
            />
          </label>
          <label>
            Transportation
            <input
              type="checkbox"
              name="assistanceOffered"
              value="transportation"
              checked={assistanceOffered.transportation}
              onChange={handleInputChange}
              style={boxStyle}
            />
          </label>
          <label>
            Medical Aid
            <input
              type="checkbox"
              name="assistanceOffered"
              value="medicalAid"
              checked={assistanceOffered.medicalAid}
              onChange={handleInputChange}
              style={boxStyle}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#3498db',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Space Mono',
            fontWeight: 700,
            margin: '10px',
          }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default UserProfile;