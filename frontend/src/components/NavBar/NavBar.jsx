import clsx from "clsx";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import DropMenu from "./DropMenu";
import { Button } from "@material-tailwind/react";

function HomeBar() {
    return (
        <div
            className={clsx(
                "absolute w-screen flex justify-between items-center px-8 h-16 bg-[#2196f3]"
            )}
        >
            <p className={clsx(
                "grow font-logo mt-1 text-xl text-[#ffffff]"
            )}>
                Real Talk
            </p>

            <DropMenu />
        </div>
    )
}

function ChatBar() {
    const navigate = useNavigate();

    return (
        <div
            className={clsx(
                "sticky flex justify-between items-center px-8 h-16 shadow-md"
            )}
        >
            <Button 
                className={clsx(
                "font-logo text-xl bg-[#2196f3]")}
                size="sm"
                onClick={() => navigate("/")}
            >
                Back
            </Button>

            <p className={clsx(
                "font-logo mt-1 text-xl text-[#2196f3]"
            )}>
                Real Talk
            </p>
        </div>
    )
}

export default function NavBar() {
    const location = useLocation();
    const pathname = location.pathname;
    const shouldRenderNavBar = 
        pathname !== '/sign-up' 
        && pathname !== '/sign-in'
        && pathname !== '/sign-up/onboarding';
    const shouldRenderChatBar = pathname === "/chat"
    
    return (shouldRenderNavBar) ? (
        <>
            {
                shouldRenderChatBar ? (
                    <ChatBar />
                ) : (<HomeBar />)
            }
        </>
    ) : null;
}
