import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { Bet, Coach } from "./Components/Bet";
import MyRow from "./Components/MyRow";
// import logo from "./logo.svg";
import NavBar from "./Components/NavBar";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") ?? "default");
  const backendURL = "localhost:3001"
  const defaultBet: Bet = {
    player: username,
    getsSeat: false,
  };

  const [bet, setBet] = useState<Bet>(defaultBet);
  useEffect(() => {
    console.log(bet);
  }, [bet]);

  useEffect(() => {
    // update player name on username change
    setBet({
      ...bet,
      player: username,
    });
    localStorage.setItem("username", username);
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  function setGetsSeat(bool: boolean) {
    if (bool) {
      setBet({
        ...bet,
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
      setBet(defaultBet);
    }
  }
  function setNumberOfBuzz(num: number | undefined) {
    setBet({
      ...bet,
      numberOfBuzz: num,
    });
  }

  function setCoach(coach: Coach | undefined) {
    if (bet.coach === coach) {
      coach = undefined;
    }
    setBet({
      ...bet,
      coach: coach,
    });
  }

  function setComeback(bool: boolean) {
    setBet({
      ...bet,
      comeback: bool ? bool : undefined,
    });
  }
  function setCry(bool: boolean) {
    setBet({
      ...bet,
      cry: bool ? bool : undefined,
    });
  }

  function placeBet() {
    fetch(backendURL, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(bet),
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar username={username} setUsername={setUsername} />
      </header>
      <section className="mx-4">
        <Form>
          <MyRow>
            {/* SEAT / NO SEAT */}
            <Button
              variant={bet.getsSeat ? "secondary" : "light"}
              className="col-5 mx-3"
              onClick={() => setGetsSeat(true)}
            >
              Seat
            </Button>
            <Button
              variant={bet.getsSeat ? "light" : "secondary"}
              className="col-5 mx-3"
              onClick={() => setGetsSeat(false)}
            >
              No Seat
            </Button>
          </MyRow>
          <MyRow className="" height="50px">
            {/* NUMBER OF BUZZERS */}
            <div className="col-1 text-center">

                <h4>{bet.numberOfBuzz ?? "-"}</h4>
         
            </div>
            <Form.Range
              disabled={!bet.getsSeat}
              defaultValue={0}
              min={0}
              max={4}
              onClick={(event) => {
                const target = event.target as HTMLInputElement;
                setNumberOfBuzz(parseInt(target.value));
              }}
              className="w-75 px-5"
            />
            <Button
              onClick={() => setNumberOfBuzz(undefined)}
              className="col-2"
              variant="secondary"
              disabled={!bet.getsSeat}
            >
              None
            </Button>
          </MyRow>
          <MyRow>
            {/* COACH  */}
            <ButtonGroup>
              <Button
                variant={bet.coach === Coach.Mark ? "secondary" : "light"}
                className="mx-1"
                onClick={() => setCoach(Coach.Mark)}
                disabled={!bet.getsSeat}
              >
                Mark
              </Button>
              <Button
                variant={bet.coach === Coach.Stefanie ? "secondary" : "light"}
                className="mx-1"
                onClick={() => setCoach(Coach.Stefanie)}
                disabled={!bet.getsSeat}
              >
                Stefanie
              </Button>
              <Button
                variant={bet.coach === Coach.Peter ? "secondary" : "light"}
                className="mx-1"
                onClick={() => setCoach(Coach.Peter)}
                disabled={!bet.getsSeat}
              >
                Peter
              </Button>
              <Button
                variant={bet.coach === Coach.Rea ? "secondary" : "light"}
                className="mx-1"
                onClick={() => setCoach(Coach.Rea)}
                disabled={!bet.getsSeat}
              >
                Rea
              </Button>
            </ButtonGroup>
          </MyRow>
          <MyRow>
            {/* COMEBACK / CRY */}
            <Form.Check
              type="checkbox"
              id="comebackCheckbox"
              label="Comeback?"
              className="col-5 mx-1"
              onClick={() => setComeback(!bet.comeback)}
              disabled={bet.getsSeat}
            />

            <Form.Check
              type="checkbox"
              label="Cry?"
              className="col-5 mx-1"
              onClick={() => setCry(!bet.cry)}
            />
          </MyRow>
          <MyRow>
            <Button variant="primary">Place bet</Button>
          </MyRow>
        </Form>
      </section>
    </div>
  );
}

export default App;
