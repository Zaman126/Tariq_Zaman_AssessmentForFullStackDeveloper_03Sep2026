package com.assessment.userservice.controller;

import com.assessment.userservice.dto.AddressRequest;
import com.assessment.userservice.dto.AddressResponse;
import com.assessment.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

/**
 * Addresses are modeled as a sub-resource of a user (one-to-many), so every
 * route here is scoped under /api/v1/users/{userId}/addresses.
 */
@RestController
@RequestMapping("/api/v1/users/{userId}/addresses")
public class AddressController {

    private final UserService userService;

    public AddressController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getAddresses(userId));
    }

    @PostMapping
    public ResponseEntity<AddressResponse> addAddress(@PathVariable Long userId,
                                                        @Valid @RequestBody AddressRequest request) {
        AddressResponse created = userService.addAddress(userId, request);
        URI location = URI.create("/api/v1/users/" + userId + "/addresses/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> updateAddress(@PathVariable Long userId,
                                                           @PathVariable Long addressId,
                                                           @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.ok(userService.updateAddress(userId, addressId, request));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        userService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }
}
