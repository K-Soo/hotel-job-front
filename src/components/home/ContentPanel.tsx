interface ContentPanelProps {
  children: React.ReactNode;
}

export default function ContentPanel({ children }: ContentPanelProps) {
  return <article className="mx-auto max-w-[1024px] py-[35px]">{children}</article>;
}
