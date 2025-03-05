package com.logging.logging.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}