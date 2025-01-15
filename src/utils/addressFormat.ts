export function addressFormat(address: string): { sido: string; sigungu: string } {
  if (!address) {
    return {
      sido: 'unknown',
      sigungu: 'unknown',
    };
  }
  const addressArray = address.split(' ');
  const sido = addressArray[0];
  const sigungu = addressArray[1];

  return {
    sido,
    sigungu,
  };
}
