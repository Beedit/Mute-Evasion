# Mute Evasion
## A ct module to send messages to an alt account automatically when you are muted on hypixel.

- [x] Basic module that can read messages sent and work out which ones are meant to be sent as chat messages
- [x] Functional way to send messages from muted client to unmuted client
- [x] Functional way to sent messages from unmuted client to muted client (for things like /msg)
- [ ] Fix a ton of bugs I know exist.
- [x] Make nice setup instructions 

## Why?

I got muted on hypixel for a month so I made this. Yes it would have been easier to open up 2 games instead of one, but this exists now.

## Setup

### These instructions are using commands for linux. 
1. Clone the git repo
```sh
git clone https://github.com/Beedit/Mute-Evasion.git
```
2. cd into the repo
```sh
cd Mute-Evasion
```
3. Install the chat triggers module. (This may be added to the ct website if they allow it lol)
```sh
cd ..
cp -r MuteEvasion ~/path/to/your/installation/config/ChatTriggers/modules
```
4. Copy the .env.example file in the MuteEvasionServer folder and set values in it
```sh
cd MuteEvasionServer
cp .env.example .env
nano .env
```

5. Run the server
```sh
node index.js
```

6. In minecraft reload ct
```sh
/ct reload
```