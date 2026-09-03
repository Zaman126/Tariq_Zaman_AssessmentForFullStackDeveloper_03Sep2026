package com.assessment.userservice.mapper;

import com.assessment.userservice.dto.AddressRequest;
import com.assessment.userservice.dto.AddressResponse;
import com.assessment.userservice.model.Address;

public final class AddressMapper {

    private AddressMapper() {
    }

    public static AddressResponse toResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getLine1(),
                address.getLine2(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry(),
                address.getType()
        );
    }

    public static Address toModel(AddressRequest request) {
        return Address.builder()
                .line1(request.line1())
                .line2(request.line2())
                .city(request.city())
                .state(request.state())
                .postalCode(request.postalCode())
                .country(request.country())
                .type(request.type())
                .build();
    }

    /** Applies the fields of an incoming request onto an existing address (used for updates). */
    public static void applyToModel(AddressRequest request, Address target) {
        target.setLine1(request.line1());
        target.setLine2(request.line2());
        target.setCity(request.city());
        target.setState(request.state());
        target.setPostalCode(request.postalCode());
        target.setCountry(request.country());
        target.setType(request.type());
    }
}
