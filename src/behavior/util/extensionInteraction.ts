export interface IExtensionInteractionInfo {
	closestFullExtension: StructureExtension | null;
	closestEmptyExtension: StructureExtension | null;
	creep: Creep;
}

export interface IExtensionInteractionImplementation {
	'move next to full extension': (info: IExtensionInteractionInfo) => boolean;
	'move next to empty extension': (info: IExtensionInteractionInfo) => boolean;
}

export const ExtensionInteractionImplementation: IExtensionInteractionImplementation = {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'move next to full extension': ({ creep, closestFullExtension }) => creep.travelTo(closestFullExtension!) === OK,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	'move next to empty extension': ({ creep, closestEmptyExtension }) => creep.travelTo(closestEmptyExtension!) === OK,
}
