import React, { useState } from "react";

import Button from "./Button";
import { Form, Modal } from "react-bootstrap";
import styled, { css } from "styled-components";

const StyledModal = styled(Modal)`
  ${(props) =>
    props.screenbool === true
      ? css`
          position: absolute;
          width: 300px !important;
          height: 400px !important;
          top: calc(100% - (400px)) !important;
          left: calc(100% - (300px)) !important;

          @media (min-width: 688px) {
            width: 400px !important;
            height: 640px !important;
            top: calc(100% - (650px)) !important;
            left: calc(100% - (400px)) !important;
          }

          @media (min-width: 992px) {
            width: 566px !important;
            height: 700px !important;
            top: calc(100% - (700px)) !important;
            left: calc(100% - (566px)) !important;
          }

          @media (min-width: 1300px) {
            width: 766px !important;
            height: 700px !important;
            top: calc(100% - (700px)) !important;
            left: calc(100% - (766px)) !important;
          }
        `
      : props.referralHeight == true
      ? css`
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
        `
      : null}
`;

const ModalLable = styled(Form.Label)`
  font-weight: 200;
`;

const StyledScreenBtn = styled.i`
  font-size: 18px;
`;

const StyledHeaderDiv = styled.div`
  margin-right: 33px;
`;

export const Modals = ({
  onHide,
  onCreate,
  changePage,
  title,
  show,
  completeBtn,
  closeBtn,
  body,
  size,
  hideClickButton,
  hideFooter,
  disabledClickButton,
  centered,
  referralHeight,
}) => {
  const [shrinkModal, setShrinkModal] = useState(false);

  return (
    <StyledModal
      onHide={onHide}
      //   screenbool={shrinkModal}
      //   referralHeight={referralHeight}
      show={show}
      size={size}
      //   centered={centered}
      scrollable
    >
      <Modal.Header closeButton style={{ backgroundColor: "#F9F9FA" }}>
        <Modal.Title>
          <StyledHeaderDiv className="mr-auto">
            <ModalLable>{title}</ModalLable>
            {title == "Messages" && shrinkModal ? (
              <StyledScreenBtn
                className="fas fa-expand-arrows-alt"
                onClick={() => setShrinkModal(!shrinkModal)}
              ></StyledScreenBtn>
            ) : title == "Messages" && !shrinkModal ? (
              <StyledScreenBtn
                className="fas fa-crop-alt"
                onClick={() => setShrinkModal(!shrinkModal)}
              ></StyledScreenBtn>
            ) : null}
          </StyledHeaderDiv>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer hidden={hideFooter}>
        <Button
          disabled={disabledClickButton}
          hidden={hideClickButton}
          onClick={onCreate}
        >
          {completeBtn}
        </Button>
        <Button style={{backgroundColor: "#00b0f0"}} onClick={onHide}>{closeBtn ? closeBtn : "Close"}</Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default Modals;
