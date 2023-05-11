"use client";

import { useState, useRef, useEffect } from "react";
import Button, { Option } from "./Button";
import Categories from "./Categories";
import Entry from "./Entry";
import { GetCategories } from "./Constants";
import StylePartials from "./Partials.module.css";
import Modal from "./Modal";

export default function Home() {
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem("categories");
        return savedCategories ? JSON.parse(savedCategories) : GetCategories;
    });
    const [toggleModal, setToggleModal] = useState(false);
    const [message, setMessage] = useState("");
    const radioRefs = useRef({});

    useEffect(() => {
        const savedCategories = localStorage.getItem("categories");
        if (savedCategories) {
            const parsedCategories = JSON.parse(savedCategories);
            setCategories(parsedCategories);

            let hasVoted = false;
            let votedEntries = [];
            parsedCategories.forEach((category) => {
                const selectedEntry = category.entries.find((entry) => entry.voted);
                if (selectedEntry) {
                    hasVoted = true;
                    votedEntries.push(selectedEntry.title);
                }
            });

            if (hasVoted) {
                setMessage(`You have already voted for: ${votedEntries.join(", ")}`);
                setToggleModal(true);
            }
        } else {
            setCategories(GetCategories);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    // enables the button submit if all category has a voted item
    const allVoted = categories.every((category) => category.entries.some((entry) => entry.voted));

    // handles the submission of votes and checks if user already voted on an item
    const handleVote = () => {
        let hasVoted = false;
        let votedEntries = [];
        categories.forEach((category) => {
            const selectedEntry = category.entries.find((entry) => entry.voted);
            if (selectedEntry) {
                hasVoted = true;
                votedEntries.push(selectedEntry.title);
            }
        });

        if (hasVoted) {
            setMessage(`You have already voted for: ${votedEntries.join(", ")}`);
            setToggleModal(true);
        } else {
            // handle vote here
            setMessage("");
            setCategories((prev) =>
                prev.map((category) => ({
                    ...category,
                    entries: category.entries.map((entry) => ({
                        ...entry,
                        voted: false,
                    })),
                }))
            );
            Object.values(radioRefs.current).forEach((radio) => {
                radio.checked = false;
            });
        }
    };

    const handleRadioChange = (categoryIndex, entryIndex) => {
        setCategories((prev) =>
            prev.map((category, i) =>
                i === categoryIndex
                    ? {
                          ...category,
                          entries: category.entries.map((entry, j) => ({
                              ...entry,
                              voted: j === entryIndex,
                          })),
                      }
                    : category
            )
        );
    };

    return (
        <div className={StylePartials.wrapper}>
            <header className={StylePartials.header}>Online Votes</header>
            <main className={StylePartials.main}>
                <div className="container mx-auto">
                    <div className="flex flex-col gap-4 p-2">
                        {categories.map((category, categoryIndex) => (
                            <Categories title={category.category} key={categoryIndex}>
                                {category.entries.map((entry, entryIndex) => (
                                    <Entry title={entry.title} image={entry.image} key={entryIndex}>
                                        <Option
                                            label="Vote"
                                            name={category.category}
                                            value={entry.title}
                                            checked={entry.voted}
                                            onChange={() => handleRadioChange(categoryIndex, entryIndex)}
                                            ref={(el) =>
                                                (radioRefs.current[`${category.category}-${entry.title}`] = el)
                                            }
                                        />
                                    </Entry>
                                ))}
                            </Categories>
                        ))}

                        {message && (
                            <Modal toggle={toggleModal} onToggle={setToggleModal}>
                                {message}
                            </Modal>
                        )}
                    </div>
                </div>
            </main>
            <footer className={StylePartials.footer}>
                <Button type="button" onClick={handleVote} disabled={!allVoted}>
                    Submit Your Votes
                </Button>
            </footer>
        </div>
    );
}
