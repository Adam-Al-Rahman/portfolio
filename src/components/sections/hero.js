import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';
import curimg from "../../images/hoverCursor.svg";

import { Link } from 'gatsby';
import Typewriter from 'typewriter-effect';

const StyledHeroSection = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap');

  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  .namex{
    font-family: 'Ruslan Display', cursive;
    color: #3523a9;
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    cursor: none;
    &:hover{
      cursor: url(${curimg}), auto;
    }
  }

  .blob {
    background: black;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    margin: 10px;
    height: 20px;
    width: 20px;
    transform: scale(1);
    animation: pulse-black 2s infinite;
  }

  @keyframes pulse-black {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }

  }

}
`;


const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <h1>
      <Typewriter
        options={{
          strings: ['Hi, my name is ', 'MAOH <html>&#65306</html>', 'Hi, my name is '],
          autoStart: true,
          // loop: true,
          pauseFor: 300000,
          deleteSpeed: 250,
          cursor: '&#9613',
        }}
      />
    </h1>
  );
  const two = <h2 className="big-heading namex">Atiq Ur-Rehaman.</h2>;
  const three = (
    <h3 className="big-heading">
      I solve problems.
      {/* <div className="blob" id="blob"></div> */}
    </h3>
  );
  const four = (
    <>
      <p>
        I’m a student at UPES. Currently pursuing bachelor's degree in computer science.
      </p>
    </>
  );
  const five = (
    <>
      <Link
        className="email-link"
        to="https://digital-gardenx.netlify.app/"
        // target="_blank"
        // rel="noreferrer"
      >
        Digital Garden
      </Link>
      {/* <span>&nbsp;</span>
      <Link
        className="email-link"
        id="terminal"
        to="/terminal"
      >
        Terminal
      </Link> */}
    </>
  );

  const items = [one, two, three, four, five];

  return (
    <>
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
    </>
  );
};

export default Hero;
