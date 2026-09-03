package com.assessment.userservice.dto;

import com.assessment.userservice.model.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressRequest(
        @NotBlank(message = "line1 is required")
        String line1,

        String line2,

        @NotBlank(message = "city is required")
        String city,

        @NotBlank(message = "state is required")
        String state,

        @NotBlank(message = "postalCode is required")
        String postalCode,

        @NotBlank(message = "country is required")
        String country,

        @NotNull(message = "type is required")
        AddressType type
) {
}
