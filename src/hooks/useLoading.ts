import React from 'react';

export default function useLoading() {
  const [loading, setLoading] = React.useState(false);

  return { loading, setLoading };
}
