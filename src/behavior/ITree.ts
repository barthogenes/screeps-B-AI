export type TreeNodeType = 'selector' | 'sequence';

export interface ITree<TGameObject, TTreeImplementation> {
	type: TreeNodeType;
	nodes: (ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation)[];
}
