import styles from "../../styles/Layout.module.css";

type props = {
    children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: props) => (
    <div className={styles.container}>{children}</div>
);

export default Layout;
