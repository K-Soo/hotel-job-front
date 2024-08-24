import React from "react";

interface GuardComponentProps {
  children: React.ReactNode;
}

export default function GuardComponent({ children }: GuardComponentProps) {
  return <React.Fragment>{children}</React.Fragment>;
}
