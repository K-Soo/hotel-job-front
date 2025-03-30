import React from 'react';
import styled from 'styled-components';
import * as svg from './svg';

export type IconType = keyof typeof svg;

export type IconProps = {
  name: IconType;
  className?: string;
  style?: React.CSSProperties | undefined;
  width?: string;
  height?: string;
  margin?: string;
  onClick?: any;
  cursor?: string;
  animate?: boolean;
  fill?: string;
  color?: string;
};

function Icon({ name, className, style, onClick, color }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
    color,
    onClick,
  });
}

export default styled(Icon)`
  width: ${(props) => (props.width ? props.width : '28px')};
  height: ${(props) => (props.height ? props.height : '28px')};
  margin: ${(props) => (props.margin ? props.margin : '0')};
  cursor: ${(props) => (props.cursor ? props.cursor : 'pointer')};
  svg {
    color: ${(props) => (props.color ? props.color : 'inherit')};
  }
`;
