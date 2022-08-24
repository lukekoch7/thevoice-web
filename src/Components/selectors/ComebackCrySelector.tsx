import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { Bet } from "../../shared/Bet";

export default function ComebackCrySelector(props: {
  bet: Bet;
  setBet: Dispatch<SetStateAction<Bet>>;
  defaultBet: Bet;
}): JSX.Element {
  function setComeback(bool: boolean) {
    props.setBet({
      ...props.bet,
      comeback: bool ? bool : undefined,
    });
  }
  function setCry(bool: boolean) {
    props.setBet({
      ...props.bet,
      cry: bool ? bool : undefined,
    });
  }
  return (
    <>
      <Form.Check
        type="checkbox"
        id="comebackCheckbox"
        label="Comeback?"
        className="col-5"
        onClick={() => setComeback(!props.bet.comeback)}
        disabled={props.bet.getsSeat}
      />

      <Form.Check
        type="checkbox"
        label="Cry?"
        className="col-5"
        onClick={() => setCry(!props.bet.cry)}
      />
    </>
  );
}
