import { Dispatch, SetStateAction } from "react";
import { Button, Form } from "react-bootstrap";
import { Bet } from "../../shared/Bet";

export default function NumberOfBuzzersSelector(props: {
  bet: Bet;
  setBet: Dispatch<SetStateAction<Bet>>;
  defaultBet: Bet;
}): JSX.Element {
  function setNumberOfBuzz(num: number | undefined) {
    props.setBet({
      ...props.bet,
      numberOfBuzz: num,
    });
  }
  return (
    <>
      <div className="col-1 text-center">
        <h4>{props.bet.numberOfBuzz ?? "-"}</h4>
      </div>
      <Form.Range
        disabled={!props.bet.getsSeat}
        defaultValue={0}
        min={1}
        max={4}
        onClick={(event) => {
          const target = event.target as HTMLInputElement;
          setNumberOfBuzz(parseInt(target.value));
        }}
        className="w-50 px-5"
      />
      <Button
        onClick={() => setNumberOfBuzz(undefined)}
        className="col-2"
        variant="secondary"
        disabled={!props.bet.getsSeat}
      >
        Reset
      </Button>
    </>
  );
}
