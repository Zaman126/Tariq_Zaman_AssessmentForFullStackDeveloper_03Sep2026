package com.assessment.userservice.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

/**
 * Uniform error payload returned to API consumers so the frontend can
 * render a consistent error state regardless of which endpoint failed.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        List<String> fieldErrors
) {
}
