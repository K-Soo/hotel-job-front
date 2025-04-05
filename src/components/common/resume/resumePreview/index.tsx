import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import { ResumeDetail, ResumeDetailForm } from '@/types';
import Icon from '@/icons/Icon';
import Profile from '@/components/common/resume/resumePreview/Profile';
import Summary from '@/components/common/resume/resumePreview/Summary';
import Experience from '@/components/common/resume/resumePreview/Experience';
import Education from '@/components/common/resume/resumePreview/Education';
import License from '@/components/common/resume/resumePreview/License';
import Languages from '@/components/common/resume/resumePreview/Languages';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import PreviewNotice from '@/components/common/resume/resumePreview/PreviewNotice';
import PreviewSign from '@/components/common/resume/resumePreview/PreviewSign';

interface ResumePreviewProps {
  resumePreviewData: ResumeDetail | ResumeDetailForm;
  closeResume: () => void;
}

// TODO - 인쇄 스타일 설정
export default function ResumePreview({ resumePreviewData, closeResume }: ResumePreviewProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <Portal>
      <StyledBackground>
        <StyledPreviewHeader>
          <motion.button
            onClick={closeResume}
            className="close-button"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Icon name="CloseA24x24" width="34px" height="34px" />
          </motion.button>
        </StyledPreviewHeader>

        <S.ResumePreview ref={contentRef}>
          <div className="preview-container">
            <Profile resumePreviewData={resumePreviewData} />

            {/* 자기 소개 */}
            {resumePreviewData.summary && <Summary resumePreviewData={resumePreviewData} />}

            <S.previewSectionTitle>
              <h6>최종학력</h6>
            </S.previewSectionTitle>
            <Education education={resumePreviewData.education} />

            {resumePreviewData.experience.length !== 0 && (
              <>
                <S.previewSectionTitle>
                  <h6>경력</h6>
                </S.previewSectionTitle>
                <Experience resumePreviewData={resumePreviewData} />
              </>
            )}

            {resumePreviewData.licenses.length !== 0 && (
              <>
                <S.previewSectionTitle>
                  <h6>자격증</h6>
                </S.previewSectionTitle>
                <License resumePreviewData={resumePreviewData} />
              </>
            )}

            {resumePreviewData.languages.length !== 0 && (
              <>
                <S.previewSectionTitle>
                  <h6>외국어</h6>
                </S.previewSectionTitle>
                <Languages resumePreviewData={resumePreviewData} />
              </>
            )}

            <PreviewSign name={resumePreviewData.name} />

            <PreviewNotice />
          </div>
        </S.ResumePreview>

        <StyledPrintButton onClick={() => reactToPrintFn()}>
          <Icon name="Print24x24" width="24px" height="24px" margin="0 8px 0 0" />
          <span>프린트</span>
        </StyledPrintButton>
      </StyledBackground>
    </Portal>
  );
}

const StyledBackground = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(171, 196, 234, 0.15));
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  z-index: 15;
  padding: 0 15px 150px 15px;
  overflow-y: auto;
  height: auto;
`;

const StyledPrintButton = styled.button`
  position: absolute;
  margin-top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.blue50};
  width: 150px;
  height: 50px;
  text-align: center;
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.black600};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPreviewHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .close-button {
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
`;

const S = {
  ResumePreview: styled.div`
    left: 50%;
    transform: translateX(-50%);
    max-width: 794px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    padding: 40px;
    position: relative;
    @media print {
      margin-top: 50px;
      box-shadow: none;
      background: white;
      size: A4;
    }
    ${(props) => props.theme.media.tablet`
      padding: 15px;
    `};
  `,
  previewSectionTitle: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.black700};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.black400};
    height: 45px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  `,
  ResumeNotice: styled.div`
    background-color: ${({ theme }) => theme.colors.gray100};
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
  `,
};
