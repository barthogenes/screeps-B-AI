import { TreeLeaveDictionary, TreeNode } from 'runner/runner';

export interface ITree<TGameObject, TTreeLeaveDictionary extends TreeLeaveDictionary<TGameObject>>
{
	getObject(): TGameObject;
	getTree(): TreeNode<TGameObject, TTreeLeaveDictionary>;
}
