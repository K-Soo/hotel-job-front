import styled from 'styled-components';
import { EmployerBusinessForm } from '@/types';
import { businessNumberFormat, phoneNumberFormat } from '@/utils';
interface EmployerBusinessProps {
  data?: EmployerBusinessForm;
  children: React.ReactNode;
}

export default function EmployerBusiness({ data, children }: EmployerBusinessProps) {
  return (
    <S.EmployerBusiness>
      {children}
      {data && (
        <S.ContentContainer>
          <S.ContentTitle>사업자 정보</S.ContentTitle>
          <S.ContentForm>
            <S.Content>
              <p className="title">상호명</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.companyName}</p>
              </div>
            </S.Content>
            <S.Content>
              <p className="title">대표자명</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.businessOwner}</p>
              </div>
            </S.Content>
            <S.Content>
              <p className="title">사업자 등록번호</p>
              <div className="wrapper">
                <p className="wrapper__text">{businessNumberFormat(data.businessRegistrationNumber)}</p>
              </div>
            </S.Content>
            <S.Content>
              <p className="title">사업장 주소</p>
              <div className="wrapper">
                <p className="wrapper__text">
                  {data.address} {data.addressDetail}
                </p>
              </div>
            </S.Content>
          </S.ContentForm>

          <S.ContentTitle>
            <h6>담당자 정보</h6>
            {/* <Button label="수정" variant="primary" height="30px" width="70px" fontSize="14px" /> */}
          </S.ContentTitle>
          <S.ContentForm>
            <S.Content>
              <p className="title">담당자</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.managerName}</p>
              </div>
            </S.Content>
            <S.Content>
              <p className="title">담당자 연락처</p>
              <div className="wrapper">
                <p className="wrapper__text">{phoneNumberFormat(data.managerNumber)}</p>
              </div>
            </S.Content>
            <S.Content>
              <p className="title">담당자 이메일</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.managerEmail}</p>
              </div>
            </S.Content>
          </S.ContentForm>
        </S.ContentContainer>
      )}
    </S.EmployerBusiness>
  );
}

const S = {
  EmployerBusiness: styled.section``,
  ContentContainer: styled.div`
    max-width: 768px;
  `,
  ContentTitle: styled.div`
    font-size: 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 30px;
  `,
  ContentForm: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray600};
    margin-bottom: 50px;
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    height: 55px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 0 20px;
    font-size: 14px;
    .title {
      flex-basis: 140px;
      color: ${({ theme }) => theme.colors.black600};
    }
    .wrapper {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.black400};
      &__text {
        width: 100%;
      }
    }
  `,
};
