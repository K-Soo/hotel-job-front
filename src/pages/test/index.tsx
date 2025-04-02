import React from 'react';

export default function TestPage() {
  React.useEffect(() => {
    console.log('TestPage: ', window.opener);
    if (window.opener) {
      window.opener.postMessage({ status: '@@@@' }, window.location.origin);
      // window.close();
    }
  }, []);

  return <>index</>;
}
