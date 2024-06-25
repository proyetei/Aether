// EditButton.tsx
import Link from 'next/link';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Entry } from '@prisma/client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
interface EditButtonProps {
  post: Entry
}

const EditButton: FC<EditButtonProps> = ({ post }) => {
  const postIdString = post.id
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  function goToEditPage(){
    setLoading(true);
    router.push(`/post/${postIdString}/edit`)
    setLoading(false)
  }
  return (
      // <Link href={`/post/${postIdString}/edit`}> 
      <Button variant="default" onClick={goToEditPage} disabled={loading}> Edit </Button>
      // </Link>
  );

};

export default EditButton;

