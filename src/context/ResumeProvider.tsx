import React from 'react';
import { ResumeStatusKey } from '@/types';
import { createContext, useContext } from 'react';

interface ResumeContextProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  resumeStatus: ResumeStatusKey;
  isContextLoading: boolean;
  setResumeStatus: (status: ResumeStatusKey) => void;
  setIsContextLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeStatus, setResumeStatus] = React.useState<ResumeStatusKey>('DRAFT');
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isContextLoading, setIsContextLoading] = React.useState<boolean>(true);

  return (
    <ResumeContext.Provider value={{ isEditing, setIsEditing, resumeStatus, setResumeStatus, isContextLoading, setIsContextLoading }}>
      {children}
    </ResumeContext.Provider>
  );
}
