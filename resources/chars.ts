interface CodePointDescription {
	codePoint: number;
	// name: string;
}

type LineType =
	| 'light'
	| 'heavy'
	| 'double'
	| 'light2Dash'
	| 'heavy2Dash'
	| 'light3Dash'
	| 'heavy3Dash'
	| 'light4Dash'
	| 'heavy4Dash';

type Line = BasicLine | DiagonalLine;

interface BasicLine extends CodePointDescription {
	up?: LineType;
	down?: LineType;
	left?: LineType;
	right?: LineType;
	arced?: boolean;
	forward?: undefined;
	backward?: undefined;
}

interface DiagonalLine extends CodePointDescription {
	forward: boolean;
	backward: boolean;
}

const charNames: Line[] = [
	{ codePoint: 0x20 },
	{ codePoint: 0x20, forward: false, backward: false },
	{ codePoint: 0x2500, left: 'light', right: 'light' },
	{ codePoint: 0x2501, left: 'heavy', right: 'heavy' },
	{ codePoint: 0x2502, up: 'light', down: 'light' },
	{ codePoint: 0x2503, up: 'heavy', down: 'heavy' },
	{ codePoint: 0x2504, left: 'light3Dash', right: 'light3Dash' },
	{ codePoint: 0x2505, left: 'heavy3Dash', right: 'heavy3Dash' },
	{ codePoint: 0x2506, up: 'light3Dash', down: 'light3Dash' },
	{ codePoint: 0x2507, up: 'heavy3Dash', down: 'heavy3Dash' },
	{ codePoint: 0x2508, left: 'light4Dash', right: 'light4Dash' },
	{ codePoint: 0x2509, left: 'heavy4Dash', right: 'heavy4Dash' },
	{ codePoint: 0x250A, up: 'light4Dash', down: 'light4Dash' },
	{ codePoint: 0x250B, up: 'heavy4Dash', down: 'heavy4Dash' },
	{ codePoint: 0x250C, down: 'light', right: 'light', arced: false },
	{ codePoint: 0x250D, down: 'light', right: 'heavy' },
	{ codePoint: 0x250E, down: 'heavy', right: 'light' },
	{ codePoint: 0x250F, down: 'heavy', right: 'heavy' },
	{ codePoint: 0x2510, down: 'light', left: 'light', arced: false },
	{ codePoint: 0x2511, down: 'light', left: 'heavy' },
	{ codePoint: 0x2512, down: 'heavy', left: 'light' },
	{ codePoint: 0x2513, down: 'heavy', left: 'heavy' },
	{ codePoint: 0x2514, up: 'light', right: 'light', arced: false },
	{ codePoint: 0x2515, up: 'light', right: 'heavy' },
	{ codePoint: 0x2516, up: 'heavy', right: 'light' },
	{ codePoint: 0x2517, up: 'heavy', right: 'heavy' },
	{ codePoint: 0x2518, up: 'light', left: 'light', arced: false },
	{ codePoint: 0x2519, up: 'light', left: 'heavy' },
	{ codePoint: 0x251A, up: 'heavy', left: 'light' },
	{ codePoint: 0x251B, up: 'heavy', left: 'heavy' },
	{ codePoint: 0x251C, up: 'light', down: 'light', right: 'light' },
	{ codePoint: 0x251D, up: 'light', down: 'light', right: 'heavy' },
	{ codePoint: 0x251E, up: 'heavy', down: 'light', right: 'light' },
	{ codePoint: 0x251F, up: 'light', down: 'heavy', right: 'light' },
	{ codePoint: 0x2520, up: 'heavy', down: 'heavy', right: 'light' },
	{ codePoint: 0x2521, up: 'heavy', down: 'light', right: 'heavy' },
	{ codePoint: 0x2522, up: 'light', down: 'heavy', right: 'heavy' },
	{ codePoint: 0x2523, up: 'heavy', down: 'heavy', right: 'heavy' },
	{ codePoint: 0x2524, up: 'light', down: 'light', left: 'light' },
	{ codePoint: 0x2525, up: 'light', down: 'light', left: 'heavy' },
	{ codePoint: 0x2526, up: 'heavy', down: 'light', left: 'light' },
	{ codePoint: 0x2527, up: 'light', down: 'heavy', left: 'light' },
	{ codePoint: 0x2528, up: 'heavy', down: 'heavy', left: 'light' },
	{ codePoint: 0x2529, up: 'heavy', down: 'light', left: 'heavy' },
	{ codePoint: 0x252A, up: 'light', down: 'heavy', left: 'heavy' },
	{ codePoint: 0x252B, up: 'heavy', down: 'heavy', left: 'heavy' },
	{ codePoint: 0x252C, left: 'light', right: 'light', down: 'light' },
	{ codePoint: 0x252D, left: 'heavy', right: 'light', down: 'light' },
	{ codePoint: 0x252E, left: 'light', right: 'heavy', down: 'light' },
	{ codePoint: 0x252F, left: 'heavy', right: 'heavy', down: 'light' },
	{ codePoint: 0x2530, left: 'light', right: 'light', down: 'heavy' },
	{ codePoint: 0x2531, left: 'heavy', right: 'light', down: 'heavy' },
	{ codePoint: 0x2532, left: 'light', right: 'heavy', down: 'heavy' },
	{ codePoint: 0x2533, left: 'heavy', right: 'heavy', down: 'heavy' },
	{ codePoint: 0x2534, left: 'light', right: 'light', up: 'light' },
	{ codePoint: 0x2535, left: 'heavy', right: 'light', up: 'light' },
	{ codePoint: 0x2536, left: 'light', right: 'heavy', up: 'light' },
	{ codePoint: 0x2537, left: 'heavy', right: 'heavy', up: 'light' },
	{ codePoint: 0x2538, left: 'light', right: 'light', up: 'heavy' },
	{ codePoint: 0x2539, left: 'heavy', right: 'light', up: 'heavy' },
	{ codePoint: 0x253A, left: 'light', right: 'heavy', up: 'heavy' },
	{ codePoint: 0x253B, left: 'heavy', right: 'heavy', up: 'heavy' },
	{ codePoint: 0x253C, left: 'light', right: 'light', up: 'light', down: 'light' },
	{ codePoint: 0x253D, left: 'heavy', right: 'light', up: 'light', down: 'light' },
	{ codePoint: 0x253E, left: 'light', right: 'heavy', up: 'light', down: 'light' },
	{ codePoint: 0x253F, left: 'heavy', right: 'heavy', up: 'light', down: 'light' },
	{ codePoint: 0x2540, left: 'light', right: 'light', up: 'heavy', down: 'light' },
	{ codePoint: 0x2541, left: 'light', right: 'light', up: 'light', down: 'heavy' },
	{ codePoint: 0x2542, left: 'light', right: 'light', up: 'heavy', down: 'heavy' },
	{ codePoint: 0x2543, left: 'heavy', right: 'light', up: 'heavy', down: 'light' },
	{ codePoint: 0x2544, left: 'light', right: 'heavy', up: 'heavy', down: 'light' },
	{ codePoint: 0x2545, left: 'heavy', right: 'light', up: 'light', down: 'heavy' },
	{ codePoint: 0x2546, left: 'light', right: 'heavy', up: 'light', down: 'heavy' },
	{ codePoint: 0x2547, left: 'heavy', right: 'heavy', up: 'heavy', down: 'light' },
	{ codePoint: 0x2548, left: 'heavy', right: 'heavy', up: 'light', down: 'heavy' },
	{ codePoint: 0x2549, left: 'heavy', right: 'light', up: 'heavy', down: 'heavy' },
	{ codePoint: 0x254A, left: 'light', right: 'heavy', up: 'heavy', down: 'heavy' },
	{ codePoint: 0x254B, left: 'heavy', right: 'heavy', up: 'heavy', down: 'heavy' },
	{ codePoint: 0x254C, left: 'light2Dash', right: 'light2Dash' },
	{ codePoint: 0x254D, left: 'heavy2Dash', right: 'heavy2Dash' },
	{ codePoint: 0x254E, up: 'light2Dash', down: 'light2Dash' },
	{ codePoint: 0x254F, up: 'heavy2Dash', down: 'heavy2Dash' },
	{ codePoint: 0x2550, left: 'double', right: 'double' },
	{ codePoint: 0x2551, up: 'double', down: 'double' },
	{ codePoint: 0x2552, down: 'light', right: 'double' },
	{ codePoint: 0x2553, down: 'double', right: 'light' },
	{ codePoint: 0x2554, down: 'double', right: 'double' },
	{ codePoint: 0x2555, down: 'light', left: 'double' },
	{ codePoint: 0x2556, down: 'double', left: 'light' },
	{ codePoint: 0x2557, down: 'double', left: 'double' },
	{ codePoint: 0x2558, up: 'light', right: 'double' },
	{ codePoint: 0x2559, up: 'double', right: 'light' },
	{ codePoint: 0x255A, up: 'double', right: 'double' },
	{ codePoint: 0x255B, up: 'light', left: 'double' },
	{ codePoint: 0x255C, up: 'double', left: 'light' },
	{ codePoint: 0x255D, up: 'double', left: 'double' },
	{ codePoint: 0x255E, up: 'light', down: 'light', right: 'double' },
	{ codePoint: 0x255F, up: 'double', down: 'double', right: 'light' },
	{ codePoint: 0x2560, up: 'double', down: 'double', right: 'double' },
	{ codePoint: 0x2561, up: 'light', down: 'light', left: 'double' },
	{ codePoint: 0x2562, up: 'double', down: 'double', left: 'light' },
	{ codePoint: 0x2563, up: 'double', down: 'double', left: 'double' },
	{ codePoint: 0x2564, up: 'light', left: 'double', right: 'double' },
	{ codePoint: 0x2565, up: 'double', left: 'light', right: 'light' },
	{ codePoint: 0x2566, up: 'double', left: 'double', right: 'double' },
	{ codePoint: 0x2567, down: 'light', left: 'double', right: 'double' },
	{ codePoint: 0x2568, down: 'double', left: 'light', right: 'light' },
	{ codePoint: 0x2569, down: 'double', left: 'double', right: 'double' },
	{ codePoint: 0x256A, up: 'light', down: 'light', left: 'double', right: 'double' },
	{ codePoint: 0x256B, up: 'double', down: 'double', left: 'light', right: 'light' },
	{ codePoint: 0x256C, up: 'double', down: 'double', left: 'double', right: 'double' },
	{ codePoint: 0x256D, down: 'light', right: 'light', arced: true },
	{ codePoint: 0x256E, down: 'light', left: 'light', arced: true },
	{ codePoint: 0x256F, up: 'light', right: 'light', arced: true },
	{ codePoint: 0x2570, up: 'light', left: 'light', arced: true },
	{ codePoint: 0x2571, forward: true, backward: false },
	{ codePoint: 0x2572, forward: false, backward: true },
	{ codePoint: 0x2573, forward: true, backward: true },
	{ codePoint: 0x2574, left: 'light' },
	{ codePoint: 0x2575, up: 'light' },
	{ codePoint: 0x2576, right: 'light' },
	{ codePoint: 0x2577, down: 'light' },
	{ codePoint: 0x2578, left: 'heavy' },
	{ codePoint: 0x2579, up: 'heavy' },
	{ codePoint: 0x257A, right: 'heavy' },
	{ codePoint: 0x257B, down: 'heavy' },
	{ codePoint: 0x257C, left: 'light', right: 'heavy' },
	{ codePoint: 0x257D, up: 'light', down: 'heavy' },
	{ codePoint: 0x257E, right: 'light', left: 'heavy' },
	{ codePoint: 0x257F, down: 'light', up: 'heavy' },
];
