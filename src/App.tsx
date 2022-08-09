import React, { useState } from "react";
import logo from "./logo.svg";
import NavBar from "./Components/NavBar";
import UsernameInput from "./Components/UsernameInput";

function App() {
  const [username, setUsername] = useState("default");

  return (
    <div className="App">
      <header className="App-header">
        <NavBar username={username}/>
      </header>
      <section>
        <UsernameInput setUsername={setUsername}/>
      </section>
    </div>
  );
}

export default App;
