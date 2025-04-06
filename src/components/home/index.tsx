interface HomeProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  return <section className="relative min-h-full">{children}</section>;
}
