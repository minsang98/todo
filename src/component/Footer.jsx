import React, { memo } from "react";
import styled from "styled-components";
const FooterComponent = styled.div`
  padding: 1.5rem;
  font-size: 0.8rem;
`;
function Footer() {
  return <FooterComponent>My Todo List</FooterComponent>;
}

export default memo(Footer);
