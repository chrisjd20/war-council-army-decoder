function parseInput(input) {
  const normalizedInput = input.replace(/\s/g, "");
  const normalizedHexInput = normalizedInput.replace(/0x/g, "").toLowerCase();

  if (isHex(normalizedHexInput)) {
    return hexToBytes(normalizedHexInput);
  } else {
    return base64ToBytes(normalizedInput);
  }
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0, j = 0; i < hex.length; i += 2, j++) {
    bytes[j] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

function base64ToBytes(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function isHex(string) {
  let result = true;
  for (const char of string) {
    if (!((char >= "a" && char <= "f") || (char >= "0" && char <= "9"))) {
      result = false;
    }
  }
  return result;
}

function bufferToPrettyHex(buffer) {
  let output = "";
  for (const v of buffer) {
    if (output !== "") {
      output += " ";
    }

    const hex = v.toString(16);
    if (hex.length === 1) {
      output += "0" + hex;
    } else {
      output += hex;
    }
  }
  return output;
}

function bufferLeToBeHex(buffer) {
  let output = "";
  for (const v of buffer) {
    const hex = v.toString(16);
    if (hex.length === 1) {
      output = "0" + hex + output;
    } else {
      output = hex + output;
    }
  }
  return output;
}
