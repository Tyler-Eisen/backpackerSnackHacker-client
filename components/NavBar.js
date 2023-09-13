/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './Seacrhbar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
      <Container className="hover-area">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="collapse navbar-collapse d-flex justify-content-between align-items-center">
            <Link href="/">
              <a className="navbar-brand">
                <Image src="/images/bpsh.png" width="50" height="45" alt="logo" />
              </a>
            </Link>
            <Link passHref href="/map">
              <Nav.Link>Map</Nav.Link>
            </Link>
            <SearchBar className="me-3" />
            <Button className="signOutBtn" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
