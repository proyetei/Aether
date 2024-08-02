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
    "What are three things you love about yourself?",
    "How would you like to be remembered?",
    "What are three things you are proud of recently?",
    "What is one thing that always makes you laugh?",
    "What is something you wish others knew about you?",
    "What is something you can do to improve your mental/physical health?",
    "Who are the 5 people you spend the most time with?",
    "How can you love yourself more today?",
    "What's the best compliment you received?",
    "What fears and insecurities do I have? How have they impacted my life?",
    "Reflect on a challenging experience you faced recently. What did you learn from it?",
    "Describe a place that makes you feel safe and happy. What is it about this place that has this effect on you?",
    "Write about a time when you felt misunderstood. How did you handle it, and what did you learn?",
    
] as const;


export const cardData = [
    { front: 'Level 1', back: 'Starting level. Collect 9 points to reach level  to unlock text report generation with AI!' },
    { front: 'Level 2', back: 'Text report generation with AI unlocked! Credit limit: 10' },
    { front: 'Level 3', back: 'Collect 50 points to reach level 4 to unlock image generation with AI!' },
    { front: 'Level 4', back: 'Image generation with AI unlocked! Credit limit:10' },
    { front: 'Level 5', back: 'Congratulations! You did it, you reached the max level! You have unlocked 25 image generation credits, and 50 text analysis reports!' },
] as const