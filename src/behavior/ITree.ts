/**
 * Runs through all child nodes.
 * @returns True as soon as a node succeeds,
 * @returns False if all nodes failed.
 */
export const SelectorNodeType = 'selector';

/**
 * Runs through all child nodes.
 * @returns False as soon as a node fails,
 * @returns True if all nodes succeeded.
 */
export const SequenceNodeType = 'sequence';

export type TreeNodeType = typeof SelectorNodeType | typeof SequenceNodeType;

export interface ITree<TGameObject, TTreeImplementation> {
	type: TreeNodeType;
	nodes: (ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation)[];
}
