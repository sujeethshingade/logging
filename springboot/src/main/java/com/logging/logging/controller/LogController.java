package com.logging.logging.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Value("${server.name:unknown}")
    private String serverName;

    @GetMapping("/test-logs")
    public String testLogs() {
        logger.trace("A TRACE Message from server: {}", serverName);
        logger.debug("A DEBUG Message from server: {}", serverName);
        logger.info("An INFO Message from server: {}", serverName);
        logger.warn("A WARN Message from server: {}", serverName);
        logger.error("An ERROR Message from server: {}", serverName);

        return "Logs generated. Check console and log file.";
    }

    @GetMapping("/generate-logs/{size}")
    public String generateLogs(@PathVariable String size) {
        int logCount;
        String message = generateRandomString(500); 

        switch (size.toLowerCase()) {
            case "1mb":
                logCount = 2000; 
                break;
            case "10mb":
                logCount = 20000;
                break;
            case "100mb":
                logCount = 200000; 
                break;
            default:
                return "Invalid size. Use '1mb', '10mb', or '100mb'";
        }

        for (int i = 0; i < logCount; i++) {
            logger.info("Log #{}: {} - {}", i, serverName, message);
        }

        return String.format("Generated approximately %s of logs", size);
    }

    private String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length / 36; i++) {
            sb.append(UUID.randomUUID().toString());
        }
        return sb.toString();
    }
}