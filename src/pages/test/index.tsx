import axios from 'axios';
import environment from '@/environment';
import { Get } from '@/apis';

export default function TestPage() {
  const statusUrl = `${environment.nationBusinessUrl}?serviceKey=${environment.nationTextServiceKey}&returnType=JSON`;

  const statusBody = {
    b_no: ['1073790473'],
  };

  const fetchStatus = async () => {
    try {
      const response = await Get.getHealth();
      console.log('response: ', response);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      {/* <button onClick={() => fetchPosts()}>유저정보</button> */}
      <button onClick={() => fetchStatus()}>상태</button>
      <button>environment: {environment.apiUrl}</button>
    </>
  );
}
