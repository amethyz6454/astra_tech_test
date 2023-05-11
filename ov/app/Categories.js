import StyleCategories from "./Categories.module.css";

const Categories = ({ title, children }) => {
    return (
        <div className={StyleCategories.wrapper}>
            <div className={StyleCategories.head}>Category: {title}</div>
            <div className={StyleCategories.body}>{children}</div>
        </div>
    );
};

export default Categories;
