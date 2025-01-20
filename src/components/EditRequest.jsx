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
        {/* for some reason calling stopPropagation is necessary here to stop the
        request info modal from showing */}
        <Modal.Overlay onClick={(e) => e.stopPropagation()} />
        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <Modal.Body>
            <Modal.CloseButton className="[position:absolute_!important] right-5" />
            <RequestForm request={request} callback={close} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Button onClick={handleClick}>EDIT</Button>
    </>
  );
};

export default EditRequest;
