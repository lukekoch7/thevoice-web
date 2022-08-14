import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Results } from "../shared/Results";

export default function ResultsModal(props: {
  results: Results;
  username: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const handleClose = () => props.setShow(false);

  const ownResult = props.results.results.find(
    (res) => res.player === props.username
  );
  return (
    <Modal show={true} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Results for this round:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {props.results.results.length === 0 && <h2>No results</h2>}
          {ownResult && (
            <h4>
              Your result: Drink {ownResult.drink} and distribute{" "}
              {ownResult.distribute}!
            </h4>
          )}
          {props.results.results.length !== 0 && (
            <>
              <h6>Other results: </h6>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Drink</th>
                    <th>Distribute</th>
                  </tr>
                </thead>
                <tbody>
                  {props.results.results.map((result, index) => {
                    return (
                      <tr key={props.results.timestamp + index}>
                        <td>{result.player}</td>
                        <td>{result.drink}</td>
                        <td>{result.distribute}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
