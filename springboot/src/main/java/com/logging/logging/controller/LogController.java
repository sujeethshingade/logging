package com.logging.logging.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Random random = new Random();

    private static final String[] SERVER_NAMES = { "app-server-1", "api-gateway", "auth-service", "data-processor",
            "web-server" };
    private static final String[] USERNAMES = { "admin", "user", "system", "guest", "operator", "manager",
            "developer" };
    private static final String[] LOG_LEVELS = { "INFO", "WARN", "DEBUG", "ERROR", "TRACE" };
    private static final String[] MESSAGES = { "User login successful", "Database query completed",
            "API request processed",
            "Cache updated", "File upload complete", "Data synchronization finished", "Configuration reloaded",
            "Connection established", "Session expired", "Resource allocation completed" };
    private static final String[] PATHS = { "/api/users", "/api/auth", "/api/data", "/api/config", "/api/files",
            "/api/reports", "/api/metrics", "/api/health", "/api/admin", "/api/public" };
    private static final String[] METHODS = { "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD" };

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

        switch (size.toLowerCase()) {
            case "1mb":
                logCount = 2000;
                break;
            case "10mb":
                logCount = 20000;
                break;
            case "100mb":
                logCount = 100000;
                break;
            default:
                return "Invalid size. Use '1mb', '10mb', or '100mb'";
        }

        for (int i = 0; i < logCount; i++) {
            try {
                String jsonLog = generateRandomJsonLog();
                logger.info(jsonLog);
            } catch (Exception e) {
                logger.error("Error generating log: {}", e.getMessage());
            }
        }

        return String.format("Generated approximately %s of logs", size);
    }

    private String generateRandomJsonLog() throws Exception {
        Map<String, Object> logEntry = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

        // Populate with random data but use current timestamp
        logEntry.put("timestamp", now.format(formatter));
        logEntry.put("server_name", SERVER_NAMES[random.nextInt(SERVER_NAMES.length)]);
        logEntry.put("username", USERNAMES[random.nextInt(USERNAMES.length)]);
        logEntry.put("log_level", LOG_LEVELS[random.nextInt(LOG_LEVELS.length)]);
        logEntry.put("message", MESSAGES[random.nextInt(MESSAGES.length)] + " - " + UUID.randomUUID());
        logEntry.put("path", PATHS[random.nextInt(PATHS.length)] + "/" + random.nextInt(100));
        logEntry.put("method", METHODS[random.nextInt(METHODS.length)]);
        logEntry.put("ip", generateRandomIp());

        return objectMapper.writeValueAsString(logEntry);
    }

    private String generateRandomIp() {
        return random.nextInt(256) + "." +
                random.nextInt(256) + "." +
                random.nextInt(256) + "." +
                random.nextInt(256);
    }
}