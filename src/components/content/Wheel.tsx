import styles from "../../styles/Wheel.module.css";
import spade from "../../assets/cards/spade.jpg";
import club from "../../assets/cards/club.jpg";
import heart from "../../assets/cards/heart.jpg";
import diamond from "../../assets/cards/diamond.jpg";
import {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
    ForwardedRef,
    useRef,
} from "react";

type Props = {
    startSpin: boolean;
    startFakeSpin: boolean;
    speed: number;
};

export type WheelReference = {
    slot: string;
};

const Wheel = (
    { startSpin, startFakeSpin, speed }: Props,
    ref: ForwardedRef<WheelReference>
) => {
    const [deckOrder, setDeckOrder] = useState([
        [spade, "Spade"],
        [heart, "Heart"],
        [club, "Club"],
        [diamond, "Diamond"],
    ]);

    const slotsList = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => ({ slot: deckOrder[0][1] }));

    useEffect(() => {
        if (startSpin) {
            slotsList.current?.animate(
                [
                    {
                        transform: "translateY(-25%)",
                    },
                ],
                {
                    // timing options
                    duration: speed,
                    iterations: 1,
                    easing: "linear",
                }
            );
            setTimeout(() => {
                setDeckOrder([
                    deckOrder[1],
                    deckOrder[2],
                    deckOrder[3],
                    deckOrder[0],
                ]);
            }, speed);
        } else if (startFakeSpin && deckOrder[0][1] !== "Spade") {
            slotsList.current?.animate(
                [
                    {
                        transform: "translateY(-25%)",
                    },
                ],
                {
                    // timing options
                    duration: 200,
                    iterations: 1,
                }
            );
            setTimeout(() => {
                setDeckOrder([
                    deckOrder[1],
                    deckOrder[2],
                    deckOrder[3],
                    deckOrder[0],
                ]);
            }, 200);
        }
    });

    return (
        <ul className={styles.wheel} ref={slotsList}>
            <li>
                <img src={deckOrder[0][0]} alt={deckOrder[0][1]} />
            </li>
            <li>
                <img src={deckOrder[1][0]} alt={deckOrder[0][1]} />
            </li>
            <li>
                <img src={deckOrder[2][0]} alt={deckOrder[0][1]} />
            </li>
            <li>
                <img src={deckOrder[3][0]} alt={deckOrder[0][1]} />
            </li>
        </ul>
    );
};

const forwardedWheel = forwardRef(Wheel);

export default forwardedWheel;
