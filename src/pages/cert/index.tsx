import { Post } from '@/apis';

export default function CertPage() {
  const handler = async () => {
    try {
      const result = await Post.certHashUp();
      console.log(result);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  return (
    <>
      <button onClick={handler}>인증</button>
    </>
  );
}
