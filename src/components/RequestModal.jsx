import RequestInfo from "./RequestInfo.jsx";
import ContactInfo from "./ContactInfo.jsx";
import { Modal } from "@mantine/core";

const RequestModal = ({ opened, onClose, request }) => {
  return (
    <Modal opened={opened} onClose={onClose} size="lg" centered>
      <RequestInfo request={request} />
      <hr className="my-8" />
      <ContactInfo request={request} />
    </Modal>
  );
};

export default RequestModal;
