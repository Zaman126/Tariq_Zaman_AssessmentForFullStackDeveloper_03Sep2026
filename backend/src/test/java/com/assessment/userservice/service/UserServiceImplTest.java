package com.assessment.userservice.service;

import com.assessment.userservice.dto.AddressRequest;
import com.assessment.userservice.dto.AddressResponse;
import com.assessment.userservice.dto.UserDetailResponse;
import com.assessment.userservice.dto.UserUpdateRequest;
import com.assessment.userservice.exception.ResourceNotFoundException;
import com.assessment.userservice.model.AddressType;
import com.assessment.userservice.repository.InMemoryUserRepository;
import com.assessment.userservice.repository.UserRepository;
import com.assessment.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserServiceImplTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        UserRepository repository = new InMemoryUserRepository();
        // @PostConstruct isn't invoked by a plain `new` in a unit test, so seed manually.
        ((InMemoryUserRepository) repository).seed();
        userService = new UserServiceImpl(repository);
    }

    @Test
    void getAllUsers_returnsSeedData() {
        assertThat(userService.getAllUsers()).hasSize(4);
    }

    @Test
    void getUserDetail_unknownId_throwsNotFound() {
        assertThatThrownBy(() -> userService.getUserDetail(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void updateUser_changesBasicInfo() {
        UserUpdateRequest request = new UserUpdateRequest("john.doe.updated@example.com", "Jonathan", "Doe");
        UserDetailResponse updated = userService.updateUser(1L, request);

        assertThat(updated.email()).isEqualTo("john.doe.updated@example.com");
        assertThat(updated.firstName()).isEqualTo("Jonathan");
    }

    @Test
    void addAddress_thenAppearsUnderThatUserOnly() {
        AddressRequest request = new AddressRequest(
                "10 Downing Street", null, "London", "Greater London", "SW1A 2AA", "United Kingdom", AddressType.HOME);

        AddressResponse created = userService.addAddress(2L, request);

        assertThat(userService.getAddresses(2L)).extracting(AddressResponse::id).contains(created.id());
        assertThat(userService.getAddresses(1L)).extracting(AddressResponse::id).doesNotContain(created.id());
    }

    @Test
    void deleteAddress_removesIt() {
        AddressRequest request = new AddressRequest(
                "1 Temp Street", null, "Testville", "TS", "00000", "Testland", AddressType.OTHER);
        AddressResponse created = userService.addAddress(3L, request);

        userService.deleteAddress(3L, created.id());

        assertThat(userService.getAddresses(3L)).extracting(AddressResponse::id).doesNotContain(created.id());
    }
}
