import React from 'react';
import environment from '@/environment';
import axios from 'axios';

export default function useVerificationBusinessNumber() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const statusUrl = `${environment.nationBusinessUrl}?serviceKey=${environment.nationTextServiceKey}&returnType=JSON`;

  const fetchVerificationBusinessNumber = async (requestBody: { b_no: string[] }) => {
    setLoading(true);
    try {
      const response = await axios.post(statusUrl, requestBody);
      return response?.data;
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchVerificationBusinessNumber, loading };
}
