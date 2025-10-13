import type { GameDefinition } from '$lib/smad/definitions';

export const game: GameDefinition = {
  "id": "tal-der-einhoerner",
  "title": "Das Tal der Einhörner",
  "style": {
    "size": { "width": 480, "height": 512 }
  },
  "state": {
    "currentRoom": "regenbogenwiese"
  },
  "inventoryState": [],
  "rooms": {
    "regenbogenwiese": {
      "id": "regenbogenwiese",
      "state": {
        "collectedSonnenkristall": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Hügel aus Wolken erkunden" },
          "action": { "type": "switchRoom", "room": "wolkenhuegel" }
        },
        {
          "label": { "text": "Den Sonnenkristall einstecken (vorsichtig kichern)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedSonnenkristall" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "sonnenkristall",
              "label": "Sonnenkristall",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/sonnenkristall.png", "alt": "Ein kleiner funkelnder Sonnenkristall" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedSonnenkristall",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/regenbogenwiese-bg.png", "alt": "Sonnige Wiese mit Regenbogen und kleinen Sonnen" },
      "description": "Die Sonne kichert, die Gräser glitzern und ein Einhorn probiert gerade einen Regenbogensprung. Irgendwo ploppt ein Gänseblümchen: „Hallo!“",
      "objects": [
        {
          "id": "obj-sonnenkristall",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/sonnenkristall.png", "alt": "Ein funkelnder Sonnenkristall im Gras" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedSonnenkristall" },
          "position": { "x": 360, "y": 420 }
        }
      ]
    },

    "wolkenhuegel": {
      "id": "wolkenhuegel",
      "state": {
        "collectedWolkenflocke": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Zurück hoppeln auf die Regenbogenwiese" },
          "action": { "type": "switchRoom", "room": "regenbogenwiese" }
        },
        {
          "label": { "text": "Auf zur glitzernden Lichtung!" },
          "action": { "type": "switchRoom", "room": "glitzerlichtung" }
        },
        {
          "label": { "text": "Wolkenflocke schnappen (sie kitzelt!)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedWolkenflocke" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "wolkenflocke",
              "label": "Wolkenflocke",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/wolkenflocke.png", "alt": "Eine federleichte Wolkenflocke" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedWolkenflocke",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/wolkenhuegel-bg.png", "alt": "Fluffige Wolkenhügel unter hellem Himmel" },
      "description": "Ein Einhorn mit Sonnenbrille liegt auf einer Wolke und sagt: „Ich nenne es: Wolken-Yoga.“ Die Wolke nickt zustimmend.",
      "objects": [
        {
          "id": "obj-wolkenflocke",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/wolkenflocke.png", "alt": "Eine lockere Wolkenflocke schwebt knapp über dem Boden" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedWolkenflocke" },
          "position": { "x": 220, "y": 350 }
        }
      ]
    },

    "glitzerlichtung": {
      "id": "glitzerlichtung",
      "state": {
        "collectedSternenstaub": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Sternental? Aber ja, bitte funkeln!" },
          "action": { "type": "switchRoom", "room": "sternental" }
        },
        {
          "label": { "text": "Wolkenhügel wieder besuchen" },
          "action": { "type": "switchRoom", "room": "wolkenhuegel" }
        },
        {
          "label": { "text": "Geheimtipp: Zum Freundschaftshügel tanzen" },
          "action": { "type": "switchRoom", "room": "freundschaftshuegel" }
        },
        {
          "label": { "text": "Sternenstaubbeutel einsacken (nicht niesen!)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedSternenstaub" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "sternenstaubbeutel",
              "label": "Sternenstaubbeutel",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/sternenstaub.png", "alt": "Ein kleiner Beutel mit glitzerndem Sternenstaub" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedSternenstaub",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/glitzerlichtung-bg.png", "alt": "Glitzernde Lichtung mit funkelnden Blättern" },
      "description": "Die Blätter leuchten, sobald du sie antippst. Ein Käfer mit Glitzerhut moderiert: „Willkommen zur Funkel-Show!“",
      "objects": [
        {
          "id": "obj-sternenstaub",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/sternenstaub.png", "alt": "Beutel mit glitzerndem Sternenstaub" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedSternenstaub" },
          "position": { "x": 120, "y": 390 }
        }
      ]
    },

    "sternental": {
      "id": "sternental",
      "state": {
        "collectedMondstein": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Zurück zur glitzernden Lichtung funkeln" },
          "action": { "type": "switchRoom", "room": "glitzerlichtung" }
        },
        {
          "label": { "text": "Dem Traumsee nachwinken (plitsch-platsch)" },
          "action": { "type": "switchRoom", "room": "traumsee" }
        },
        {
          "label": { "text": "Mondstein aufheben (macht „pling“)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedMondstein" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "mondstein",
              "label": "Mondstein",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/mondstein.png", "alt": "Ein weich leuchtender Mondstein" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedMondstein",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/sternental-bg.png", "alt": "Violettes Tal mit vielen kleinen Sternen" },
      "description": "Ein Stern trägt Hut, ein anderer Schnurrbart – beide winken höflich. Der Himmel sagt leise: „Gern geschehen.“",
      "objects": [
        {
          "id": "obj-mondstein",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/mondstein.png", "alt": "Ein leuchtender Mondstein zwischen Sternengras" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedMondstein" },
          "position": { "x": 260, "y": 410 }
        }
      ]
    },

    "traumsee": {
      "id": "traumsee",
      "state": {
        "collectedLachklee": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Zurück ins Sternental blinzeln" },
          "action": { "type": "switchRoom", "room": "sternental" }
        },
        {
          "label": { "text": "Über die Wolkenschlossbrücke spazieren" },
          "action": { "type": "switchRoom", "room": "wolkenschlossbruecke" }
        },
        {
          "label": { "text": "Lachklee pflücken (er kichert zuerst!)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedLachklee" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "lachklee",
              "label": "Lachklee",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/lachklee.png", "alt": "Ein kichernder vierblättriger Klee" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedLachklee",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/traumsee-bg.png", "alt": "Dunkelblauer Traumsee, Sterne spiegeln sich im Wasser" },
      "description": "Ein Einhorn schwebt im sonnigen Schwimmreifen und schlürft Wolkensaft: „Sternig-lecker!“ Der Mond nickt zufrieden.",
      "objects": [
        {
          "id": "obj-lachklee",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/lachklee.png", "alt": "Ein vierblättriger, kichernder Klee am Seeufer" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedLachklee" },
          "position": { "x": 80, "y": 440 }
        }
      ]
    },

    "wolkenschlossbruecke": {
      "id": "wolkenschlossbruecke",
      "state": {
        "collectedRegenbogenschluessel": false
      },
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Zum Traumsee winken (und weiterträumen)" },
          "action": { "type": "switchRoom", "room": "traumsee" }
        },
        {
          "label": { "text": "Regenbogenschlüssel einstecken (glitzert schön)" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedRegenbogenschluessel" },
          "action": {
            "type": "addToInventory",
            "inventoryItem": {
              "id": "regenbogenschluessel",
              "label": "Regenbogenschlüssel",
              "asset": { "type": "image", "src": "/assets/unicorns/icons/regenbogenschluessel.png", "alt": "Ein schillernder Regenbogenschlüssel" },
              "amount": 1
            },
            "nextAction": {
              "type": "setRoomVariable",
              "variable": "collectedRegenbogenschluessel",
              "value": true
            }
          }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/wolkenschlossbruecke-bg.png", "alt": "Schwebende Brücke zu einem Schloss aus Regen und Licht" },
      "description": "Die Brücke knistert vor Regenbogenenergie. Eine Wolke flüstert: „Bitte nur in bequemen Hufschuhen überqueren.“",
      "objects": [
        {
          "id": "obj-regenbogenschluessel",
          "asset": { "type": "image", "src": "/assets/unicorns/objs/regenbogenschluessel.png", "alt": "Ein schillernder Schlüssel liegt auf der Wolkenbrüstung" },
          "visibleIf": { "type": "roomVariableIsFalse", "variable": "collectedRegenbogenschluessel" },
          "position": { "x": 300, "y": 360 }
        }
      ]
    },

    "freundschaftshuegel": {
      "id": "freundschaftshuegel",
      "state": {},
      "roomActions": [],
      "roomUserActions": [
        {
          "label": { "text": "Zur Glitzerlichtung zurücktänzeln" },
          "action": { "type": "switchRoom", "room": "glitzerlichtung" }
        },
        {
          "label": { "text": "Regenbogenposen üben (weiterziehen)" },
          "action": { "type": "switchRoom", "room": "wolkenschlossbruecke" }
        }
      ],
      "layout": "interactive-description-actions",
      "background": { "type": "image", "src": "/assets/unicorns/freundschaftshuegel-bg.png", "alt": "Zwei Einhörner treffen sich unter einem großen Regenbogen" },
      "description": "Hier treffen sich Einhornfreund*innen zum Regenbogentanz. Applaus kommt von den Hügeln: „Encore!“",
      "objects": []
    }
  }
}
