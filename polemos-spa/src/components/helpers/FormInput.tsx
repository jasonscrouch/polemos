import type { JSX } from "react";
import { Form } from "react-bootstrap";

interface Props {
    label: string;
    name: string;
    type: "text" | "password" | "email";
    isRequired: boolean;
    invalidMessage: string;
    shouldAutoFocus: boolean;
}

export default function FormInput({ label, name, type, isRequired, invalidMessage, shouldAutoFocus }: Props): JSX.Element {

    return (
        <Form.Group>
            <Form.Label htmlFor={name}>{label}</Form.Label> 
            <Form.Control type={type} id={name} name={name} required={isRequired} autoFocus={shouldAutoFocus}/> 
            {isRequired && <Form.Control.Feedback className="invalid-feedback" type="invalid">{invalidMessage}</Form.Control.Feedback>}
        </Form.Group>
    );
}
