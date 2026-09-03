package com.assessment.userservice.repository;

import com.assessment.userservice.model.Address;
import com.assessment.userservice.model.User;

import java.util.List;
import java.util.Optional;

/**
 * Storage abstraction for users. Kept as an interface so the in-memory
 * implementation used today can be swapped for a JPA-backed one later
 * without touching the service or controller layers.
 */
public interface UserRepository {

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);

    Address addAddress(Long userId, Address address);

    Optional<Address> findAddress(Long userId, Long addressId);

    Address updateAddress(Long userId, Address address);

    boolean deleteAddress(Long userId, Long addressId);
}
