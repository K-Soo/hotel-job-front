import styled from 'styled-components';
import { ResumeDetail, ResumeDetailForm } from '@/types';
import { dateFormat } from '@/utils';
import { ALL_JOBS } from '@/constants/job';
import { POSITION } from '@/constants';

interface ExperienceProps {
  resumePreviewData: ResumeDetail & ResumeDetailForm;
}

export default function Experience({ resumePreviewData }: ExperienceProps) {
  const { experience } = resumePreviewData;

  return (
    <S.Experience>
      {experience.map((experience, index) => (
        <S.ExperienceItem key={index}>
          <S.DateBox>
            <div>
              <span>{dateFormat.date(experience.startDate, 'YYYY.MM.DD')}</span>
              <span>&nbsp;~&nbsp;</span>
              {!experience.isEmployed && <span>{dateFormat.date(experience.endDate, 'YYYY.MM.DD')}</span>}
              {experience.isEmployed && <span>재직중</span>}
            </div>
            <div className="total-date">1년 2개월</div>
          </S.DateBox>

          <S.ContentBox>
            <div className="info">
              <h6 className="info__company">{experience.companyName}</h6>
              <span>{ALL_JOBS[experience.job]}</span>
              {experience.position && <span className="info__position">{POSITION[experience.position]}</span>}
            </div>
            {/* 업무 */}
            {experience.responsibility && <p className="responsibility">{experience.responsibility}</p>}
            {/* 퇴사사유 */}
            {experience.reasonForLeaving && (
              <div className="other">
                <dl className="other__reason">
                  <dt className="other__reason--title">퇴사사유</dt>
                  <dd className="other__reason--text">{experience.reasonForLeaving}</dd>
                </dl>
              </div>
            )}
          </S.ContentBox>
        </S.ExperienceItem>
      ))}
    </S.Experience>
  );
}

const S = {
  Experience: styled.div`
    margin-bottom: 80px;
  `,
  ExperienceItem: styled.div`
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    ${(props) => props.theme.media.tablet`
    flex-direction: column;
  `};
  `,
  DateBox: styled.div`
    font-size: 14px;
    flex-basis: 200px;
    .total-date {
      font-size: 13px;
      margin-top: 5px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.gray600};
      ${(props) => props.theme.media.tablet`
      margin-top: 0;
      padding-left: 10px;
    `};
    }
    ${(props) => props.theme.media.tablet`
    margin-bottom: 5px;
    flex-basis: auto;
    display: flex;
    align-items: center;
  `};
  `,
  ContentBox: styled.div`
    flex: 1;
    .info {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: ${(props) => props.theme.colors.black800};
      &__company {
        color: ${(props) => props.theme.colors.black200};
        font-size: 16px;
        font-weight: 600;
        margin-right: 10px;
      }
      &__position {
        &::before {
          content: '·';
          margin: 0 5px;
        }
      }
    }
    .responsibility {
      margin-top: 8px;
      font-size: 15px;
      line-height: 1.3;
      color: ${(props) => props.theme.colors.black400};
      ${(props) => props.theme.media.tablet`
        font-size: 14px;
      `};
    }
    .other {
      margin-top: 15px;
      font-size: 15px;
      color: ${(props) => props.theme.colors.black400};
      &__reason {
        display: flex;
        align-items: center;
        font-size: 14px;
        &--title {
          margin-right: 10px;
          color: ${(props) => props.theme.colors.black800};
        }
        &--text {
          color: ${(props) => props.theme.colors.black200};
        }
      }
    }
  `,
};
