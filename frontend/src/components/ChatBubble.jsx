import { Button, Spinner } from "@material-tailwind/react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import clsx from "clsx";
import { useEffect, useState } from "react";
import Feedback from "./Feedback";
import { useDispatch } from "react-redux";
import { generateFeedback } from "../redux/actions/chatAction";

export default function ChatBubble({ message, handleOpenFB, setFbText }) {
    const isUser = message.role === "user";
    const dispatch = useDispatch();

    const handleFB = () => {
        dispatch(generateFeedback(message.content));
        handleOpenFB();
    }

    return (
        <div className={clsx("flex max-w-[80%] items-end space-x-2 my-4", isUser && "ml-auto flex")}>
        {
            isUser ? (
                <>
                    <div className={clsx("flex-1 rounded-md border-2 p-2")}>
                        <p>{message.content}</p>
                        <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={handleFB}
                        >
                            Get feedback
                        </Button>
                    </div>
                    
                    <TagFacesRoundedIcon className={"text-[#2196f3]"} fontSize="large" />
                </>
            ) : (
                <>
                <SmartToyIcon className={"text-[#2196f3]"} fontSize="large"/>
                <p className={clsx("flex-1 rounded-lg bg-gray-200 p-2")}>{message.content}</p>
                </>
            )
        }
        </div>
    );
}