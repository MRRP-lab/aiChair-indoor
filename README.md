# MRRP AI Chair App

## Installation

`npm install`

## Building Locally

### Windows

1. Set up an `.env` file with `EXPO_TOKEN=...` (api token from Expo)
2. run `build.bat`
3. Install adb if not already installed `winget install Google.PlatformTools`
4. Connect to phone (need to enable developer mode, pair via usb or wireless)
5. `adb pair <ip>:<port>`
6. `adb install -r app.apk`

## Testing

`npm test`
