import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function MainSearcher() {
    return (
        <Container className="mt-3">
            <Form.Control
                type="text"
                id="search-text"
                placeholder="Search..."
            />
            <Form.Text id="search-params" muted>
                You can search film by parameters like author, title, year etc.
            </Form.Text>
        </Container>
    );
}

export default MainSearcher;
