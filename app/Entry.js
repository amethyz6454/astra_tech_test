import Image from "next/image";
import StyleEntry from "./Entry.module.css";

const Entry = ({ image, title, children }) => {
    return (
        <div className={StyleEntry.wrapper}>
            <div className={StyleEntry.body}>
                {title && <div className={StyleEntry.title}>{title}</div>}
                <div className={StyleEntry.imageContainer}>
                    {image && (
                        <Image src={image} alt={title} className={StyleEntry.image} height={160} width={96} priority />
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Entry;
