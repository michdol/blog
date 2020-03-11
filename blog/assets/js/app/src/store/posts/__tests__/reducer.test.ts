import {
	getObjectIdxById,
	getSwapTargetIndex,
	swapObjectsInArray
} from '../reducer';


describe("reducer tests", () => {
	let list: any[];
	let ret: any;
	beforeEach(() => {
		list = [
			{id: 1},
			{id: 2},
			{id: 3},
		];
	})

	test('getObjectIdxById', () => {
		expect(getObjectIdxById(list, 1)).toBe(0);
		expect(getObjectIdxById(list, 3)).toBe(2);
		expect(getObjectIdxById(list, 9)).toBe(-1);
	});	

	// getSwapTargetIndex(initialIdx: number, lastIdx: number, moveUp: boolean)
	test('getSwapTargetIndex', () => {
		// Try to move first object in array further up -> undefined
		expect(getSwapTargetIndex(0, 1, true)).toBe(undefined);
		// Try to move last object in array further down -> undefined
		expect(getSwapTargetIndex(1, 1, false)).toBe(undefined);
		// Move first object in 2 element array down -> 1
		expect(getSwapTargetIndex(0, 1, false)).toBe(1);
		// Move second object in 2 element array up -> 0
		expect(getSwapTargetIndex(1, 1, true)).toBe(0);
	});

	// Nothing changes
	test("swapObjectsInArray empty array", () => {
		ret = swapObjectsInArray([], 1, true);
		expect(ret).toMatchObject([]);
	});

	// Nothing changes
	test("swapObjectsInArray move first up", () => {
		ret = swapObjectsInArray(list, 1, true);
		expect(ret[0].id).toBe(1);
		expect(ret[1].id).toBe(2);
		expect(ret[2].id).toBe(3);
	});

	// Nothing changes
	test("swapObjectsInArray move last down", () => {
		ret = swapObjectsInArray(list, 3, false);
		expect(ret[0].id).toBe(1);
		expect(ret[1].id).toBe(2);
		expect(ret[2].id).toBe(3);
	});

	test("swapObjectsInArray move first down", () => {
		ret = swapObjectsInArray(list, 1, false);
		expect(ret[0].id).toBe(2);
		expect(ret[1].id).toBe(1);
		expect(ret[2].id).toBe(3);
	});

	test("swapObjectsInArray move second up", () => {
		ret = swapObjectsInArray(list, 2, true);
		expect(ret[0].id).toBe(2);
		expect(ret[1].id).toBe(1);
		expect(ret[2].id).toBe(3);
	});
});
