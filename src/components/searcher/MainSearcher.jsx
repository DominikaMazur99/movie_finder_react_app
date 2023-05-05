import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function MainSearcher({ searchTerm, handleSearch }) {
    return (
        <Container className="mt-3">
            <Form.Control
                type="text"
                id="search-text"
                placeholder="Search movie..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </Container>
    );
}

export default MainSearcher;
