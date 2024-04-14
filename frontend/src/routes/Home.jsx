import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proficiencyColorMap } from "../utils/proficiencyColorMap";
import tinycolor from "tinycolor2";
import { Button } from "@material-tailwind/react";
import MyLoading from "../components/MyLoading";
import { setProfileAsync } from "../redux/actions/profileAction";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { setChatAsync } from "../redux/actions/chatAction";
import proficiencyLevelMap from "../utils/proficiencyLevelMap";

const Home = ({ user }) => {
    const profile = useSelector((state) => state.profile.profile);
    const level = useSelector((state => state.profile.level));
    const loading = useSelector((state) => state.profile.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const proficiencyLevel = proficiencyLevelMap[level] || "Novice";

    const startConvo = async () => {
        navigate("/chat");
    }

    useEffect(() => {
        if (user) {
            dispatch(setProfileAsync(user.email));
        }
    }, [user])

    return profile ? (
        <div className="image-bg transition flex justify-center">
            <div
                className={
                    "left-0 top-0 flex h-[50vh] w-full flex-col items-center justify-center space-y-2 pb-24 text-white"
                }
                >
                <h1 className={"text-center text-5xl font-bold"}>Hola, {profile.name}</h1>

                <div className={"flex items-center justify-center space-x-1 font-medium text-white"}>
                    <WhatshotIcon className={"h-6 w-6"} />
                    <p className={"text-lg"}>KEEP YOUR STREAK!</p>
                </div>
            </div>

            <div
                className={`fixed left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-3 rounded-3xl bg-white shadow-xl`}
                style={{
                    color: proficiencyColorMap[proficiencyLevel],
                    boxShadow: `0px 5px 20px 10px rgba(0, 0, 0, 0.08), inset ${tinycolor(
                    proficiencyColorMap[proficiencyLevel]
                    )
                    .setAlpha(0.2)
                    .toString()} 0px 5px 20px 10px`,
                }}
            >
                <p className={"text-lg font-medium"}>PROFICIENCY</p>
                <p className={"text-3xl font-bold"}>{proficiencyLevel}</p>
                <p className={"inter-font-black text-[#3b3b3b]"}>🇪🇸 Spanish</p>
            </div>

            <div className={"fixed bottom-0 left-0 flex h-[50vh] w-full items-center justify-center pt-24"}>
                <Button
                    onClick={startConvo}
                    color={"blue"}
                    variant={"gradient"}
                    size={"lg"}
                    className={"rounded-full"}
                    placeholder={undefined}
                >
                    START CONVERSATION
                </Button>
            </div>
        </div>
    ) : <MyLoading />
}

export default Home;