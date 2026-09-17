#!/usr/bin/env node

const HID = require("node-hid");

const VID = 0x1a86;
const PID = 0xfe07;
const RGB = [0xD3, 0xA1, 0x25]; // #D3A125
const BRIGHTNESS = 0xff; // 100%

let sequence = 1;

function checksum(bytes) {
  return bytes.reduce((sum, byte) => (sum + byte) & 0xff, 0);
}

function packet(action, payload = []) {
  const bytes = [0x52, 0x42, 6 + payload.length, sequence++, action, ...payload];
  bytes.push(checksum(bytes));
  return Buffer.from(bytes);
}

function findLight() {
  const devices = HID.devices().filter(
    (device) => device.vendorId === VID && device.productId === PID,
  );

  if (devices.length === 0) {
    throw new Error("Can't find USB LED strip unit.");
  }

  return devices[0];
}

async function write(device, frame) {
  const report = Buffer.concat([Buffer.from([0]), frame]);
  await device.write(report);
  await new Promise((resolve) => setTimeout(resolve, 200));
  console.log(`Sent: ${report.toString("hex").match(/../g).join(" ")}`);
}

async function main() {
  const command = process.argv[2] || "list";
  const info = findLight();

  if (command === "list") {
    console.log({
      path: info.path,
      vendorId: `0x${VID.toString(16)}`,
      productId: `0x${PID.toString(16)}`,
      manufacturer: info.manufacturer,
      product: info.product,
      serialNumber: info.serialNumber,
    });
    return;
  }

  const device = await HID.HIDAsync.open(info.path);
  try {
    if (command === "on") {
      await write(device, packet(0x87, [BRIGHTNESS]));
      await write(device, packet(0x86, [1, ...RGB, 0xfe]));
    } else if (command === "off") {
      await write(device, packet(0x97));
    } else {
      throw new Error("Usage: node led-controller.js [list|on|off]");
    }
  } finally {
    await device.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
