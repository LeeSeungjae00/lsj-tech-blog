import styled from "@emotion/styled";

const chipColorMap = new Map([
  ['red', '#ff000036'],
  ['blue', '#0066ff36'],
  ['pink', '#ff00f336'],
  ['gray', '#00000036'],
  ['purple', '#ae00ff36'],
  ['default', '#8efff236'],
  ['orange', '#ff5d0036'],
  ['yellow', '#fff50036'],
  ['brown', '#a3390036'],
])

export default function CategoryChip({ color, children }) {
  return (
    <Chip color={color} className="dark:text-slate-200">{children}</Chip>
  )
}

const Chip = styled.span`
  font-size : 0.7rem;
  margin : 0.1rem;
  padding : 0.2rem;
  border-radius : 5px;
  font-weight : 500;
  background-color : ${props => chipColorMap.get(props.color)};
`
