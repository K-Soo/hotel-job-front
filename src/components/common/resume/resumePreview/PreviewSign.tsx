import React from 'react';

interface PreviewSignProps {
  name: string;
}

export default React.memo(function PreviewSign({ name }: PreviewSignProps) {
  return (
    <div className="mb-6 text-center text-[14px] leading-snug text-gray-800">
      <p>위의 모든 내용은 사실과 다름 없음을 확인합니다.</p>
      {/* <p>입사지원일 : 2025년 02월 19일 (수)</p> */}
      {name && <p>작성자 : {name}</p>}
    </div>
  );
});
