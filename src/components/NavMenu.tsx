import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState<boolean>();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    return <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm  box-shadow mb-3" light>
            <Container>
                <NavbarBrand tag={Link} to="/">Dota Stats</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} to="/matches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/heroes">Heroes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/teams">Teams</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>
    </header>
}

export default NavMenu;