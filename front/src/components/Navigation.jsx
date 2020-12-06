import styled from 'styled-components'
import Title from './Title'

const NavigationStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  color: white;
  background: none;
  padding: 5px;
  padding-left: 20px;
  align-items: center;
  display: flex;
  z-index: 100;
`;

function App() {
  return (
    <NavigationStyle>
      <Title text={'DUCK DUCK GOOSE'} />
    </NavigationStyle>
  );
}

export default App;
