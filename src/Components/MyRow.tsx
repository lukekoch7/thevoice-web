import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { Row } from "react-bootstrap";

export default function MyRow(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
    className?: string;
    height?: string;
}): ReactElement {
  const classes = "my-2 justify-content-center align-items-center " + (props.className ?? "")
  return (
    <Row className={classes} style={{ height: props.height ?? "100px" }}>
      {props.children}
    </Row>
  );
}
