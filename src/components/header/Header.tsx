import styles from "../../styles/Header.module.css";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useState } from "react";
import axios from "axios";
import { UserStates } from "../main/Main";
import Config from "../../config";
import avatarUrl from "../../assets/avatar.png";
import FormData from "form-data";

type HeaderProps = UserStates & {
    avatar: string;
    setAvatar: React.Dispatch<React.SetStateAction<any>>;
};

const Header = (props: HeaderProps) => {
    const [stateDisplayLoginModal, setDisplayLoginModal] = useState(false);
    const [stateDisplaySignupModal, setDisplaySignupModal] = useState(false);

    // Hide / show modal and logout handler
    const loginClickCallback = () => {
        setDisplayLoginModal(true);
    };

    const signupClickCallback = () => {
        setDisplaySignupModal(true);
    };

    const logoutClickCallback = () => {
        props.setUserDetails({
            _id: null,
            name: "Guest",
            balance: 10,
        });
        props.setAvatar(avatarUrl);
    };

    // Login action handler
    const loginAction = (data: {
        email: string | undefined;
        password: string | undefined;
    }) => {
        axios(`${Config.APIUrl}api/v1/player/login`, {
            method: "POST",
            data: {
                email: data.email,
                password: data.password,
            },
        })
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.data.message);
                return response.data.data;
            })
            .then((data) => {
                props.setUserDetails({
                    _id: data._id,
                    name: data.name,
                    balance: data.balance,
                });
                setDisplayLoginModal(false);
            });
    };

    // Login action handler
    const signupAction = (formData: FormData) => {
        axios(`${Config.APIUrl}api/v1/player/insert`, {
            method: "POST",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.data.message);
                return response.data.data;
            })
            .then((data) => {
                props.setUserDetails({
                    _id: data._id,
                    name: data.name,
                    balance: data.balance,
                });
                setDisplaySignupModal(false);
            });
    };

    // Close Modal handler
    const closeModalCallback = () => {
        setDisplayLoginModal(false);
        setDisplaySignupModal(false);
    };

    return (
        <header id="header" className={styles.header}>
            <section className={styles.section_left}>
                <span className={styles.logo}>ᕲ€☾ϰ ∫↳⊙†∫</span>
            </section>
            <section className={styles.section_right}>
                {<span>{props.userDetails.name}</span>}
                <figure>
                    <img src={props.avatar} alt="Avatar" />
                </figure>
                <span className={styles.counter}>
                    ${props.userDetails.balance}
                </span>
                <span>
                    {!props.userDetails._id ? (
                        <span>
                            <span
                                className={styles.login_link}
                                onClick={loginClickCallback}
                            >
                                Login
                            </span>{" "}
                            /{" "}
                            <span
                                className={styles.login_link}
                                onClick={signupClickCallback}
                            >
                                Signup
                            </span>
                        </span>
                    ) : (
                        <span>
                            <span
                                className={styles.login_link}
                                onClick={logoutClickCallback}
                            >
                                Logout
                            </span>
                        </span>
                    )}
                </span>
            </section>
            {stateDisplayLoginModal ? (
                <LoginModal
                    loginAction={loginAction}
                    closeModal={closeModalCallback}
                    display="show"
                />
            ) : stateDisplaySignupModal ? (
                <SignupModal
                    signupAction={signupAction}
                    closeModal={closeModalCallback}
                    display="show"
                />
            ) : (
                ""
            )}
        </header>
    );
};

export default Header;
