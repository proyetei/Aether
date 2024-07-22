
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Display from "./Display";
import { subTitle } from "@/fonts/font"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Entry } from "@prisma/client"
import axios from "axios";


export default async function TabComponent() {

  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const filteredDreams = entries.filter((entry) => entry.selection === "Dream");
  const filteredExperience = entries.filter((entry) => entry.selection === "Experience" || entry.selection === "Q/A")

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api', {});
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching journal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);
  return (
    <Tabs defaultValue="experience">
      <TabsList className={`flex items-center justify-center gap-8 w-full bg-transparent ${subTitle.className}`}>
        {/* EVENT */}
        <TabsTrigger value="experience" > Event/Q&A </TabsTrigger>
        <TabsTrigger value="dream"> Dream </TabsTrigger>
      </TabsList>
        <TabsContent value="experience">
        <Card>
          <CardHeader>
            <CardTitle className={`${subTitle.className}`}> Event/Q&A </CardTitle>
            <CardDescription>
              Here you will be able to see all your journals of your life experiences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
          {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (
            <div className="grid grid-cols-1 gap-4">
            { filteredExperience.length === 0 ? (<p> No journals yet. Click "add new" to add one. </p>) : ( <Display entries={filteredExperience} />)} 
            </div> )}
          </CardContent>
        </Card>
        </TabsContent>
        {/* DREAM */}
        <TabsContent value="dream">
        <Card>
          <CardHeader>
          <CardTitle className={`${subTitle.className}`}> Dreams </CardTitle>
            <CardDescription>
              Here you will see your dreams that you saw while you were asleep.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (
          <div className="grid grid-cols-1 gap-4">
            { filteredDreams.length === 0 ? (<p> No dreams yet. Click "add new" to add one. </p>) : ( <Display entries={filteredDreams}  />)}
          </div> )}
          </CardContent>
        </Card>
        </TabsContent>

    </Tabs>
  )
}