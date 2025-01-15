import RequestInfo from "./RequestInfo.jsx";
import ContactInfo from "./ContactInfo.jsx";
import { Modal } from "@mantine/core";

const RequestModal = ({ opened, onClose, request }) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} size="lg" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <Modal.CloseButton className="[position:absolute_!important] right-5" />
          <RequestInfo request={request} />
          <hr className="my-8" />
          <ContactInfo request={request} />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RequestModal;
