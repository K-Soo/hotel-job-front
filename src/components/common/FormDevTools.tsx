import dynamic from 'next/dynamic';
import { Control, FieldValues } from 'react-hook-form';
import Portal from '@/components/common/Portal';

const Devtool = dynamic<FieldValues>(() => import('@hookform/devtools').then((module) => module.DevTool), {
  ssr: false,
});

interface IFormDevTool {
  control?: Control<any, unknown>;
}

export default function FormDevTools({ control }: IFormDevTool) {
  if (!control) return null;

  return (
    <Portal>
      <Devtool control={control} />
    </Portal>
  );
}
