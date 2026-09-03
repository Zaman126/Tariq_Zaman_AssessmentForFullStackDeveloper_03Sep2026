package com.assessment.userservice.mapper;

import com.assessment.userservice.dto.UserDetailResponse;
import com.assessment.userservice.dto.UserSummaryResponse;
import com.assessment.userservice.model.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserSummaryResponse toSummary(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddresses().size()
        );
    }

    public static UserDetailResponse toDetail(User user) {
        return new UserDetailResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddresses().stream()
                        .map(AddressMapper::toResponse)
                        .toList()
        );
    }
}
