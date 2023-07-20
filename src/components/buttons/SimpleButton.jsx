import { Button } from "react-bootstrap";

function SimpleButton({ variant, type, text, onClick }) {
    return (
        <Button variant={variant} type={type} onClick={onClick}>
            {text}
        </Button>
    );
}

export default SimpleButton;
