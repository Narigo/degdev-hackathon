import type z from 'zod';
import type {
	Game,
	GameDefinition,
	GameStateType,
	InventoryStateType,
	Room,
	RoomAction,
	RoomStateType,
	VisibilityCondition
} from './definitions';
import { gameDefinitionSchema } from './validations';
import { writable } from 'svelte/store';

export async function validateDefinition(
	gameDefinition: unknown
): Promise<z.ZodSafeParseResult<GameDefinition>> {
	return gameDefinitionSchema.safeParseAsync(gameDefinition);
}

export async function loadGame(gameDefinition: GameDefinition): Promise<Game> {
	return {
		...gameDefinition,
		state: writable({ ...gameDefinition.state, currentRoom: gameDefinition.state.currentRoom }),
		inventoryState: writable([...gameDefinition.inventoryState]),
		rooms: Object.entries(gameDefinition.rooms).reduce(
			(acc, [roomId, roomDefinition]) => ({
				...acc,
				[roomId]: {
					...roomDefinition,
					state: writable({ ...roomDefinition.state })
				}
			}),
			{}
		)
	} satisfies Game;
}

export async function doAction(
	{ room, game }: { room: Room; game: Game },
	action: RoomAction
): Promise<void> {
	switch (action.type) {
		case 'addToInventory':
			game.inventoryState.update((oldInventory) => {
				return [...oldInventory, action.inventoryItem];
			});
			break;
		case 'setRoomVariable':
			room.state.update((oldState) => ({
				...oldState,
				[action.variable]: action.value
			}));
			break;
		case 'switchRoom':
			game.state.update((oldState) => ({ ...oldState, currentRoom: action.room }));
			break;
	}
	if (action.nextAction) {
		doAction({ game, room }, action.nextAction);
	}
}

export function isVisible(
	states: { game: GameStateType; inventory: InventoryStateType; room: RoomStateType },
	visibleIf: VisibilityCondition
): boolean {
	switch (visibleIf.type) {
		case 'gameVariableIsTrue':
			return states.game[visibleIf.variable] === true;
		case 'gameVariableIsFalse':
			return states.game[visibleIf.variable] === false;
		case 'roomVariableIsTrue':
			return states.room[visibleIf.variable] === true;
		case 'roomVariableIsFalse':
			return states.room[visibleIf.variable] === false;
	}
}
