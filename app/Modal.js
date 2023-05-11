"use client";

import classNames from "classnames";
import StyleModal from "./Modal.module.css";

const Modal = ({ children, toggle, onToggle }) => {
    return (
        <div className={classNames(StyleModal.modal, { [StyleModal.active]: toggle })}>
            <div className={StyleModal.body}>{children}</div>
            <div className={StyleModal.backdrop} onClick={() => onToggle(false)}></div>
        </div>
    );
};

export default Modal;
