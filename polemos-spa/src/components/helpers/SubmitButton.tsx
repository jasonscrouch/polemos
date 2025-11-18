import type { JSX } from "react";
import { Button, Spinner } from "react-bootstrap";
import type { ButtonVariant } from "react-bootstrap/esm/types";

interface Props {
    text: string;
    variant: ButtonVariant;
    isLoading: boolean;
}

export default function SubmitButton({ text, variant, isLoading }: Props): JSX.Element {

    return <Button variant={variant} className="w-100" type="submit" title={text}>{isLoading && <Spinner size="sm" className="me-2"/>}{text}</Button>;
}
