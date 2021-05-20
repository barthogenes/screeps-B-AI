import { ITree } from 'behavior/ITree';
import { ITreeImplementation } from 'behavior/ITreeImplementation';

export class TreeExecuter<TGameObject, TTreeImplementation extends ITreeImplementation<TGameObject>>
{
	private gameObject: TGameObject;
	private treeImpl: TTreeImplementation;

	public constructor(gameObject: TGameObject, treeImpl: TTreeImplementation) {
		this.gameObject = gameObject;
		this.treeImpl = treeImpl;
	}

	public Execute(leaf: keyof TTreeImplementation): { success: boolean, command: string } {
		return {
			success: this.treeImpl[leaf](this.gameObject),
			command: leaf.toString()
		};
	}

	public Run(rootNode: ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation): { success: boolean, command: string } {
		let result = {
			success: false,
			command: ''
		};

		if (this.isLeaf(rootNode)) {
			return this.Execute(rootNode);
		}

		if (rootNode.type === 'selector') {
			for (const childNode of rootNode.childNodes) {
				result = this.Run(childNode);
				if (result.success)
					return result;
			}
			return result;
		}

		if (rootNode.type === 'sequence') {
			for (const childNode of rootNode.childNodes) {
				result = this.Run(childNode)
				if (!result.success)
					return result;
			}
			return result;
		}

		return result;
	}

	private isLeaf(node: ITree<TGameObject, TTreeImplementation> | keyof TTreeImplementation): node is keyof TTreeImplementation {
		return typeof (node) === 'string';
	}
}
