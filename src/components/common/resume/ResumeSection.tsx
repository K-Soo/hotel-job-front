import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
interface ResumeSectionProps {
  title: string;
  isRequired?: boolean;
  guide?: string;
  handleClickAdd?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  visibleAddButton?: boolean;
  name?: string;
}

export default function ResumeSection({
  title,
  isRequired,
  guide,
  handleClickAdd,
  children,
  name,
  visibleAddButton = true,
}: ResumeSectionProps) {
  return (
    <S.ResumeSection>
      <S.Header>
        <div className="left">
          <h2 className="left__title">{title}</h2>
          {isRequired && <span className="left__required">필수</span>}
        </div>
        {visibleAddButton && (
          <Button
            label="추가"
            variant="secondary"
            height="30px"
            width="70px"
            name={name}
            fontSize="13px"
            icon={<Icon name="Plus24x24" width="16px" height="16px" margin="0 2px 0 0" />}
            iconColor="e5e8eb"
            onClick={handleClickAdd}
          />
        )}
      </S.Header>
      {guide && <S.Guide>{guide}</S.Guide>}
      <S.Content>{children}</S.Content>
    </S.ResumeSection>
  );
}

const S = {
  ResumeSection: styled.section`
    margin-bottom: 50px;
  `,
  Header: styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray600};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    margin-bottom: 15px;
    .left {
      display: flex;
      align-items: center;
      &__title {
        font-size: 16px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.black300};
        user-select: none;
      }
      &__required {
        font-size: 13px;
        color: red;
        padding-left: 3px;
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
    }
  `,
  Content: styled.article`
    /* padding: 30px 0; */
  `,
  Guide: styled.p`
    padding: 10px;
    color: ${(props) => props.theme.colors.gray600};
    padding-top: 30px;
    text-align: center;
    font-size: 14px;
  `,
};
