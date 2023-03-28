import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


export function TBMenu({ menuTitle, options }) {
    const [isOpen, setIsOpen] = useState(false)
    const variants = {
        open: {
            display: 'flex',
            opacity: 1,
        },
        closed: {
            display:'none',
            opacity: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            },
 
        },
    }
    return (
        <div className='tb-menu'
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => {
                setIsOpen(true)
            }}
            onBlur={(e) => {
                setIsOpen(false)
            }}
        >
            <button
            // onClick={(e)=>setIsOpen(!isOpen)}
            >{menuTitle}</button>
            <motion.nav
                animate={isOpen ? "open" : "closed"}
                variants={variants}
            >
                {options.map((e, i) => <button 
                key={i}
                onClick={e.action}
                >{e.option}</button>)}
            </motion.nav>
        </div>)


}



