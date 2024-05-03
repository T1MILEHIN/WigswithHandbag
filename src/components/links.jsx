"use client"

import { FaChevronDown } from "react-icons/fa";
import Link from "next/link"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    FiChevronDown,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion"


const Links = () => {
    const [selected, setSelected] = useState(null);
    const [dir, setDir] = useState(null);
    const pathname = usePathname()


    const handleSetSelected = (val) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <ul className="flex items-center gap-8 h-fit">
            <div onMouseLeave={() => handleSetSelected(null)} className="relative flex items-center gap-3 h-fit">
                {
                    TABS.map((t) => {
                        return (
                            <Tab
                                className="flex items-center gap-2"
                                key={t.id}
                                selected={selected}
                                handleSetSelected={handleSetSelected}
                                tab={t.id}
                            >
                                {t.title}
                            </Tab>
                        );
                    })
                }

                <AnimatePresence>
                    {selected && <Content dir={dir} selected={selected} />}
                </AnimatePresence>
            </div>
            <Link className={`${pathname === "/gallery" && "nav-others"} nav-active px-2 py-1.5`} href="/gallery">Gallery</Link>
            <Link className={`${pathname === "/about" && "nav-others"} nav-active px-2 py-1.5`} href="/about">About Us</Link>
            <Link className={`${pathname === "/contact" && "nav-others"} nav-active px-2 py-1.5`} href="/contact">Contact Us</Link>
        </ul>
    )
}

const Tab = ({ children, tab, handleSetSelected, selected }) => {
    const pathname = usePathname()
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => handleSetSelected(tab)}
            onClick={() => handleSetSelected(tab)}
            className={`nav-active relative flex items-center gap-1 rounded-sm px-3 py-1.5 transition-colors ${selected === tab
                ? "nav-others outline-black"
                : "text-black"
                }`}
        >
            <span>{children}</span>
            <FiChevronDown
                className={`transition-transform duration-200 ${selected === tab ? "rotate-180" : ""}`}
            />
        </button>
    );
};

const Content = ({ selected, dir }) => {
    return (
        <motion.div
            id="overlay-content"
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 8,
            }}
            className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
        >
            <Bridge />
            <Nub selected={selected} />

            {TABS.map((T) => {
                return (
                    <div className="overflow-hidden text-white font-bold leading-9" key={T.id}>
                        {selected === T.id && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                                <T.Component />
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]"></div>
);

const Nub = ({ selected }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        moveNub();
    }, [selected]);

    const moveNub = () => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");

            if (!hoveredTab || !overlayContent) return;

            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } = overlayContent.getBoundingClientRect();

            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

            setLeft(tabCenter);
        }
    };

    return (
        <motion.span
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
            }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
        />
    );
};

const SubShop = () => {
    return (
        <ul className="flex flex-col">
            <Link href="/wigs">Wig</Link>
            <Link href="/bundles">Bundle</Link>
        </ul>
    )
}

const SubService = () => {
    return (
        <ul className="">
            <Link href="/makeup">MakeUp</Link>
        </ul>
    )
}


const TABS = [
    {
        title: "Shop",
        Component: SubShop,
        icon: <FaChevronDown />
    },
    {
        title: "Our Services",
        Component: SubService,
        icon: <FaChevronDown />
    }
].map((n, idx) => ({ ...n, id: idx + 1 }));

export default Links