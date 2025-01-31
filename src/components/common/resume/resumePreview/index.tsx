import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { ResumeDetail, ResumeDetailForm } from '@/types';
import Icon from '@/icons/Icon';
import { CAREER_LEVEL } from '@/constants/resume';
import { EDUCATION_LEVEL } from '@/constants';
import Line from '@/components/common/Line';
import { parseBirthDateAndCalculateAge, dateFormat } from '@/utils';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import Profile from '@/components/common/resume/resumePreview/Profile';
import Summary from '@/components/common/resume/resumePreview/Summary';
import Experience from '@/components/common/resume/resumePreview/Experience';
import License from '@/components/common/resume/resumePreview/License';
import Languages from '@/components/common/resume/resumePreview/Languages';

interface ResumePreviewProps {
  resumePreviewData: ResumeDetail & ResumeDetailForm;
  closeResume: () => void;
}

// TODO - 인쇄 스타일 설정
export default function ResumePreview({ resumePreviewData, closeResume }: ResumePreviewProps) {
  const { birthYear, age } = parseBirthDateAndCalculateAge(resumePreviewData?.birthday ?? '');

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Portal>
      <Background>
        <S.ResumePreview>
          <Icon className="close-icon" name="Close25x25" onClick={closeResume} />
          <div className="preview-container" ref={contentRef}>
            <Profile resumePreviewData={resumePreviewData} />
            {resumePreviewData.summary && <Summary resumePreviewData={resumePreviewData} />}

            {resumePreviewData.experience.length !== 0 && (
              <>
                <S.previewSectionTitle>
                  <h6>경력</h6>
                </S.previewSectionTitle>
                <Experience resumePreviewData={resumePreviewData} />
              </>
            )}

            <S.previewSectionTitle>
              <h6>자격증</h6>
            </S.previewSectionTitle>
            <License resumePreviewData={resumePreviewData} />

            <S.previewSectionTitle>
              <h6>외국어</h6>
            </S.previewSectionTitle>
            <Languages resumePreviewData={resumePreviewData} />

            <S.PreviewFooter>
              <div className="wrapper">
                <button onClick={() => reactToPrintFn()}>프린트</button>
              </div>
            </S.PreviewFooter>
          </div>
        </S.ResumePreview>
      </Background>
    </Portal>
  );
}

const S = {
  ResumePreview: styled.div`
    position: fixed;
    min-height: 100%;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    overflow-y: auto;
    .close-icon {
      position: absolute;
      top: 15px;
      right: 30px;
    }
    .preview-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background-color: white;
      position: relative;
      padding: 60px 15px 160px 15px;
      max-width: 210mm;
      /* border: 1px solid red; */
    }
    @media print {
      position: static; /* 인쇄 시 고정 위치 해제 */
      width: 210mm; /* A4 크기 */
      height: 297mm;
      min-height: auto;
      overflow: hidden;
      background-color: white;
      .preview-container {
        width: 100%;
        height: 100%;
        max-width: none; /* 인쇄 시 제한 해제 */
        padding: 0;
        border: none;
        box-shadow: none;
        page-break-after: always; /* 페이지 나누기 적용 */
      }
    }
  `,
  previewSectionTitle: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.colors.black700};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black400};
  `,
  PreviewFooter: styled.div`
    height: 60px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    width: 100%;
    .wrapper {
      width: 100%;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
    }
    @media print {
      display: none;
    }
  `,
};
