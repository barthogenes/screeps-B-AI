import { ITreeImplementation } from './ITreeImplementation';

export type TreeNodeType = 'selector' | 'sequence';

export interface ITree<TGameObject, TTreeImplementation extends ITreeImplementation<TGameObject>>  {
	type: TreeNodeType;
	childNodes: (ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation)[];
}
