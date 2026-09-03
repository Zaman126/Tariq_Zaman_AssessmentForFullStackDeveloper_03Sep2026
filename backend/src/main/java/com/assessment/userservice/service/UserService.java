package com.assessment.userservice.service;

import com.assessment.userservice.dto.AddressRequest;
import com.assessment.userservice.dto.AddressResponse;
import com.assessment.userservice.dto.UserDetailResponse;
import com.assessment.userservice.dto.UserSummaryResponse;
import com.assessment.userservice.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {

    List<UserSummaryResponse> getAllUsers();

    UserDetailResponse getUserDetail(Long userId);

    UserDetailResponse updateUser(Long userId, UserUpdateRequest request);

    List<AddressResponse> getAddresses(Long userId);

    AddressResponse addAddress(Long userId, AddressRequest request);

    AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request);

    void deleteAddress(Long userId, Long addressId);
}
