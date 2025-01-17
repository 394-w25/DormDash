import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RequestForm from "./RequestForm";

const EditRequest = ({ request }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleClick = (e) => {
    e.stopPropagation();
    open();
  };
  return (
    <>
      <Modal.Root opened={opened} onClose={close} size="lg" centered>
        <Modal.Overlay onClick={(e) => e.stopPropagation()} /> // this is needed to stop the request modal from opening
        <Modal.Content>
          <Modal.Body>
            <Modal.CloseButton className="[position:absolute_!important] right-5" />
            <RequestForm />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Button onClick={handleClick}>EDIT</Button>
    </>
  );
};

export default EditRequest;
