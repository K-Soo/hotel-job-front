import React from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface FormEditorProps {
  placeholder?: string;
}

const toolbarOptions = [
  [{ header: [2, 3, 4, false] }],
  // [{ align: [] }],
  ['bold', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  // [{ indent: '-1' }, { indent: '+1' }],
  // [{ color: [] }, { background: [] }],
  // ['link', 'image'],
];

const init =
  '<h3>예시 내용입니다.</h3><h3><br></h3><h3>포지션 상세</h3><p><strong>OO에서 함께하실 OO을 모십니다.</strong></p><p>현재 근무 중인 직원분들 모두 친절하고 좋은 분위기를 유지하고 있어, 마음 편히 근무하실 수 있는 환경을 제공하고자 합니다.</p><p>고객 서비스에 관심이 많으신 분들의 많은 지원 부탁드립니다!</p><p><br></p><p><br></p><h3>주요업무</h3><ul><li>손님 응대 및 편의 제공</li><li>간단한 매출 및 결산 업무</li><li>기타 운영 지원 업무</li></ul><p><br></p><p><br></p><h3>자격요건</h3><ul><li><strong>경력 무관</strong>: 초보자도 환영합니다. (1년 이상 경력자 우대)</li><li><strong>친절한 서비스 정신</strong>을 가진 분</li><li><strong>기본적인 컴퓨터 사용 능력</strong> (예약 및 매출 관리)</li><li>책임감과 신뢰를 바탕으로 성실히 근무하실 분</li></ul><p><br></p><p><br></p><h3>근무조건</h3><ul><li><strong>휴무</strong>: 월 2회 휴무 제공 (스케줄 협의 가능)</li><li><strong>급여</strong>: 경력 및 근무 조건에 따라 협의 (월급 또는 연봉 가능)</li></ul><p><br></p><p><br></p><h3>혜택 및 복지</h3><ul><li>4대 보험 가입</li><li>숙소 제공 가능</li><li>간식 및 음료 제공</li><li>명절 보너스 및 선물 제공</li><li>장기 근속 시 승진 및 추가 혜택 제공</li></ul>';

export default function FormEditor({ placeholder }: FormEditorProps) {
  const [content, setContent] = React.useState('');
  // const quillRef = React.useRef<ReactQuill>(null);

  React.useEffect(() => {
    setContent(init);
  }, []);

  const modules = React.useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  return (
    <S.FormEditor>
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={(value) => {
          setContent(value);
        }}
        placeholder={placeholder}
        value={content}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        // value={value}
        readOnly={false}
      />
    </S.FormEditor>
  );
}

const S = {
  FormEditor: styled.div`
    .quill {
      .ql-editor {
        overflow: auto;
        min-height: 300px;
        max-height: 700px;
        padding: 20px;
        ul,
        ol {
          margin: 0;
          padding: 0;
          list-style-position: inside;
        }
        strong {
          font-weight: bold;
        }
        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  `,
};
