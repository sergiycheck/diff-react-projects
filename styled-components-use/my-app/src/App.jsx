
import './App.css';
import styled from 'styled-components';

function App() {
  const Title = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    color: palevioletred;
  `;
  const Wrapper = styled.section`
    padding: 4rem;
    background: papayawhip;
    width: 80%;
    margin: 0 auto;
  `;


  return (
    <div className="App">
      <Wrapper>
        <Title>
          my title is here
        </Title>
      </Wrapper>
    </div>
  );
}

export default App;
