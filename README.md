# node-red-contrib-bcrypt

## introduction
A node that can be used for encrypting user passwords 

## Features

 * encrypt/hash
 * verify

Uses **[bcrypt.js](https://github.com/dcodeIO/bcrypt.js)**

## Options

  * **field**: field to encrypt or to verify against (string) *

  * **verify**: field to verify (hash) *

The field specified will be replaced with the encrypted version if the action is set to encrypt.

## Outputs

`msg.match` will be either true or false

## Example Flow to demonstrate Encrypt and Verify - Copy and Import in Node-Red to test

`[
    {
        "id": "44cb1ec64f0c78d1",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "encrypt",
        "field": "payload",
        "hash": "payload",
        "target": "",
        "assignment": "replace",
        "match": "match",
        "outputs": 1,
        "rounds": "10",
        "x": 250,
        "y": 260,
        "wires": [
            [
                "cd5ed81131b0f293"
            ]
        ]
    },
    {
        "id": "ba38225ef5691ed6",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6",
        "payloadType": "num",
        "x": 130,
        "y": 260,
        "wires": [
            [
                "44cb1ec64f0c78d1"
            ]
        ]
    },
    {
        "id": "cd5ed81131b0f293",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 390,
        "y": 260,
        "wires": []
    },
    {
        "id": "69d161daec8d0273",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "verify",
        "field": "payload",
        "hash": "hash",
        "assignment": "replace",
        "match": "isGood",
        "outputs": 2,
        "rounds": 10,
        "x": 260,
        "y": 560,
        "wires": [
            [
                "8ae20e590a01fd25"
            ],
            [
                "15cba0e8d11eda76"
            ]
        ]
    },
    {
        "id": "aef0ed34375d92bd",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "Good",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "hash",
                "v": "$2a$10$1HDtq5vldsTmNlacSgzs0e/nvtpFct0KoP63nlPWzpKnKcKgAcfwS",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6",
        "payloadType": "num",
        "x": 130,
        "y": 540,
        "wires": [
            [
                "69d161daec8d0273"
            ]
        ]
    },
    {
        "id": "8ae20e590a01fd25",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "good",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "isGood",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 390,
        "y": 540,
        "wires": []
    },
    {
        "id": "15cba0e8d11eda76",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "bad",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "isGood",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 390,
        "y": 580,
        "wires": []
    },
    {
        "id": "ffc4409f7cb3f6ba",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "Bad",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "hash",
                "v": "$2a$10$1HDtq5vldsTmNlacSgzs0e/nvtpFct0KoP63nlPWzpKnKcKgAcfwS",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7",
        "payloadType": "num",
        "x": 130,
        "y": 580,
        "wires": [
            [
                "69d161daec8d0273"
            ]
        ]
    },
    {
        "id": "bbe0dced4cdd0e52",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "verify",
        "field": "payload",
        "hash": "hash",
        "target": "",
        "assignment": "replace",
        "match": "isGood",
        "outputs": 1,
        "rounds": 10,
        "x": 260,
        "y": 400,
        "wires": [
            [
                "927a9666a84b65ef"
            ]
        ]
    },
    {
        "id": "619be956afc9797c",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "Good",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "hash",
                "v": "$2a$10$1HDtq5vldsTmNlacSgzs0e/nvtpFct0KoP63nlPWzpKnKcKgAcfwS",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6",
        "payloadType": "num",
        "x": 130,
        "y": 380,
        "wires": [
            [
                "bbe0dced4cdd0e52"
            ]
        ]
    },
    {
        "id": "927a9666a84b65ef",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "GOOD OR BAD",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "isGood",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 420,
        "y": 400,
        "wires": []
    },
    {
        "id": "bd512b7da17fdc6f",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "Bad",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "hash",
                "v": "$2a$10$1HDtq5vldsTmNlacSgzs0e/nvtpFct0KoP63nlPWzpKnKcKgAcfwS",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7",
        "payloadType": "num",
        "x": 130,
        "y": 420,
        "wires": [
            [
                "bbe0dced4cdd0e52"
            ]
        ]
    },
    {
        "id": "9d7d14ceb6ad6c7d",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "encrypt",
        "field": "payload",
        "hash": "payload",
        "target": "hash",
        "assignment": "assign",
        "match": "match",
        "outputs": 1,
        "rounds": "10",
        "x": 250,
        "y": 700,
        "wires": [
            [
                "d5fbfbeed27b8cf3"
            ]
        ]
    },
    {
        "id": "9d85d81f3dd45ef1",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "good",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6",
        "payloadType": "num",
        "x": 130,
        "y": 700,
        "wires": [
            [
                "9d7d14ceb6ad6c7d"
            ]
        ]
    },
    {
        "id": "d5fbfbeed27b8cf3",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "verify",
        "field": "payload",
        "hash": "hash",
        "target": "",
        "assignment": "replace",
        "match": "isGood",
        "outputs": 1,
        "rounds": 10,
        "x": 380,
        "y": 700,
        "wires": [
            [
                "33375c74cb0b827b"
            ]
        ]
    },
    {
        "id": "33375c74cb0b827b",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "good",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "isGood",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 510,
        "y": 700,
        "wires": []
    },
    {
        "id": "465fdbece6b334f3",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "verify",
        "field": "payload",
        "hash": "hashz",
        "target": "",
        "assignment": "replace",
        "match": "isGood",
        "outputs": 1,
        "rounds": 10,
        "x": 380,
        "y": 740,
        "wires": [
            [
                "b1af859833029bb1"
            ]
        ]
    },
    {
        "id": "484a0c96cde5eb67",
        "type": "bcrypt",
        "z": "d9738de9e7b466e0",
        "name": "",
        "action": "encrypt",
        "field": "payload",
        "hash": "payload",
        "target": "hash",
        "assignment": "assign",
        "match": "match",
        "outputs": 1,
        "rounds": "10",
        "x": 250,
        "y": 740,
        "wires": [
            [
                "465fdbece6b334f3"
            ]
        ]
    },
    {
        "id": "b1af859833029bb1",
        "type": "debug",
        "z": "d9738de9e7b466e0",
        "name": "bad",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "isGood",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 510,
        "y": 740,
        "wires": []
    },
    {
        "id": "4f160fe2dae79fc3",
        "type": "inject",
        "z": "d9738de9e7b466e0",
        "name": "bad",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6",
        "payloadType": "num",
        "x": 130,
        "y": 740,
        "wires": [
            [
                "484a0c96cde5eb67"
            ]
        ]
    },
    {
        "id": "f09cabed71250e79",
        "type": "comment",
        "z": "d9738de9e7b466e0",
        "name": "Hash msg.payload and replace field with hash",
        "info": "",
        "x": 220,
        "y": 220,
        "wires": []
    },
    {
        "id": "b4decbdcd72d45fb",
        "type": "comment",
        "z": "d9738de9e7b466e0",
        "name": "Compare msg.hash against msg.payload and assign result to msg.isGood",
        "info": "",
        "x": 320,
        "y": 340,
        "wires": []
    },
    {
        "id": "c6434dd000580917",
        "type": "comment",
        "z": "d9738de9e7b466e0",
        "name": "Compare msg.hash against msg.payload and assign result to msg.isGood using seperate output",
        "info": "",
        "x": 390,
        "y": 500,
        "wires": []
    },
    {
        "id": "14194bdc85dc316a",
        "type": "comment",
        "z": "d9738de9e7b466e0",
        "name": "Other",
        "info": "",
        "x": 110,
        "y": 660,
        "wires": []
    }
]`
