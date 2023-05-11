"use client";

import { forwardRef, useState } from "react";
import classNames from "classnames";
import StyleButtons from "./Buttons.module.css";

/**
 *
 * @param {{
 * size: "sm" | "md"
 * variant: "orange" | "grey"
 * }} props - Props for the Button component
 *
 */

const Button = ({ children, onClick, size = "md", variant = "orange", ...options }) => {
    return (
        <button
            className={classNames(StyleButtons.btn, StyleButtons[variant], StyleButtons[size])}
            onClick={onClick}
            {...options}
        >
            {children}
        </button>
    );
};

/**
 *
 * @param {{
 * size: "sm" | "md"
 * type: "radio" | "checkbox"
 * }} props - Props for the Option component
 *
 */

export const Option = forwardRef((props, ref) => {
    const {
        type = "radio",
        size = "sm",
        name,
        label,
        onChange,
        value,
        checked,
        ...options
    } = props;

    return (
        <label className={StyleButtons.option}>
            <input
                type={type}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                ref={ref}
                {...options}
            />
            <span className={classNames(StyleButtons.btn, StyleButtons[size])}>{label}</span>
        </label>
    );
});

export default Button;
