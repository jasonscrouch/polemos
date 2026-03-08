import type { JSX } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface FormInput_Props {
    label: string;
    name: string;
    invalidMessage: string;
    type?: "text" | "password" | "email";
    shouldAutoFocus?: boolean;
    isDisabled?: boolean;
    value?: string | number | string[];
}

export function FormInput({ label, name, invalidMessage, type = 'text', shouldAutoFocus = false, isDisabled = false, value }: FormInput_Props): JSX.Element {
    return (
        <Form.Group>
            <Form.Label 
                htmlFor={name}
            >
                {label}
            </Form.Label> 
            <Form.Control 
                type={type} 
                id={name} 
                name={name} 
                required={true} 
                autoFocus={shouldAutoFocus} 
                disabled={isDisabled}
                value={value}
            /> 
            <Form.Control.Feedback 
                className="invalid-feedback" 
                type="invalid"
            >
                {invalidMessage}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

interface HorizontalFormInput_Props {
    formInput: FormInput_Props
}

export function HorizontalFormInput({formInput}: HorizontalFormInput_Props) {
    return (
        <Row>
            <Form.Label column sm='2' lg='2' htmlFor={formInput.name}>{formInput.label}</Form.Label> 
            <Col>
                <Form.Control type={formInput.type} id={formInput.name} name={formInput.name} required={true} autoFocus={formInput.shouldAutoFocus} disabled={formInput.isDisabled}/> 
                <Form.Control.Feedback className="invalid-feedback" type="invalid">{formInput.invalidMessage}</Form.Control.Feedback>
            </Col>
        </Row>
    );
}
