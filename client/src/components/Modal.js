import React from "react";

import Button from "./Button";
import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";

const ModalLable = styled(Form.Label)`
  font-weight: 200;
`;

const StyledHeaderDiv = styled.div`
  margin-right: 33px;
`;

export const Modals = ({
  onHide,
  onCreate,
  title,
  show,
  completeBtn,
  closeBtn,
  body,
  size,
}) => {
  return (
    <Modal onHide={onHide} show={show} size={size} scrollable>
      <Modal.Header closeButton style={{ backgroundColor: "#F9F9FA" }}>
        <Modal.Title>
          <StyledHeaderDiv className="mr-auto">
            <ModalLable>{title}</ModalLable>
          </StyledHeaderDiv>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onCreate}>{completeBtn}</Button>
        <Button onClick={onHide}>{closeBtn ? closeBtn : "Close"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
