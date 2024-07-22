
import { Entry } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';
import { bodyText, subTitle } from '@/fonts/font';
import { dateFormat } from '@/lib/dateFormat';
import Masonry from '@mui/lab/Masonry';
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
import ViewModal from './ViewModal';
import { Separator } from './ui/separator';

interface DisplayProps{
  entries: Entry[]
}
const Display: React.FC<DisplayProps> = ({entries}) => {

  const [journal, setJournal] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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
    <Masonry columns={{xs:1, md:4}} spacing={2} defaultSpacing={1} >
      {currentItems?.map((entry, index) => { // map each entry item to its index
        const creationDate = entry?.createdAt
        return (

          <Card key={index}>
            <div className='bg-white/20 backdrop-blur-lg rounded-xl px-1'>
                <p className={`${subTitle.className} font-bold p-1`}> {entry && creationDate ? ` Your entry on ${dateFormat(new Date(creationDate).toISOString())}`: 'Your entry'}</p>
              <CardContent className=' min-h-[100px] bg-zinc-900 text-slate-200 p-4'>
                  <p className='pb-2'> {entry ? entry.entry : ''} </p>
                  <p> {!entry.question ? '' : ( <> <Separator className='bg-zinc-600 my-2' /> <p> Question chosen: </p>  - {entry.question} </> )} </p>
              </CardContent>
              <CardFooter>
              <div className='flex flex-row text-[#a8b0d3]'>
                  {entry && <DeleteButton post = {entry}/>}
                  {entry && <EditButton post={entry} />}
                  {entry && <ViewModal post={entry} />}
              </div>
              </CardFooter>
              </div>
          </Card>
        );
      })}
    </Masonry>
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
    <PaginationItem className='bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-blue rounded-lg text-slate-50'>
      <PaginationPrevious onClick={() => handlePrevPage()} />
    </PaginationItem>
    <PaginationItem className='bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-blue rounded-lg text-slate-50'>
      <PaginationNext onClick={() => handleNextPage()} />
    </PaginationItem>
  </PaginationContent>
</Pagination>

  )
}
export default Display