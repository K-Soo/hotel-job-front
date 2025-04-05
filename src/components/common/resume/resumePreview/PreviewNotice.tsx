import React from 'react';
import styled from 'styled-components';

export default React.memo(function PreviewNotice() {
  return (
    <S.PreviewNotice>
      <p className="text-center text-sm leading-relaxed whitespace-pre-line text-gray-600">
        위조된 문서를 등록하여 취업활동에 이용시 법적 책임을 지게 될 수 있습니다. <br />
        호텔잡은 구직자가 등록한 문서에 대해 보증하거나 별도의 책임을 지지 않으며 <br />
        첨부된 문서를 신뢰하여 발생한 법적 분쟁에 책임을 지지 않습니다. <br />
        또한 구인/구직 목적 외 목적으로 이용 시 이력서 삭제 혹은 비공개 조치될 수 있습니다.
      </p>
    </S.PreviewNotice>
  );
});

const S = {
  PreviewNotice: styled.div`
    background-color: ${({ theme }) => theme.colors.gray100};
    padding: 20px;
    border-radius: 8px;
  `,
};
