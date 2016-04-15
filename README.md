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