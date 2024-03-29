import { useEffect, useState } from 'react';
import './scrollbar.css';

export function ScrollBar(): JSX.Element | null {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    /**
     * Detect if Mac user is using 'always show' scroll bars option
     * https://stackoverflow.com/a/55009770/1317h585
     * */
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;
    outer.parentNode?.removeChild(outer);

    if (widthNoScroll - widthWithScroll !== 0) {
      setShowScroll(true);
    }
  }, []);

  return null;
  // return showScroll ? <ScrollbarStyle /> : null;
}
