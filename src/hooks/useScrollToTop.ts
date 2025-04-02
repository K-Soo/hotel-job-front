import React from 'react';

export default function useScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
