import type { GameDefinition } from '$lib/smad/definitions';

export const game: GameDefinition = {
	id: 'room-changes',
	title: 'Example to switch rooms',
	style: {
		size: {
			height: 1024,
			width: 480
		}
	},
	state: {
		currentRoom: 'first-room'
	},
	inventoryState: [],
	rooms: {
		'first-room': {
			id: 'first-room',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/first-room/background-1.png',
				alt: 'A room of a wizard with a fish bowl on the table'
			},
			state: { fishTankVisible: true },
			objects: [
				{
					id: 'fish-tank',
					asset: {
						type: 'image',
						src: '/first-room/fish-tank.png',
						alt: 'A small fish bowl'
					},
					position: { x: 100, y: 175 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'fishTankVisible' }
				}
			],
			description:
				'Home of the forgetful Waffle Wizard. Between magic hats, fish in glass globes, and crooked candles, he tries to perfect the ultimate pancake spell. The door on the right leads out to the hallway—if it ever opens…',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Take fish tank' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'fishTankVisible' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'fish-tank',
							label: 'Fish tank',
							amount: 1,
							asset: { type: 'image', src: '/first-room/fish-tank.png', alt: 'A small fish bowl' }
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'fishTankVisible',
							value: false
						}
					}
				},
				{ label: { text: 'To Room Two' }, action: { type: 'switchRoom', room: 'second-room' } }
			]
		},
		'second-room': {
			id: 'second-room',
			layout: 'background-description-actions',
			background: {
				type: 'image',
				src: '/second-room/background-2.png',
				alt: 'A corridor with a door to the left and a door to the right.'
			},
			description:
				"A quiet corridor full of secrets. The left door bears the wizard's stars, the right one smells suspiciously like vanilla and sugar. Floating books and potions drift by—as if the hallway itself were watching you.",
			state: {},
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'To Room One' },
					action: { type: 'switchRoom', room: 'first-room' }
				},
				{ label: { text: 'To Room Three' }, action: { type: 'switchRoom', room: 'third-room' } }
			]
		},
		'third-room': {
			id: 'third-room',
			layout: 'background-description-actions',
			background: {
				type: 'image',
				src: '/third-room/background-3.png',
				alt: 'A room with a door on the left and a sink in the middle'
			},
			description:
				'Behind the golden waffle door lies the sweetest chaos imaginable. Muffins float, the vanilla cauldron bubbles, and a recipe book reads itself aloud. Anyone who takes a bite here risks magical stomach aches!',
			state: {},
			roomActions: [],
			roomUserActions: [
				{ label: { text: 'To Room Two' }, action: { type: 'switchRoom', room: 'second-room' } }
			]
		}
	}
};
