import { FC, useRef, useState } from "react";
import styles from "../../styles/PlayModal.module.css";
import Wheel, { WheelReference } from "./Wheel";

interface PlayModalProps {
    hideModal: () => void;
    sendResult: (
        slot1: string,
        slot2: string,
        slot3: string,
        win: number
    ) => void;
    userBalance: number
}

const PlayModal: FC<PlayModalProps> = (props): JSX.Element => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [fakeSpinning, setFakeSpinning] = useState<boolean>(false);

    const wheelRef = [
        useRef<WheelReference>(null),
        useRef<WheelReference>(null),
        useRef<WheelReference>(null),
    ];

    const calculations = () => {
        const slot1: string = wheelRef[0].current?.slot!;
        const slot2: string = wheelRef[1].current?.slot!;
        const slot3: string = wheelRef[2].current?.slot!;

        // Calculations and deductions.
        let win: number = 0;
        if (slot1 === slot2 && slot1 === slot3) {
            if (slot1 === "Spade") {
                win = 5;
            } else {
                win = 2;
            }
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            win = 0.5;
        }

        props.sendResult(slot1, slot2, slot3, win);
    };

    const spin = () => {
        // -2 spin cost
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
        }, 5000);

        setTimeout(calculations, 5300);
    };

    const fakeSpin = () => {
        setFakeSpinning(true);

        setTimeout(() => {
            setFakeSpinning(false);
        }, 800);

        setTimeout(calculations, 900);
    };

    const getRandomSpeed = () => Math.floor(Math.random() * 150 + 50);

    return (
        <div className={styles.play_modal}>
            {/* Close button */}
            <button
                type="button"
                onClick={props.hideModal}
                className={styles.close_button}
            >
                X
            </button>
            {/* Slot Wheels */}
            <div className={styles.slots}>
                <Wheel
                    startSpin={spinning}
                    startFakeSpin={fakeSpinning}
                    speed={getRandomSpeed()}
                    ref={wheelRef[0]}
                />
                <Wheel
                    startSpin={spinning}
                    startFakeSpin={fakeSpinning}
                    speed={getRandomSpeed()}
                    ref={wheelRef[1]}
                />
                <Wheel
                    startSpin={spinning}
                    startFakeSpin={fakeSpinning}
                    speed={getRandomSpeed()}
                    ref={wheelRef[2]}
                />
            </div>
            {/* Lower portion on modal which includes control buttons */}
            <div className={styles.modal_bottom_panel}>
                <button
                    className={styles.action_button}
                    type="button"
                    id="spinButton"
                    onClick={spin}
                    disabled={props.userBalance < 2 || spinning || fakeSpinning ? true : false}
                >
                    Spin $2
                </button>
                <button
                    className={styles.action_button}
                    type="button"
                    id="fakeButton"
                    onClick={fakeSpin}
                    disabled={spinning || fakeSpinning ? true : false}
                >
                    Fake Spin
                </button>
                <button
                    className={styles.action_button}
                    type="button"
                    onClick={props.hideModal}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PlayModal;
