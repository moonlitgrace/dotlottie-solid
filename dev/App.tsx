import type { Component } from 'solid-js';
import { DotLottieSolid } from 'src';

const animations = [
	'https://lottie.host/f315768c-a29b-41fd-b5a8-a1c1dfb36cd2/CRiiNg8fqQ.lottie',
	'https://lottie.host/647eb023-6040-4b60-a275-e2546994dd7f/zDCfp5lhLe.json',
];

const App: Component = () => {
	return <DotLottieSolid src={animations[1]} autoplay loop />;
};

export default App;
