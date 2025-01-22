import RequestInfo from "./RequestInfo.jsx";
import ContactInfo from "./ContactInfo.jsx";
import { Modal } from "@mantine/core";

const RequestModal = ({ opened, onClose, request }) => {
  const emailSubject = `Inquiry about: ${request.title}`;
  const emailBody = `Hello ${request.displayName},\n\nI’m interested in your request titled "${request.title}". Please let me know more details.\n\nBest regards,\n[Your Name]`;

  const emailLink = `mailto:${request.email}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;

  // console.log("Email Link:", emailLink); // Add this line for debugging

  return (
    <Modal.Root opened={opened} onClose={onClose} size="lg" centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <Modal.CloseButton className="[position:absolute_!important] right-5" />
          <RequestInfo request={request} />
          <hr className="my-8" />
          <ContactInfo request={request} />

          {/* Email Poster Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                window.location.href = emailLink; // Redirect to mailto link explicitly
              }}
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-600 transition"
            >
              Email Poster
            </button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RequestModal;
