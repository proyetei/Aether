import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { questionBank } from "@/lib/data";
import { Button } from "./ui/button";
import { useState } from "react";
import { subTitle } from "@/fonts/font";
export default function QuestionGenerator(){
    const [randomQuestion, setRandomQuestion] = useState<string | null>("Click Generate to get a random question");

    const getRandomQuestion = () => {
        const randIndex = Math.floor(Math.random() * questionBank.length);
        return questionBank[randIndex];
    }
    const handleGenerateClick = () => {
        const question = getRandomQuestion();
        setRandomQuestion(question);
    };
    return(
        <Card isBlurred
        className="border-none bg-background/60"
        shadow="sm">
            <CardBody className="flex flex-col gap-2 text-sm">
                <p className={`${subTitle.className} font-extrabold`}> Please select a question to journal on. </p>
                <p> Question: {randomQuestion} </p>
                <Button onClick={handleGenerateClick} size="sm"> Generate </Button>
            </CardBody>
        </Card>
    )
}