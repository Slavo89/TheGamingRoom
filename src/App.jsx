import { useState } from 'react';
import './App.scss';
import Header from './components/Layout/Header';
import MainSection from './components/Layout/MainSection';
import Backdrop from './components/UI/Backdrop';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleBackdrop = () => {
    setIsOpen(!isOpen)
  }

	return (
		<>
			<Header onClick={toggleBackdrop} />
			<MainSection onClick={toggleBackdrop}></MainSection>
			{isOpen && <Backdrop />}
		</>
	);
}

export default App;
