import React from 'react'
import styled from 'styled-components'
import { Range, getTrackBackground } from 'react-range'

import { getRealHoursFromDecimalHours } from 'utils/formatters'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 1.25rem;
  margin-bottom: 0.5rem;
`
const Tick = styled.div`
  font-size: 0.75rem;
`
const Track = styled.div`
  position: relative;
  width: 100%;
  height: 1rem;
  margin: 0 ${(props) => (props.large ? 1.75 : 1)}rem;
  &:before {
    content: '';
    height: 0.2rem;
    position: absolute;
    top: 0.4rem;
    bottom: 0;
    left: ${(props) => (props.large ? -1.75 : -1)}rem;
    right: ${(props) => (props.large ? -1.75 : -1)}rem;
    background: ${(props) => props.background};
  }
`
const NumberThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.large ? 4 : 2.75)}rem;
  height: 1.5rem;
  padding: 0.5rem;
  font-size: ${(props) => (props.large ? 0.875 : 0.75)}rem;
  color: ${(props) => props.theme.colors[props.peak ? 'error' : 'main']};
  background-color: ${(props) => props.color || props.theme.colors.background};
  border-radius: 0.5rem;
`
const Thumb = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color || props.theme.colors.background};
  border-radius: 1rem;
`

export default function Slider(props) {
  const thumbs = [props.start, props.start + props.duration]
  return (
    <Wrapper className={props.className} large={props.large}>
      <Tick>0h</Tick>
      <Range
        draggableTrack
        step={0.5}
        min={0}
        max={24}
        values={thumbs}
        onChange={props.onChange}
        renderTrack={({ props, children }) => (
          <Track
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            background={getTrackBackground({
              values: thumbs,
              colors: [
                'rgba(255, 255, 255, 0.5)',
                'rgba(255, 255, 255)',
                'rgba(255, 255, 255, 0.5)',
              ],
              min: 0,
              max: 24,
            })}
            {...props}
          >
            {children}
          </Track>
        )}
        renderThumb={({ index, props: anotherProps }) => (
          <NumberThumb
            {...anotherProps}
            color={props.color}
            large={props.large}
            aria-label={props.ariaLabel}
            peak={props.peak}
          >
            {getRealHoursFromDecimalHours(thumbs[index])}
          </NumberThumb>
        )}
      />
      <Tick>{props.large ? 'Minuit' : '24h'}</Tick>
    </Wrapper>
  )
}
