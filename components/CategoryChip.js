import styled from "@emotion/styled";

const chipColorMap = new Map([
  ['red', '#ff000036']
])

const CategoryChip = styled.span`
  font-size : 0.7rem;
  margin : 0.1rem;
  padding : 0.2rem;
  border-radius : 5px;
  font-weight : 300;
  background-color : ${props => chipColorMap.get(props.color)};
`

export default CategoryChip