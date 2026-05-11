import React, { useState } from "react";
import "./EditProfile.css";

function EditProfile() {
  const savedUser = JSON.parse(localStorage.getItem("codewaveUser"));

  const [username, setUsername] = useState(savedUser?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
  const savedUser = JSON.parse(localStorage.getItem("codewaveUser"));

  if (!savedUser) {
    alert("No account found");
    return;
  }

  if (username.trim() === "" && password.trim() === "" && confirmPassword.trim() === "") {
    alert("Please edit username or password");
    return;
  }

  if (password.trim() !== "" || confirmPassword.trim() !== "") {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  }

  const updatedUser = {
    ...savedUser,
    username: username.trim() !== "" ? username : savedUser.username,
    password: password.trim() !== "" ? password : savedUser.password,
  };

  localStorage.setItem("codewaveUser", JSON.stringify(updatedUser));

  alert("Profile Updated Successfully ✅");

  window.location.href = "/dashboard";
};

  return (
    <div className="editPage">
      <div className="editCard">
        <div className="editHeader">
          <div>
            <h1>📝 Edit Profile</h1>
            <p>Update your account details</p>
          </div>

          <button onClick={() => (window.location.href = "/")}>
            ← Back
          </button>
        </div>

        <label>Edit Username</label>
        <input
          type="text"
          placeholder="Edit username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Edit Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="updateBtn" onClick={handleUpdate}>
          Update Profile
        </button>

        <p className="hint">Make sure to use a strong password.</p>
      </div>
    </div>
  );
}

export default EditProfile;