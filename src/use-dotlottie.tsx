import type { Config } from '@lottiefiles/dotlottie-web';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { ComponentProps, JSX, createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { isServer } from 'solid-js/web';
import debounce from 'debounce';

interface DotLottieComponentProps {
	setCanvasRef: (el: HTMLCanvasElement) => void;
	setContainerRef: (el: HTMLDivElement) => void;
}

function DotLottieComponent({
	children,
	class: className,
	setCanvasRef,
	setContainerRef,
	style,
	...rest
}: DotLottieComponentProps & ComponentProps<'canvas'>) {
	const containerStyle = Object.assign(
		{
			width: '100%',
			height: '100%',
		},
		style,
	);

	return (
		<div ref={setContainerRef} class={className} {...{ style: containerStyle }}>
			<canvas
				ref={setCanvasRef}
				style={{
					width: '100%',
					height: '100%',
				}}
				{...rest}
			>
				{children}
			</canvas>
		</div>
	);
}

export type DotLottieConfig = Omit<Config, 'canvas'> &
	Partial<{
		autoResizeCanvas: boolean;
		playOnHover: boolean;
	}>;

export interface UseDotLottieReturn {
	DotLottieComponent: (props: DotLottieComponentProps & ComponentProps<'canvas'>) => JSX.Element;
	canvas: HTMLCanvasElement | null;
	container: HTMLDivElement | null;
	dotLottie: DotLottie | null;
	setCanvasRef: () => HTMLCanvasElement;
	setContainerRef: () => HTMLElement;
}

export const useDotLottie = (config?: DotLottieConfig) => {
	const [dotLottie, setDotLottie] = createSignal<DotLottie | null>(null);
	const [dotLottieRef, setDotLottieRef] = createSignal<DotLottie | null>(null);

	const configRef: DotLottieConfig | undefined = config;

	let canvasRef: HTMLCanvasElement | null = null;
	let containerRef: HTMLDivElement | null = null;

	createEffect(() => {
		setDotLottieRef(dotLottie());
	});

	const hoverHandler = (event: MouseEvent) => {
		if (!config?.playOnHover || !dotLottieRef()?.isLoaded) return;

		if (event.type === 'mouseenter') {
			dotLottieRef()?.play();
		} else if (event.type === 'mouseleave') {
			dotLottieRef()?.pause();
		}
	};

	const intersectionObserver = createMemo(() => {
		if (isServer) return null;

		const observerCallback = debounce((entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					dotLottieRef()?.unfreeze();
				} else {
					dotLottieRef()?.freeze();
				}
			});
		}, 150);

		return new IntersectionObserver(observerCallback, {
			threshold: 0,
		});
	}, []);

	const resizeObserver = createMemo(() => {
		if (isServer) return null;

		const observerCallback = debounce(() => {
			if (config?.autoResizeCanvas) {
				dotLottieRef()?.resize();
			}
		}, 150);

		return new ResizeObserver(observerCallback);
	}, []);

	const setCanvasRef = (canvas: HTMLCanvasElement | null) => {
		if (canvas) {
			const dotLottieInstance = new DotLottie({
				...config,
				canvas,
			});

			setDotLottie(dotLottieInstance);

			// check if canvas is initially in view
			const initialEntry = canvas.getBoundingClientRect();

			if (
				initialEntry.top >= 0 &&
				initialEntry.left >= 0 &&
				initialEntry.bottom <=
					(window.innerHeight || document.documentElement.clientHeight) &&
				initialEntry.right <= (window.innerWidth || document.documentElement.clientWidth)
			) {
				dotLottieRef()?.unfreeze();
			} else {
				dotLottieRef()?.freeze();
			}

			intersectionObserver()?.observe(canvas);
			if (config?.autoResizeCanvas) {
				resizeObserver()?.observe(canvas);
			}

			canvas.addEventListener('mouseenter', hoverHandler);
			canvas.addEventListener('mouseleave', hoverHandler);
		} else {
			dotLottieRef()?.destroy();
			intersectionObserver()?.disconnect();
			resizeObserver()?.disconnect();
		}

		canvasRef = canvas;
	};

	const setContainerRef = (container: HTMLDivElement | null) => {
		containerRef = container;
	};

	const Component = (props: ComponentProps<'canvas'>): JSX.Element => {
		return (
			<DotLottieComponent
				setContainerRef={setContainerRef}
				setCanvasRef={setCanvasRef}
				{...props}
			/>
		);
	};

	onCleanup(() => {
		dotLottie()?.destroy();
		setDotLottie(null);
		resizeObserver()?.disconnect();
		intersectionObserver()?.disconnect();
		canvasRef?.removeEventListener('mouseenter', hoverHandler);
		canvasRef?.removeEventListener('mouseleave', hoverHandler);
	});

	// Reactivities
	// speed
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.speed === 'number' &&
			config.speed !== dotLottie()?.speed &&
			dotLottie()?.isLoaded
		) {
			dotLottie()?.setSpeed(config.speed);
		}
	}, [config?.speed]);
	// mode
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.mode === 'string' &&
			config.mode !== dotLottie()?.mode &&
			dotLottie()?.isLoaded
		) {
			dotLottie()?.setMode(config.mode);
		}
	}, [config?.mode]);
	// loop
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.loop === 'boolean' &&
			config.loop !== dotLottie()?.loop &&
			dotLottie()?.isLoaded
		) {
			dotLottie()?.setLoop(config.loop);
		}
	}, [config?.loop]);
	// useFrameInterpolation
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.useFrameInterpolation === 'boolean' &&
			config.useFrameInterpolation !== dotLottie()?.useFrameInterpolation &&
			dotLottie()?.isLoaded
		) {
			dotLottie()?.setUseFrameInterpolation(config.useFrameInterpolation);
		}
	}, [config?.useFrameInterpolation]);
	// segment
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.segment === 'object' &&
			Array.isArray(config.segment) &&
			dotLottie()?.isLoaded
		) {
			const startFrame = config.segment[0];
			const endFrame = config.segment[1];

			dotLottie()?.setSegment(startFrame, endFrame);
		}
	}, [config?.segment]);
	// background color
	createEffect(() => {
		if (!dotLottie()) return;

		if (
			typeof config?.backgroundColor === 'string' &&
			config.backgroundColor !== dotLottie()?.backgroundColor &&
			dotLottie()?.isLoaded
		) {
			dotLottie()?.setBackgroundColor(config.backgroundColor);
		}
	}, [config?.backgroundColor]);
	// render config
	createEffect(() => {
		if (!dotLottie()) return;

		if (typeof config?.renderConfig === 'object') {
			dotLottie()?.setRenderConfig(config.renderConfig);
		}
	}, [config?.renderConfig]);
	// data
	createEffect(() => {
		if (!dotLottie()) return;

		if (typeof config?.data == 'string' || config?.data instanceof ArrayBuffer) {
			dotLottie()?.load({
				data: config.data,
				...(configRef || {}),
			});
		}
	}, [config?.data]);
	// src
	createEffect(() => {
		if (!dotLottie()) return;

		if (typeof config?.src === 'string') {
			dotLottie()?.load({
				src: config.src,
				...(configRef || {}),
			});
		}
	}, [config?.src]);
	// marker
	createEffect(() => {
		if (!dotLottie()) return;

		if (typeof config?.marker === 'string') {
			dotLottie()?.setMarker(config.marker);
		}
	}, [config?.marker]);
	// resizeObserver
	createEffect(() => {
		if (!resizeObserver()) return;

		if (config?.autoResizeCanvas && canvasRef) {
			resizeObserver()?.observe(canvasRef);
		} else {
			resizeObserver()?.disconnect();
		}
	}, [config?.autoResizeCanvas, resizeObserver]);

	return {
		dotLottie,
		setCanvasRef,
		setContainerRef,
		canvas: canvasRef,
		container: containerRef,
		DotLottieComponent: Component,
	};
};

export const setWasmUrl = (url: string): void => {
	DotLottie.setWasmUrl(url);
};
