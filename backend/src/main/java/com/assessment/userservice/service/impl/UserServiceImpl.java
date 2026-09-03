package com.assessment.userservice.service.impl;

import com.assessment.userservice.dto.AddressRequest;
import com.assessment.userservice.dto.AddressResponse;
import com.assessment.userservice.dto.UserDetailResponse;
import com.assessment.userservice.dto.UserSummaryResponse;
import com.assessment.userservice.dto.UserUpdateRequest;
import com.assessment.userservice.exception.ResourceNotFoundException;
import com.assessment.userservice.mapper.AddressMapper;
import com.assessment.userservice.mapper.UserMapper;
import com.assessment.userservice.model.Address;
import com.assessment.userservice.model.User;
import com.assessment.userservice.repository.UserRepository;
import com.assessment.userservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toSummary)
                .toList();
    }

    @Override
    public UserDetailResponse getUserDetail(Long userId) {
        return UserMapper.toDetail(getUserOrThrow(userId));
    }

    @Override
    public UserDetailResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = getUserOrThrow(userId);
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        userRepository.save(user);
        return UserMapper.toDetail(user);
    }

    @Override
    public List<AddressResponse> getAddresses(Long userId) {
        return getUserOrThrow(userId).getAddresses().stream()
                .map(AddressMapper::toResponse)
                .toList();
    }

    @Override
    public AddressResponse addAddress(Long userId, AddressRequest request) {
        getUserOrThrow(userId);
        Address address = AddressMapper.toModel(request);
        Address saved = userRepository.addAddress(userId, address);
        return AddressMapper.toResponse(saved);
    }

    @Override
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) {
        getUserOrThrow(userId);
        Address existing = userRepository.findAddress(userId, addressId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address " + addressId + " was not found for user " + userId));

        AddressMapper.applyToModel(request, existing);
        Address updated = userRepository.updateAddress(userId, existing);
        return AddressMapper.toResponse(updated);
    }

    @Override
    public void deleteAddress(Long userId, Long addressId) {
        getUserOrThrow(userId);
        boolean removed = userRepository.deleteAddress(userId, addressId);
        if (!removed) {
            throw new ResourceNotFoundException(
                    "Address " + addressId + " was not found for user " + userId);
        }
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User " + userId + " was not found"));
    }
}
