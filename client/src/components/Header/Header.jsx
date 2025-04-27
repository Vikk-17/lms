import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/brands/logo.png';
function Header() {
  return (
    <header>
      <div className="container">
        <div className="nav-wrapper py-3 flex justify-between items-center ">
          <a href="/"><img src={logo} alt="" /></a>
          <nav role='navigation' aria-label='primary navigation'>
            <ul role='list' className='flex gap-x-26' >
              <li><Link  to="product">Product</Link></li>
              <li><Link  to="login">Login</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;