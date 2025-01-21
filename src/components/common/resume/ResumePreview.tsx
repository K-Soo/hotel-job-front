import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { ResumeDetail } from '@/types';
import Icon from '@/icons/Icon';
import { CAREER_LEVEL } from '@/constants/resume';
import { EDUCATION_LEVEL } from '@/constants';
import Line from '@/components/common/Line';
import { parseBirthDateAndCalculateAge } from '@/utils';

interface ResumePreviewProps {
  resumePreviewData: ResumeDetail | null;
  closeResume: () => void;
}

export default function ResumePreview({ resumePreviewData, closeResume }: ResumePreviewProps) {
  console.log('resumePreviewData: ', resumePreviewData);
  const { birthYear, age } = parseBirthDateAndCalculateAge(resumePreviewData?.birthday ?? '');

  return (
    <Portal>
      <Background>
        <S.ResumePreview>
          <S.PreviewContainer>
            <Icon className="close-icon" name="Close25x25" onClick={closeResume} />
            <div className="wrapper">
              <S.DateBox>
                <span>{resumePreviewData?.createdAt}</span>
              </S.DateBox>

              {/* 프로필*/}
              <S.Profile>
                <div>
                  <div className="name-box">
                    <span className="name-box__name">{resumePreviewData?.name}</span>
                    <span className="name-box__career">{CAREER_LEVEL[resumePreviewData?.careerLevel]}</span>
                  </div>

                  <div className="age-box">
                    <span>{birthYear}</span>
                    <span>{age}세</span>
                  </div>

                  <div className="contact-box">
                    <div className="contact-box__item">
                      <span className="contact-box__item--title">이메일</span>
                      <p>{resumePreviewData?.email}</p>
                    </div>
                    <div className="contact-box__item">
                      <span className="contact-box__item--title">연락처</span>
                      <p>{resumePreviewData?.phone}</p>
                    </div>
                    <div className="contact-box__item">
                      <span className="contact-box__item--title">주소</span>
                      <p>{resumePreviewData?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="profile-image">이미지</div>
              </S.Profile>
              <Line color="#e5e8eb" />

              {/* 상단 섹션*/}
              <S.Dashboard>
                <div className="item">
                  <h6 className="item__title">경력</h6>
                </div>
                <div className="item">
                  <h6 className="item__title">학력</h6>
                  <p>{EDUCATION_LEVEL[resumePreviewData?.education]}</p>
                </div>
                <div className="item">
                  <h6 className="item__title">희망급여</h6>
                </div>
              </S.Dashboard>

              {/* 간단 자기소개 */}
              <S.SummaryIntroduce>
                <h6 className="title">간략 소개</h6>
                <p className="text">
                  안녕하세요! 저는 신입 개발자 홍정우라고 합니다. 저는 TypeScript, React, JavaScript, Next.js 등 다양한 기술을 보유하고
                  있습니다. 친구들과 웹 개발 프로젝트를 프론트엔드 파트로써 수 차례 경험해보았으며, 능동적이고 열정적으로 업무에 임합니다.
                  주어진 일에 최선을 다하며 끊임없이 발전하기를 추구합니다! 저는 항상 열린 마음으로 새로운 것을 배우고 발전해 나가는 모습을
                  보여줄 것이며, 빠른 응용력과 문제해결능력으로 일에 헌신할 것입니다. 꾸준한 프로젝트 경험으로 인해 협업의 중요성을 뼈저리게
                  느꼈으며, 혼자서 노력하는 것보다 모두와 힘을 합쳐 노력하는 것이 최선의 결과를 도출해 냄을 알고 있습니다. 뽑아주신다면
                  열심히 노력해 회사를 빛낼 인재가 되겠습니다!
                </p>
                {/* <p>{resumePreviewData?.summary}</p> */}
              </S.SummaryIntroduce>

              <S.Education>
                <div className="header">
                  <h6 className="header__title">학력</h6>
                </div>
                <div className="content"></div>
              </S.Education>

              {/* 경력 */}
              {resumePreviewData?.experience.length === 0 && (
                <S.Experience>
                  <div className="header">
                    <h6 className="header__title">경력</h6>
                  </div>
                  <div className="content">
                    {/* {resumePreviewData?.experience.map((item) => (
                    <div>
                      <div>{item.companyName}</div>
                    </div>
                  ))} */}
                  </div>
                </S.Experience>
              )}

              <S.Document>
                <div className="header">
                  <h6 className="header__title">기타문서</h6>
                </div>
                <div className="content"></div>
              </S.Document>
            </div>
          </S.PreviewContainer>
        </S.ResumePreview>
      </Background>
    </Portal>
  );
}

const S = {
  ResumePreview: styled.div`
    position: fixed;
    left: 50%;
    height: 100vh;
    width: 100%;
    transform: translateX(-50%);
    background-color: red;
  `,
  PreviewContainer: styled.div`
    height: 100%;
    background-color: white;
    position: relative;
    overflow-y: auto;
    .close-icon {
      position: fixed;
      top: 15px;
      right: 30px;
      cursor: pointer;
    }
    .wrapper {
      padding: 60px 15px 0 15px;
      margin: 0 auto;
      max-width: 768px;
    }
  `,
  DateBox: styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    margin-bottom: 15px;
  `,
  Profile: styled.div`
    display: flex;
    .profile-image {
      width: 130px;
      height: 150px;
      border: 1px solid ${(props) => props.theme.colors.gray200};
    }
    .name-box {
      /* margin-bottom: 5px; */
      display: flex;
      align-items: center;
      &__name {
        font-size: 24px;
        font-weight: 600;
        padding-right: 5px;
      }
      &__career {
        background-color: red;
        padding: 2px 8px;
        border-radius: 15px;
        color: ${(props) => props.theme.colors.white};
        background-color: ${(props) => props.theme.colors.black400};
      }
    }
    .age-box {
      color: ${(props) => props.theme.colors.gray700};
      font-weight: 400;
      font-size: 15px;
    }
    .contact-box {
      &__item {
        display: flex;
        font-size: 14px;
        padding: 5px 0;
        &--title {
          color: ${(props) => props.theme.colors.gray500};
          padding-right: 10px;
          width: 60px;
        }
      }
    }
  `,
  Dashboard: styled.div`
    display: flex;
    height: 110px;
    gap: 15px;
    .item {
      flex: 1;
      border: 1px solid ${(props) => props.theme.colors.gray200};
      border-radius: 15px;
      padding: 15px;
      max-width: 200px;
      &__title {
        margin-bottom: 15px;
        font-size: 14px;
      }
    }
  `,
  // 간략소개
  SummaryIntroduce: styled.div`
    margin: 50px 0;
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .text {
      line-height: 1.3;
      font-size: 15px;
    }
  `,
  // 학력
  Education: styled.div`
    margin: 50px 0;
    border-top: 1px solid ${(props) => props.theme.colors.gray400};
    .header {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
      &__title {
        font-size: 18px;
        font-weight: 500;
      }
    }
  `,
  // 경력
  Experience: styled.div`
    margin: 50px 0;
    border-top: 1px solid ${(props) => props.theme.colors.gray400};
    .header {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
      &__title {
        font-size: 18px;
        font-weight: 500;
      }
    }
  `,
  Document: styled.div`
    margin: 50px 0;
    border-top: 1px solid ${(props) => props.theme.colors.gray400};
    .header {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
      &__title {
        font-size: 18px;
        font-weight: 500;
      }
    }
  `,
};
