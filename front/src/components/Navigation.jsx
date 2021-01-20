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
  background: white;
`;

function App() {
  return (
    <NavigationStyle>
      <Title text={'GOOD GOOD GOOD BANNER'} />
    </NavigationStyle>
  );
}

export default App;
