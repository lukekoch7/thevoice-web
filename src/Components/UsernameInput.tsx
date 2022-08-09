import { FormEvent, ReactElement, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function UsernameInput(props: {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const [username, setUsername] = useState<string>();

  const onInput = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
    setUsername(event.target.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO validation
    if(username){
      props.setUsername(username)
    }
  }
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formInputUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={onInput} placeholder="Alexander Markus" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Abschicken
      </Button>
    </Form>
  );
}
