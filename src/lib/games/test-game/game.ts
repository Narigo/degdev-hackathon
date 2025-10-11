import type { GameDefinition } from '$lib/smad/definitions';

export const game: GameDefinition = {
	id: 'test-game',
	title: 'Super Stinky Camping Adventure',
	style: {
		size: { height: 1024, width: 480 }
	},
	state: {
		currentRoom: 'campingplatz'
	},
	inventoryState: [],
	rooms: {
		campingplatz: {
			id: 'campingplatz',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/campingplatz/background.png',
				alt: 'Ein fröhlicher Campingplatz mit Zelten, Bäumen und einem Furzkissen auf einem Stuhl.'
			},
			state: {
				furzkissenSichtbar: true
			},
			objects: [
				{
					id: 'furzkissen',
					asset: {
						type: 'image',
						src: '/campingplatz/furzkissen.png',
						alt: 'Ein rotes Furzkissen, das schon ganz kicherig aussieht.'
					},
					position: { x: 180, y: 360 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'furzkissenSichtbar' }
				}
			],
			description:
				'Willkommen auf dem Campingplatz! Jemand hat ein Furzkissen hingelegt. Wer war das wohl? Hihi!',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Furzkissen einstecken (PRRRT!)' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'furzkissenSichtbar' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'furzkissen',
							label: 'Furzkissen',
							amount: 1,
							asset: {
								type: 'image',
								src: '/campingplatz/furzkissen.png',
								alt: 'Ein rotes Furzkissen'
							}
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'furzkissenSichtbar',
							value: false
						}
					}
				},
				{
					label: { text: 'Ins Zelt krabbeln' },
					action: { type: 'switchRoom', room: 'zelt_innen' }
				},
				{ label: { text: 'Zum Wald spazieren' }, action: { type: 'switchRoom', room: 'wald' } },
				{ label: { text: 'Zum Kiosk hüpfen' }, action: { type: 'switchRoom', room: 'kiosk' } }
			]
		},

		zelt_innen: {
			id: 'zelt_innen',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/zelt/background.png',
				alt: 'Im Zelt liegen Socken, Taschenlampen und eine verdächtige Bohnendose.'
			},
			state: {
				bohnenSichtbar: true
			},
			objects: [
				{
					id: 'bohnen',
					asset: {
						type: 'image',
						src: '/zelt/bohnen.png',
						alt: 'Eine kichernde Bohnendose.'
					},
					position: { x: 120, y: 380 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'bohnenSichtbar' }
				}
			],
			description: 'Im Zelt ist es warm und riecht nach Käsefüßen. Oh! Da steht eine Bohnendose…',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Bohnen einstecken (uh oh!)' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'bohnenSichtbar' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'bohnen',
							label: 'Bohnen',
							amount: 1,
							asset: { type: 'image', src: '/zelt/bohnen.png', alt: 'Bohnendose' }
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'bohnenSichtbar',
							value: false
						}
					}
				},
				{
					label: { text: 'Raus zum Campingplatz' },
					action: { type: 'switchRoom', room: 'campingplatz' }
				},
				{
					label: { text: 'Zum Lagerfeuer schleichen' },
					action: { type: 'switchRoom', room: 'lagerfeuer' }
				}
			]
		},

		wald: {
			id: 'wald',
			layout: 'background-description-actions',
			background: {
				type: 'image',
				src: '/wald/background.png',
				alt: 'Ein dichter Wald, in dem irgendwo Pups-Echos kichern.'
			},
			state: {},
			description: 'Der Wald flüstert… oder pupst er? PRRRT… prrt… prt…',
			roomActions: [],
			roomUserActions: [
				{ label: { text: 'Zum See tapsen' }, action: { type: 'switchRoom', room: 'see' } },
				{
					label: { text: 'Zum Lagerfeuer stapfen' },
					action: { type: 'switchRoom', room: 'lagerfeuer' }
				},
				{
					label: { text: 'Zurück zum Campingplatz' },
					action: { type: 'switchRoom', room: 'campingplatz' }
				}
			]
		},

		see: {
			id: 'see',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/see/background.png',
				alt: 'Ein glitzernder See mit blubbernden Pupsblasen.'
			},
			state: {
				sockeSichtbar: true
			},
			objects: [
				{
					id: 'nasse_socke',
					asset: {
						type: 'image',
						src: '/see/nasse-socke.png',
						alt: "Eine triefnasse Socke, die 'blub' macht."
					},
					position: { x: 240, y: 420 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'sockeSichtbar' }
				}
			],
			description: 'BLUB! Eine Pupsblase platzt. Was schwimmt denn da? Eine nasse Socke!',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Nasse Socke angeln' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'sockeSichtbar' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'nasse_socke',
							label: 'Nasse Socke',
							amount: 1,
							asset: { type: 'image', src: '/see/nasse-socke.png', alt: 'Nasse Socke' }
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'sockeSichtbar',
							value: false
						}
					}
				},
				{ label: { text: 'Zurück in den Wald' }, action: { type: 'switchRoom', room: 'wald' } }
			]
		},

		lagerfeuer: {
			id: 'lagerfeuer',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/lagerfeuer/background.png',
				alt: 'Ein gemütliches Lagerfeuer mit Spieß und Marshmallows.'
			},
			state: {
				marshmallowSichtbar: true
			},
			objects: [
				{
					id: 'marshmallow',
					asset: {
						type: 'image',
						src: '/lagerfeuer/marshmallow.png',
						alt: 'Ein fluffiger Marshmallow am Spieß.'
					},
					position: { x: 210, y: 400 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'marshmallowSichtbar' }
				}
			],
			description: 'Das Feuer knistert – und dein Bauch macht BRUMM-PRRT! Zeit für was Süßes?',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Marshmallow rösten und nehmen' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'marshmallowSichtbar' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'marshmallow',
							label: 'Marshmallow',
							amount: 1,
							asset: { type: 'image', src: '/lagerfeuer/marshmallow.png', alt: 'Marshmallow' }
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'marshmallowSichtbar',
							value: false
						}
					}
				},
				{
					label: { text: 'Zur Toilette rennen (hihi)' },
					action: { type: 'switchRoom', room: 'toilette' }
				},
				{ label: { text: 'Zurück in den Wald' }, action: { type: 'switchRoom', room: 'wald' } }
			]
		},

		toilette: {
			id: 'toilette',
			layout: 'background-description-actions',
			background: {
				type: 'image',
				src: '/toilette/background.png',
				alt: 'Die legendäre Outdoor-Toilette mit Krone und einem kichernden Gesicht.'
			},
			state: {},
			description:
				'Die Toilette flüstert: „Ich bin die Pupskönigin!“ KICHER! Bitte nicht die ganze Dose Bohnen auf einmal!',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Zurück zum Lagerfeuer' },
					action: { type: 'switchRoom', room: 'lagerfeuer' }
				},
				{
					label: { text: 'Zurück zum Campingplatz' },
					action: { type: 'switchRoom', room: 'campingplatz' }
				}
			]
		},

		kiosk: {
			id: 'kiosk',
			layout: 'interactive-description-actions',
			background: {
				type: 'image',
				src: '/kiosk/background.png',
				alt: 'Ein kleiner Kiosk mit bunten Flaschen und Bohnenbonbons.'
			},
			state: {
				limoSichtbar: true
			},
			objects: [
				{
					id: 'pupslimo',
					asset: {
						type: 'image',
						src: '/kiosk/pups-limo.png',
						alt: 'Eine sprudelnde Pups-Limo-Flasche.'
					},
					position: { x: 260, y: 360 },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'limoSichtbar' }
				}
			],
			description: 'Der Kiosk-Onkel ruft: „Frische Pups-Limo! Macht kitzelige Blubber-Wangen!“',
			roomActions: [],
			roomUserActions: [
				{
					label: { text: 'Pups-Limo kaufen' },
					visibleIf: { type: 'roomVariableIsTrue', variable: 'limoSichtbar' },
					action: {
						type: 'addToInventory',
						inventoryItem: {
							id: 'pupslimo',
							label: 'Pups-Limo',
							amount: 1,
							asset: { type: 'image', src: '/kiosk/pups-limo.png', alt: 'Pups-Limo-Flasche' }
						},
						nextAction: {
							type: 'setRoomVariable',
							variable: 'limoSichtbar',
							value: false
						}
					}
				},
				{
					label: { text: 'Zurück zum Campingplatz' },
					action: { type: 'switchRoom', room: 'campingplatz' }
				}
			]
		}
	}
};
