const level1Body = [WORK, CARRY, MOVE, MOVE];
const level2Body = [WORK, CARRY, MOVE, MOVE, MOVE];
const level3Body = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
const level4Body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
const level5Body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];

const HarvesterBody = [
	{ body: level1Body, cost: bodyCost(level1Body) },
	{ body: level2Body, cost: bodyCost(level2Body) },
	{ body: level3Body, cost: bodyCost(level3Body) },
	{ body: level4Body, cost: bodyCost(level4Body) },
	{ body: level5Body, cost: bodyCost(level5Body) },
];

export function GetHarvesterBodyParts(room: Room): BodyPartConstant[]
{
	let i = 0;
	for (const bodyAndCost of HarvesterBody)
	{
		i++;
		if (room.energyCapacityAvailable > bodyAndCost.cost)
		{
			console.log(`Building level ${i} harvester.`);
			return bodyAndCost.body;
		}
	}

	throw new Error('Minimum capacity for level 1 body not reached!');
}

function bodyCost(body: BodyPartConstant[])
{
	return body.reduce((cost, part) =>
	{
		return cost + BODYPART_COST[part];
	}, 0);
}

// const bodyPartsCost = {
// 	move: 50,
// 	work: 100,
// 	attack: 80,
// 	carry: 50,
// 	heal: 250,
// 	ranged_attack: 150,
// 	tough: 10,
// 	claim: 600
// };
