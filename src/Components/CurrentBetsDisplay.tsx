import { Table } from "react-bootstrap";
import { Coach } from "../shared/Bet";
import { Update } from "../shared/Update";

export default function CurrentBetsDisplay(props: { update: Update }) {
  return (
    <>
      <h6>Current entered bets: </h6>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Player</th>
            <th>Seat</th>
            <th>Num. of Buzz</th>
            <th>Coach</th>
            <th>Cry</th>
          </tr>
        </thead>
        <tbody>
          {props.update.bets.map((bet, index) => {
            return (
              <tr key={props.update.timestamp + index}>
                <td>{bet.player}</td>
                <td>{bet.getsSeat ? "Yes" : "No"}</td>
                <td>{bet.numberOfBuzz ? bet.numberOfBuzz : ""}</td>
                <td>{bet.coach ? Coach[bet.coach] : ""}</td>
                <td>
                  {bet.cry === undefined ? "" : bet.cry === true ? "Yes" : "No"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
