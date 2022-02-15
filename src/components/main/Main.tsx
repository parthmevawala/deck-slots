import { useEffect, useState } from "react";
import styles from "../../styles/Main.module.css";
import Content from "../content/Content";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import avatarUrl from "../../assets/avatar.png";
import axios from "axios";
import Config from "../../config";

interface Request {
    result_slots: string[];
    win: number;
    cost: number;
    _id: string;
}

interface UserDetails {
    name: string;
    balance: number;
    _id?: string;
}

export interface UserStates {
    userDetails: UserDetails;
    setUserDetails: React.Dispatch<React.SetStateAction<any>>;
}

export interface Page {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<any>>;
    lastPage: boolean;
}

export interface UserRecords {
    result_slots?: string[];
    cost?: number;
    win?: number;
    balance?: number;
}

const Main = () => {
    let guest: UserDetails = {
        name: "Guest",
        balance: 10,
    };

    const [userDetails, setUserDetails] = useState<UserDetails>(guest);
    const [avatar, setAvatar] = useState<string>(avatarUrl);
    const [records, setRecords] = useState<UserRecords[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<boolean>(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user-details")!);

        if (user == null) {
            localStorage.setItem("user-details", JSON.stringify(userDetails));
        } else {
            setUserDetails(user);
        }
    }, []);

    useEffect(() => {
        if (userDetails && userDetails._id) {
            axios(`${Config.APIUrl}api/v1/player/fetch`, {
                method: "POST",
                data: {
                    _id: userDetails._id,
                    page: currentPage,
                },
            })
                .then((response) => {
                    if (response.status !== 200)
                        throw new Error(response.data.message);
                    return response.data.data;
                })
                .then((data) => {
                    setAvatar(`${Config.APIUrl}${data.profile_image}`);
                    localStorage.setItem(
                        "user-details",
                        JSON.stringify({
                            _id: data._id,
                            name: data.name,
                            balance: data.balance,
                        })
                    );
                    if (data.lastPage) setLastPage(true);
                    else setLastPage(false);
                    setRecords(data.records);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            localStorage.setItem("user-details", JSON.stringify(guest));
        }
    }, [userDetails, currentPage]);

    const getResult = (
        slot1: string,
        slot2: string,
        slot3: string,
        win: number
    ) => {
        if (userDetails._id) {
            const request: Request = {
                result_slots: [slot1, slot2, slot3],
                win,
                cost: 2,
                _id: userDetails._id!,
            };
            axios(`${Config.APIUrl}api/v1/player/update-records`, {
                method: "PUT",
                data: request,
            })
                .then((response) => {
                    if (response.status !== 200)
                        throw new Error(response.data.message);
                    return response.data.data;
                })
                .then((data) => {
                    setAvatar(`${Config.APIUrl}${data.profile_image}`);
                    localStorage.setItem(
                        "user-details",
                        JSON.stringify({
                            _id: data._id,
                            name: data.name,
                            balance: data.balance,
                        })
                    );
                    setUserDetails({
                        balance: data.balance,
                        name: data.name,
                        _id: data._id,
                    });
                    setRecords(data.records);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            localStorage.setItem(
                "user-details",
                JSON.stringify({
                    name: "Guest",
                    balance: userDetails.balance - 2 + win,
                })
            );
            setUserDetails({
                name: "Guest",
                balance: userDetails.balance - 2 + win,
            });
        }
    };

    return (
        <main className={styles.main}>
            <Header
                avatar={avatar}
                setAvatar={setAvatar}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
            />
            <Content
                sendResult={getResult}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                userRecords={records}
                page={currentPage}
                setPage={setCurrentPage}
                lastPage={lastPage}
            />
            <Footer />
        </main>
    );
};

export default Main;
