import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from './ui/button';
import Image from 'next/image';
import { FaEye } from "react-icons/fa";
import { Entry } from '@prisma/client';
import {  Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/modal";
import { Divider } from '@mui/material';
import { subTitle } from '@/fonts/font';
import { Separator } from "@/components/ui/separator"
interface ViewModalProps{
    post: Entry
}
const ViewModal: React.FC<ViewModalProps> = ({ post }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
    <div>
      <Button onClick={onOpen} variant="ghost" size="sm"> <FaEye className='text-xl' /> </Button>
      <Modal 
        backdrop="blur" 
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] text-[#a8b0d3] m-4 p-2 pb-4 md:m-0",
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
            {(onClose) => (
                <>
                <ModalHeader className={`${subTitle.className} flex flex-col gap-1`}> Your entry </ModalHeader>
                <ModalBody className='text-md'>
                    <p>{post.entry} </p>
                    <Separator className="bg-slate-500"/> 
                    <p className={`${subTitle.className} flex flex-col gap-1`}> Question chosen </p>
                    <p> {post.question} </p>
                </ModalBody>
            </>
            )}
        </ModalContent>
      </Modal>
    </div>
  );
}
export default ViewModal