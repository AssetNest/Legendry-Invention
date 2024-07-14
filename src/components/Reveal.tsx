import React, { useRef, useState, createContext, useContext } from 'react';
import { useVisibilityChecker } from '../hooks/use-visibility-checker';

const Context = createContext(false);

export function RevealWrapper({ marginTop = 0, marginBottom = 0, children, ...rest }: { marginTop?: number, marginBottom?: number, children: React.ReactNode }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    console.log('RevealWrapper', inView);

    useVisibilityChecker({
        ref,
        marginTop,
        marginBottom,
        onEnter: () => setInView(true),
    });

    return (
        <Context.Provider value={inView}>
            <div ref={ref} {...rest}>
                {children}
            </div>
        </Context.Provider>
    );
}

const duration = '0.5s';

export function Reveal({ staggerIndex = 0, stagger = 0.1, delay = 0.4, children, ...rest }: { staggerIndex?: number, stagger?: number, delay?: number, children: React.ReactNode }) {
    const inView = useContext(Context);

    const transitionStyle = {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity ${duration} linear, transform ${duration} ease-out`,
        transitionDelay: `${delay + stagger * staggerIndex}s`,
    };

    return (
        <div style={transitionStyle} {...rest}>
            {children}
        </div>
    );
}