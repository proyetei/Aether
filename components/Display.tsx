
import { Entry } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';
import { bodyText } from '@/fonts/font';
import { dateFormat } from '@/lib/dateFormat';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DisplayProps{
  entries: Entry[]
}
const Display: React.FC<DisplayProps> = ({entries}) => {

  const [journal, setJournal] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalItems = entries.length;
  const firstItemIndex = totalItems - currentPage * itemsPerPage; //calculate how many items to skip from the end of the array to count back from the last item in my database
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = entries.slice(Math.max(firstItemIndex, 0), lastItemIndex).reverse();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get('/api', {});
        setJournal(response.data);
      } catch (error) {
        console.error("Error fetching journal entry:", error);
      }
    };
    fetchJournal();
  }, []);

  return (
    <>
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-6'>
      {currentItems?.map((entry, index) => { // map each entry item to its index
        const creationDate = entry?.createdAt
        return (

          <Card key={index}>
            <div className='bg-white/20 backdrop-blur-lg rounded-xl px-1'>
              <CardHeader>
                <CardTitle>
                <p className={`${bodyText.className} text-md text-wrap`}> {entry && creationDate ? ` Your entry on ${dateFormat(new Date(creationDate).toISOString())}`: 'Your entry'}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className=' min-h-[100px] bg-zinc-900 text-slate-200 p-4'>
                  <p className={`${bodyText.className} text-sm`}> {entry ? entry.entry : ''} </p>
              </CardContent>
              <CardFooter>
              <div className='flex flex-row'>
                  {entry && <DeleteButton post = {entry}/>}
                {entry && <EditButton post={entry} />}
                </div>
              </CardFooter>
              </div>
          </Card>

        );
      })}
    </div>
    <PaginationSection totalItems={journal.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  );
}

function PaginationSection({
  totalItems, itemsPerPage, currentPage, setCurrentPage
}:{
  totalItems: any;
  itemsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}){
  let pages = [];
  for (let i =1; i <= Math.ceil(totalItems / itemsPerPage); i++){
    pages.push(i);
  }
  const handleNextPage = () => {
    if (currentPage < pages.length ){
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }
  return(
    <Pagination>
  <PaginationContent className='gap-4 py-4'>
    <PaginationItem className='bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-glow rounded-lg text-slate-50'>
      <PaginationPrevious onClick={() => handlePrevPage()} />
    </PaginationItem>
    <PaginationItem className='bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-glow rounded-lg text-slate-50'>
      <PaginationNext onClick={() => handleNextPage()} />
    </PaginationItem>
  </PaginationContent>
</Pagination>

  )
}
export default Display