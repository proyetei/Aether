
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import { subTitle } from '@/fonts/font';
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
} from "@/components/ui/card"
import ViewModal from '../ViewModal';
import { Separator } from '../ui/separator';
import { useSearchParams } from "next/navigation";
import { Database } from '@/database.types';
interface DisplayProps{
  entries: Database['public']['Tables']['entries']['Row'][]
}
const Display: React.FC<DisplayProps> = ({entries}) => {

  // const [journal, setJournal] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const filteredEntries = entries.filter(entry => 
    entry.entry.toLowerCase().includes(query) || 
    entry.question?.toLowerCase().includes(query)
  );

  const totalItems = filteredEntries.length;
  const firstItemIndex = totalItems - currentPage * itemsPerPage; 
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = filteredEntries.slice(Math.max(firstItemIndex, 0), lastItemIndex).reverse();

  return (
    <>
    <Masonry columns={{xs:2, md:4}} spacing={1} >
      {currentItems?.map((entry, index) => { // map each entry item to its index
        const creationDate = entry?.created_at
        const entryTitle = entry?.title
        return (

          <Card key={index}>
            <div className='bg-white/20 backdrop-blur-lg rounded-xl px-1 md:text-lg text-sm'>
              <p className={`${subTitle.className} p-1`}> { entry && entryTitle} </p>
              <CardContent className=' min-h-[100px] bg-zinc-900 text-slate-200 p-3'>
                  <p className='pb-2'> {entry ? entry.entry : ''} </p>
                  <p> {!entry.question ? '' : ( 
                    <div className='flex flex-col'> 
                    <Separator className='bg-zinc-600 my-2' /> 
                    <p> Question chosen: </p>  - {entry.question} 
                    <p> Answer: </p>  - {entry.answer}
                    </div> 
                  )} 
                  </p>
              </CardContent>
              <CardFooter>
              <p className={`${subTitle.className} text-sm opacity-70 p-1`}> 
                {entry && creationDate ? `${dateFormat(new Date(creationDate).toISOString())}`: ''}
              </p>
              <div className='flex flex-row text-[#a8b0d3]'>
                  {/* {entry && <DeleteButton post = {entry}/>} */}
                  {/* {entry && <EditButton post={entry} />} */}
                  {entry && <ViewModal post={entry} />}
              </div> 
              </CardFooter> 
              </div>
          </Card>
        );
      })}
    </Masonry>
    <PaginationSection totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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