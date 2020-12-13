export interface TreeNode<TGameObject, TTreeLeaveDictionary extends TreeLeaveDictionary<TGameObject>>
{
	type: TreeNodeType;
	childNodes: (TreeNode<TGameObject, TTreeLeaveDictionary> | keyof TTreeLeaveDictionary)[];
}

export type TreeNodeType = 'selector' | 'sequence';

export type TreeLeaveDictionary<TGameObject> = Record<string, TreeLeaveImpl<TGameObject>>;

export type TreeLeaveImpl<TGameObject> = (input: TGameObject) => boolean;

function isLeaf<TGameObject, TTreeLeaveDictionary extends TreeLeaveDictionary<TGameObject>>
	(node: TreeNode<TGameObject, TTreeLeaveDictionary> | keyof TTreeLeaveDictionary): node is keyof TTreeLeaveDictionary
{
	return typeof (node) === 'string';
}

export function Run<TGameObject, TTreeLeaveDictionary extends TreeLeaveDictionary<TGameObject>>
	(gameObject: TGameObject, treeImpl: TTreeLeaveDictionary, rootNode: TreeNode<TGameObject, TTreeLeaveDictionary> | keyof TTreeLeaveDictionary): { success: boolean, command: string }
{
	let result = {
		success: false,
		command: ''
	};

	if (isLeaf(rootNode))
	{
		return {
			success: treeImpl[rootNode](gameObject),
			command: rootNode.toString()
		};
	}

	if (rootNode.type === 'selector')
	{
		for (const childNode of rootNode.childNodes)
		{
			result = Run(gameObject, treeImpl, childNode);
			if (result.success)
				return result;
		}
		return result;
	}

	if (rootNode.type === 'sequence')
	{
		for (const childNode of rootNode.childNodes)
		{
			result = Run(gameObject, treeImpl, childNode)
			if (!result.success)
				return result;
		}
		return result;
	}

	return result;
}
