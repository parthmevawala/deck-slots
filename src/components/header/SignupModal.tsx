import { FC, FormEvent, ReactEventHandler, useRef } from "react";
import styles from "../../styles/Auth.module.css";
import FormData from "form-data";

interface Props {
    display: string | undefined;
    closeModal: ReactEventHandler | undefined;
    signupAction: (formData: FormData) => void;
}

const SignupModal: FC<Props> = (props): JSX.Element => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const signupAction = (event: FormEvent) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("email", emailRef.current?.value );
        fd.append("password", passwordRef.current?.value );
        fd.append("name", nameRef.current?.value );
        fd.append("profileImage", imageRef.current?.files![0]);
        return props.signupAction(fd);
    };

    return (
        <div
            className={`${styles.login_modal} ${
                props.display === "hide" ? styles.hide : ""
            }`}
        >
            <form method="POST" onSubmit={signupAction} action="#" ref={formRef} >
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
                        type="name"
                        id="name"
                        placeholder="Name"
                        ref={nameRef}
                    />
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
                    <label htmlFor="profileImage">Profile Image: </label>
                    <input type="file" id="profileImage" name="profileImage" ref={imageRef} />
                </div>
                <div>
                    <button type="submit">
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupModal;
