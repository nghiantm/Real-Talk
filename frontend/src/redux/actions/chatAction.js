import { addLevel, assessLevel, generateResponse, getChat, postChat } from "../../api/apiClient";
import proficiencyScoreMap from "../../utils/proficiencyScoreMap";
import { generateFeedbackPrompt, generatePrompt } from "../../utils/prompt";
import { appendChatFailure, appendChatSuccess, returnChats, returnLevel, setChatFailure, setChatSuccess, setFeedbackError, setFeedbackSuccess, start } from "../slices/chatSlice"
import { getEmail } from "../slices/profileSlice";

export const setChatAsync = (email) => async (dispatch) => {
    try {
        dispatch(start());
        const chat = await getChat(email);
        dispatch(setChatSuccess(chat));
    } catch (err) {
        dispatch(setChatFailure(err.message))
    }
}

export const postChatAsync = (
    email,
    proficiencyLevel,
    messages
) => async (dispatch) => {
    try {
        const body = {
            email: email,
            proficiencyLevel: proficiencyLevel,
            messages: messages
        }
        await postChat(body);
        dispatch(setChatAsync(email))
    } catch (err) {
        dispatch(setChatFailure(err.message))
    }
}

export const initChat = (
    email,
    learnLanguage,
    nativeLanguage,
    knownLanguages,
    interests,
    learningGoal,
    proficiencyLevel
) => async (dispatch) => {
    try {
        const chat = await getChat(email);
        if (chat) {
            dispatch(setChatSuccess(chat));
        } else {
            const prompt = generatePrompt(
                learnLanguage,
                nativeLanguage,
                knownLanguages,
                interests,
                learningGoal,
                proficiencyLevel
            )
            const response = await generateResponse(prompt);
            const messages = [
                prompt.messages[0],
                response
            ]

            dispatch(postChatAsync(email, proficiencyLevel, messages));
        }
    } catch (err) {
        dispatch(setChatFailure(err.message))
    }
}

export const generateFeedback = (text) => async (dispatch, getState) => {
    try {
        dispatch(start());
        const { profile } = getState();
        const prompt = generateFeedbackPrompt(profile.profile.learnLanguage);
        const reviewText = {
            role: "user",
            content: text
        }

        const messages = {
            "messages": [
                prompt[0],
                reviewText
            ]
        }
        
        // Execute both requests concurrently
        const [review, level] = await Promise.all([
            generateResponse(messages),
            assessLevel(text)
        ]);

        const response = {
            "feedback": review,
            "level": level
        }
        console.log(response);
        dispatch(setFeedbackSuccess(response));
    } catch (err) {
        dispatch(setFeedbackError(err.message))
    }
}

export const appendChat = (message) => async (dispatch, getState) => {
    try {
        dispatch(start());
        dispatch(appendChatSuccess(message));
        const { chat } = getState();
        const { profile } = getState();
        const body = {
            messages: chat.chat
        }
        const response = await generateResponse(body);

        const updatedChat = [...chat.chat, response];
        const level = chat.level;
        dispatch(postChatAsync(profile.profile.email, level, updatedChat));

        const textLevel = await assessLevel(message.content);
        const levelScore = proficiencyScoreMap[textLevel];
        await addLevel(profile.profile.email, levelScore);
    } catch (err) {
        dispatch(appendChatFailure(err.message));
    }
}