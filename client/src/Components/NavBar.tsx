import { ReactElement } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import UsernameInput from "./UsernameInput";

export default function NavBar(props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const usernamePopover = (
    <Popover id="usernamePopover">
      <Popover.Header as="h3">Change username</Popover.Header>
      <Popover.Body>
        <UsernameInput setUsername={props.setUsername}></UsernameInput>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container className="bg-dark text-white">
        <Navbar.Brand href="#home">TheVoice Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={usernamePopover}
            >
              <Button variant="dark">
                Username: <b>{props.username}</b>
                <Pencil className="mx-2" />
              </Button>
            </OverlayTrigger>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
