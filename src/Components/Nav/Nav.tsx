import LogoutButton from '../Buttons/LogoutButton';
import './Nav.css';
const Nav = () => {
  return (
    <div>
      <section>
        <div className='menu'>
          <a href='#' className='menu-item-start'>
            <i className='fab fa-instagram'></i> Instagram
          </a>
          <a href='#' className='menu-item'>
            <i className='fab fa-twitter'></i> Twitter
          </a>
          <a href='#' className='menu-item'>
            <i className='fab fa-youtube'></i> YouTube
          </a>
          <a href='#' className='menu-item'>
            <i className='fas fa-globe'></i> Website
          </a>
          <a href='#' className='menu-item'>
            <i className='fab fa-linkedin'></i> LinkedIn
          </a>
          <a href='#' className='menu-item'>
            <i className='fab fa-telegram'></i> Telegram
          </a>
          <a href='#' className='menu-item-end'>
            <i className='fas fa-coffee'></i> Buy me a Coffee
          </a>
        </div>
      </section>
    </div>
  );
};

export default Nav;
