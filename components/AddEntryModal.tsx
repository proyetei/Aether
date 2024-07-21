import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from './ui/button';
import Image from 'next/image';
import { FaEye } from "react-icons/fa";
import { Entry } from '@prisma/client';
import {  Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, UseDisclosureProps} from "@nextui-org/modal";
import { Divider } from '@mui/material';
import { subTitle } from '@/fonts/font';
import { Separator } from "@/components/ui/separator"
import { IoSparkles } from "react-icons/io5";
import EnterButton from './buttons/EnterButton';
import EntryForm from './forms/EntryForm';

const AddEntryModal: React.FC = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
    <div>
      <div className='flex flex-col items-center justify-center'>
      <button onClick={onOpen} className='pb-2 hover:drop-shadow-blue'> 
        <EnterButton />
      </button>
      </div>
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
    <EntryForm closeModal={onOpenChange} />
    </div>
  </ModalContent>
</Modal>

    </div>
  );
}
export default AddEntryModal