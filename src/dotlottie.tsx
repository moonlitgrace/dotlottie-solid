import type { DotLottie, Config } from '@lottiefiles/dotlottie-web';

import { useDotLottie } from './use-dotlottie';
import { ComponentProps, JSX } from 'solid-js';

export type DotLottieSolidProps = Omit<Config, 'canvas'> &
  	ComponentProps<'canvas'> & Partial<{
    	autoResizeCanvas?: boolean;
    	playOnHover?: boolean;
  	}>;

export const DotLottieSolid = ({
	src,
	loop,
	data,
	mode,
	speed,
	marker,
	segment,
	autoplay,
	playOnHover,
	renderConfig,
	backgroundColor,
	useFrameInterpolation,
	autoResizeCanvas = true,
	...props
}: DotLottieSolidProps): JSX.Element => {
	const { DotLottieComponent, dotLottie } = useDotLottie({
		src,
		data,
		mode,
		loop,
		speed,
		marker,
		segment,
		autoplay,
		playOnHover,
		renderConfig,
		backgroundColor,
		autoResizeCanvas,
		useFrameInterpolation,
	});

	return <DotLottieComponent {...props} />
};
