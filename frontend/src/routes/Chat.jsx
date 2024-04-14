import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { appendChat, initChat,  } from "../redux/actions/chatAction";
import MyLoading from "../components/MyLoading";
import ChatBubble from "../components/ChatBubble";
import { IconButton, Spinner, Textarea } from "@material-tailwind/react";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Feedback from "../components/Feedback";
import { resetFeedback,  } from "../redux/slices/chatSlice";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from "react-text-to-speech";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';

export default function Chat({ user }) {
    const dispatch = useDispatch();
    const [transcription, setTranscription] = useState('');
    const chat = useSelector((state) => state.chat.chat);
    const profile = useSelector((state) => state.profile.profile);
    const loading = useSelector((state) => state.chat.loading);
    const refContainer = useRef(null); 
    const [openFB, setOpenFB] = useState(false);
    const [fbText, setFbText] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        alert("Browser doesn't support speech recognition");
    }
    
    const handleOpen = () => {
        setOpenFB(!openFB);
        dispatch(resetFeedback())
    }

    useEffect(() => {
        if (listening) {
            setTranscription(transcript);
        }
    }, [transcript, listening])

    const handleStopListening = () => {
        //console.log("STOPPING");
        setTranscription(transcript);
        SpeechRecognition.stopListening();
        resetTranscript();
    }

    const handleStartListening = () => {
        SpeechRecognition.startListening({
            language: "es-ES",
            continuous: true
        });
        //setTranscription(transcript);
    }

    const handleSubmit = async (e) => {
        const message = {
            role: "user",
            content: transcription
        }
        dispatch(appendChat(message));
        setTranscription("");
    }

    // Function to scroll the container to the bottom smoothly
    const scrollToBottom = () => {
        if (refContainer.current) {
            refContainer.current.scrollTo({
                top: refContainer.current.scrollHeight,
                behavior: 'smooth' // Enable smooth scrolling behavior
            });
        }
    };

    // Use useEffect to automatically scroll to bottom when refContainer changes
    useEffect(() => {
        // bot has ansered
        if (chat) {
            setSpeaking(false);
            if (chat.length % 2 === 0) {
                setSpeaking(true);
            }
        }
        scrollToBottom();
    }, [chat]);


    useEffect(() => {
        if (user && profile) {
            dispatch(initChat(
                user.email,
                profile.learnLanguage,
                profile.nativeLanguage,
                profile.knownLanguages,
                profile.interests,
                profile.learningGoal,
                profile.proficiencyLevel
            ))
        }
    }, [user])

    return (chat) ? (
        <div className="h-5/6 mx-2 overflow-y-scroll" ref={refContainer}>
            {
                chat ? (
                    chat.filter((line) => line.role != "system").map((line, index) => {
                        return (
                            <div key={index}>
                                <ChatBubble 
                                    message={line} 
                                    handleOpenFB={handleOpen} 
                                    setFbText={setFbText}
                                />
                            </div>
                        )
                    })
                ) : (<MyLoading />)
            }

            <Feedback open={openFB} handleOpen={handleOpen}/>

            {
                speaking ? (<Speech text={chat[chat.length - 1].content} lang="es-ES" startBtn={<PlayArrowIcon />} stopBtn={<StopIcon />} pauseBtn={<PauseIcon />} />) : null
            }
            
            <Feedback open={openFB} handleOpen={handleOpen}/>
            
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
                <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                    <div className="flex">
                        <IconButton variant="text" className="rounded-full" onClick={() => setTranscription("")}>
                            <DeleteForeverIcon />
                        </IconButton>
                        {
                            browserSupportsSpeechRecognition ? (<IconButton variant="text" className={`rounded-full ${listening ? 'text-red-500' : ''}`} onClick={listening ? handleStopListening : handleStartListening}>
                                <KeyboardVoiceIcon />
                            </IconButton>) : null
                        }
                    </div>
                    <Textarea
                        rows={1}
                        resize={true}
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        placeholder="Your Message"
                        className="min-h-full !border-0 focus:border-transparent"
                        containerProps={{
                            className: "grid h-full",
                        }}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <div>
                        {
                            !loading ? (
                                <IconButton variant="text" className="rounded-full" onClick={handleSubmit}>
                                    <CheckIcon />
                                </IconButton>
                            ) : (
                                <IconButton variant="text" className="rounded-full">
                                    <Spinner />
                                </IconButton>)
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : <MyLoading />
}