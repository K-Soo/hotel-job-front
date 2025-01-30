import React from 'react';
import { Get } from '@/apis';

export default function useGetResumeProfileImage() {
  const [isImageLoading, setIsImageLoading] = React.useState(false);

  const fetchProfileImage = async (key: string) => {
    setIsImageLoading(true);
    try {
      const encodeKey = encodeURIComponent(key);
      const response = await Get.getResumeProfileImage(encodeKey, { responseType: 'blob' });
      console.log('이미지 요청 API ', response);
      return response;
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsImageLoading(false);
    }
  };

  return { fetchProfileImage, isImageLoading };
}
