import * as React from 'react';
import { Button } from './ui/button';
import EnterButton from './buttons/EnterButton';
import EntryForm from './forms/EntryForm';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

interface AddEntryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const AddEntryModal: React.FC<AddEntryModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <div>
      <Modal
        backdrop="blur"
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] text-[#a8b0d3] p-2 pb-4 outline",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          <div className='px-4 pt-6'>
            <EntryForm closeModal={() => onOpenChange(false)} />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default AddEntryModal