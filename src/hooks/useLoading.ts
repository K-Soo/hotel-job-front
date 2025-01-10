import React from 'react';
import { loadingAtom } from '@/recoil/loading';
import { useRecoilState } from 'recoil';

export default function useLoading() {
  const [loadingAtomStatue, setLoadingAtomStatue] = useRecoilState(loadingAtom);

  return { loadingAtomStatue, setLoadingAtomStatue };
}
