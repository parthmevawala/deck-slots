import { FC, ReactEventHandler, useRef } from "react";
import styles from "../../styles/Auth.module.css";

interface Props {
    display: string | undefined;
    closeModal: ReactEventHandler | undefined;
    loginAction: (data: {
        email: string | undefined;
        password: string | undefined;
    }) => void;
}

const LoginModal: FC<Props> = (props): JSX.Element => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginAction = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        return props.loginAction({ email: email, password: password });
    };
    return (
        <div
            className={`${styles.login_modal} ${
                props.display === "hide" ? styles.hide : ""
            }`}
        >
            <div>
                <button
                    className={styles.close_btn}
                    onClick={props.closeModal}
                    type="button"
                >
                    X
                </button>
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    placeholder="Email Id"
                    ref={emailRef}
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
            </div>
            <div>
                <button type="button" onClick={loginAction}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
