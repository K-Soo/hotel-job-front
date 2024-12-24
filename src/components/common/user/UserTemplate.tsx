import styled from 'styled-components';

interface UserTemplateProps {
  children: React.ReactNode;
}

export default function UserTemplate({ children }: UserTemplateProps) {
  return (
    <S.UserTemplate>
      {children}
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta, obcaecati in quam deserunt exercitationem ratione
          reiciendis eveniet quidem eligendi impedit quia cum repellat rerum sapiente a vero, nesciunt accusamus?
        </p>
      </div>
    </S.UserTemplate>
  );
}

const S = {
  UserTemplate: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    p {
      font-size: 44px;
    }
  `,
};
