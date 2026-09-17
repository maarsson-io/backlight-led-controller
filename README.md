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

## Hardware

- Vendor ID: `0x1A86`
- Product ID: `0xFE07`
- Interface: USB HID

## License

MIT
