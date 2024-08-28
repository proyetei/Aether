export const links = [

    {
        name: "Home",
        hash: "homepage"
    },
    {
        name: "Add entry",
        hash: "add"
    },
    {
        name: "Explore",
        hash: "explore"
    },
    {
        name: "AI Analysis",
        hash: "analysis"
    },
    {
        name: "Mood calendar",
        hash: "calendar"
    },


] as const


export const projectData = [
    {
        imgSrc: "../home.png"
    },
    {
        imgSrc: "../add.png"
    },
    {
        imgSrc: "../explore.png"
    },
    {
        imgSrc: "../explore_dream.png"
    },
    {
        imgSrc: "../edit.jpeg"
    },
    {
        imgSrc: "../calendar_mood.png"
    },
    {
        imgSrc: "../analysispage.jpeg"
    }
]

export const questionBank = [
    { key: "What are three things you love about yourself?", label: "What are three things you love about yourself?" },
    { key: "How would you like to be remembered?", label: "How would you like to be remembered?" },
    { key: "What are three things you are proud of recently?", label: "What are three things you are proud of recently?" },
    { key: "What is one thing that always makes you laugh?", label: "What is one thing that always makes you laugh?" },
    { key: "What is something you wish others knew about you?", label: "What is something you wish others knew about you?" },
    { key: "What is something you can do to improve your mental/physical health?", label: "What is something you can do to improve your mental/physical health?" },
    { key: "Who are the 5 people you spend the most time with?", label: "Who are the 5 people you spend the most time with?" },
    { key: "How can you love yourself more today?", label: "How can you love yourself more today?" },
    { key: "What's the best compliment you received?", label: "What's the best compliment you received?" },
    { key: "What fears and insecurities do I have? How have they impacted my life?", label: "What fears and insecurities do I have? How have they impacted my life?" },
    { key: "Reflect on a challenging experience you faced recently. What did you learn from it?", label: "Reflect on a challenging experience you faced recently. What did you learn from it?" },
    { key: "Describe a place that makes you feel safe and happy. What is it about this place that has this effect on you?", label: "Describe a place that makes you feel safe and happy. What is it about this place that has this effect on you?" },
    { key: "Write about a time when you felt misunderstood. How did you handle it, and what did you learn?", label: "Write about a time when you felt misunderstood. How did you handle it, and what did you learn?" }
  ] as const;
  


export const cardData = [
    { front: 'Level 1', back: 'Starting level. Collect 9 points to reach level  to unlock text report generation with AI!' },
    { front: 'Level 2', back: 'Text report generation with AI unlocked! Credit limit: 10' },
    { front: 'Level 3', back: 'Collect 50 points to reach level 4 to unlock image generation with AI!' },
    { front: 'Level 4', back: 'Image generation with AI unlocked! Credit limit:10' },
    { front: 'Level 5', back: 'Congratulations! You did it, you reached the max level! You have unlocked 25 image generation credits, and 50 text analysis reports!' },
] as const