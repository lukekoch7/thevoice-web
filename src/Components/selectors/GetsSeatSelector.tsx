import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { Bet } from "../../shared/Bet";

export default function GetsSeatSelector(props: {
  bet: Bet;
  setBet: Dispatch<SetStateAction<Bet>>;
  defaultBet: Bet;
}): JSX.Element {
  function setGetsSeat(bool: boolean) {
    if (bool) {
      props.setBet({
        ...props.bet,
        getsSeat: bool,
        comeback: undefined,
      });
      const checkbox = document.getElementById(
        "comebackCheckbox"
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    } else {
      props.setBet(props.defaultBet);
    }
  }
  return (
    <>
      <Button
        variant={props.bet.getsSeat ? "secondary" : "light"}
        className="col-5 mx-3"
        onClick={() => setGetsSeat(true)}
      >
        Seat
      </Button>
      <Button
        variant={props.bet.getsSeat ? "light" : "secondary"}
        className="col-5 mx-3"
        onClick={() => setGetsSeat(false)}
      >
        No Seat
      </Button>
    </>
  );
}
