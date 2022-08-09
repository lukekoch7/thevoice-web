import { ReactElement } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar(props: { username: string }): ReactElement {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" >
      <Container className="bg-dark text-white">
        <Navbar.Brand href="#home">TheVoice Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Username: <b>{props.username}</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
