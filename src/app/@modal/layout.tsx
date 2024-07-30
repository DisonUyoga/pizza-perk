"use client";
import React from "react";

const ModalLayout = (props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </div>
  );
};

export default ModalLayout;
