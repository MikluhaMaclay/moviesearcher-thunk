import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">The MovieSearcher</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            toggle();
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to='/'>Discover</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/search">Search</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to='favourites'>Favourites</Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
