import type { Config, DotLottie } from '@lottiefiles/dotlottie-web';

import { useDotLottie } from './use-dotlottie';
import { ComponentProps, JSX, Setter, createEffect, splitProps } from 'solid-js';

export type DotLottieSolidProps = Omit<Config, 'canvas'> &
	ComponentProps<'canvas'> &
	Partial<{
		autoResizeCanvas?: boolean;
		dotLottieRef: Setter<DotLottie | null>;
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
		'dotLottieRef',
		'autoResizeCanvas',
		'useFrameInterpolation',
	]);
	const { DotLottieComponent, dotLottie } = useDotLottie(dotLottieProps);

	createEffect(() => {
		dotLottieProps.dotLottieRef?.(dotLottie);
	}, [dotLottie]);

	return <DotLottieComponent {...restProps} />;
};
