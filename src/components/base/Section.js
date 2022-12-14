import styled from 'styled-components'

const Section = styled.div`
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'second' : 'background']};
`

Section.Content = styled.div`
  display: ${(props) => (props.flex ? 'flex' : 'block')};
  justify-content: space-between;
  gap: 1rem;
  width: 56rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0.75rem;

  ${(props) => props.theme.mq.medium} {
    width: 100vw;
    padding: 0 0.25rem;
  }
`

export default Section
