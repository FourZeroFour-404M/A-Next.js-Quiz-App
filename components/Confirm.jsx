import { useGlobalState } from "@GlobalStateProvider";
import { GiCancel } from "react-icons/gi";

const Confirm = () => {


    const {
        setConfirmSubmission,
        setOpenConfirmSubmission,
        handleSubmit,
    } = useGlobalState();

    // useEffect(() => {
    //     const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
    //     console.log(savedAnswers.length);
    // }, [selectedAnswers]);
    
    return (
        <div className="confirmation-container">
            <GiCancel onClick={() => { setOpenConfirmSubmission(false) }} className="cancel-submit-btn" />
            <p>Do you want to submit now?</p>
            <div className="confirmation-btns">
                <button onClick={() => { setConfirmSubmission(true); handleSubmit() }}>Yes</button>
                <button onClick={() => { setOpenConfirmSubmission(false) }}>No</button>
            </div>
        </div>
    )
}

export default Confirm;