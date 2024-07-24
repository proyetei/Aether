import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { subTitle } from "@/fonts/font";
import { useQuestion } from "./QuestionContext";
import useRandomQuestion from "@/lib/randQuesGenerator";

const QuestionGenerator: React.FC = () => {
    const { question, generateRandomQuestion } = useRandomQuestion();
  const { setSelectedQuestion } = useQuestion();

  const handleSelectQuestion = () => {
    if (question) {
      setSelectedQuestion(question);
    }
    console.log(question)
  };
    return(
        <Card isBlurred
        className="border-none bg-background/60"
        shadow="sm">
            <CardBody className="flex flex-col gap-2 text-sm">
                <p className={`${subTitle.className} font-extrabold`}> {question || "Click the button to generate a question."} </p>
                <div className="flex flex-row gap-4 items-center justify-between">
                <button onClick={generateRandomQuestion} className="bg-indigo-600 px-2 py-1 md:px-3 md:py-2 rounded-sm text-indigo-100 hover:bg-indigo-300"> Generate </button>
                <button onClick={handleSelectQuestion} className="bg-indigo-600 px-2 py-1 md:px-3 md:py-2 rounded-sm text-indigo-100 hover:bg-indigo-300"> Select </button>
                </div>
            </CardBody>
        </Card>
    )
}
export default QuestionGenerator;