import { Dispatch, SetStateAction } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Bet, Coach } from "../../shared/Bet";

export default function CoachSelector(props: {
  bet: Bet;
  setBet: Dispatch<SetStateAction<Bet>>;
  defaultBet: Bet;
}): JSX.Element {
  function setCoach(coach: Coach | undefined) {
    if (props.bet.coach === coach) {
      coach = undefined;
    }
    props.setBet({
      ...props.bet,
      coach: coach,
    });
  }
  return (
    <ButtonGroup>
      <Button
        variant={props.bet.coach === Coach.Mark ? "secondary" : "light"}
        className="mx-1"
        onClick={() => setCoach(Coach.Mark)}
        disabled={!props.bet.getsSeat}
      >
        Mark
      </Button>
      <Button
        variant={props.bet.coach === Coach.Stefanie ? "secondary" : "light"}
        className="mx-1"
        onClick={() => setCoach(Coach.Stefanie)}
        disabled={!props.bet.getsSeat}
      >
        Stefanie
      </Button>
      <Button
        variant={props.bet.coach === Coach.Peter ? "secondary" : "light"}
        className="mx-1"
        onClick={() => setCoach(Coach.Peter)}
        disabled={!props.bet.getsSeat}
      >
        Peter
      </Button>
      <Button
        variant={props.bet.coach === Coach.Rea ? "secondary" : "light"}
        className="mx-1"
        onClick={() => setCoach(Coach.Rea)}
        disabled={!props.bet.getsSeat}
      >
        Rea
      </Button>
    </ButtonGroup>
  );
}
