function decode(bits) {
	// Determine the configuration based on the incoming vector length
	var hasParity = (bits.length === 8 || bits.length === 13);
	var parityOffset = hasParity ? 1 : 0;

	// Extract the standard Hamming bits (ignore the first parity bit for now if it exists)
	var hBits = hasParity ? bits.slice(1) : bits;

	var z1 = 0, z2 = 0, z4 = 0, z8 = 0;

	// 4 Info Bits (Total 7 Hamming Bits)
	if (hBits.length === 7) {
		z1 = parity(hBits[0] + hBits[2] + hBits[4] + hBits[6]);
		z2 = parity(hBits[1] + hBits[2] + hBits[5] + hBits[6]);
		z4 = parity(hBits[3] + hBits[4] + hBits[5] + hBits[6]);
	}
	// 8 Info Bits (Total 12 Hamming Bits)
	else if (hBits.length === 12) {
		z1 = parity(hBits[0] + hBits[2] + hBits[4] + hBits[6] + hBits[8] + hBits[10]);
		z2 = parity(hBits[1] + hBits[2] + hBits[5] + hBits[6] + hBits[9] + hBits[10]);
		z4 = parity(hBits[3] + hBits[4] + hBits[5] + hBits[6] + hBits[11]);
		z8 = parity(hBits[7] + hBits[8] + hBits[9] + hBits[10] + hBits[11]);
	}

	// Add Z vector calculation comments to the console
	console.log("Calculated Z vector: z8=" + z8 + ", z4=" + z4 + ", z2=" + z2 + ", z1=" + z1);

	var errorPosition = z1 * 1 + z2 * 2 + z4 * 4 + z8 * 8;
	var errorDetected = false;

	if (errorPosition !== 0) {
		errorDetected = true;
	}

	var z0 = 0;
	if (hasParity) {
		var sum = 0;
		for (var i = 0; i < bits.length; i++) {
			sum += bits[i];
		}
		z0 = parity(sum);
		console.log("Calculated global parity bit (z0): " + z0);
	}

	if (errorDetected) {
		// Double error check when using the parity bit
		if (hasParity && z0 === 0) {
			console.log("Double error detected. Correction impossible.");
			return { errorCorrected: false, errorPosition: -1, bits: bits };
		} else {
			// Correct the single bit error in the hBits array
			hBits[errorPosition - 1] = parity(hBits[errorPosition - 1] + 1);

			// Reapply the corrected bit back to the primary bits array
			if (hasParity) {
				bits[errorPosition] = hBits[errorPosition - 1];
			} else {
				bits[errorPosition - 1] = hBits[errorPosition - 1];
			}
		}
	}

	return { errorCorrected: errorDetected, errorPosition: errorPosition - 1, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;