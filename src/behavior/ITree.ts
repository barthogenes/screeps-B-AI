export type TreeNodeType = 'selector' | 'sequence';

export interface ITree<TGameObject, TTreeImplementation> {
	type: TreeNodeType;
	childNodes: (ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation)[];
}
