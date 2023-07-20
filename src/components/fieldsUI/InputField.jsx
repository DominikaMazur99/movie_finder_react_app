import Form from "react-bootstrap/Form";

function InputField({
    fieldId,
    fieldLabel,
    fieldType,
    placeholder,
    text,
    name,
    onChange,
    value,
    step,
    min,
}) {
    return (
        <Form.Group className="mb-3" controlId={fieldId}>
            <Form.Label>{fieldLabel}</Form.Label>
            <Form.Control
                name={name}
                type={fieldType}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                step={step}
                min={min}
            />
            {{ text } ? (
                <Form.Text className="text-muted">{text}</Form.Text>
            ) : null}
        </Form.Group>
    );
}

export default InputField;
