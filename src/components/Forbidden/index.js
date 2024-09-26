import styles from "./index.module.scss";

const Forbidden = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.title}>403</h1>
            <div className={styles.description}>
                Sorry, you are not authorized to access this page.
            </div>
        </div>
    );
};

export default Forbidden;
