import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useResponsive() {
  const isMobileQuery = useMediaQuery({ query: '(max-width: 500px)' });
  const isTabletQuery = useMediaQuery({ query: '(max-width: 768px)' });
  const isLaptopQuery = useMediaQuery({ query: '(max-width: 1024px)' });

  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(true);
  const [isLaptop, setIsLaptop] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(isMobileQuery);
    setIsTablet(isTabletQuery);
    setIsLaptop(isLaptopQuery);
  }, [isMobileQuery, isTabletQuery, isLaptopQuery]);

  return { isMobile, isTablet, isLaptop };
}
