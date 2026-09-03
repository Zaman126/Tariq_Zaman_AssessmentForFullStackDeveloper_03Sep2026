package com.assessment.userservice.dto;

import java.util.List;

public record UserDetailResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        List<AddressResponse> addresses
) {
}
