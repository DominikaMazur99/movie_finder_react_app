import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./NotificationModal.scss";

function NotificationModal({ title, message, show, close }) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
        const timer = setTimeout(() => {
            setIsVisible(false);
            close();
        }, 3000);

        return () => clearTimeout(timer);
    }, [show, close]);

    return (
        <>
            {isVisible && (
                <div className="notification-modal">
                    <Modal
                        show={isVisible}
                        onHide={close}
                        dialogClassName="notification-modal-dialog"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{message}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={close}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </>
    );
}

export default NotificationModal;
