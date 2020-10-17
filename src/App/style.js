import { css } from "@emotion/core";

export const appStyles = css`
  html {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  *:focus {
    outline: none;
  }

  body {
    --c-border-v: #ebeced;
    --c-brand: #388af7;
    --c-text-light: #979fab;
    --c-background: #fafcff;
    --font-family-base: Noto Sans KR;
    height: 100%;
    overflow-y: scroll;
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  h1 {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.09;
    text-align: center;
    margin: 0 0 27px;
  }

  p {
    font-size: 12px;
    line-height: 1.75;
    margin: 0;
  }
  button {
    border: none;
    font-weight: 500;
    transition: 0.2s ease-in-out;
    line-height: 1.31;
    font-size: 16px;
    :disabled {
      transition: 0.2s ease-in-out;
    }
  }
`;
