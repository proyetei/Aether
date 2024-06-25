"use client"
import { logo, subTitle, bodyText, mainTitle } from "@/fonts/font"
export default function AboutText(){
    return(
        <div>
              <h1 className={` ${mainTitle.className} mb-4 md:text-6xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-purple-600`}> About Aether </h1>
              <p className={` ${bodyText.className} py-3 text-left text-md text-purple-200`}> Welcome to {' '}
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500"> Aether! </span>
      {' '}
      A full-stack {' '}
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500 "> psychological analysis journaling application </span> aimed towards improving mental health through amplifying your dreams and personal life events.
      {' '} The name Aether is inspired by the ancient concept of aether as the pure, bright air that the gods breathed in the highest realms. Just as aether represents clarity and elevation, our app provides clarity and elevation understanding your own psyche.
                        <div className="my-4">
                          <span className={`${subTitle.className} font-bold text-2xl`}>Features</span>
                          <li className="py-2">
                          Aether allows users to add, edit, and delete details of their personal life experiences and organize them to preserve their stories.
                          </li>
                          <li className="py-2">
                          You can also delve into the mystique of your subconscious by documenting the dreams you experience during sleep. </li>
                          <li className="py-2">
                            Enhance entry entries through multimedia attachment for a comprehensive representation.
                          </li>
                          <li className="py-2">
                            Create password-protected accounts to securely store experiences. Each journal will be private to each user and not accessible to public.
                          </li>
                          <span className={`${subTitle.className} font-bold text-2xl`}> Why should you use this app? </span>
                           <p className="py-4">
                            The purpose of this app being both a dream journal and a personal journal is because it provides a window into your own psyche, offering insights that are often overlooked in our conscious state. 
                            When we come across a dream which we feel is particularly significant we can engage in amplifying a dream, by reflecting on the dream, weaving ideas, concepts and associations around it. This might include recalling memories we think are related to the dream, allowing our intuition to freely speculate on its meaning, or thinking about whether the dream is related to a task we are not fulfilling or if its compensating for a conscious attitude that is ill adapted to the demands of life. This is where you can look at the personal life event journal to figure out the answers to the previous questions.
                             By connecting how your daily experiences affect your subconscious mind, you can better guide yourself in your journey of personal growth, mental health improvement and self-awareness. Journaling is a effective strategy for this purpose and it is backed by science.
                            </p>

                        </div>
              </p>
            </div>
    )
}