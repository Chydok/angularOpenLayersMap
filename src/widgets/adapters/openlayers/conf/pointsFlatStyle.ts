import { FlatStyleLike } from "ol/style/flat";

const rZoom2 = 156543.03392 / Math.pow(2, 2);
const rZoom8 = 156543.03392 / Math.pow(2, 8);
const rZoom14 = 156543.03392 / Math.pow(2, 14);

const scaleMultiplierExpression = [
	"interpolate",
	["linear"],
	["resolution"],

	rZoom14,
	3.0,

	rZoom8,
	0.8,

	rZoom2,
	0.15,
];

const radius1Expression = ["*", ["coalesce", ["get", "size"], 4], scaleMultiplierExpression];
const radiusInExpression = [
	"*",
	["/", ["coalesce", ["get", "sizeIn"], 4], 2],
	scaleMultiplierExpression,
];
const iconScaleExpression = [
	"*",
	["/", ["coalesce", ["get", "size"], 50], ["coalesce", ["get", "customScale"], 400]],
	scaleMultiplierExpression,
];

const commonShapeStyles = {
	"shape-fill-color": ["coalesce", ["get", "fill"], "#000000"],
	"shape-stroke-color": ["coalesce", ["get", "strokeColor"], "#000000"],
	"shape-stroke-width": ["coalesce", ["get", "strokeWidth"], 1],
};

export const flatPointStyle: FlatStyleLike = [
	// square
	{
		filter: [
			"all",
			["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
			["==", ["get", "type"], "square"],
		],
		style: {
			"shape-points": 4,
			"shape-radius": radius1Expression,
			"shape-angle": Math.PI / 4,
			...commonShapeStyles,
		},
	},
	// Rectangle
	{
		filter: [
			"all",
			["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
			["==", ["get", "type"], "rectangle"],
		],
		style: {
			"shape-points": 4,
			"shape-radius": ["/", radius1Expression, Math.SQRT2],
			"shape-radius2": radius1Expression,
			"shape-angle": 0,
			"shape-scale": [1, 0.5],
			...commonShapeStyles,
		},
	},
	// Triangle
	{
		filter: [
			"all",
			["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
			["==", ["get", "type"], "triangle"],
		],
		style: {
			"shape-points": 3,
			"shape-radius": radius1Expression,
			"shape-angle": 0,
			...commonShapeStyles,
		},
	},
	// Star
	{
		filter: [
			"all",
			["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
			["==", ["get", "type"], "star"],
		],
		style: {
			"shape-points": 5,
			"shape-radius": radius1Expression,
			"shape-radius2": radiusInExpression,
			"shape-angle": 0,
			...commonShapeStyles,
		},
	},
	// Иконки
	{
		filter: [
			"all",
			["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
			["==", ["get", "type"], "icon"],
			["has", "customIconSrc"],
		],
		style: {
			"icon-src": "placeholder",
			"icon-scale": iconScaleExpression,
			"icon-anchor": ["get", "customAnchor"],
		},
	},
	// Круг (значение по умолчанию)
	{
		filter: ["in", ["geometry-type"], ["literal", ["Point", "MultiPoint"]]],
		else: true,
		style: {
			"circle-radius": radius1Expression,
			"circle-fill-color": ["coalesce", ["get", "fill"], "#000000"],
			"circle-stroke-color": ["coalesce", ["get", "strokeColor"], "#000000"],
			"circle-stroke-width": ["coalesce", ["get", "strokeWidth"], 1],
		},
	},

	// Полигоны и линии
	{
		filter: [
			"in",
			["geometry-type"],
			["literal", ["LineString", "MultiLineString", "Polygon", "MultiPolygon"]],
		],
		style: {
			"fill-color": ["coalesce", ["get", "fillColor"], "rgba(255,255,255,0.1)"],
			"stroke-color": ["coalesce", ["get", "strokeColor"], "#000000"],
			"stroke-width": ["coalesce", ["get", "strokeWidth"], 1],
		},
	},
];