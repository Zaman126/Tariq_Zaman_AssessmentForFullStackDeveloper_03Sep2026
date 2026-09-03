package com.assessment.userservice.dto;

import com.assessment.userservice.model.AddressType;

public record AddressResponse(
        Long id,
        String line1,
        String line2,
        String city,
        String state,
        String postalCode,
        String country,
        AddressType type
) {
}
