import { ITree } from 'behavior/ITree';
import { isFunction } from 'lodash';

export interface IRunResult { success: boolean, command: string }

export function Execute<TTreeImplementation, TGameObject>(treeImpl: TTreeImplementation, gameObject: TGameObject, leaf: keyof TTreeImplementation): IRunResult {
	const treeLeafFunc = treeImpl[leaf];
	if (!isFunction(treeLeafFunc))
		throw new Error(`'${leaf.toString()}' is not a function on this tree!`)

	return {
		success: treeLeafFunc(gameObject) as boolean,
		command: leaf.toString()
	};
}

export function Run<TTreeImplementation, TGameObject>(
	tree: ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation,
	treeImpl: TTreeImplementation,
	gameObject: TGameObject
): IRunResult {

	let result = {
		success: false,
		command: ''
	};

	if (isLeaf(tree)) {
		return Execute(treeImpl, gameObject, tree);
	}

	if (tree.type === 'selector') {
		for (const childNode of tree.childNodes) {
			result = Run(childNode, treeImpl, gameObject);
			if (result.success)
				return result;
		}
		return result;
	}

	if (tree.type === 'sequence') {
		for (const childNode of tree.childNodes) {
			result = Run(childNode, treeImpl, gameObject)
			if (!result.success)
				return result;
		}
		return result;
	}

	return result;
}

export function isLeaf<TTreeImplementation, TGameObject>(node: ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation): node is keyof TTreeImplementation {
	return typeof (node) === 'string';
}
