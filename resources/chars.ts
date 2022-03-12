interface CodePointDescription {
	codePoint: number;
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

export const charNames: Line[] = [
	{codePoint: 0x20},
	{codePoint: 0x20, forward: false, backward: false},
	{codePoint: 0x25_00, left: 'light', right: 'light'},
	{codePoint: 0x25_01, left: 'heavy', right: 'heavy'},
	{codePoint: 0x25_02, up: 'light', down: 'light'},
	{codePoint: 0x25_03, up: 'heavy', down: 'heavy'},
	{codePoint: 0x25_04, left: 'light3Dash', right: 'light3Dash'},
	{codePoint: 0x25_05, left: 'heavy3Dash', right: 'heavy3Dash'},
	{codePoint: 0x25_06, up: 'light3Dash', down: 'light3Dash'},
	{codePoint: 0x25_07, up: 'heavy3Dash', down: 'heavy3Dash'},
	{codePoint: 0x25_08, left: 'light4Dash', right: 'light4Dash'},
	{codePoint: 0x25_09, left: 'heavy4Dash', right: 'heavy4Dash'},
	{codePoint: 0x25_0A, up: 'light4Dash', down: 'light4Dash'},
	{codePoint: 0x25_0B, up: 'heavy4Dash', down: 'heavy4Dash'},
	{codePoint: 0x25_0C, down: 'light', right: 'light', arced: false},
	{codePoint: 0x25_0D, down: 'light', right: 'heavy'},
	{codePoint: 0x25_0E, down: 'heavy', right: 'light'},
	{codePoint: 0x25_0F, down: 'heavy', right: 'heavy'},
	{codePoint: 0x25_10, down: 'light', left: 'light', arced: false},
	{codePoint: 0x25_11, down: 'light', left: 'heavy'},
	{codePoint: 0x25_12, down: 'heavy', left: 'light'},
	{codePoint: 0x25_13, down: 'heavy', left: 'heavy'},
	{codePoint: 0x25_14, up: 'light', right: 'light', arced: false},
	{codePoint: 0x25_15, up: 'light', right: 'heavy'},
	{codePoint: 0x25_16, up: 'heavy', right: 'light'},
	{codePoint: 0x25_17, up: 'heavy', right: 'heavy'},
	{codePoint: 0x25_18, up: 'light', left: 'light', arced: false},
	{codePoint: 0x25_19, up: 'light', left: 'heavy'},
	{codePoint: 0x25_1A, up: 'heavy', left: 'light'},
	{codePoint: 0x25_1B, up: 'heavy', left: 'heavy'},
	{codePoint: 0x25_1C, up: 'light', down: 'light', right: 'light'},
	{codePoint: 0x25_1D, up: 'light', down: 'light', right: 'heavy'},
	{codePoint: 0x25_1E, up: 'heavy', down: 'light', right: 'light'},
	{codePoint: 0x25_1F, up: 'light', down: 'heavy', right: 'light'},
	{codePoint: 0x25_20, up: 'heavy', down: 'heavy', right: 'light'},
	{codePoint: 0x25_21, up: 'heavy', down: 'light', right: 'heavy'},
	{codePoint: 0x25_22, up: 'light', down: 'heavy', right: 'heavy'},
	{codePoint: 0x25_23, up: 'heavy', down: 'heavy', right: 'heavy'},
	{codePoint: 0x25_24, up: 'light', down: 'light', left: 'light'},
	{codePoint: 0x25_25, up: 'light', down: 'light', left: 'heavy'},
	{codePoint: 0x25_26, up: 'heavy', down: 'light', left: 'light'},
	{codePoint: 0x25_27, up: 'light', down: 'heavy', left: 'light'},
	{codePoint: 0x25_28, up: 'heavy', down: 'heavy', left: 'light'},
	{codePoint: 0x25_29, up: 'heavy', down: 'light', left: 'heavy'},
	{codePoint: 0x25_2A, up: 'light', down: 'heavy', left: 'heavy'},
	{codePoint: 0x25_2B, up: 'heavy', down: 'heavy', left: 'heavy'},
	{codePoint: 0x25_2C, left: 'light', right: 'light', down: 'light'},
	{codePoint: 0x25_2D, left: 'heavy', right: 'light', down: 'light'},
	{codePoint: 0x25_2E, left: 'light', right: 'heavy', down: 'light'},
	{codePoint: 0x25_2F, left: 'heavy', right: 'heavy', down: 'light'},
	{codePoint: 0x25_30, left: 'light', right: 'light', down: 'heavy'},
	{codePoint: 0x25_31, left: 'heavy', right: 'light', down: 'heavy'},
	{codePoint: 0x25_32, left: 'light', right: 'heavy', down: 'heavy'},
	{codePoint: 0x25_33, left: 'heavy', right: 'heavy', down: 'heavy'},
	{codePoint: 0x25_34, left: 'light', right: 'light', up: 'light'},
	{codePoint: 0x25_35, left: 'heavy', right: 'light', up: 'light'},
	{codePoint: 0x25_36, left: 'light', right: 'heavy', up: 'light'},
	{codePoint: 0x25_37, left: 'heavy', right: 'heavy', up: 'light'},
	{codePoint: 0x25_38, left: 'light', right: 'light', up: 'heavy'},
	{codePoint: 0x25_39, left: 'heavy', right: 'light', up: 'heavy'},
	{codePoint: 0x25_3A, left: 'light', right: 'heavy', up: 'heavy'},
	{codePoint: 0x25_3B, left: 'heavy', right: 'heavy', up: 'heavy'},
	{codePoint: 0x25_3C, left: 'light', right: 'light', up: 'light', down: 'light'},
	{codePoint: 0x25_3D, left: 'heavy', right: 'light', up: 'light', down: 'light'},
	{codePoint: 0x25_3E, left: 'light', right: 'heavy', up: 'light', down: 'light'},
	{codePoint: 0x25_3F, left: 'heavy', right: 'heavy', up: 'light', down: 'light'},
	{codePoint: 0x25_40, left: 'light', right: 'light', up: 'heavy', down: 'light'},
	{codePoint: 0x25_41, left: 'light', right: 'light', up: 'light', down: 'heavy'},
	{codePoint: 0x25_42, left: 'light', right: 'light', up: 'heavy', down: 'heavy'},
	{codePoint: 0x25_43, left: 'heavy', right: 'light', up: 'heavy', down: 'light'},
	{codePoint: 0x25_44, left: 'light', right: 'heavy', up: 'heavy', down: 'light'},
	{codePoint: 0x25_45, left: 'heavy', right: 'light', up: 'light', down: 'heavy'},
	{codePoint: 0x25_46, left: 'light', right: 'heavy', up: 'light', down: 'heavy'},
	{codePoint: 0x25_47, left: 'heavy', right: 'heavy', up: 'heavy', down: 'light'},
	{codePoint: 0x25_48, left: 'heavy', right: 'heavy', up: 'light', down: 'heavy'},
	{codePoint: 0x25_49, left: 'heavy', right: 'light', up: 'heavy', down: 'heavy'},
	{codePoint: 0x25_4A, left: 'light', right: 'heavy', up: 'heavy', down: 'heavy'},
	{codePoint: 0x25_4B, left: 'heavy', right: 'heavy', up: 'heavy', down: 'heavy'},
	{codePoint: 0x25_4C, left: 'light2Dash', right: 'light2Dash'},
	{codePoint: 0x25_4D, left: 'heavy2Dash', right: 'heavy2Dash'},
	{codePoint: 0x25_4E, up: 'light2Dash', down: 'light2Dash'},
	{codePoint: 0x25_4F, up: 'heavy2Dash', down: 'heavy2Dash'},
	{codePoint: 0x25_50, left: 'double', right: 'double'},
	{codePoint: 0x25_51, up: 'double', down: 'double'},
	{codePoint: 0x25_52, down: 'light', right: 'double'},
	{codePoint: 0x25_53, down: 'double', right: 'light'},
	{codePoint: 0x25_54, down: 'double', right: 'double'},
	{codePoint: 0x25_55, down: 'light', left: 'double'},
	{codePoint: 0x25_56, down: 'double', left: 'light'},
	{codePoint: 0x25_57, down: 'double', left: 'double'},
	{codePoint: 0x25_58, up: 'light', right: 'double'},
	{codePoint: 0x25_59, up: 'double', right: 'light'},
	{codePoint: 0x25_5A, up: 'double', right: 'double'},
	{codePoint: 0x25_5B, up: 'light', left: 'double'},
	{codePoint: 0x25_5C, up: 'double', left: 'light'},
	{codePoint: 0x25_5D, up: 'double', left: 'double'},
	{codePoint: 0x25_5E, up: 'light', down: 'light', right: 'double'},
	{codePoint: 0x25_5F, up: 'double', down: 'double', right: 'light'},
	{codePoint: 0x25_60, up: 'double', down: 'double', right: 'double'},
	{codePoint: 0x25_61, up: 'light', down: 'light', left: 'double'},
	{codePoint: 0x25_62, up: 'double', down: 'double', left: 'light'},
	{codePoint: 0x25_63, up: 'double', down: 'double', left: 'double'},
	{codePoint: 0x25_64, up: 'light', left: 'double', right: 'double'},
	{codePoint: 0x25_65, up: 'double', left: 'light', right: 'light'},
	{codePoint: 0x25_66, up: 'double', left: 'double', right: 'double'},
	{codePoint: 0x25_67, down: 'light', left: 'double', right: 'double'},
	{codePoint: 0x25_68, down: 'double', left: 'light', right: 'light'},
	{codePoint: 0x25_69, down: 'double', left: 'double', right: 'double'},
	{codePoint: 0x25_6A, up: 'light', down: 'light', left: 'double', right: 'double'},
	{codePoint: 0x25_6B, up: 'double', down: 'double', left: 'light', right: 'light'},
	{codePoint: 0x25_6C, up: 'double', down: 'double', left: 'double', right: 'double'},
	{codePoint: 0x25_6D, down: 'light', right: 'light', arced: true},
	{codePoint: 0x25_6E, down: 'light', left: 'light', arced: true},
	{codePoint: 0x25_6F, up: 'light', right: 'light', arced: true},
	{codePoint: 0x25_70, up: 'light', left: 'light', arced: true},
	{codePoint: 0x25_71, forward: true, backward: false},
	{codePoint: 0x25_72, forward: false, backward: true},
	{codePoint: 0x25_73, forward: true, backward: true},
	{codePoint: 0x25_74, left: 'light'},
	{codePoint: 0x25_75, up: 'light'},
	{codePoint: 0x25_76, right: 'light'},
	{codePoint: 0x25_77, down: 'light'},
	{codePoint: 0x25_78, left: 'heavy'},
	{codePoint: 0x25_79, up: 'heavy'},
	{codePoint: 0x25_7A, right: 'heavy'},
	{codePoint: 0x25_7B, down: 'heavy'},
	{codePoint: 0x25_7C, left: 'light', right: 'heavy'},
	{codePoint: 0x25_7D, up: 'light', down: 'heavy'},
	{codePoint: 0x25_7E, right: 'light', left: 'heavy'},
	{codePoint: 0x25_7F, down: 'light', up: 'heavy'},
];
