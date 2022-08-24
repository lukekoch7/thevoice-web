import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { CheckSquare } from "react-bootstrap-icons";

export default function ResultsModal(props: {
  setShow: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const handleClose = () => props.setShow(false);

  return (
    <Modal show={true} onHide={handleClose} size="sm" centered>
      <Modal.Body>
        <div className="text-center">
          <CheckSquare color="green" size={256} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
