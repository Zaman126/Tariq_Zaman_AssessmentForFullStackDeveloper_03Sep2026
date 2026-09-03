package com.assessment.userservice.dto;

/**
 * Lightweight projection used for the user list screen -
 * intentionally excludes addresses to keep the list endpoint cheap.
 */
public record UserSummaryResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        int addressCount
) {
}
