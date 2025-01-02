package com.project.feature.user.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final  class GenerateCode {
    public GenerateCode() {
    }

    public static String generateHexCode(String email) {
        try {
            // Initialize the MessageDigest with SHA-256 algorithm
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Compute the hash bytes of the email
            byte[] hashBytes = digest.digest(email.getBytes());

            // Convert the hash bytes to a hexadecimal string
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }

            // Return the first 4 characters of the hex string
            return hexString.substring(0, 4);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating hex code", e);
        }
    }
}
