import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { questionBank } from "@/lib/data";
import { Button } from "./ui/button";
import { useState } from "react";
import { subTitle } from "@/fonts/font";

interface QuestionGeneratorProps{
    onSelectQuestion: (question:string) => void
}
const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({ onSelectQuestion }) => {
    const [randomQuestion, setRandomQuestion] = useState<string | null>("Click Generate to get a random question");
    const [selection, setSelection] = useState<string | null>();

    const getRandomQuestion = () => {
        const randIndex = Math.floor(Math.random() * questionBank.length);
        return questionBank[randIndex];
    }
    const handleGenerateClick = () => {
        const question = getRandomQuestion();
        setRandomQuestion(question);
    };
    const handleSelectClick = () => {
        if (randomQuestion) { // same as if randomQuestion.length > 1
            onSelectQuestion(randomQuestion)
        }

    }
    return(
        <Card isBlurred
        className="border-none bg-background/60"
        shadow="sm">
            <CardBody className="flex flex-col gap-2 text-sm">
                <p className={`${subTitle.className} font-extrabold`}> Please select a question to journal on. </p>
                <p> Question: {randomQuestion} </p>
                <div className="flex flex-row gap-4 items-center justify-between">
                <Button onClick={handleGenerateClick} size="sm"> Generate </Button>
                <Button onClick={handleSelectClick} size="sm"> Select </Button>
                </div>
            </CardBody>
        </Card>
    )
}
export default QuestionGenerator;