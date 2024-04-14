import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyLoading from "./MyLoading";
import { generateFeedback } from "../redux/actions/chatAction";
import { proficiencyColorMap } from "../utils/proficiencyColorMap";

export default function Feedback({ open, handleOpen }) {
    const feedback = useSelector((state) => state.chat.feedback);

    return feedback ? (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="text-[#2196f3]">Feedback</DialogHeader>
                <DialogBody>
                    <p className="whitespace-pre-line mb-6">
                        {feedback.feedback.content}
                    </p>
                    <div
                        className={"flex w-full flex-col gap-2 rounded-lg p-5 text-center shadow-lg"}
                        style={{ background: proficiencyColorMap[feedback.level] }}
                        >
                        <p className={"font-medium text-white"}>PROFICIENCY SCORE:</p>
                        <p className={"text-3xl font-bold text-white"}>{feedback.level}</p>
                        <p className={"font-sm font-semibold text-white"}>Nice work!</p>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    ) : <Dialog open={open} handler={handleOpen}>
        <MyLoading />
    </Dialog>
}