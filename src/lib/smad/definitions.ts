// export type NonEmptyArray<T> = [T, ...Array<T>];

import type { Writable } from 'svelte/store';

export type AssetId = string;
export type GameId = string;
export type GameTitle = TranslatableString;
export type ObjectId = string;
export type RoomId = string;
export type TranslationId = string;
export type VariableId = string;

export type ImageAsset = {
	type: 'image';
	src: string;
	alt: TranslatableString;
};

export type CssAsset = {
	type: 'css';
	style: string;
};
export type Asset = ImageAsset | CssAsset;
export type Background = Asset;

export type TranslatableString = string | { t: TranslationId };

export type InteractionObject = {
	id: ObjectId;
	asset: ImageAsset;
	visibleIf: VisibilityCondition;
	position: { x: number; y: number };
};

export type RoomAction = (
	| { type: 'switchRoom'; room: RoomId }
	| { type: 'setRoomVariable'; variable: VariableId; value: unknown }
	| { type: 'addToInventory'; inventoryItem: InventoryItem }
) & { nextAction?: RoomAction };

export type VisibilityCondition =
	| { type: 'gameVariableIsTrue'; variable: VariableId }
	| { type: 'gameVariableIsFalse'; variable: VariableId }
	| { type: 'roomVariableIsTrue'; variable: VariableId }
	| { type: 'roomVariableIsFalse'; variable: VariableId };

export type RoomUserActionLabel = { text: TranslatableString };
export type RoomUserAction = {
	label: RoomUserActionLabel;
	visibleIf?: VisibilityCondition;
	action: RoomAction;
};

export type RoomStateType = { [key: string]: unknown };
export type RoomState = Writable<RoomStateType>;

export type BaseRoomDefinition = {
	id: RoomId;
	state: RoomStateType;
	background: Background;
	roomActions: Array<RoomAction>;
	roomUserActions: Array<RoomUserAction>;
};

/**
 * @discriminator layout
 */
export type ExtendedRoomDefinition =
	| {
			layout: 'interactive-description-actions';
			description: TranslatableString;
			objects: Array<InteractionObject>;
	  }
	| {
			layout: 'background-description-actions';
			description: TranslatableString;
	  }
	| {
			layout: 'background-actions';
	  };

export type RoomDefinition = BaseRoomDefinition & ExtendedRoomDefinition;

export type InventoryItem = {
	id: ObjectId;
	label: TranslatableString;
	asset: Asset;
	amount: number;
};

export type InventoryStateType = Array<InventoryItem>;
export type InventoryState = Writable<InventoryStateType>;

export type GameStateType = { currentRoom: RoomId; [key: string]: unknown };
export type GameState = Writable<GameStateType>;

export type GameDefinition = {
	id: GameId;
	title: GameTitle;
	style: {
		classes?: string;
		size: {
			height: number;
			width: number;
		};
	};
	state: GameStateType;
	inventoryState: InventoryStateType;
	rooms: { [key: RoomId]: RoomDefinition };
};

export type Room = Omit<BaseRoomDefinition, 'state'> & {
	state: RoomState;
} & ExtendedRoomDefinition;
export type Game = Omit<GameDefinition, 'state' | 'inventoryState' | 'rooms'> & {
	state: GameState;
	inventoryState: InventoryState;
	rooms: { [key: RoomId]: Room };
};
