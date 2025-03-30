import React from 'react';

interface HelpSectionTitleProps {
  title: string;
}

export default React.memo(function HelpSectionTitle({ title }: HelpSectionTitleProps) {
  return (
    <div className="hidden h-[30px] w-full border-b-2 md:block md:h-[35px]">
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
  );
});
