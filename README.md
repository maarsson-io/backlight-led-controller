# Backlight LED Controller

Minimal macOS controller for a Robobloq compatible USB backlight LED strip. It just replaces the core functionality of the original macOS app as it can turn on/off the strip. Color and brightness, even device ID´s are hardcoded in `led-controller.js`.

## Usage

Install the dependencies:
```bash
npm install
```

Check the device availability:
```bash
npm run list
```

Turn on the lights:
```bash
npm run on
```

Turn off the lights:
```bash
npm run off
```

macOS may require Input Monitoring permission for the terminal or script runner.

## Automatic sleep/wake control

Use [sleepwatcher](https://formulae.brew.sh/formula/sleepwatcher) to control the LED strip during sleep and wake events.

Create `~/.sleep` and `~/.wakeup` scripts that call the command:

```bash
# ~/.sleep
node /path/to/led-controller.js off >/dev/null 2>&1 || true
```
and
```bash
# ~/.wakeup
sleep 3
node /path/to/led-controller.js on >/dev/null 2>&1 || true
```

Make both scripts executable:

```bash
chmod +x ~/.sleep ~/.wakeup
```

If Node.js is not available in the SleepWatcher environment, set `NODE` to the full path of the active Node.js executable:

```bash
NODE="/path/to/node"
```

For Laravel Herd with NVM, resolve the active default version dynamically:

```sh
export NVM_DIR="$HOME/Library/Application Support/Herd/config/nvm"
. "$NVM_DIR/nvm.sh"
NODE="$(nvm which default)"

"$NODE" /path/to/led-controller.js on >/dev/null 2>&1 || true
```

SleepWatcher must be running as a user service:

```bash
brew services start sleepwatcher
```

## Hardware

- Vendor ID: `0x1A86`
- Product ID: `0xFE07`
- Interface: USB HID

## License

MIT
