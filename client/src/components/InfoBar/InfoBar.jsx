import React from 'react';
import './InfoBar.css';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/closeIcon.png';
import onlineIcon from '../../assets/onlineIcon.png';

const InfoBar = ({ room }) => {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online icon' />
        Room: {room}
      </div>
      <div className='rightInnerContainer'>
        <Link to='/'><img src={closeIcon} /></Link>
      </div>
    </div>
  );
}

export default InfoBar;
