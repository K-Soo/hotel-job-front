import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';

import dynamic from 'next/dynamic';
const DynamicReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
interface FormEditorProps<T> {
  name: Path<T>;
  placeholder?: string;
}

const toolbarOptions = [[{ header: [2, 3, 4, false] }], ['bold', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]];

export default function FormEditor<T extends FieldValues>({ name, placeholder }: FormEditorProps<T>) {
  const quillRef = React.useRef<ReactQuill>(null);

  const { watch, setValue } = useFormContext();
  const watchValue = watch(name);

  const modules = React.useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  const handleChange = (value: string) => {
    setValue(name, value as any);
  };

  return (
    <S.FormEditor>
      <DynamicReactQuill modules={modules} theme="snow" onChange={handleChange} placeholder={placeholder} value={watchValue} />
    </S.FormEditor>
  );
}

const S = {
  FormEditor: styled.div`
    .quill {
      .ql-editor {
        overflow: auto;
        min-height: 300px;
        max-height: 700px;
        padding: 20px;
        ul,
        ol {
          margin: 0;
          padding: 0;
          list-style-position: inside;
        }
        strong {
          font-weight: bold;
        }
        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  `,
};
