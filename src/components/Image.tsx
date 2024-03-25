import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import type { TypeImage } from "@/hooks/useImageFallback";
import useImageFallback from "@/hooks/useImageFallback";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	type: TypeImage;
}
export default function Image({ src, alt, type, ...props }: ImageProps) {
	const { fallback } = useImageFallback(type);
	const imageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = fallback;
	};
	const imageLoaded = (event: SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = src;
	};

	return (
		<img
			{...props}
			src={fallback}
			alt={alt}
			onError={imageFallback}
			onLoad={imageLoaded}
		/>
	);
}
