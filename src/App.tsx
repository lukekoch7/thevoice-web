import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CoachSelector from "./Components/selectors/CoachSelector";
import ComebackCrySelector from "./Components/selectors/ComebackCrySelector";
import GetsSeatSelector from "./Components/selectors/GetsSeatSelector";
import MyRow from "./Components/MyRow";
// import logo from "./logo.svg";
import NavBar from "./Components/NavBar";
import NumberOfBuzzersSelector from "./Components/selectors/NumberOfBuzzersSelector";
import ResultsModal from "./Components/ResultsModal";
import SuccessModal from "./Components/SuccessModal";
import { Bet } from "./shared/Bet";
import { Update } from "./shared/Update";
import CurrentBetsDisplay from "./Components/CurrentBetsDisplay";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? "default"
  );
  const backendURL = "https://voice-web-backend.herokuapp.com";
  // const backendURL = "http://localhost:3001";

  const defaultBet: Bet = {
    player: username,
    getsSeat: false,
  };

  const [bet, setBet] = useState<Bet>(defaultBet);
  const [latestUpdate, setLatestUpdate] = useState<Update>();
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (username === "default") {
      fetch(backendURL + "/randUsername", {
        mode: "cors",
      })
        .then((res) => res.text())
        .then((randUsername) => setUsername(randUsername));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (username !== "admin42") {
      const id = setInterval(() => {
        fetch(backendURL + "/updates", {
          mode: "cors",
        })
          .then((res) => res.json() as unknown as Update)
          .then((update) => {
            if (update.isBlocked !== isBlocked) {
              setIsBlocked(update.isBlocked);
            }
            if (!latestUpdate) {
              setLatestUpdate(update);
            } else if (latestUpdate.timestamp !== update.timestamp) {
              setLatestUpdate(update);
              setShowResultModal(true);
            } else if (latestUpdate.bets !== update.bets) {
              setLatestUpdate(update);
            }
          });
      }, 1000);
      return () => clearInterval(id);
    }
  });

  useEffect(() => {}, [latestUpdate]);

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

  function placeBet() {
    console.log("placing bet: " + JSON.stringify(bet));
    fetch(backendURL + "/placeBet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(bet),
    })
      .then((res) => res.text())
      .then((text) => {
        console.log("Response from server: " + text);
      });
    setBet(defaultBet);
    setShowSuccessModal(true);
    setTempUpdateFix(String(Date.now()));
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1000);
  }

  function toggleBlocked() {
    fetch(backendURL + "/toggleBlocked");
  }
  const [tempUpdateFix, setTempUpdateFix] = React.useState<string>(
    String(Date.now())
  );
  
  return (
    <div className="App">
      <header className="App-header">
        <NavBar username={username} setUsername={setUsername} />
      </header>
      <section className="mx-4">
        <Form>
          <MyRow>
            <GetsSeatSelector
              bet={bet}
              setBet={setBet}
              defaultBet={defaultBet}
            />
          </MyRow>
          <MyRow className="" height="50px">
            <NumberOfBuzzersSelector
              bet={bet}
              setBet={setBet}
              defaultBet={defaultBet}
            />
          </MyRow>
          <MyRow>
            <CoachSelector bet={bet} setBet={setBet} defaultBet={defaultBet} />
          </MyRow>
          <MyRow>
            <ComebackCrySelector
              bet={bet}
              setBet={setBet}
              defaultBet={defaultBet}
              key={tempUpdateFix}
            />
          </MyRow>
          <MyRow>
            <Button
              variant="primary"
              onClick={() => placeBet()}
              disabled={isBlocked}
            >
              Place bet
            </Button>
          </MyRow>
        </Form>
        {showResultModal && latestUpdate && (
          <ResultsModal
            update={latestUpdate}
            username={username}
            setShow={setShowResultModal}
          />
        )}
        {showSuccessModal && (
          <SuccessModal setShow={setShowSuccessModal}></SuccessModal>
        )}
        {username === "admin42" && (
          <Button variant="primary" onClick={() => toggleBlocked()}>
            Toggle block entrys
          </Button>
        )}
        {latestUpdate && latestUpdate.bets.length > 0 && (
          <CurrentBetsDisplay update={latestUpdate} />
        )}
      </section>
    </div>
  );
}

export default App;
