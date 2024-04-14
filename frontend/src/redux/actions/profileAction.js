import { setLevelSuccess, setProfileFailure, setProfileSuccess, start } from "../slices/profileSlice";
import { getLevel, getProfile, postProfile } from "../../api/apiClient";

export const setProfileAsync = (email) => async (dispatch) => {
    try {
        dispatch(start());
        const [profile, level] = await Promise.all([
            getProfile(email),
            getLevel(email)
        ]);
        console.log("ACTION", level)
        dispatch(setProfileSuccess(profile));
        dispatch(setLevelSuccess(level))
    } catch (err) {
        dispatch(setProfileFailure(err.message))
    }
}

export const postProfileAsync = (
    email, name, nativeLanguage, learnLanguage, 
    knownLanguages, interests, learningGoal 
) => async (dispatch) => {
    try {
        const body = {
            email: email,
            name: name,
            nativeLanguage: nativeLanguage,
            learnLanguage: learnLanguage,
            knownLanguages: knownLanguages,
            interests: interests,
            learningGoal: learningGoal
        }
        postProfile(body);
        dispatch(setProfileAsync(email));
    } catch (err) {
        alert(err);
    }
}