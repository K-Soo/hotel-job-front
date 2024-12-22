import styled from 'styled-components';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import ResumeBottomController from '@/components/common/resume/ResumeBottomController';
import ResumeSection from '@/components/common/resume/ResumeSection';

interface AccountResumeRegisterProps {
  onSubmit: SubmitHandler<ResumeRegisterForm>;
  children?: React.ReactNode;
}

export default function AccountResumeRegister({ children }: AccountResumeRegisterProps) {
  const { handleSubmit } = useFormContext<ResumeRegisterForm>();

  return (
    <S.AccountResumeRegister>
      <article>
        <ResumeSection title="간단소개" />

        <ResumeSection title="학력" />

        <ResumeSection title="경력" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde enim iure sequi quia accusantium incidunt vitae ex iusto optio et,
          corporis expedita provident quidem mollitia sint repudiandae praesentium quisquam porro.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde enim iure sequi quia accusantium incidunt vitae ex iusto optio et,
          corporis expedita provident quidem mollitia sint repudiandae praesentium quisquam porro.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde enim iure sequi quia accusantium incidunt vitae ex iusto optio et,
          corporis expedita provident quidem mollitia sint repudiandae praesentium quisquam porro.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde enim iure sequi quia accusantium incidunt vitae ex iusto optio et,
          corporis expedita provident quidem mollitia sint repudiandae praesentium quisquam porro.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde enim iure sequi quia accusantium incidunt vitae ex iusto optio et,
          corporis expedita provident quidem mollitia sint repudiandae praesentium quisquam porro.
        </p>
      </article>
      {/* <aside className="menu">asd</aside> */}
      <ResumeBottomController />
    </S.AccountResumeRegister>
  );
}

const S = {
  AccountResumeRegister: styled.div`
    display: flex;
    article {
      flex: 1;
      font-size: 40px;
    }
    .menu {
      position: sticky;
      top: 80px;
      width: 250px;
      border: 1px solid red;
      height: 500px;
    }
  `,
};
