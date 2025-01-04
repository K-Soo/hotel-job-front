import axios from 'axios';
import environment from '@/environment';
import { Get } from '@/apis';

export default function TestPage() {
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
      <button onClick={() => fetchStatus()}>상태</button>
      <button>environment: {environment.apiUrl}</button>
      <button>environment test: {environment.test}</button>
    </>
  );
}
