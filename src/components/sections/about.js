import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

//tooltip
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 50%;
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;
      border-radius: 50%;

      &:after {
        top: 0px;
        left: 0px;
        border-radius: 50%;
      }

      .img {
        filter: none;
        border-radius: 50%;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      border-radius: 50%;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      box-shadow: 2px;
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      border-radius: 50%;
      top: 10px;
      left: 10px;
      z-index: -1;
    }
  }

  .intro {
    font-family: var(--font-mono);
    color: var(--green);
  }
`;

const Trans = styled.div`
  .defaultX{
    font-family : var(--font-mono);
    font-size: 12px;
    line-height: 30px;
  }

  .transcoder{
  }

}
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const JSXContent = () => (
    <Tippy
      content={
        <Trans>
          <div className="transcoder">
            <p className="defaultX">
              <p>TransCoder</p>
              <a href="https://en.wikipedia.org/wiki/Lojban" target="_blank" rel="noreferrer">
                Lojban
              </a>{' '}
              : coi, mi'e
              <br></br>
              English : Hello, my name is
            </p>
          </div>
        </Trans>
      }
      interactive={true}
      interactiveBorder={20}
      delay={100}>
      <span className="intro">coi, mi'e</span>
    </Tippy>
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Tensorflow',
    'C++',
    'Keras',
    'Docker',
    'MongoDB',
    'Git',
    'Typescript',
    'GraphQl',
    'Nextjs',
    'Tailwindcss',
    'mdx',
    'Rust-Lang',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              <JSXContent /> <span>Atiq</span> and I enjoy reading, researching &amp; creating
              things. My interest in coding started, when I heard python programming language in one
              of a physics videos.
            </p>
            <p>
              Fast-forward to today, and I’ve the privilege to study in one of the well known
              college in India{' '}
              <a href="https://www.upes.ac.in/about-us">
                <Tippy content="University of Petroleum and Energy Studies">
                  <span>UPES</span>
                </Tippy>
              </a>{' '}
              located at Dehradun.
            </p>

            <p>Right now, I'm pursuing my bachelor degree in computer science.</p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
