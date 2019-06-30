import React, { useRef, useContext, useState, useEffect } from "react";
import { css, cx } from "emotion";

export const StickyContext = React.createContext({});

export function StickyContainer({ children }) {
  const ref = useRef(null);
  const [scroll, setScroll] = useState([]);

  function handleScroll(e) {
    const current = ref.current;
    const rect = current.getBoundingClientRect();
    setScroll([current.scrollTop, rect]);
  }

  const styles = css`
    height: 100%;
    overflow-y: auto;
  `;

  return (
    <div ref={ref} className={styles} onScroll={handleScroll}>
      <StickyContext.Provider value={scroll}>{children}</StickyContext.Provider>
    </div>
  );
}

export function Sticky({ children, className }) {
  const [scroll, rect] = useContext(StickyContext);
  const ref = useRef(null);
  const [topOffset, setTopOffset] = useState(0);
  useEffect(() => {
    if (rect) {
      const topDiff = ref.current.getBoundingClientRect().top - rect.top;
      setTopOffset(topDiff);
    }
  }, []);
  const offset = Math.max((scroll || 0 ) - topOffset , 0);
  const styles = css`
    height: auto;
    position: relative;
    & > ul {
        position: absolute;
      /* transform: translateY(${offset}px); */
      left: 0px;
      /* margin-top: ${ offset }px; */
      top: ${ offset }px;
    }
  `;

  return (
    <div className={cx(className, styles)} ref={ref}>
      {children}
    </div>
  );
}
