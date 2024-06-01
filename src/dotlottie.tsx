import type { Config } from '@lottiefiles/dotlottie-web';

import { useDotLottie } from './use-dotlottie';
import { ComponentProps, JSX, splitProps } from 'solid-js';

export type DotLottieSolidProps = Omit<Config, 'canvas'> &
	ComponentProps<'canvas'> &
	Partial<{
		autoResizeCanvas?: boolean;
		playOnHover?: boolean;
	}>;

export const DotLottieSolid = (props: DotLottieSolidProps): JSX.Element => {
	const [dotLottieProps, restProps] = splitProps(props, [
		'src',
		'data',
		'mode',
		'loop',
		'speed',
		'marker',
		'segment',
		'autoplay',
		'playOnHover',
		'renderConfig',
		'autoResizeCanvas',
		'useFrameInterpolation',
	]);
	const { DotLottieComponent } = useDotLottie(dotLottieProps);

	return <DotLottieComponent {...restProps} />;
};
