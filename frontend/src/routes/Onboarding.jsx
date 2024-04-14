import { Button, Input, Option, Select, Textarea, Typography, useSelect } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { postProfile } from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { postProfileAsync, setProfileAsync } from "../redux/actions/profileAction";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Onboarding() {
    const [user, loading, error] = useAuthState(auth);
    const email = user.email;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nativeLanguage: "",
        learnLanguage: "",
        name: "",
        knownLanguages: "",
        interests: "",
        learningGoal: "",
    });

    const handleChange = (e) => {
        if (!e.target) {
          return null;
        }
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await dispatch(postProfileAsync(
            email,
            formData.name,
            formData.nativeLanguage,
            formData.learnLanguage,
            formData.knownLanguages,
            formData.interests,
            formData.learningGoal
        ))
        navigate("/");
    }

    return (
        <div className={"flex min-h-[100vh] flex-col items-center justify-center bg-white p-8"}>
            <div className={"my-16 text-center"}>
                <h1 className={"mb-15 text-3xl font-bold text-blue-500"}>Let's get you started</h1>
                <Typography variant="small" color="gray" className="mt-2 w-full font-normal" placeholder={undefined}>
                This information will help us personalize your learning experience.
                </Typography>
            </div>
            <div className="w-full max-w-xl space-y-4">
                <div className={"space-y-3"}>
                <p className={"text-sm"}>What should we call you?</p>
                <Input
                    size="lg"
                    crossOrigin="anonymous"
                    label="e.g. Mike Oxmaul"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                </div>

                <div className={"space-y-3"}>
                <p className={"text-sm"}>Select your app's language</p>
                <Select
                    size={"lg"}
                    label="Choose a language..."
                    placeholder={undefined}
                    name="nativeLanguage"
                    value={formData.nativeLanguage}
                    onChange={value => handleChange({ target: { name: "nativeLanguage", value } })}
                >
                    
                    <Option value="english">English</Option>
                </Select>
                </div>

                <div className={"space-y-3"}>
                <p className={"text-sm"}>Select the language you want to learn</p>
                <Select
                    size={"lg"}
                    label="Choose a language..."
                    placeholder={undefined}
                    name="learnLanguage"
                    value={formData.learnLanguage}
                    onChange={value => handleChange({ target: { name: "learnLanguage", value } })}
                >
                    <Option value="spanish">Spanish</Option>
                    
                </Select>
                </div>

                <div className={"space-y-3"}>
                <p className={"text-sm"}>Why are you looking to practice this language?</p>
                <Textarea
                    size="lg"
                    placeholder="e.g. I am going to Mexico"
                    name="learningGoal"
                    value={formData.learningGoal}
                    onChange={handleChange}
                    className={"block"}
                />
                </div>
                <div className={"space-y-3"}>
                <p className={"text-sm"}>Specify any previous language knowledge.</p>
                <Textarea
                    size="lg"
                    placeholder={"e.g. native in English, proficient in Vietnamese"}
                    name="knownLanguages"
                    value={formData.knownLanguages}
                    onChange={handleChange}
                    className={"block"}
                />
                </div>
                <div className={"space-y-3"}>
                <p className={"text-sm"}>Tell us any of your interests.</p>
                <Textarea
                    size="lg"
                    placeholder="e.g. cooking, driving"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className={"block"}
                />
                </div>
                <div>
                <Button
                    variant="gradient"
                    size="md"
                    color="blue"
                    className="mb-16 mt-4 w-full"
                    ripple={false}
                    onClick={handleSubmit}
                    placeholder=""
                >
                    SUBMIT
                </Button>
                </div>
            </div>
            </div>
    )
}