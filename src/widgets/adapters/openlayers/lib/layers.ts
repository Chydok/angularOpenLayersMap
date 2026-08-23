import WebGLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { flatPointStyle } from "../conf/pointsFlatStyle";
import { Feature } from "ol";
import { Icon } from "ol/style";

type TVectorLayerOptions = ConstructorParameters<typeof WebGLVectorLayer>[0];

export const addVectorLayerOl = (options?: TVectorLayerOptions) => {
	const vectorSource = new VectorSource({
		features: [],
	});

	const helperLayer = new WebGLVectorLayer({ style: flatPointStyle });
	const compiledStyleFunction = helperLayer.getStyleFunction();

	return new WebGLVectorLayer({
		source: vectorSource,
		style: (featureLike, resolution) => {
			if (!(featureLike instanceof Feature)) {
				return compiledStyleFunction?.(featureLike, resolution);
			}

			const feature = featureLike as Feature;
			const styles = compiledStyleFunction?.(feature, resolution);
			if (feature.get("type") !== "icon") return styles;

			if (!styles || (Array.isArray(styles) && styles.length === 0)) {
				return styles;
			}
			const styleArray = Array.isArray(styles) ? styles : [styles];

			const preparedImage = feature.get("customPreprocessedImage");
			if (preparedImage) {
				styleArray.forEach((style) => {
					const originalIcon = style.getImage();
					if (originalIcon && originalIcon instanceof Icon) {
						const mergedIcon = new Icon({
							img: preparedImage.getImage(),
							scale: originalIcon.getScale(),
							rotation: originalIcon.getRotation(),
							opacity: originalIcon.getOpacity(),
						});

						style.setImage(mergedIcon);
					}
				});
				return styleArray;
			}
			return styleArray;
		},
		updateWhileAnimating: false,
		updateWhileInteracting: false,
		...options,
	});
};
