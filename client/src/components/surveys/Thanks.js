import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import happyFeedback from '../../img/thankyou-yes.webp';

function renderYesLayout() {
  return (
    <StyledRenderLayout>
      <h1>We appreciate your feedback, it helps improve our services</h1>
      <img src={happyFeedback} alt='' />
    </StyledRenderLayout>
  );
}

function renderNoLayout() {
  return (
    <StyledRenderLayout>
      <h1>
        We’re so sorry that your experience did not match your expectations.
        This is on us.
      </h1>
      <img src={happyFeedback} alt='' />
    </StyledRenderLayout>
  );
}

function Thanks() {
  const { choice } = useParams();
  return (
    <StyledThanksContainer>
      {choice === 'no' ? renderNoLayout() : renderYesLayout()}
    </StyledThanksContainer>
  );
}

export default Thanks;

const StyledThanksContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: #dd4a48;
    padding: 1rem;
    border-bottom: 1px dashed rgba(59, 63, 66, 0.8);
  }
`;

const StyledRenderLayout = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
