package com.loveReading.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/*
    JWT stands for JSON Web Token. It is a type of token used for authentication and authorization in web applications.
    JWTs are typically used to securely transmit information between parties, such as a client and server, in a compact and verifiable way.

    JWTs are composed of three parts: a header, a payload, and a signature.
    The header typically includes information about the type of token and the algorithm used to sign it.
    The payload contains the claims, which are statements about an entity (typically the user) and additional data.
    The signature is created by combining the encoded header and payload with a secret key using the algorithm specified in the header.

    JWTs are often used in conjunction with OAuth 2.0 to authorize access to web resources, such as APIs.
    When a user authenticates with an OAuth 2.0 provider, they receive a JWT that can be used to access protected resources.
    The JWT can be passed between the client and server as a header or in the request body.
    The server can then verify the JWT's signature to ensure that it has not been tampered with and that the user is authorized to access the requested resource.
 */

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {

        token.replace("Bearer ", "");

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for (String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) {

                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }
        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }
        return null;
    }
}