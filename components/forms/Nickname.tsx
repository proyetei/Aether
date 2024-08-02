"use client"
import { Input } from "@nextui-org/input";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "../ui/use-toast";

const API_URL = 'http://localhost:8080/api/nickname'; // URL points to Spring Boot backend
export default function Nickname() {
    const [nickname, setNickname] = useState("")
    const [savedNickname, setSavedNickname] = useState<string|null>(null) // saved nickname type should be of string

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const saveNickname = async () => {
        try {
            const response = await axios.post(API_URL, { name: nickname }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSavedNickname(response.data.name); //response.data.name ensures we post/store to the name field from backend
            toast({ description: "Nickname saved successfully, please refresh!"})
        } catch (error) {
            console.error("Error saving nickname:", error);
        }
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-row md:pr-4 pr-2 border-indigo-300/35 border bg-white/10 backdrop-blur-lg rounded-lg">
                <Input
                    isClearable
                    type="text"
                    variant="bordered"
                    placeholder="Update nickname"
                    onChange={handleInputChange}
                    onClear={() => setNickname("")}
                />
                <button onClick={saveNickname}> <FaCheck /> </button>
            </div>
        </div>
    );
}
