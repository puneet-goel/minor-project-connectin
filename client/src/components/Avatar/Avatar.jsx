import React from 'react';
import { stringToColor, parseUsernameInitials } from '../../utility/index';
import './Avatar.css';

const Avatar = ({ username = null, className = '' }) => {
  const userInitials = parseUsernameInitials(username);
  const color = stringToColor(username);
  return (
    <div className={`avatar ${className}`} style={{ backgroundColor: color }}>
      <p className="avatarText">{userInitials}</p>
    </div>
  );
};

export default Avatar;
