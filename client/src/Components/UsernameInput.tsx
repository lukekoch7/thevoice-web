import DOMPurify from "dompurify";
import { ReactElement, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function UsernameInput(props: {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const [username, setUsername] = useState<string>();

  const onInput = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setUsername(event.target.value);
  };
  const handleSubmit = () => {
    // TODO validation
    if (username) {
      console.log("Changing username: " + DOMPurify.sanitize(username));
      props.setUsername(DOMPurify.sanitize(username));
    }
  };
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          onChange={onInput}
          placeholder="Alexander Markus"
        />
      </Form.Group>
      <Button variant="dark" className="float-end mb-3" onClick={handleSubmit}>
        Save
      </Button>
    </Form>
  );
}
