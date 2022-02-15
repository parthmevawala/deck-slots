import React, { useState } from "react";
import styles from "../../styles/Content.module.css";
import PlayModal from "./PlayModal";
import { UserStates, UserRecords, Page } from "../main/Main";
import spade from "../../assets/cards/spade.jpg";
import club from "../../assets/cards/club.jpg";
import heart from "../../assets/cards/heart.jpg";
import diamond from "../../assets/cards/diamond.jpg";

interface ContentProps extends UserStates, Page {
    sendResult: (
        slot1: string,
        slot2: string,
        slot3: string,
        win: number
    ) => void;
    userRecords: UserRecords[];
}

const Content = (props: ContentProps) => {
    const [stateViewModal, setViewModal] = useState(false);

    const getImage = (card: string) => {
        switch (card) {
            case "Spade":
                return spade;
            case "Diamond":
                return diamond;
            case "Club":
                return club;
            case "Heart":
                return heart;
            default:
                return "";
        }
    };

    let rows: React.ReactElement[] = [];
    if (props.userRecords) {
        rows = props.userRecords.map((record, ind) => {
            return (
                <tr key={"row" + ind}>
                    <td className={styles.slots_container}>
                        {record.result_slots?.map((slot, ids) => (
                            <img
                                key={"img" + ind + ids}
                                src={getImage(slot)}
                                alt={slot}
                            />
                        ))}
                    </td>
                    <td>{record.cost}</td>
                    <td>{record.win}</td>
                    <td>{record.balance}</td>
                </tr>
            );
        });
    }

    const pagePrev = () => {
        if (props.page > 1) props.setPage(props.page - 1);
    };
    const pageNext = () => {
        if (!props.lastPage) props.setPage(props.page + 1);
    };

    return (
        <div className={styles.content}>
            <button
                type="button"
                onClick={() => setViewModal(true)}
                className={styles.play_button}
            >
                PLAY
            </button>
            {props.userDetails._id ? (
                <table className={styles.results_table}>
                    <thead>
                        <tr>
                            <th>Slots</th>
                            <th>Cost</th>
                            <th>Win</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <button
                                    className={styles.btn_pagination}
                                    disabled={props.page <= 1 ? true : false}
                                    onClick={pagePrev}
                                >
                                    Prev
                                </button>
                            </td>
                            <td colSpan={2}>{props.page}</td>
                            <td>
                                <button
                                    className={styles.btn_pagination}
                                    onClick={pageNext}
                                    disabled={props.lastPage ? true : false}
                                >
                                    Next
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                ""
            )}

            {stateViewModal ? (
                <PlayModal
                    sendResult={props.sendResult}
                    userBalance={props.userDetails.balance}
                    hideModal={() => setViewModal(false)}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Content;
