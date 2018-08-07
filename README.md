# node-red-contrib-bcrypt

## introduction
A node that can be used for encrypting user passwords 

## Features

 * encrypt
 * verify

Uses **[bcrypt.js](https://github.com/dcodeIO/bcrypt.js)**

## Options

  * **field**: field to encrypt or to verify against (string) *

  * **verify**: field to verify (hash) *

The field specified will be replaced with the encrypted version if the action is set to encrypt.

## Outputs

`msg.match` will be either true or false

## Example Flow to demonstrate Encrypt and Verify - Copy and Import in Node-Red to test

`[{"id":"74925d3f.d23954","type":"bcrypt","z":"ce50f515.d5d638","name":"","action":"encrypt","field":"","hash":"payload","rounds":10,"x":330,"y":140,"wires":[["c258cf29.e7679"]]},{"id":"72202704.a1fcd8","type":"inject","z":"ce50f515.d5d638","name":"TestEncrypt","topic":"","payload":"nitin","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":80,"wires":[["74925d3f.d23954"]]},{"id":"c258cf29.e7679","type":"debug","z":"ce50f515.d5d638","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":390,"y":180,"wires":[]},{"id":"275eb907.2043c6","type":"inject","z":"ce50f515.d5d638","name":"TestVerify","topic":"","payload":"{\"txt\":\"nitin\",\"hash\":\"$2a$10$qRSGacHdqubboVd22eVBheLcwLvxuEy7JAmMKoWsSWNdusaEqTq5.\"}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":200,"wires":[["3299d029.8440f"]]},{"id":"9278a4c6.d93a68","type":"debug","z":"ce50f515.d5d638","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":370,"y":380,"wires":[]},{"id":"3299d029.8440f","type":"bcrypt","z":"ce50f515.d5d638","name":"","action":"verify","field":"payload.txt","hash":"payload.hash","rounds":10,"x":320,"y":300,"wires":[["9278a4c6.d93a68"]]}]`
