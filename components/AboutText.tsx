"use client"
import { logo, subTitle, bodyText, mainTitle, poppins } from "@/fonts/font"
export default function AboutText(){
    return(
        <>
              <p className={` ${poppins.className} py-3 text-left text-sm text-purple-200`}> Welcome to {' '}
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500"> Aether! </span>
      {' '}
      A full-stack {' '}
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500 "> psychological analysis journaling application </span> aimed towards improving mental health through amplifying your dreams and personal life events.
      {' '} The name Aether is inspired by the ancient concept of aether as the pure, bright air that the gods breathed in the highest realms. Just as aether represents clarity and elevation, our app provides clarity and elevation understanding your own psyche.
                        <div className="my-4">
                          <span className={`${subTitle.className} font-bold text-2xl`}>Features</span>
                          <li className="py-2">
                          Aether allows users to view, add, edit, and delete details of their personal life experiences and organize them to preserve their stories.
                          </li>
                          <li className="py-2">
                          Users can also delve into the mystique of their subconscious by documenting the dreams they experience during sleep. </li>
                          <li className="py-2">
                          Users can also track their moods with a calendar mood tracker and view mood analytics charts to keep track of their mental health.
                          </li>
                          <li className="py-2">
                          Powered by AI, users can generate reports and receive comprehensive analysis of their own psyche by comparing the dream journal and personal life event journal.
                          </li>
                          <li className="py-2">
                            Create password-protected accounts to securely store experiences. Each journal will be private to each user and not accessible to public.
                          </li>

                        </div>
              </p>
            </>
    )
}